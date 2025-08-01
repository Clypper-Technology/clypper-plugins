<?php

namespace ClypperTechnology\RolePricing\Rules;

use WP_Term;

defined('ABSPATH') || exit;

class CategoryRule {
    public function __construct(
        public int $id,
        public string $slug,
        public string $name,
        public Rule $rule = new Rule('', '', '', ''),
        public int $min_qty = 0,
    ) {}

    /**
     * Create CategoryRule from array data (form submission)
     */
    public static function from_array(array $data): self {
        return new self(
            id: (int)sanitize_text_field($data['id']),
            slug: sanitize_text_field($data['slug']),
            name: sanitize_text_field($data['name']),
            rule: Rule::from_array( $data['rule'] ),
            min_qty: (int)sanitize_text_field($data['min_qty'] ?? 0),
        );
    }

    public static function from_array_old(array $data): self {
        return new self(
            id: (int)sanitize_text_field($data['id']),
            slug: sanitize_text_field($data['slug']),
            name: sanitize_text_field($data['name']),
            rule: Rule::from_array_old( $data ),
            min_qty: (int)sanitize_text_field($data['min_qty'] ?? 0),
        );
    }

    /**
     * Create CategoryRule from WordPress term
     */
    public static function fromTerm(WP_Term $term): self {
        return new self(
            id: $term->term_id,
            slug: $term->slug,
            name: $term->name,
            rule: new Rule(
                type: '',
                value: '',
                quantity: '',
                quantity_type:'',
            )
        );
    }

    /**
     * Convert to array for storage
     */
    public function to_array(): array {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => esc_attr($this->name),
            'rule' => $this->rule->to_array(),
            'min_qty' => $this->min_qty,
        ];
    }
}