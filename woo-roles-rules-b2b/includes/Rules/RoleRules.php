<?php

namespace ClypperTechnology\RolePricing\Rules;

defined('ABSPATH') || exit;

/**
 * RoleRules - Complete pricing rules for a user role
 */
class RoleRules {
    public const string GUEST_ROLE = 'guest';

    /**
     * @param int[] $categories;
     * @param ProductRule[] $products
     * @param CategoryRule[] $single_categories
     */
    public function __construct(
        public int $id,
        public string $role_name,
        public bool $rule_active = false,
        public ?Rule $global_rule = null,
        public ?Rule $category_rule = null,
        public array $categories = [],           // General category mappings [['123' => '123']]
        public array $products = [],             // ProductRule[]
        public array $single_categories = []     // CategoryRule[]
    ) {}



    /**
     * Create RoleRules from WordPress post
     */
    public static function from_post(\WP_Post $post): self {
        $content = json_decode($post->post_content, true) ?: [];

        return new self(
            id: $post->ID,
            role_name: $post->post_title,
            rule_active: ($content['rule_active'] ?? '') === 'on',
            global_rule: isset($content['global_rule']) ? Rule::from_array($content['global_rule']) : null,
            category_rule: isset($content['category_rule']) ? Rule::from_array($content['category_rule']) : null,
            categories: array_Map(fn($id) => intval($id), $content['categories'] ?? []),
            products: array_map(fn($p) => ProductRule::from_array($p), $content['products'] ?? []),
            single_categories: array_map(fn($c) => CategoryRule::from_array($c), $content['single_categories'] ?? [])
        );
    }


    /**
     * Convert to array for storage (matches your exact structure)
     */
    public function to_array(): array {
        return [
            'id' => $this->id,
            'rule_active' => $this->rule_active ? 'on' : '',
            'global_rule' => $this->global_rule?->to_array(),
            'category_rule' => $this->category_rule?->to_array(),
            'categories' => $this->categories,
            'products' => array_map(fn($p) => $p->to_array(), $this->products),
            'single_categories' => array_map(fn($c) => $c->to_array(), $this->single_categories),
        ];
    }

    /**
     * Get product rules by product ID
     * @return ?ProductRule
     * @param int $product_id
     */
    public function get_rule_by_product_id( int $product_id ): ?ProductRule {
        return array_find( $this->products, function( ProductRule $product_rule ) use ( $product_id ) {
            return $product_rule->id === $product_id;
        });
    }

    public function add_product(ProductRule $product): void {
        $this->products[] = $product;
    }

    public function replace_products(array $products): void {
        $this->products = $products;
    }

    public function add_categories(array $categories): void
    {
        $this->categories= array_merge($this->categories, $categories);
    }

    public function replace_categories(array $categories): void {
        $this->categories = $categories;
    }

    public function add_category(CategoryRule $category): void {
        $this->categories[] = $category;
    }

    public function replace_single_categories(array $categories): void {
        $this->single_categories = $categories;
    }

    public function add_single_categories(array $categories): void
    {
        $this->single_categories= array_merge($this->single_categories, $categories);
    }

    public function add_single_category(CategoryRule $category): void {
        $this->single_categories[] = $category;
    }

    public function is_guest(): bool {
        return $this->role_name === self::GUEST_ROLE;
    }

    public function has_products(): bool {
        return ! empty( $this->products );
    }

    public function has_categories(): bool {
        return ! empty( $this->categories );
    }

    public function has_single_categories(): bool {
        return ! empty( $this->single_categories );
    }

    public function has_category_rule(): bool {
        return $this->category_rule && $this->category_rule->has_value();
    }

    public function has_global_rule(): bool {
        return $this->global_rule && $this->global_rule->has_value();
    }

    /**
     * @param int[] $category_ids
     * @return ?CategoryRule
     */
    public function get_single_category_rule( array $category_ids ): ?CategoryRule {
        return array_find($this->single_categories, fn($category) => in_array($category->id, $category_ids, true));

    }

    /**
     * @param int[] $category_ids
     * @return bool
     */
    public function matches_any_category( array $category_ids ): bool {
        return ! empty(array_intersect($category_ids, $this->categories));
    }
}