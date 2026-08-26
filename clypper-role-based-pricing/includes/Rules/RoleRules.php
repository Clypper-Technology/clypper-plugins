<?php

namespace ClypperTechnology\RolePricing\Rules;

defined('ABSPATH') || exit;

/**
 * RoleRules - Complete pricing rules for a user role
 */
class RoleRules {
    public const GUEST_ROLE = 'guest';

    /**
     * @param int[] $categories;
     * @param ItemRule[] $products
     * @param ItemRule[] $single_categories
     */
    public function __construct(
        public int    $id,
        public string $role_slug,
        public bool   $rule_active = false,
        public ?Rule  $global_rule = null,
        public ?Rule  $category_rule = null,
        public array  $categories = [],           // General category mappings [['123' => '123']]
        public array  $products = [],             // ItemRule[]
        public array  $single_categories = []     // CategoryRule[]
    ) {}

    /**
     * Create RoleRules from WordPress post
     */
    public static function from_post(\WP_Post $post): self {
        $content = json_decode($post->post_content, true) ?: [];

        return new self(
            id: $post->ID,
            role_slug: $post->post_title,
            rule_active: ($content['rule_active'] ?? '') === 'on',
            global_rule: isset($content['global_rule']) ? Rule::from_array($content['global_rule']) : null,
            category_rule: isset($content['category_rule']) ? Rule::from_array($content['category_rule']) : null,
            categories: array_Map(fn($id) => intval($id), $content['categories'] ?? []),
            products: isset($content['products']) ? self::key_by_item_id($content['products']) : [],
            single_categories: isset($content['single_categories']) ? self::key_by_item_id($content['single_categories']) : [],
        );
    }

    public static function from_array(array $json): self {
        return new self(
            id: $json['id'],
            role_slug: $json['role_slug'],
            rule_active: ($json['rule_active']) == 'on',
            global_rule: isset($json['global_rule']) ? Rule::from_array($json['global_rule']) : null,
            category_rule: isset($json['category_rule']) ? Rule::from_array($json['category_rule']) : null,
            categories: array_Map(fn($id) => intval($id), $json['categories']),
            products: isset($json['products']) ? self::key_by_item_id($json['products']) : [],
            single_categories: isset($json['single_categories']) ? self::key_by_item_id($json['single_categories']) : [],
        );
    }


    /**
     * Convert to array for storage (matches your exact structure)
     */
    public function to_array(): array {
        return [
            'id' => $this->id,
            'role_slug' => $this->role_slug,
            'rule_active' => $this->rule_active ? 'on' : '',
            'global_rule' => $this->global_rule?->to_array(),
            'category_rule' => $this->category_rule?->to_array(),
            'categories' => $this->categories,
            'products' => array_map(fn($p) => $p->to_array(), array_values($this->products)),
            'single_categories' => array_map(fn($c) => $c->to_array(), array_values($this->single_categories)),
        ];
    }

    /**
     * @param array
     * @return ItemRule[]
     */
    private static function key_by_item_id(array $items): array {
        if(!$items) {
            return [];
        }

        $item_list = [];

        foreach($items as $item_array) {
            $item = ItemRule::from_array($item_array);

            $item_list[$item->id] = $item;
        }

        return $item_list;
    }

    public function get_rule_count(): int {
        return sizeof($this->products) + sizeof($this->single_categories);
    }

    public function get_applicable_rule( $product_id, array $category_ids ): ?ApplicableRule {
        $product_rule = $this->get_rule_by_product_id( $product_id );

        //Check for product rules
        if ( $product_rule ) {
            return new ApplicableRule(
                $product_rule->rule,
                $product_rule->min_quantity
            );
        }

        $category_rule = $this->get_single_category_rule( $category_ids );


        if ( $category_rule ) {
            return new ApplicableRule(
                $category_rule->rule,
                $category_rule->min_quantity
            );
        }

        //Check for general category reductions / increases
        if ($this->has_categories() && $this->has_category_rule()) {
            // Check if product is in any selected general categories
            if ( $this->matches_any_category( $category_ids ) ) {
                return new ApplicableRule(
                    $this->category_rule
                );
            }
        }

        if ( $this->has_global_rule() ) {
            return new ApplicableRule(
                $this->global_rule
            );
        }

        return null;
    }

    public function add_product(ItemRule $product): void {
        $this->products[$product->id] = $product;
    }

    /**
     * Get product rules by product ID
     * @param int $product_id
     *@return ?ItemRule
     */
    private function get_rule_by_product_id( int $product_id ): ?ItemRule
    {
        return $this->products[$product_id] ?? null;
    }

    private function has_categories(): bool {
        return ! empty( $this->categories );
    }

    private function has_category_rule(): bool {
        return $this->category_rule && $this->category_rule->has_value();
    }

    private function has_global_rule(): bool {
        return $this->global_rule && $this->global_rule->has_value();
    }

    /**
     * @param int[] $category_ids
     * @return ?ItemRule
     */
    private function get_single_category_rule( array $category_ids ): ?ItemRule {
        foreach ($category_ids as $cat_id) {
            if (isset($this->single_categories[$cat_id])) {
                return $this->single_categories[$cat_id];
            }
        }
        return null;
    }

    /**
     * @param int[] $category_ids
     * @return bool
     */
    private function matches_any_category( array $category_ids ): bool {
        return ! empty(array_intersect($category_ids, $this->categories));
    }
}
