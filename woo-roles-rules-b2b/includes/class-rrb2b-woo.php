<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Internal\DataStores\Orders\CustomOrdersTableController;
use ClypperTechnology\RolePricing\AjaxHandler;
use ClypperTechnology\RolePricing\RegistrationForm;
use ClypperTechnology\RolePricing\Admin;
use ClypperTechnology\RolePricing\Users;

require_once __DIR__ . '/class-rrb2b-functions.php';

/**
 * Admin class
 */
class Rrb2b_Woo {

    private AjaxHandler $ajax_handler;

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

		$options = get_option( 'rrb2b_options' );

		//Actions
		if ( is_admin() ) {
			add_action( 'admin_enqueue_scripts', array( __CLASS__, 'rrb2b_header_scripts' ) );
			add_filter( 'woocommerce_get_settings_pages', array( __CLASS__, 'cas_rrb2b_settings' ) );

		}

		//Prevent automatic login on registration
		if ( 'yes' === $options['rrb2b_auth_new_customer'] ) {
			add_filter( 'woocommerce_registration_auth_new_customer', '__return_false' );
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
	 * Add settings
	 */
	public static function cas_rrb2b_settings( $settings ) {

		$settings[] = include_once dirname( __FILE__ ) . '/class-rrb2b-settings.php';
		return $settings;

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
	 * Add meta box for Roles & Rules B2B in Order page
	 */
	public static function rrb2b_register_role_meta_box() {

		$screen = wc_get_container()->get( CustomOrdersTableController::class )->custom_orders_table_usage_is_enabled()
		? wc_get_page_screen_id( 'shop-order' )
		: 'shop_order';

        /*
		add_meta_box(
			'rrb2b-role-prices-meta-box',
			__( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ),
			'Rrb2b_Woo::rrb2b_display_role_meta_box_callback',
			$screen,
			'side',
			'default'
		);
	    */
	}


	/**
	 * Show the meta box for role and recalculate
	 */
	public static function rrb2b_display_role_meta_box_callback( $post ) {
		
		$order        = ( $post instanceof WP_Post ) ? wc_get_order( $post->ID ) : $post;
		$current_role = $order->get_meta( '_rrb2b_user_role', true );

		if ( empty( $current_role ) ) {
			$customer     = get_userdata( $order->get_customer_id() );
			$current_role = ( $customer && $customer->roles ) ? $customer->roles[0] : '';
		}

		?>
		<input type="hidden" id="rrb2b_nonce" name="rrb2b_nonce" value="<?php echo esc_attr( wp_create_nonce( 'rrb2b_nonce_id' ) ); ?>" />
		<div class="options_group">
			<p class="form-field form-field-wide">
				<label for="rrb2b_user_role"><?php esc_html_e( 'Use role prices (for active roles)', 'woo-roles-rules-b2b' ); ?></label>
				<select id="rrb2b_user_role" name="rrb2b_user_role" class="wc-enhanced-select">
					<option value=""><?php esc_html_e( 'Select a role', 'woo-roles-rules-b2b' ); ?></option>
					<?php
					global $wp_roles;
					foreach ( $wp_roles->roles as $role_key => $role ) {
						if ( 'administrator' === $role_key ) {
							continue;
						}
						echo '<option value="' . esc_attr( $role_key ) . '"' . selected( $current_role, $role_key, false ) . '>' . esc_html( $role['name'] ) . '</option>';
					}
					?>
				</select>
			</p>
			<p class="form-field form-field-wide">
				<button type="button" class="button button-primary" id="rrb2b_recalculate_button"><?php esc_html_e( 'Recalculate Prices', 'woo-roles-rules-b2b' ); ?></button>
			</p>
			<strong id="rrb2b-toggle-instructions"><?php esc_html_e( 'Instructions', 'woo-roles-rules-b2b' ); ?> (<?php esc_html_e( 'Click to show', 'woo-roles-rules-b2b' ); ?>)</strong> <br/>
			<p id="rrb2b-toggle-info" style="font-size:smaller;display:none;">
				<?php esc_html_e( 'Save the order after adding items. Any changes in order items needs to be saved before recalculate.', 'woo-roles-rules-b2b' ); ?>
				<?php esc_html_e( 'Click Recalculate Prices to update the prices and totals.', 'woo-roles-rules-b2b' ); ?>
			</p>
			<p id="rrb2b-price-update-msg" style="color:red;"></p>
		</div>
		<?php
	}

	/**
	 * Footer scripts
	 */
	public static function rrb2b_admin_order_scripts() {
		?>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				
				// Listen for changes in the user selection
				$("select[name='customer_user']").change(function() {
					var userId    = $(this).val();
					var nonce_val = $('#rrb2b_nonce').val();
	
					if (userId) {
						$.ajax({
							url: ajaxurl,
							method: 'POST',
							data: {
								action: 'rrb2b_get_user_role',
								user_id: userId,
								nonce: nonce_val
							},
							success: function(response) {
								if (response.data.role) {
									// Update the role dropdown with the user's role
									$('#rrb2b_user_role').val(response.data.role).trigger('change');
								}
							},
							error: function( response ){
								console.log( response );
							}
						});
					}
				});
	
				// Update prices when the role changes
				$('#rrb2b_user_role').change(function() {
					var selectedRole = $(this).val();
					// Trigger WooCommerce's recalculation of order totals
					$(document.body).trigger('wc_order_totals_before_calculate_taxes');
					$(document.body).trigger('wc_order_totals_after_calculate_taxes');
				});

				$('#rrb2b-toggle-instructions').on('click', function() {
					$('#rrb2b-toggle-info').toggle();
				});

				$('#rrb2b_recalculate_button').on('click', function() {
						var role    = $('#rrb2b_user_role').val();
						var nonce   = $('#rrb2b_nonce').val();
						var orderId = woocommerce_admin_meta_boxes.post_id; // Use WooCommerce global object to get the current order ID

						if (!role) {
							alert('Please select a role to recalculate prices.');
							return;
						}

						$.ajax({
							url: ajaxurl,
							type: 'POST',
							data: {
								action: 'rrb2b_recalculate_prices',
								order_id: orderId,
								role: role,
								nonce: nonce
							},
							success: function(response) {
								if (response.success) {
									$('#rrb2b-price-update-msg').text('Prices Calculated And Saved!');
									location.reload(); // Refresh the page to show updated prices
								} else {
									$('#rrb2b-price-update-msg').text('Failed to recalculate prices: ' + response.data.message);
								}
							},
							error: function() {
								console.log('AJAX request failed.');
							}
						});
					});
				});
		</script>
		<?php
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

		if ( 'true' === CAS_ROLES_RULES_PROD ) {
			wp_register_script( 'rrb2b_scripts', plugins_url( '../assets/js/rrb2b.min.js', __FILE__ ), array( 'jquery' ), CAS_ROLES_RULES_VS, true );
		} else {
			wp_register_script( 'rrb2b_scripts', plugins_url( '../assets/js/rrb2b.js', __FILE__ ), array( 'jquery' ), CAS_ROLES_RULES_VS, true );
		}

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

		$options = get_option( 'rrb2b_options' );

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
			'use_dark_mode'       => ! empty( $options[ 'rrb2b_use_dark_mode' ] ) ? $options[ 'rrb2b_use_dark_mode' ] : 'no',
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



