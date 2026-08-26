<?php

namespace ClypperTechnology\RolePricing\Factories\Factories;

use ClypperTechnology\RolePricing\REST\DTOs\RoleRulesDTO;
use ClypperTechnology\RolePricing\Rules\RoleRules;

defined( 'ABSPATH' ) || exit;

final class RoleRulesDTOFactory
{
    public static function from_rules(RoleRules $rule): RoleRulesDTO {
        return new RoleRulesDTO(
          $rule,
          self::slug_to_name($rule->role_slug),
          array_map(fn($p) => ProductRuleDTOFactory::from_rule($p), $rule->products)
        );
    }

    private static function slug_to_name(string $slug ): string {
        $name = str_replace("_", " ", $slug);
        return ucfirst($name);
    }
}