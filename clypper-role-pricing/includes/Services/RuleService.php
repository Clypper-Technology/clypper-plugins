<?php

namespace ClypperTechnology\RolePricing\Services;

use ClypperTechnology\RolePricing\Rules\CategoryRule;
use ClypperTechnology\RolePricing\Rules\ProductRule;
use ClypperTechnology\RolePricing\Rules\RoleRules;
use ClypperTechnology\RolePricing\Rules\Rule;
use InvalidArgumentException;
use RuntimeException;
use WP_Post;

use function get_posts;
use function get_post;
use function get_term;
use function get_term_by;
use function sanitize_text_field;
use function get_current_user_id;
use function wp_insert_post;
use function apply_filters;
use function is_wp_error;
use function wp_delete_post;
use function wp_update_post;
use function esc_attr__;

defined( 'ABSPATH' ) || exit;

class RuleService {
    private array $role_rules;
    private RoleService $role_service;

    public function __construct()
    {
        $this->role_rules = array();
        $this->role_service = new RoleService();
    }

    /**
     * Get rule for role
     *
     */
    public function get_rule_by_current_role(): RoleRules | null {
        $user_role = $this->role_service->get_user_role();

        return $this->get_rule_by_user_role($user_role);
    }


    /**
     * Add rules for single categories
     */
    public function add_categories_to_rule($cat_list, int $rule_id ): bool {
        $role_rules = $this->get_rules_by_id( $rule_id );
        $new_categories = [];

        foreach ( $cat_list as $slug_name ) {
            $new_category = get_term_by( 'slug', $slug_name, 'product_cat' );
            $new_categories[] = new CategoryRule($new_category->term_id, $slug_name, esc_attr__( $new_category->name ));
        }

        $role_rules->add_single_categories($new_categories);

        return $this->save_role_rules($role_rules);
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
    public function update_category_rule( array $data ): bool {
        $rule_id = intval( $data[ 'rule_id' ] );
        $role_rules = $this->get_rules_by_id( $rule_id );
        $new_categories = $data['rows'] ?? [];
        $categories_to_add = [];

        if ( ! $role_rules ) {
            return false;
        }

        foreach ($new_categories as $item) {
            // Skip if explicitly marked for removal
            $remove = isset($item['remove']) ? sanitize_text_field( $item['remove'] ) : 'false';

            if ( 'false' === $remove || $remove === '' ) {
                // Handle API format (category_id, type, value) vs UI format (id, slug, name, rule)
                if (isset($item['category_id']) && !isset($item['id'])) {
                    // API format - look up category details
                    $term = get_term($item['category_id'], 'product_cat');
                    if ($term && !is_wp_error($term)) {
                        $categories_to_add[] = new CategoryRule(
                            id: $term->term_id,
                            slug: $term->slug,
                            name: $term->name,
                            rule: Rule::from_array($item),
                            min_quantity: (int)($item['min_qty'] ?? 0)
                        );
                    }
                } else {
                    // UI format - use from_array
                    $categories_to_add[] = CategoryRule::from_array( $item );
                }
            }
        }

        $role_rules->replace_single_categories($categories_to_add);
        return $this->save_role_rules($role_rules);
    }


    public function update_product_rule($data): bool {
        $rule_id = intval($data['rule_id']);
        $role_rules = $this->get_rules_by_id($rule_id);
        $new_products = $data['rows'] ?? [];
        $products_to_add = [];

        if (!$role_rules) {
            return false;
        }

        foreach ($new_products as $item) {
            // Skip if explicitly marked for removal
            $remove = isset($item['remove']) ? sanitize_text_field($item['remove']) : 'false';

            if ('false' === $remove || $remove === '') {
                // Handle both formats: flat (from API) or nested (from UI)
                $rule_data = isset($item['rule']) ? $item['rule'] : $item;

                $products_to_add[] = new ProductRule(
                    (int)sanitize_text_field($item['product_id']),
                    sanitize_text_field($item['product_name'] ?? ''),
                    Rule::from_array( $rule_data ),
                    (int)sanitize_text_field($item['min_qty'] ?? 1),
                );
            }
        }

        $role_rules->replace_products($products_to_add);

        return $this->save_role_rules($role_rules);
    }

    /**
     * Delete rule
     */
    /**
     * Delete a rule
     *
     * @param int|string $id Rule ID
     * @throws RuntimeException If deletion fails
     */
    public function delete_rule( $id ): bool {
        $result = wp_delete_post( $id, true );

        if ( ! $result || is_wp_error( $result ) ) {
            throw new RuntimeException( 'Failed to delete rule with ID: ' . $id );
        }

        return true;
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
        $from_role_rules = $this->get_rules_by_id($from_id);
        if (!$from_role_rules) {
            return false;
        }

        $success_count = 0;

        foreach ($to_ids as $to_id) {
            $to_role_rules = $this->get_rules_by_id($to_id);
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
        // Check if rule already exists using get_posts
        $existing = get_posts([
            'post_type'   => 'rrb2b',
            'post_status' => 'any',
            'title'       => $name,
            'numberposts' => 1,
        ]);

        if (!empty($existing)) {
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
        $rule_id = intval( $data[ 'id' ]) ;
        $role_rules = $this->get_rules_by_id( $rule_id );

        if ( ! $role_rules ) {
            return false;
        }

        $role_rules->rule_active = !empty( $data['rule_active'] );

        // Global rule - only update if provided
        if (isset($data['reduce_regular_type']) || isset($data['reduce_regular_value'])) {
            $role_rules->global_rule = new Rule(
                $data['reduce_regular_type'] ?? '',
                $data['reduce_regular_value'] ?? '',
                '',  // Future: could support bulk global discounts
                ''
            );
        }

        // Category rule - only update if provided
        if (isset($data['reduce_categories_type']) || isset($data['reduce_categories_value'])) {
            $role_rules->category_rule = new Rule(
                $data['reduce_categories_type'] ?? 'percent',  // Default assumption
                $data['reduce_categories_value'] ?? '',
                '',  // Future: could support bulk category discounts
                ''
            );
        }

        if (!empty($data['selected_categories'])) {
            $new_categories = explode(',', $data['selected_categories']);
            $role_rules->replace_categories(array_map(fn($catId) => [$catId], $new_categories));
        }

        return $this->save_role_rules($role_rules);
    }


    /**
     * Add product to rule
     */
    public function add_product_to_rule($id, $name, $rule ): bool {
        $rule_id = intval( $rule );
        $role_rule = $this->get_rules_by_id($rule_id);

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
    public function get_rules_by_id(int $rule_id): ?RoleRules {
        $post = get_post($rule_id);

        if (! $post || $post->post_type !== 'rrb2b') {
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
            'post_content' => wp_json_encode($role_rules->to_array(), JSON_UNESCAPED_UNICODE),
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

    public function get_rule_by_user_role( string $user_role): ?RoleRules {
        if (isset($this->role_rules[$user_role])) {
            return $this->role_rules[$user_role];
        }

        $all_rules = $this->get_all_role_rules();
        $rule = array_find($all_rules, fn( RoleRules $rule ) => $rule->role_name === $user_role );

        if( $rule ) {
            $this->role_rules[$user_role] = $rule;
            return $rule;
        }

        return null;
    }
}