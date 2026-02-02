<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;

use ClypperTechnology\RolePricing\RegistrationForm;
use ClypperTechnology\RolePricing\Rules;
use ClypperTechnology\RolePricing\Users;

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

        new RegistrationForm();
        new Rules();
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
	 * Add scripts and style - React only (legacy jQuery removed)
	 *
	 * @param var $hook object.
	 */
	public static function rrb2b_header_scripts( $hook ) {

		if ( 'woocommerce_page_rrb2b' !== $hook ) {
			return;
		}

		// Load bundle based on active tab
		$tab = isset($_GET['tab']) ? sanitize_text_field($_GET['tab']) : 'rules';
		$bundle_name = $tab; // 'rules' or 'roles'
		$asset_file = plugin_dir_path(__FILE__) . "../assets/admin/build/{$bundle_name}.asset.php";

		if (!file_exists($asset_file)) {
			error_log("RRB2B: React bundle not found: {$bundle_name}");
			return;
		}

		// Enqueue WordPress core React dependencies
		wp_enqueue_script('wp-element');
		wp_enqueue_script('wp-components');
		wp_enqueue_script('wp-data');
		wp_enqueue_script('wp-api-fetch');
		wp_enqueue_script('wp-notices');
		wp_enqueue_style('wp-components');

		// Enqueue unified roles bundle (contains all functionality)
		$asset = require($asset_file);
		wp_enqueue_script(
			"rrb2b-{$bundle_name}",
			plugins_url("../assets/admin/build/{$bundle_name}.js", __FILE__),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		// Pass data to React
		wp_localize_script("rrb2b-{$bundle_name}", 'rrb2bData', array(
			'restUrl' => rest_url('rrb2b/v1'),
			'nonce' => wp_create_nonce('wp_rest'),
			'translations' => array(
				'delete_role_txt'     => __( 'You are about to delete the role: ', 'clypper-role-pricing' ),
				'delete_role_confirm' => __( ', are you sure?', 'clypper-role-pricing' ),
				'filter_by_role'      => __( 'Filter by Role', 'clypper-role-pricing' ),
				'select_role'         => __( 'Select Role', 'clypper-role-pricing' ),
				'rule_to_copy'        => __( 'Rule to Copy', 'clypper-role-pricing' ),
				'rule_destination'    => __( 'Rule Destination(s)', 'clypper-role-pricing' ),
				'add_cat_products'    => __( 'Add Category Products', 'clypper-role-pricing' ),
				'select_coupon'       => __( 'Select Coupon', 'clypper-role-pricing' ),
				'add_categories'      => __( 'Categories to Add', 'clypper-role-pricing' ),
				'select_categories'   => __( 'Select Categories', 'clypper-role-pricing' ),
			),
		));

		// Styles
		wp_register_style( 'woocommerce_admin', plugins_url( '../plugins/woocommerce/assets/css/admin.css' ), array(), '1.12.1' );
		wp_enqueue_style( 'woocommerce_admin' );

		wp_register_style( 'fonta', 'https://use.fontawesome.com/releases/v6.4.2/css/all.css', array(), '6.4.2' );
		wp_enqueue_style( 'fonta' );

		wp_register_style( 'rrb2b_css', plugins_url( '../assets/css/rrb2b.css', __FILE__ ), array(), CAS_ROLES_RULES_VS );
		wp_enqueue_style( 'rrb2b_css' );

		wp_register_style( 'rrb2b_dark_css', plugins_url( '../assets/css/rrb2b-dark.css', __FILE__ ), array(), CAS_ROLES_RULES_VS );
		wp_enqueue_style( 'rrb2b_dark_css' );

	}
	

	/**
	 * Create posttype
	 */
	public static function rrb2b_create_posttype() {
	
		register_post_type( 'rrb2b',
			array(
				'labels' => array(
					'name'                => _x( 'Rules', 'Post Type General Name', 'clypper-role-pricing' ),
					'singular_name'       => _x( 'Rule', 'Post Type Singular Name', 'clypper-role-pricing' ),
					'menu_name'           => __( 'Rules', 'clypper-role-pricing' ),
					'parent_item_colon'   => __( 'Parent Rule', 'clypper-role-pricing' ),
					'all_items'           => __( 'All Rules', 'clypper-role-pricing' ),
					'view_item'           => __( 'View Rule', 'clypper-role-pricing' ),
					'add_new_item'        => __( 'Add New Rule', 'clypper-role-pricing' ),
					'add_new'             => __( 'Add New', 'clypper-role-pricing' ),
					'edit_item'           => __( 'Edit Rule', 'clypper-role-pricing' ),
					'update_item'         => __( 'Update Rule', 'clypper-role-pricing' ),
					'search_items'        => __( 'Search Rule', 'clypper-role-pricing' ),
					'not_found'           => __( 'Not Found', 'clypper-role-pricing' ),
					'not_found_in_trash'  => __( 'Not found in Trash', 'clypper-role-pricing' ),
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



