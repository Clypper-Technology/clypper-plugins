<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;

use ClypperTechnology\RolePricing\AjaxHandler;
use ClypperTechnology\RolePricing\RegistrationForm;
use ClypperTechnology\RolePricing\Users;

require_once __DIR__ . '/class-rrb2b-functions.php';

/**
 * Admin class
 */
class Rrb2b_Woo {

    public function __construct()
    {

    }

    /**
	 * Make admin hooks
	 */
	public static function rrb2b_admin_hooks() {

		if ( ! class_exists( 'WooCommerce' ) ) {
			return;
		}

		//Actions
		if ( is_admin() ) {
			add_action( 'admin_enqueue_scripts', array( __CLASS__, 'rrb2b_header_scripts' ) );
		}

		/**
		 * Hook into the WooCommerce order creation process via API.
		 * Apply role-based pricing for orders created via the API.
		 */
		add_action( 'woocommerce_before_calculate_totals', array( __CLASS__, 'rrb2b_apply_role_based_pricing_to_api_orders' ) );

		//Add roles to orders
		add_action( 'admin_footer', array( __CLASS__, 'rrb2b_admin_order_scripts' ) );

        new AjaxHandler();
        new RegistrationForm();
        new Rrb2b_Rules();
        new Users();
	}


	/**
	 * Init
	 */
	public static function rrb2b_init() {
		
		//Create post type
		if ( ! post_type_exists( 'rrb2b' ) ) {
			self::rrb2b_create_posttype();
		}

	}

	/**
	 * Hook into the WooCommerce order creation process via API.
	 * Apply role-based pricing for orders created via the API.
	 */
	public static function rrb2b_apply_role_based_pricing_to_api_orders( $cart ) {
		
		// Check if this is an API request
		if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			
			// Use WC()->customer to get the customer object properly
			$customer = WC()->customer;

			if ( ! is_object( $customer ) || ! $customer->get_id() ) {
				// Handle cases where the customer object is not yet available
				return;
			}

			// Use the correct WooCommerce methods to get the roles
			$role           = $customer->get_role();
			$is_api_request = true;

			// Loop through cart items and adjust prices based on customer role
			foreach ( $cart->get_cart() as $cart_item_key => $cart_item ) {
				
				// Ensure the cart item is an object before calling methods on it
				if ( is_object( $cart_item['data'] ) ) {

					$product  = $cart_item['data'];
					$quantity = $cart_item['quantity'];

					// Apply role-based pricing
					$new_price = apply_filters( 'rrb2b_rule_get_price_api_and_admin', $product->get_price(), $product, $quantity, $role, $is_api_request );
					
					// Set new price if it's valid 
					if ( false !== $new_price && null !== $new_price ) {
						$cart_item['data']->set_price( $new_price );
					}

				} else {
					// Handle the case where cart item is not a valid product object
					error_log( 'Invalid cart item detected in REST API request.' );
				}
				
			}
		}

	}


	/**
	 * Add scripts and style
	 *
	 * @param var $hook object.
	 */
	public static function rrb2b_header_scripts( $hook ) {

		if ( 'woocommerce_page_rrb2b' !== $hook ) {
			return;
		}

		wp_register_script( 'rrb2b_jquery-ui', 'https://code.jquery.com/ui/1.13.2/jquery-ui.js', array( 'jquery' ), '1.13.2', true );
		wp_enqueue_script( 'rrb2b_jquery-ui' );

        wp_register_script( 'rrb2b_scripts', plugins_url( '../assets/js/rrb2b.js', __FILE__ ), array( 'jquery' ), CAS_ROLES_RULES_VS, true );

		wp_enqueue_script( 'select2' ); // WooCommerce includes this by default in the admin
		wp_enqueue_style( 'select2' );  // WooCommerce includes the styles


		wp_register_style( 'woocommerce_admin', plugins_url( '../plugins/woocommerce/assets/css/admin.css' ), array(), '1.12.1' );
		wp_enqueue_style( 'woocommerce_admin' );

		wp_register_style( 'fonta', 'https://use.fontawesome.com/releases/v6.4.2/css/all.css', array(), '6.4.2' );
		wp_enqueue_style( 'fonta' );

		wp_register_style( 'jquery-ui-css', 'https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css', array(), '1.13.2', 'all' );
		wp_enqueue_style( 'jquery-ui-css' );

		wp_register_style( 'rrb2b_css', plugins_url( '../assets/css/rrb2b.css', __FILE__ ), array(), CAS_ROLES_RULES_VS );
		wp_enqueue_style( 'rrb2b_css' );

		wp_register_style( 'rrb2b_dark_css', plugins_url( '../assets/css/rrb2b-dark.css', __FILE__ ), array(), CAS_ROLES_RULES_VS );
		wp_enqueue_style( 'rrb2b_dark_css' );

		// Localize the script with new data
		$translation = array(
			'delete_role_txt'     => __( 'You are about to delete the role: ', 'woo-roles-rules-b2b' ),
			'delete_role_confirm' => __( ', are you sure?', 'woo-roles-rules-b2b' ),
			'filter_by_role'      => __( 'Filter by Role', 'woo-roles-rules-b2b' ),
			'select_role'         => __( 'Select Role', 'woo-roles-rules-b2b' ),
			'rule_to_copy'        => __( 'Rule to Copy', 'woo-roles-rules-b2b' ),
			'rule_destination'    => __( 'Rule Destination(s)', 'woo-roles-rules-b2b' ),
			'add_cat_products'    => __( 'Add Category Products', 'woo-roles-rules-b2b' ),
			'select_coupon'       => __( 'Select Coupon', 'woo-roles-rules-b2b' ),
			'add_categories'      => __( 'Categories to Add', 'woo-roles-rules-b2b' ),
			'select_categories'   => __( 'Select Categories', 'woo-roles-rules-b2b' ),
		);
		wp_localize_script( 'rrb2b_scripts', 'cyp_object', $translation );
		wp_enqueue_script( 'rrb2b_scripts' );

	}
	

	/**
	 * Create posttype
	 */
	public static function rrb2b_create_posttype() {
	
		register_post_type( 'rrb2b',
			array(
				'labels' => array(
					'name'                => _x( 'Rules', 'Post Type General Name', 'woo-roles-rules-b2b' ),
					'singular_name'       => _x( 'Rule', 'Post Type Singular Name', 'woo-roles-rules-b2b' ),
					'menu_name'           => __( 'Rules', 'woo-roles-rules-b2b' ),
					'parent_item_colon'   => __( 'Parent Rule', 'woo-roles-rules-b2b' ),
					'all_items'           => __( 'All Rules', 'woo-roles-rules-b2b' ),
					'view_item'           => __( 'View Rule', 'woo-roles-rules-b2b' ),
					'add_new_item'        => __( 'Add New Rule', 'woo-roles-rules-b2b' ),
					'add_new'             => __( 'Add New', 'woo-roles-rules-b2b' ),
					'edit_item'           => __( 'Edit Rule', 'woo-roles-rules-b2b' ),
					'update_item'         => __( 'Update Rule', 'woo-roles-rules-b2b' ),
					'search_items'        => __( 'Search Rule', 'woo-roles-rules-b2b' ),
					'not_found'           => __( 'Not Found', 'woo-roles-rules-b2b' ),
					'not_found_in_trash'  => __( 'Not found in Trash', 'woo-roles-rules-b2b' ),
				),
				'public'              => true,
				'publicly_queryable'  => true,
				'exclude_from_search' => true,
				'supports'            => array( 'title', 'editor', 'comments', 'thumbnail', 'custom-fields' ),
				'taxonomies'          => array( '' ),
				'has_archive'         => true,
				'rewrite'             => array( 'slug' => 'rules' ),
				'show_in_rest'        => false,
			)
		);
	}
}
add_action( 'init', array( 'Rrb2b_Woo', 'rrb2b_admin_hooks' ) );



