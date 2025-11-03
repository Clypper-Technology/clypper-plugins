<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

use ClypperTechnology\RolePricing\Rules\RoleRules;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;


/**
 * Class for rules
 */
class Rrb2b_Rules {

    private array $role_rules;
    private RuleService $rule_service;

    private static bool $processing = false;

    public function __construct()
    {
        $this->role_rules = array();
        $this->rule_service = new RuleService();

        // Price filters - both use same method
        add_filter( 'woocommerce_product_get_price', array( $this, 'get_rule_sale_price' ), 20, 2 );
        add_filter( 'woocommerce_product_variation_get_price', array( $this, 'get_rule_sale_price' ), 20, 2 );

        // Sale price filters
        add_filter( 'woocommerce_product_get_sale_price', array( $this, 'get_rule_sale_price' ), 20, 2 );
        add_filter( 'woocommerce_product_variation_get_sale_price', array( $this, 'get_rule_sale_price' ), 20, 2 );

        // Variation price filters
        add_filter( 'woocommerce_variation_prices_price', array( $this, 'get_rule_sale_price' ), 20, 3 );
        add_filter( 'woocommerce_variation_prices_sale_price', array( $this, 'get_rule_sale_price' ), 20, 3 );

        // On Sale
        add_filter( 'woocommerce_product_is_on_sale', array( $this, 'rrb2b_product_is_on_sale' ), 999, 2 );
    }


    /**
     * Check if product is on sale
     *
     * @param bool $is_on_sale bool value.
     * @param var $product product.
     */
    public function rrb2b_product_is_on_sale(bool $is_on_sale, $product): bool {
        if (is_admin() || self::$processing || !$this->user_has_rule()) {
            return $is_on_sale;
        }

        self::$processing = true;

        try {
            $regular_price = floatval($product->get_regular_price());
            $sale_price = $this->get_rule_sale_price('', $product);

            if (empty($sale_price)) {
                return $is_on_sale;
            }

            return floatval($sale_price) < $regular_price;
        } finally {
            self::$processing = false;
        }
    }


    /**
     * Check if user has a role or is guest frontend
     */
    public function user_has_rule(): bool {
        $role = $this->get_user_role();
        $rule = $this->get_role_rule($role);

        if ($rule == null) {
            return false;
        }

        return $rule->rule_active;
    }

    /**
     * Get user role or 'guest' if user has no role or is not logged in
     *
     * @param WP_User|null $user Optional. User object. Defaults to current user.
     * @return string User role or 'guest'
     */
    private function get_user_role( $user = null ): string {
        if ( ! $user ) {
            $user = wp_get_current_user();
        }

        if ( $user->ID === 0 || empty( $user->roles ) ) {
            return 'guest';
        }

        return $user->roles[0];
    }


    /**
     * Get sale price with role discount
     *
     * @param var $price current price.
     * @param var $product current product.
     */
    public function get_rule_sale_price( $price, $product ) {
        if ( self::$processing || ! $this->user_has_rule() ) {
            return $price;
        }

        self::$processing = true;

        try {
            // Get base price: use WC sale if exists, otherwise regular
            $wc_sale_price = $product->get_sale_price();
            $base_price = !empty($wc_sale_price) ? floatval($wc_sale_price) : floatval($product->get_regular_price());

            $cart_qty = $this->get_cart_item_qty($product->get_id());
            $role = $this->get_user_role();
            $rule = $this->get_role_rule($role);

            if (!$rule) {
                return $price;
            }

            // Apply role discount to the base price
            $calculated_price = $this->role_price($rule, $product, $base_price, $cart_qty);

            // Return calculated price if valid, otherwise return WC sale price if exists, else original
            return $calculated_price !== null ? strval($calculated_price) : (!empty($wc_sale_price) ? $wc_sale_price : $price);
        } finally {
            self::$processing = false;
        }
    }

    public function role_price(RoleRules $rule, $product, float $price_new, int $cart_qty) : ?float {
        if ( ! $rule->rule_active ) {
            return null;
        }

        $category_ids = $this->get_category_ids( $product );

        if( is_wp_error($category_ids) ) {
            $category_ids = [];
        }

        $product_rule = $rule->get_rule_by_product_id( $product->get_id() );

        //Check for product rules
        if ( $product_rule ) {
            $product_price = $product_rule->rule->calculatePrice($price_new, $product_rule->min_quantity, $cart_qty);

            if( $product_price ) {
                return $product_price;
            }
        }

        $category_rule = $rule->get_single_category_rule( $category_ids );

        //Check for single categories rules
        if ( $category_rule ) {
            $category_price = $category_rule->rule->calculatePrice($price_new, $category_rule->min_quantity, $cart_qty);

            if( $category_price ) {
                return $category_price;
            }
        }

        //Check for general category reductions / increases
        if ($rule->has_categories() && $rule->has_category_rule()) {
            // Check if product is in any selected general categories
            if ( $rule->matches_any_category( $category_ids ) ) {
                $global_price = $rule->category_rule->calculatePrice($price_new);

                if($global_price) {
                    return $global_price;
                }
            }
        }

        if ( $rule->has_global_rule() ) {
            $global_price = $rule->global_rule->calculatePrice($price_new);

            if($global_price) {
                return $global_price;
            }
        }

        //Do normal reduction / increases
        return null;
    }


    /**
     * Get cart quantity for a given product.
     */
    private  function get_cart_item_qty(int $product_id ): int {
        $cart = WC()->cart;

        if ( ! $cart ) {
            return 0;
        }

        $quantities = $cart->get_cart_item_quantities();

        return intval( $quantities[ $product_id ] ?? 0);
    }


    /**
     * Get rule for role
     *
     * @param string $user_role user role.
     */
    private function get_role_rule(string $user_role): RoleRules | null {
        if (isset($this->role_rules[$user_role])) {
            return $this->role_rules[$user_role];
        }

        // Get all rules and find by role name
        $rule = $this->rule_service->get_rule_by_user_role( $user_role );

        if( $rule ) {
            $this->role_rules[$user_role] = $rule;
            return $rule;
        }

        return null;
    }


    /**
     * @return int[]
     */
    public function get_category_ids( $product ): array{
        return ('variation' === $product->get_type()) ?
            wc_get_product_term_ids($product->get_parent_id(), 'product_cat') :
            wc_get_product_term_ids($product->get_id(), 'product_cat');
    }
}