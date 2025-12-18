<?php

namespace ClypperTechnology\RolePricing\Rules;

class Rule
{
    public string $type;
    public string $value;
    public string $quantity_value;
    public string $quantity_value_type;

    public const  TYPE_PERCENT = 'percent';
    public const  TYPE_PERCENT_ADD = 'percent_add';
    public const  TYPE_FIXED = 'fixed';
    public const  TYPE_FIXED_ADD = 'fixed_add';
    public const  TYPE_FIXED_SET = 'fixed_set';

    private const  USE_QUANTITY_RULE = 'use_quantity_rule';
    private const  USE_REGULAR_RULE = 'use_regular_rule';
    private const  USE_NO_RULE = 'use_no_rule';

    public function __construct(
        string $type,
        string $value,
        string $quantity,
        string $quantity_type,
    )
    {
        $this->type = $type;
        $this->value = $value;
        $this->quantity_value = $quantity;
        $this->quantity_value_type = $quantity_type;
    }

    public function has_value(): bool {
        return ! empty( $this->value );
    }

    public function has_quantity_value(): bool {
        return ! empty( $this->quantity_value );
    }

    /**
     * Calculate adjusted price based on rule type and value
     *
     * @param float $original_price The original price to adjust
     * @param int $minimum_quantity Minimum quantity required for quantity rule
     * @param int $quantity Current cart quantity
     * @return ?float The adjusted price
     */
    public function calculatePrice(float $original_price, int $minimum_quantity = 0, int $quantity = -1): ?float {
        $use_rule = $this->getApplicableRule($minimum_quantity, $quantity);

        return match( $use_rule ) {
            self::USE_QUANTITY_RULE => $this->applyRule($this->quantity_value_type, $this->quantity_value, $original_price),
            self::USE_REGULAR_RULE => $this->applyRule($this->type, $this->value, $original_price),
            self::USE_NO_RULE => null
        };
    }

    private function applyRule(string $rule_type, string $rule_value, float $original_price): ?float {
        $adjust_value = floatval($rule_value);

        $calculated_price = match ($rule_type) {
            self::TYPE_PERCENT => $original_price * (1.0 - ($adjust_value / 100)),
            self::TYPE_PERCENT_ADD => $original_price * (1.0 + ($adjust_value / 100)),
            self::TYPE_FIXED => $original_price - $adjust_value,
            self::TYPE_FIXED_ADD => $original_price + $adjust_value,
            self::TYPE_FIXED_SET => $adjust_value,
            default => null
        };

        // If calculated price is 0 and it wasn't intentionally set to 0, return original price
        if ($calculated_price <= 0) {
            return null;
        }

        return round($calculated_price, wc_get_price_decimals());
    }

    private function getApplicableRule(int $minimum_quantity, int $quantity): string {
        if($this->has_quantity_value() && $quantity >= $minimum_quantity) {
            return self::USE_QUANTITY_RULE;
        }

        if($this->has_value()) {
            return self::USE_REGULAR_RULE;
        }

        return self::USE_NO_RULE;
    }

    public function to_array() : array {
        return [
            'type' => $this->type,
            'value' => $this->value,
            'quantity' => $this->quantity_value,
            'quantity_type' => $this->quantity_value_type
        ];
    }

    public static function from_array( array $rule ) : Rule {
        return new Rule(
            $rule['type'] ?? "",
            $rule['value'] ?? "",
            $rule['quantity'] ?? "",
            $rule['quantity_type'] ?? ""
        );
    }
}