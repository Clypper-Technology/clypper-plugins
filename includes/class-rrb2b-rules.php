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

        add_filter( 'woocommerce_product_get_price', array( $this, 'rrb2b_get_rule_price' ), 20, 2 );
        add_filter( 'woocommerce_product_variation_get_price', array( $this, 'rrb2b_get_rule_price' ), 20, 2 );
        add_filter( 'woocommerce_get_variation_regular_price', array( $this, 'rrb2b_get_rule_price' ), 10, 4 );

        //Variation
        add_filter( 'woocommerce_variation_prices_price', array( $this, 'rrb2b_get_rule_price_variation' ), 20, 3 );

        //On Sale
        add_filter( 'woocommerce_product_is_on_sale', array( $this, 'rrb2b_product_is_on_sale' ), 25, 2 );

        //Admin and API pricing
        add_filter( 'rrb2b_rule_get_price_api_and_admin', array( $this, 'rrb2b_rule_get_price_admin' ), 10, 5 );
    }


    /**
     * Check if product is on sale
     *
     * @param bool $is_on_sale bool value.
     * @param var $product product.
     */
    public function rrb2b_product_is_on_sale(bool $is_on_sale, $product ): bool {
        if( is_admin() || ! $this->user_has_rule() ) {
            error_log("Exiting early: admin=" . (is_admin() ? 'yes' : 'no') . ", user_in_rule=" . ($this->user_has_rule() ? 'yes' : 'no'));
            return $is_on_sale;
        }

        $regular_price = $product->get_regular_price();
        $role_price = $this->rrb2b_get_rule_price($regular_price, $product);

        return $role_price !== $regular_price;
    }


	/**
	 * Get rule price
	 *
	 * @param int $price price.
	 * @param var $product product.
	 */
	public function rrb2b_get_rule_price( string $price, $product ) : string {
        return $this->get_rule_price( $price, $product );
	}

	/**
	 * Get rule price variation
	 *
	 * @param var $price price.
	 * @param var $product product.
	 */
	public  function rrb2b_get_var_rule_price( $price, $product ) {
        return $this->get_rule_price( $price, $product );
	}

	/**
	 * Get rule price - variation
	 *
	 * @param var $price price.
	 * @param var $variation variation.
	 * @param var $product product.
	 */
	public  function rrb2b_get_rule_price_variation( $price, $variation, $product ) {
        return $this->get_rule_price( $price, $variation );
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
	 * Get price
	 * 
	 * @param var $price current price.
	 * @param var $product current product.
	 */
	private function get_rule_price($price, $product ) {
        if( self::$processing ) {
            return $price;
        }

		if ( ! $this->user_has_rule() || '' === $price || 0 === $price || empty( $price ) ) {
			return $price;
		}

        self::$processing = true;

        try {
            $price_new = ($product->get_sale_price() > 0) ?
                $product->get_regular_price() :
                $product->get_price();

            $cart_qty = $this->get_cart_item_qty($product->get_id());
            $role = $this->get_user_role();
            $rule = $this->get_role_rule($role);

            return $this->role_price($rule, $product, $price_new, $cart_qty);
        } finally {
            self::$processing = false;
        }
	}

    public function role_price(RoleRules $rule, $product, float $price_new, int $cart_qty) : float {
        if ( ! $rule->rule_active ) {
            return $price_new;
        }

        $category_ids = $this->get_category_ids( $product );

        if( is_wp_error($category_ids) ) {
            $category_ids = [];
        }

        //Check for product rules
        if ( $rule->has_products() ) {
            $product_rules = $rule->products_rules_by_id( $product->get_id() );

            foreach ( $product_rules as $product_rule ) {
                // Determine which rule to use based on quantity and availability
                $use_quantity_rule = $cart_qty >= $product_rule->min_quantity && $product_rule->rule->has_quantity_value();

                // Apply quantity rule if conditions are met, otherwise try regular rule
                if ($use_quantity_rule || $product_rule->rule->hasRegularRule()) {
                    return $product_rule->rule->calculatePrice($price_new, $use_quantity_rule);
                }
            }
        }

        //Check for single categories rules
        if ( $rule->has_single_categories() ) {
            $category_rule = $rule->first_single_category_in_rule( $category_ids );

            if($category_rule != null) {
                $use_quantity_rule = $cart_qty >= $category_rule->min_qty && $category_rule->rule->has_quantity_value();

                return $category_rule->rule->calculatePrice($price_new, $use_quantity_rule);
            }
        }

        //Check for general category reductions / increases
        if ($rule->has_categories() && $rule->has_category_rule()) {
            // Check if product is in any selected general categories
            if ( $rule->matches_any_category( $category_ids ) ) {  // Assuming categories becomes [123, 456, 789]
                return $rule->category_rule->calculatePrice($price_new);
            }
        }

        if ( $rule->has_global_rule() ) {
            return $rule->global_rule->calculatePrice($price_new);
        }

        //Do normal reduction / increases
        return $price_new;
    }

	/**
	 * Get price in admin (Edit Order)
	 * 
	 */
	public  function rrb2b_rule_get_price_admin( $price, $product, $qty, $order_role, $is_api_request ) {
		// If it's not an API request, and it's not in the admin, return the original price
		if ( ! $is_api_request && ! is_admin() ) {
            return $price;
		}
		
		$price_new    = ( empty( $price ) ) ? $product->get_regular_price() : $price;
		$cart_qty     = $qty; 
		$role         = $order_role;
		$rules        = $this->get_role_rule( $role );

        return $this->role_price($rules, $product, $price_new, $cart_qty);
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
