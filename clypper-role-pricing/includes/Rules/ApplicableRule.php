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

    public function quantityReductionMessage(): ?string {
        if( ! $this->rule->has_quantity_value() && $this->min_quantity > 0) {
            return null;
        }

        return match($this->rule->quantity_value_type) {
            'percent' => "Køb {$this->min_quantity}+ og spar {$this->rule->quantity_value}%",
            'fixed' => "Køb {$this->min_quantity}+ og spar " . wc_price($this->rule->quantity_value) . " pr. stk.",
            'fixed_set' => "{$this->min_quantity} for " . wc_price($this->rule->quantity_value) . " pr. stk.",
            default => null
        };
    }


}