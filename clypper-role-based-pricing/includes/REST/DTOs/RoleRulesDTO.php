<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

use ClypperTechnology\RolePricing\REST\DTOs\ProductRuleDTO;
use ClypperTechnology\RolePricing\Rules\CategoryRule;
use ClypperTechnology\RolePricing\Rules\RoleRules;
use ClypperTechnology\RolePricing\Rules\Rule;

class RoleRulesDTO
{

    /**
     * @param int[] $categories ;
     * @param ProductRuleDTO[] $products
     * @param CategoryRule[] $single_categories
     */
    public function __construct(
        public int    $id,
        public string $role_name,
        public bool   $rule_active = false,
        public ?Rule  $global_rule = null,
        public ?Rule  $category_rule = null,
        public array  $categories = [],           // General category mappings [['123' => '123']]
        public array  $products = [],             // ProductRuleDTO[]
        public array  $single_categories = []     // CategoryRule[]
    )
    {

    }

    public static function from(RoleRules $rule): self {
        return new self(
            $rule->id,
            $rule->role_name,
            $rule->rule_active,
            $rule->global_rule,
            $rule->category_rule,
            $rule->categories,
            array_map(fn($p) => ProductRuleDTO::from($p), $rule->products),
            $rule->single_categories
        );
    }

    /**
     * Convert to array for storage (matches your exact structure)
     */
    public function to_array(): array
    {
        return [
            'id' => $this->id,
            'rule_active' => $this->rule_active ? 'on' : '',
            'global_rule' => $this->global_rule?->to_array(),
            'category_rule' => $this->category_rule?->to_array(),
            'categories' => $this->categories,
            'products' => array_map(fn($p) => $p->to_array(), $this->products),
            'single_categories' => array_map(fn($c) => $c->to_array(), $this->single_categories),
        ];
    }
}
