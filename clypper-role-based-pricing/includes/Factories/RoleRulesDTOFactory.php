<?php

namespace ClypperTechnology\RolePricing\Factories;

use ClypperTechnology\RolePricing\REST\DTOs\RoleRulesDTO;
use ClypperTechnology\RolePricing\Rules\RoleRules;

final class RoleRulesDTOFactory
{
    public static function from_rules(RoleRules $rule): RoleRulesDTO {
        return new RoleRulesDTO(
          $rule,
          array_map(fn($p) => ProductRuleDTOFactory::from_rule($p), $rule->products)
        );
    }
}