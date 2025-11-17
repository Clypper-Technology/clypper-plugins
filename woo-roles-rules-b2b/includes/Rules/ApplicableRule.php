<?php

namespace ClypperTechnology\RolePricing\Rules;

/**
 * ApplicableRule - Value object for rule with context
 */
readonly class ApplicableRule {
    public function __construct(
        public Rule $rule,
        public int $min_quantity = 0,
    ) {}

    public function calculatePrice(float $original_price, int $cart_qty): ?float {
        return $this->rule->calculatePrice($original_price, $this->min_quantity, $cart_qty);
    }
}