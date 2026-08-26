<?php

namespace ClypperTechnology\RolePricing\REST\DTOs;

use ClypperTechnology\RolePricing\Rules\RoleRules;

defined('ABSPATH') || exit;

class RoleDTO
{
    public int $id;
    public string $name;
    public string $slug;
    public bool $active;
    public int $rule_count;

    public function __construct(
        int $id,
        string $name,
        string $slug,
        bool $active,
        int $rule_count)
    {
        $this->id = $id;
        $this->name = $name;
        $this->slug = $slug;
        $this->active = $active;
        $this->rule_count = $rule_count;
    }

    public static function from(RoleRules $rule, string $name): self {
        return new self(
            $rule->id,
            $name,
            $rule->role_slug,
            $rule->rule_active,
            $rule->get_rule_count()
        );
    }
}