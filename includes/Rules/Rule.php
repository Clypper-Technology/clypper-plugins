<?php

namespace ClypperTechnology\RolePricing\Rules;

class Rule
{
    public string $type;
    public string $value;
    public string $quantity_value;
    public string $quantity_value_type;

    public const string TYPE_PERCENT = 'percent';
    public const string TYPE_PERCENT_ADD = 'percent_add';
    public const string TYPE_FIXED = 'fixed';
    public const string TYPE_FIXED_ADD = 'fixed_add';
    public const string TYPE_FIXED_SET = 'fixed_set';

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
        if( ! isset( $this->value ) || $this->value <= 0) {
            return false;
        }

        return true;
    }

    public function has_quantity_value(): bool {
        if( ! isset( $this->quantity_value ) || $this->quantity_value <= 0) {
            return false;
        }

        return true;
    }

    /**
     * Calculate adjusted price based on rule type and value
     *
     * @param float $original_price The original price to adjust
     * @param bool $use_quantity_rule Whether to use quantity-based rule instead of regular rule
     * @return float The adjusted price
     */
    public function calculatePrice(float $original_price, bool $use_quantity_rule = false): float {
        $rule_type = $use_quantity_rule ? $this->quantity_value_type : $this->type;
        $rule_value = $use_quantity_rule ? $this->quantity_value : $this->value;

        // Return original price if no rule value is set
        if (empty($rule_value)) {
            return $original_price;
        }

        $adjust_value = floatval($rule_value);

        return match ($rule_type) {
            self::TYPE_PERCENT => $original_price * (1.0 - ($adjust_value / 100)),
            self::TYPE_PERCENT_ADD => $original_price * (1.0 + ($adjust_value / 100)),
            self::TYPE_FIXED => $original_price - $adjust_value,
            self::TYPE_FIXED_ADD => $original_price + $adjust_value,
            self::TYPE_FIXED_SET => $adjust_value,
            default => $original_price
        };
    }

    /**
     * Check if this rule has a regular adjustment
     *
     * @return bool
     */
    public function hasRegularRule(): bool
    {
        return !empty($this->value);
    }

    public static function from_array_old(array $data ): Rule {
        $type = $data['reduce_type'];
        $value = $data['reduce_value'];
        $quantity = $data['reduce_value_qty'];
        $quantity_type = $data['reduce_type_qty'];

        return new Rule(
            type: $type ?? '',
            value: $value ?? '',
            quantity: $quantity ?? '',
            quantity_type: $quantity_type ?? '',
        );
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
            $rule['type'],
            $rule['value'],
            $rule['quantity'],
            $rule['quantity_type']
        );
    }
}