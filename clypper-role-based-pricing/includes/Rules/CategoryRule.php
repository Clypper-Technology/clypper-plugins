<?php

namespace ClypperTechnology\RolePricing\Rules;

defined('ABSPATH') || exit;

class CategoryRule {
    public function __construct(
        public int    $id,
        public string $slug,
        public string $name,
        public Rule   $rule = new Rule('', '', '', ''),
        public int    $min_quantity = 0,
    ) {}

    /**
     * Create CategoryRule from array data (form submission)
     */
    public static function from_array(array $data): self {
        return new self(
            id: (int)sanitize_text_field($data['id']),
            slug: sanitize_text_field($data['slug']),
            name: sanitize_text_field($data['name']),
            rule: Rule::from_array( $data['rule'] ?? $data ),
            min_quantity: (int)sanitize_text_field($data['min_qty'] ?? 0),
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
            'min_qty' => $this->min_quantity,
        ];
    }

    public static function schema(): array
    {
        return [
            'type'       => 'object',
            'properties' => [
                'id'     => [ 'required' => true, 'type' => 'integer' ],
                'slug'   => [ 'required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ],
                'name'   => [ 'required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ],
                'remove' => [ 'type' => 'boolean', 'default' => false ],
                'min_qty'=> [ 'type' => 'integer', 'default' => 0 ],
                'rule'   => Rule::schema(),
            ],
        ];
    }
}