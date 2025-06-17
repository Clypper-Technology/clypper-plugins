<?php

namespace ClypperTechnology\RolePricing\Services;

use ClypperTechnology\RolePricing\Rules\CategoryRule;
use ClypperTechnology\RolePricing\Rules\ProductRule;
use ClypperTechnology\RolePricing\Rules\RoleRules;
use InvalidArgumentException;
use RuntimeException;
use WP_Post;

defined( 'ABSPATH' ) || exit;

class RuleService {

    public function __construct()
    {

    }


    /**
     * Add rules for single categories
     */
    public function add_categories_to_rule($cat_list, $rule ): bool {
        $role_rules = $this->get_role_rules( $rule );

        foreach ( $cat_list as $slug_name ) {
            $cat = get_term_by( 'slug', $slug_name, 'product_cat' );
            $category_rule = new CategoryRule($cat->term_id, $slug_name, esc_attr__( $cat->name ));
            $role_rules->add_single_category($category_rule);
        }

        $this->save_role_rules($role_rules);

        return true;
    }

    /**
     * @return WP_Post[]
     */
    public function get_all_rules(): array {
        return get_posts([
            'post_type'   => 'rrb2b',
            'numberposts' => -1,
            'orderby'     => 'title',
            'order'       => 'ASC',
            'post_status' => 'any'
        ]);
    }

    /**
     * Update single category rules
     */
    public function update_category_rule($data): bool {
        $rule_id = intval($data['rule_id']);
        $role_rules = $this->get_role_rules($rule_id);

        if (!$role_rules) {
            return false;
        }

        $role_rules->single_categories = [];
        $_single_categories = $data['rows'] ?? [];

        foreach ($_single_categories as $item) {
            $remove = sanitize_text_field($item['remove']);

            if ('false' === $remove) {
                $category_rule = CategoryRule::fromArray( $data );

                $role_rules->single_categories[] = $category_rule;
            }
        }

        return $this->save_role_rules($role_rules);
    }


    public function update_product_rule($data): bool {
        $rule_id = intval($data['rule_id']);
        $role_rules = $this->get_role_rules($rule_id);

        if (!$role_rules) {
            return false;
        }

        $role_rules->products = [];
        $_products = $data['rows'] ?? [];

        foreach ($_products as $item) {
            $remove = sanitize_text_field($item['remove']);

            if ('false' === $remove) {
                $product_rule = new ProductRule(
                    (int)sanitize_text_field($item['product_id']),
                    sanitize_text_field($item['product_name']),
                    !empty($item['reduce_value']),
                    sanitize_text_field($item['reduce_type']),
                    sanitize_text_field($item['reduce_value']),
                    sanitize_text_field($item['reduce_type_qty']),
                    sanitize_text_field($item['reduce_value_qty']),
                    (int)sanitize_text_field($item['min_qty']),
                );

                $role_rules->products[] = $product_rule;
            }
        }

        return $this->save_role_rules($role_rules);
    }

    /**
     * Delete rule
     */
    public function delete_rule( string $id ): void {
        wp_delete_post( $id, true );
    }

    /**
     * Copy rules from one role to multiple roles
     */
    public function copy_rules($data): bool {
        $type = $data['type'];
        $from_id = intval($data['from']);
        $to_ids = !empty($data['to']) ? array_map('intval', explode(',', $data['to'])) : [];

        if (empty($from_id)) {
            return false;
        }

        // Get source rule
        $from_role_rules = $this->get_role_rules($from_id);
        if (!$from_role_rules) {
            return false;
        }

        $success_count = 0;

        foreach ($to_ids as $to_id) {
            $to_role_rules = $this->get_role_rules($to_id);
            if (!$to_role_rules) {
                continue;
            }

            if ('category' === $type) {
                $to_role_rules->single_categories = $from_role_rules->single_categories;
            } else {
                $to_role_rules->products = $from_role_rules->products;
            }

            if ($this->save_role_rules($to_role_rules)) {
                $success_count++;
            }
        }

        return $success_count > 0;
    }

    /**
     * Add rule
     *
     * @param string $name rule name.
     * @return int Rule ID on success
     * @throws InvalidArgumentException If rule already exists
     * @throws RuntimeException If creation fails
     */
    public function add_rule(string $name): int {
        if (post_exists($name, '', '', 'rrb2b')) {
            throw new InvalidArgumentException("Rule '{$name}' already exists");
        }

        $rule = [
            'post_title'   => $name,
            'post_content' => '',
            'post_status'  => 'publish',
            'post_type'    => 'rrb2b',
            'post_author'  => get_current_user_id(),
        ];

        $rule_id = wp_insert_post(apply_filters('rrb2b_create_rule', $rule));

        if (!$rule_id || is_wp_error($rule_id)) {
            throw new RuntimeException('Failed to create rule in database');
        }

        return $rule_id;
    }


    /**
     * Update rule settings (global pricing and general categories)
     *
     * @param array $data Form data
     * @return bool Success status
     */
    public function update_rule(array $data): bool {
        $rule_id = intval($data['id']);
        $role_rules = $this->get_role_rules($rule_id);

        if (!$role_rules) {
            return false;
        }

        $role_rules->rule_active = !empty($data['rule_active']);
        $role_rules->reduce_regular_type = $data['reduce_regular_type'] ?? '';
        $role_rules->reduce_regular_value = $data['reduce_regular_value'] ?? '';
        $role_rules->reduce_categories_value = $data['reduce_categories_value'] ?? '';
        $role_rules->reduce_sale_type = $data['reduce_sale_type'] ?? '';
        $role_rules->reduce_sale_value = $data['reduce_sale_value'] ?? '';

        $categories_arr = explode(',', $data['selected_categories']);
        $role_rules->replace_categories(array_map(fn($catId) => [$catId => $catId], $categories_arr));

        return $this->save_role_rules($role_rules);
    }


    /**
     * Add product to rule
     */
    public function add_product_to_rule($id, $name, $rule ): bool {
        $rule_id = intval( $rule );
        $role_rule = $this->get_role_rules($rule_id);

        if( ! $role_rule ) {
            return false;
        }

        $product = new ProductRule($id, $name);

        $role_rule->add_product($product);

        return $this->save_role_rules($role_rule);
    }

    /**
     * Get RoleRules by ID
     */
    public function get_role_rules(int $rule_id): ?RoleRules {
        $post = get_post($rule_id);

        if (!$post || $post->post_type !== 'rrb2b') {
            return null;
        }

        return RoleRules::from_post($post);
    }

    /**
     * Save RoleRules back to database
     */
    public function save_role_rules(RoleRules $role_rules): bool {
        $result = wp_update_post([
            'ID' => $role_rules->id,
            'post_title' => $role_rules->role_name,
            'post_content' => wp_json_encode($role_rules->toArray(), JSON_UNESCAPED_UNICODE),
            'post_author' => get_current_user_id(),
        ], true);

        return !is_wp_error($result);
    }

    /**
     * Get all RoleRules
     *
     * @return RoleRules[]
     */
    public function get_all_role_rules(): array {
        $posts = $this->get_all_rules();
        return array_map(fn($post) => RoleRules::from_post($post), $posts);
    }
}