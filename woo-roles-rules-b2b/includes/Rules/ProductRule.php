<?php

namespace ClypperTechnology\RolePricing\Rules;

defined('ABSPATH') || exit;

class ProductRule
{
    public int $id;
    public string $name;
    public Rule $rule;
    public string $min_quantity;

    public function __construct(
        int $id,
        string $name,
        ?Rule $rule = null,
        int $min_qty = 0,
    ) {
        $this->id = $id;
        $this->name = $name;
        $this->rule = $rule ?? new Rule('', '', '', '');
        $this->min_quantity = $min_qty;
    }
    public function to_array(): array {
        return [
            'id' => $this->id,
            'name' => esc_attr($this->name),
            'rule' => $this->rule->to_array(),
            'min_qty' => $this->min_quantity,
        ];
    }

    public static function from_array(array $data): self {
        return new self(
            id: (int)$data['id'],
            name: $data['name'],
            rule: Rule::from_array( $data['rule'] ?? $data ),
            min_qty: (int)($data['min_qty'] ?? 0),
        );
    }
}