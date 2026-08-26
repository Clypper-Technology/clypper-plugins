<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

use ClypperTechnology\RolePricing\Rules\RoleRules;

defined('ABSPATH') || exit;

final class RoleRulesDTO
{
    /**
     * @param ProductRuleDTO[] $products
     */
    public function __construct(
        public RoleRules $rules,
        public string $role_name = "",
        public array $products,
    ) {
    }

    public function to_array(): array
    {
        return [
            ...$this->rules->to_array(),
            'role_name' => $this->role_name,
            'products' => array_map(fn ($p) => $p->to_array(), array_values($this->products)),
        ];
    }
}