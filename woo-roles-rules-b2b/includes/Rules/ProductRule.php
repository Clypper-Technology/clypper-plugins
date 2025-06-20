<?php

namespace ClypperTechnology\RolePricing\Rules;

defined('ABSPATH') || exit;

class ProductRule
{
    public function __construct(
        public int $id,
        public string $name,
        public bool $active = false,
        public string $adjust_type = '',
        public string $adjust_value = '',
        public string $adjust_type_qty = '',
        public string $adjust_value_qty = '',
        public int $min_qty = 0,
    ) {}

    public function toArray(): array {
        return [
            'id' => $this->id,
            'name' => esc_attr($this->name),
            'active' => $this->active,
            'adjust_type' => $this->adjust_type,
            'adjust_value' => $this->adjust_value,
            'adjust_type_qty' => $this->adjust_type_qty,
            'adjust_value_qty' => $this->adjust_value_qty,
            'min_qty' => $this->min_qty,
        ];
    }

    public static function fromArray(array $data): self {
        return new self(
            id: (int)$data['id'],
            name: $data['name'],
            active: (bool)($data['active'] ?? false),
            adjust_type: $data['adjust_type'] ?? '',
            adjust_value: $data['adjust_value'] ?? '',
            adjust_type_qty: $data['adjust_type_qty'] ?? '',
            adjust_value_qty: $data['adjust_value_qty'] ?? '',
            min_qty: (int)($data['min_qty'] ?? 0),
        );
    }

    /**
     * Check if this product rule is active
     */
    public function isActive(): bool {
        return $this->active;
    }

    /**
     * Check if this product rule has quantity-based pricing
     */
    public function hasQuantityPricing(): bool {
        return ! empty( $this->adjust_value_qty ) && $this->min_qty > 0;
    }

    /**
     * Check if this product rule has regular pricing
     */
    public function hasRegularPricing(): bool {
        return ! empty( $this->adjust_value );
    }
}