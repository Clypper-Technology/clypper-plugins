<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

use ClypperTechnology\RolePricing\Rules\RoleRules;

class RoleDTO
{
    public int $id;
    public string $name;
    public string $slug;
    public bool $active;

    public function __construct(int $id, string $name, string $slug, bool $active)
    {
        $this->id = $id;
        $this->name = $name;
        $this->slug = $slug;
        $this->active = $active;
    }

    public static function from(RoleRules $rule): self {
        return new self(
            $rule->id,
            $rule->role_name,
            $rule->role_name,
            $rule->rule_active
        );
    }
}