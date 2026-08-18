<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

use ClypperTechnology\RolePricing\Rules\RoleRules;

final class RoleRulesDTO
{
    /**
     * @param ProductRuleDTO[] $products
     */
    public function __construct(
        public RoleRules $rules,
        public array $products,
    ) {
    }

    public function to_array(): array
    {
        return [
            ...$this->rules->to_array(),
            'products' => array_map(fn ($p) => $p->to_array(), $this->products),
        ];
    }
}