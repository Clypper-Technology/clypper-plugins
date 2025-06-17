<?php

namespace ClypperTechnology\RolePricing\Rules;

defined('ABSPATH') || exit;

/**
 * RoleRules - Complete pricing rules for a user role
 */
class RoleRules {
    public function __construct(
        public int $id,
        public string $role_name,
        public bool $rule_active = false,
        public string $reduce_regular_type = '',
        public string $reduce_regular_value = '',
        public string $reduce_categories_value = '',
        public string $reduce_sale_type = '',
        public string $reduce_sale_value = '',
        public string $coupon = '',
        public array $categories = [],           // General category mappings [['123' => '123']]
        public array $products = [],             // ProductRule[]
        public array $single_categories = []     // CategoryRule[]
    ) {}

    /**
     * Create RoleRules from WordPress post
     */
    public static function fromPost(\WP_Post $post): self {
        $content = json_decode($post->post_content, true) ?: [];

        return new self(
            id: $post->ID,
            role_name: $post->post_title,
            rule_active: ($content['rule_active'] ?? '') === 'on',
            reduce_regular_type: $content['reduce_regular_type'] ?? '',
            reduce_regular_value: $content['reduce_regular_value'] ?? '',
            reduce_categories_value: $content['reduce_categories_value'] ?? '',
            reduce_sale_type: $content['reduce_sale_type'] ?? '',
            reduce_sale_value: $content['reduce_sale_value'] ?? '',
            coupon: $content['coupon'] ?? '',
            categories: $content['categories'] ?? [],
            products: array_map(fn($p) => ProductRule::fromArray($p), $content['products'] ?? []),
            single_categories: array_map(fn($c) => CategoryRule::fromArray($c), $content['single_categories'] ?? [])
        );
    }

    /**
     * Create empty RoleRules for new role
     */
    public static function createForRole(string $role_name): self {
        return new self(
            id: 0,
            role_name: $role_name
        );
    }

    /**
     * Convert to array for storage (matches your exact structure)
     */
    public function toArray(): array {
        return [
            'id' => $this->id,
            'rule_active' => $this->rule_active ? 'on' : '',
            'reduce_regular_type' => $this->reduce_regular_type,
            'reduce_regular_value' => $this->reduce_regular_value,
            'reduce_categories_value' => $this->reduce_categories_value,
            'reduce_sale_type' => $this->reduce_sale_type,
            'reduce_sale_value' => $this->reduce_sale_value,
            'coupon' => $this->coupon,
            'categories' => $this->categories,
            'products' => array_map(fn($p) => $p->toArray(), $this->products),
            'single_categories' => array_map(fn($c) => $c->toArray(), $this->single_categories),
        ];
    }

    public function add_product(ProductRule $product): void {
        $this->products[] = $product;
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

    public function add_single_categories(array $categories): void
    {
        $this->single_categories= array_merge($this->categories, $categories);
    }

    public function add_single_category(CategoryRule $category): void {
        $this->single_categories[] = $category;
    }

    public function activate(): void {
        $this->rule_active = true;
    }

    public function deactivate(): void {
        $this->rule_active = false;
    }

    public function hasGlobalDiscount(): bool {
        return !empty($this->reduce_regular_value);
    }

    public function hasCategoryDiscount(): bool {
        return !empty($this->reduce_categories_value);
    }

    public function hasSaleDiscount(): bool {
        return !empty($this->reduce_sale_value);
    }
}