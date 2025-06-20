<?php

namespace ClypperTechnology\RolePricing\Rules;

defined('ABSPATH') || exit;

class CategoryRule {
    public function __construct(
        public int $id,
        public string $slug,
        public string $name,
        public bool $active = false,
        public string $adjust_type = '',
        public string $adjust_value = '',
        public string $adjust_type_qty = '',
        public string $adjust_value_qty = '',
        public int $min_qty = 0,
    ) {}

    /**
     * Create CategoryRule from array data (form submission)
     */
    public static function fromArray(array $data): self {
        return new self(
            id: (int)sanitize_text_field($data['id']),
            slug: sanitize_text_field($data['slug']),
            name: sanitize_text_field($data['name']),
            active: (bool)($data['active'] ?? true),
            adjust_type: sanitize_text_field($data['reduce_type'] ?? ''),
            adjust_value: sanitize_text_field($data['reduce_value'] ?? ''),
            adjust_type_qty: sanitize_text_field($data['reduce_type_qty'] ?? ''),
            adjust_value_qty: sanitize_text_field($data['reduce_value_qty'] ?? ''),
            min_qty: (int)sanitize_text_field($data['min_qty'] ?? 0),
        );
    }

    /**
     * Create CategoryRule from WordPress term
     */
    public static function fromTerm(\WP_Term $term): self {
        return new self(
            id: $term->term_id,
            slug: $term->slug,
            name: $term->name
        );
    }

    /**
     * Convert to array for storage
     */
    public function toArray(): array {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => esc_attr($this->name),
            'active' => $this->active,
            'adjust_type' => $this->adjust_type,
            'adjust_value' => $this->adjust_value,
            'adjust_type_qty' => $this->adjust_type_qty,
            'adjust_value_qty' => $this->adjust_value_qty,
            'min_qty' => $this->min_qty,
        ];
    }

    /**
     * Check if category rule is active
     */
    public function isActive(): bool {
        return $this->active;
    }

    /**
     * Check if category is marked as on sale
     */
    public function isOnSale(): bool {
        return $this->on_sale;
    }

    /**
     * Check if category has quantity-based pricing
     */
    public function hasQuantityPricing(): bool {
        return !empty($this->adjust_value_qty) && $this->min_qty > 0;
    }

    /**
     * Check if category has regular pricing
     */
    public function hasRegularPricing(): bool {
        return !empty($this->adjust_value);
    }

    /**
     * Check if category has any pricing configured
     */
    public function hasPricing(): bool {
        return $this->hasRegularPricing() || $this->hasQuantityPricing();
    }

    /**
     * Activate this category rule
     */
    public function activate(): void {
        $this->active = true;
    }

    /**
     * Deactivate this category rule
     */
    public function deactivate(): void {
        $this->active = false;
    }

    /**
     * Mark category as on sale
     */
    public function markOnSale(): void {
        $this->on_sale = true;
    }

    /**
     * Remove from sale
     */
    public function removeFromSale(): void {
        $this->on_sale = false;
    }

    /**
     * Hide this category
     */
    public function hide(): void {
        $this->hidden = true;
    }

    /**
     * Show this category
     */
    public function show(): void {
        $this->hidden = false;
    }

    /**
     * Update regular pricing
     */
    public function updatePricing(string $type, string $value): void {
        $this->adjust_type = $type;
        $this->adjust_value = $value;
        $this->active = !empty($value); // Auto-activate if pricing is set
    }

    /**
     * Update quantity-based pricing
     */
    public function updateQuantityPricing(string $type, string $value, int $min_qty): void {
        $this->adjust_type_qty = $type;
        $this->adjust_value_qty = $value;
        $this->min_qty = $min_qty;
    }

    /**
     * Clear all pricing (deactivates)
     */
    public function clearPricing(): void {
        $this->adjust_type = '';
        $this->adjust_value = '';
        $this->adjust_type_qty = '';
        $this->adjust_value_qty = '';
        $this->min_qty = 0;
        $this->active = false;
    }

    /**
     * Get display name for admin
     */
    public function getDisplayName(): string {
        return esc_html($this->name);
    }

    /**
     * Get category URL slug
     */
    public function getSlug(): string {
        return $this->slug;
    }
}