<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;

use Automattic\WooCommerce\Internal\DataStores\Orders\CustomOrdersTableController;

require_once __DIR__ . '/class-rrb2b-functions.php';


/**
 * Admin class
 */
class Rrb2b_Woo {


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
			add_action( 'admin_post_rrb2b_create_role', array( __CLASS__, 'rrb2b_create_role' ) );
			add_action( 'admin_post_rrb2b_add_rule', array( __CLASS__, 'rrb2b_add_rule' ) );
			add_action( 'admin_post_rrb2b_update_rule', array( __CLASS__, 'rrb2b_update_rule' ) );
			add_action( 'admin_head', array( __CLASS__, 'rrb2b_add_button_users' ) );
			add_action( 'admin_notices', array( __CLASS__, 'rrb2b_admin_activation_notice_success' ) );
			add_action( 'admin_menu', array( __CLASS__, 'rrb2b_create_admin_menu' ) );
			add_filter( 'woocommerce_get_settings_pages', array( __CLASS__, 'cas_rrb2b_settings' ) );

		}

		//Register form
		add_action( 'woocommerce_register_form_start', array( __CLASS__, 'rrb2b_register_form' ) );
		add_action( 'woocommerce_register_post', array( __CLASS__, 'rrb2b_validate_register_form' ), 10, 3 );
		add_action( 'woocommerce_created_customer', array( __CLASS__, 'rrb2b_save_register_form_data' ) );

		//Prevent automatic login on registration
		if ( 'yes' === $options['rrb2b_auth_new_customer'] ) {
			add_filter( 'woocommerce_registration_auth_new_customer', '__return_false' );
		}

		/**
		 * Hook into the WooCommerce order creation process via API.
		 * Apply role-based pricing for orders created via the API.
		 */
		add_action( 'woocommerce_before_calculate_totals', array( __CLASS__, 'rrb2b_apply_role_based_pricing_to_api_orders' ) );

		//Add metabox 
		add_action( 'add_meta_boxes', array( __CLASS__, 'rrb2b_register_role_meta_box' ) );
		
		//Add roles to orders
		add_action( 'admin_footer', array( __CLASS__, 'rrb2b_admin_order_scripts' ) );
		add_action( 'wp_ajax_rrb2b_get_user_role', array( __CLASS__, 'rrb2b_get_user_role' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_get_user_role', array( __CLASS__, 'rrb2b_get_user_role' ) );
		add_action( 'woocommerce_process_shop_order_meta', array( __CLASS__, 'rrb2b_save_selected_role_on_order' ) );
		add_action( 'wp_ajax_rrb2b_recalculate_prices', array( __CLASS__, 'rrb2b_recalculate_prices_callback' ) );

		//Actions - Ajax
		add_action( 'wp_ajax_rrb2b_delete_rule_callback', array(__CLASS__, 'rrb2b_delete_rule_callback' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_delete_rule_callback', array( __CLASS__, 'rrb2b_delete_rule_callback' ) );
		add_action( 'wp_ajax_rrb2b_ajax_get_products', array( __CLASS__, 'rrb2b_ajax_get_products' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_ajax_get_products', array( __CLASS__, 'rrb2b_ajax_get_products' ) );
		add_action( 'wp_ajax_rrb2b_ajax_update_product_rule', array( __CLASS__, 'rrb2b_ajax_update_product_rule' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_ajax_update_product_rule', array( __CLASS__, 'rrb2b_ajax_update_product_rule' ) );
		add_action( 'wp_ajax_rrb2b_ajax_update_single_category_rule', array( __CLASS__, 'rrb2b_ajax_update_single_category_rule' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_ajax_update_single_category_rule', array( __CLASS__, 'rrb2b_ajax_update_single_category_rule' ) );
		add_action( 'wp_ajax_rrb2b_ajax_get_products_category', array( __CLASS__, 'rrb2b_ajax_get_products_category' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_ajax_get_products_category', array( __CLASS__, 'rrb2b_ajax_get_products_category' ) );
		add_action( 'wp_ajax_rrb2b_delete_role', array( __CLASS__, 'rrb2b_ajax_delete_role' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_delete_role', array( __CLASS__, 'rrb2b_ajax_delete_role' ) );

		//Copy rules to
		add_action( 'wp_ajax_rrb2b_copy_rules_to', array( __CLASS__, 'rrb2b_copy_rules_to_callback' ) );
		add_action( 'wp_ajax_nopriv_rrb2b_copy_rules_to', array( __CLASS__, 'rrb2b_copy_rules_to_callback' ) );

		//Filters
		add_filter( 'admin_footer_text', array( __CLASS__, 'rrb2b_set_footer_text' ) );
		
		//Extra user data from registration form
		add_action( 'show_user_profile', array( __CLASS__, 'rrb2b_show_user_profile' ) );
		add_action( 'edit_user_profile', array( __CLASS__, 'rrb2b_show_user_profile' ) );
		add_action( 'personal_options_update', array( __CLASS__, 'rrb2b_save_user_profile_field' ) );
		add_action( 'edit_user_profile_update', array( __CLASS__, 'rrb2b_save_user_profile_field' ) );
		add_filter( 'gettext', array( __CLASS__, 'rrb2b_change_default_labels' ), 10, 3 );

        // Add CVR column to admin users list
        add_filter( 'manage_users_columns', array( __CLASS__, 'add_cvr_column' ) );
        add_action( 'manage_users_custom_column', array( __CLASS__, 'show_cvr_column_content' ), 10, 3 );

// Add company info to customer account dashboard
        add_action( 'woocommerce_account_dashboard', array( __CLASS__, 'display_company_info_dashboard' ) );

// Add company info to order emails
        add_action( 'woocommerce_email_customer_details', array( __CLASS__, 'add_company_to_emails' ), 15, 4 );

// Add company info to new user admin notification email
        add_filter( 'wp_new_user_notification_email_admin', array( __CLASS__, 'add_company_info_to_admin_email' ), 10, 3 );

        // Add custom fields to admin user edit page
        add_action( 'show_user_profile', array( __CLASS__, 'show_custom_customer_fields' ) );
        add_action( 'edit_user_profile', array( __CLASS__, 'show_custom_customer_fields' ) );
	}

    public static function show_custom_customer_fields( $user ) {
        $company_name = get_user_meta( $user->ID, 'company_name', true );
        $company_cvr = get_user_meta( $user->ID, 'company_cvr', true );
        $company_type = get_user_meta( $user->ID, 'company_type', true );

        // Only show if user has company information
        if ( $company_name || $company_cvr || $company_type ) {
            ?>
            <h3><?php _e( 'B2B Company Information', 'woo-roles-rules-b2b' ); ?></h3>
            <table class="form-table">
                <?php if ( $company_name ) : ?>
                    <tr>
                        <th><label><?php _e( 'Company Name', 'woo-roles-rules-b2b' ); ?></label></th>
                        <td><?php echo esc_html( $company_name ); ?></td>
                    </tr>
                <?php endif; ?>

                <?php if ( $company_cvr ) : ?>
                    <tr>
                        <th><label><?php _e( 'CVR Number', 'woo-roles-rules-b2b' ); ?></label></th>
                        <td><?php echo esc_html( $company_cvr ); ?></td>
                    </tr>
                <?php endif; ?>

                <?php if ( $company_type ) : ?>
                    <tr>
                        <th><label><?php _e( 'Industry', 'woo-roles-rules-b2b' ); ?></label></th>
                        <td><?php echo esc_html( $company_type ); ?></td>
                    </tr>
                <?php endif; ?>
            </table>
            <?php
        }
    }

    public static function add_cvr_column( $columns ) {
        $columns['company_cvr'] = __( 'CVR', 'woo-roles-rules-b2b' );
        return $columns;
    }

    public static function show_cvr_column_content( $value, $column_name, $user_id ) {
        if ( $column_name === 'company_cvr' ) {
            return get_user_meta( $user_id, 'company_cvr', true );
        }
        return $value;
    }

    public static function display_company_info_dashboard() {
        $customer_id = get_current_user_id();
        $company_cvr = get_user_meta( $customer_id, 'company_cvr', true );
        $company_type = get_user_meta( $customer_id, 'company_type', true );

        if ( $company_cvr || $company_type ) {
            ?>
            <div class="woocommerce-MyAccount-content">
                <h3><?php _e( 'Company Information', 'woo-roles-rules-b2b' ); ?></h3>
                <?php if ( $company_cvr ) : ?>
                    <p><strong><?php _e( 'CVR:', 'woo-roles-rules-b2b' ); ?></strong> <?php echo esc_html( $company_cvr ); ?></p>
                <?php endif; ?>
                <?php if ( $company_type ) : ?>
                    <p><strong><?php _e( 'Industry:', 'woo-roles-rules-b2b' ); ?></strong> <?php echo esc_html( $company_type ); ?></p>
                <?php endif; ?>
            </div>
            <?php
        }
    }

    public static function add_company_info_to_admin_email( $wp_new_user_notification_email, $user, $blogname ) {
        $company_cvr = get_user_meta( $user->ID, 'company_cvr', true );
        $company_type = get_user_meta( $user->ID, 'company_type', true );

        if ( $company_cvr || $company_type ) {
            $company_info = "\n\n" . __( 'Company Information:', 'woo-roles-rules-b2b' ) . "\n";

            if ( $company_cvr ) {
                $company_info .= __( 'CVR Number:', 'woo-roles-rules-b2b' ) . ' ' . $company_cvr . "\n";
            }

            if ( $company_type ) {
                $company_info .= __( 'Industry:', 'woo-roles-rules-b2b' ) . ' ' . $company_type . "\n";
            }

            // Add company info to the email message
            $wp_new_user_notification_email['message'] .= $company_info;
        }

        return $wp_new_user_notification_email;
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

		add_meta_box(
			'rrb2b-role-prices-meta-box',
			__( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ),
			'Rrb2b_Woo::rrb2b_display_role_meta_box_callback',
			$screen,
			'side',
			'default'
		);
	
	}

	/**
	 * Show extra field on user
	 */
	public static function rrb2b_show_user_profile( $user ) {

		wp_nonce_field( 'update-user_' . $user->ID );

		$message_txt = get_user_meta( $user->ID, 'rrb2b_reg_message' );

		if ( empty( $message_txt ) ) {
			//return;
			$message_txt = '';
		} else {
			$message_txt = $message_txt[0];
		}

		?>
		<h2><?php esc_attr_e( 'Customer information', 'woo-roles-rules-b2b' ); ?></h2>
		<table class="form-table">
			<tr>
				<th>
					<label for="rrb2b_reg_message"><?php esc_html_e( 'Registration message', 'woo-roles-rules-b2b' ); ?></label>
				</th>
				<td>
					<textarea id="rrb2b_reg_message" name="rrb2b_reg_message" rows="6"><?php echo esc_attr( $message_txt ); ?></textarea>
				</td>
			</tr>
		</table>

		<?php

	}

	/**
	 * Save selected role on order
	 */
	public static function rrb2b_save_selected_role_on_order( $order_id ) {
	
		if ( check_admin_referer( 'rrb2b_nonce_id', 'rrb2b_nonce' ) ) {
			
			if ( ! empty( $order_id ) && ! empty( $_POST['rrb2b_user_role'] ) ) {

				$order = wc_get_order( $order_id );
				$order->update_meta_data( '_rrb2b_user_role', wc_clean( $_POST['rrb2b_user_role'] ) );
				$order->save();

			}

		}

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
	 * Get user role on Order page
	 */
	public static function rrb2b_get_user_role() {

		if ( check_ajax_referer( 'rrb2b_nonce_id', 'nonce' )  ) {

			$data    = wp_unslash( $_POST );
			$user_id = isset( $data['user_id'] ) ? absint( $data['user_id'] ) : 0;

			if ( ! $user_id ) {
				wp_send_json_error();
			}

			$user_info = get_userdata( $user_id );
			if ( ! $user_info ) {
				wp_send_json_error();
			}

			// Get user roles
			$user_roles = $user_info->roles;
			if ( ! empty( $user_roles ) ) {
				// Send the first role
				wp_send_json_success( array( 'role' => $user_roles[0] ) );
			}

		} else {
			wp_send_json_error();
		}

	}

	/**
	 * Recalculate order items based on role prices
	 */
	public static function rrb2b_recalculate_prices_callback() {
		
		if ( check_ajax_referer( 'rrb2b_nonce_id', 'nonce' )  ) {

			$data     = wp_unslash( $_POST );
			$order_id = isset( $data['order_id'] ) ? absint( $data['order_id'] ) : 0;
			$role     = isset( $data['role'] ) ? sanitize_text_field( $data['role'] ) : '';

			if ( ! $order_id || ! $role ) {
				wp_send_json_error( array( 'message' => 'Invalid order ID or role.' ) );
			}

			$order = wc_get_order( $order_id );
			if ( ! $order ) {
				wp_send_json_error( array( 'message' => 'Order not found.' ) );
			}

			// Update prices for each order item based on the role
			foreach ( $order->get_items() as $item_id => $item ) {
				if ( $item->is_type( 'line_item' ) ) {
					$product = $item->get_product();
					if ( $product ) {
						$new_price = apply_filters( 'rrb2b_rule_get_price_api_and_admin', $product->get_price(), $product, $item->get_quantity(), $role, false );
						$item->set_subtotal( $new_price * $item->get_quantity() );
						$item->set_total( $new_price * $item->get_quantity() );
						$item->save();
					}
				}
			}

			$order->calculate_totals(); // Recalculate totals for the order
			wp_send_json_success();

		} else {
			wp_send_json_error();
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
	 * Save extra field
	 */
	public static function rrb2b_save_user_profile_field( $user_id ) {

		if ( ! current_user_can( 'edit_user', $user_id ) ) {
			return false;
		}
		
		// Verify nonce
		if ( ! isset( $_POST['_wpnonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['_wpnonce'] ), 'update-user_' . $user_id ) ) {
			wp_die();
		}

		$data = wp_unslash( $_POST );

		if ( isset( $data['rrb2b_reg_message'] ) && ! empty( $data['rrb2b_reg_message'] ) ) {
			update_user_meta( $user_id, 'rrb2b_reg_message', $data['rrb2b_reg_message'] );
		}

	}

	/**
	 * Change default (i.e email to translated label)
	 */
	public static function rrb2b_change_default_labels( $translation, $text, $domain ) {

		if ( is_account_page() && ! is_wc_endpoint_url() ) {

			$options = get_option( 'rrb2b_options' );

			if ( isset( $options['rrb2b_reg_lbl_email'] ) && strlen( $options['rrb2b_reg_lbl_email'] ) > 0 ) {
				if ( 'Email address' === $text ) {
					$translation = $options['rrb2b_reg_lbl_email'];
				}
			}

		}

		return $translation;

	}

	/**
	 * On activation notice
	 */
	public static function rrb2b_admin_activation_notice_success() {

		$allowed_tags = array(
			'a' => array(
				'class'  => array(),
				'href'   => array(),
				'target' => array(),
				'title'  => array(),
			),
		);

		/* translators: %s: url for documentation */
		$read_doc = __( 'Read the <a href="%1$s" target="_blank"> extension documentation </a> for more information.', 'woo-roles-rules-b2b' );
		$out_str  = sprintf( $read_doc, esc_url( 'https://docs.woocommerce.com/document/roles-rules-b2b/' ) );

		if ( get_transient( 'rrb2b-admin-notice-activated' ) ) {
			?>
			<div class="updated woocommerce-message">
				<a class="woocommerce-message-close notice-dismiss" href="<?php echo esc_url( wp_nonce_url( add_query_arg( 'wc-hide-notice', 'rrb2b_admin_activation_notice_success' ), 'woocommerce_hide_notices_nonce', '_wc_notice_nonce' ) ); ?>"><?php esc_html_e( 'Dismiss', 'woo-roles-rules-b2b' ); ?></a>
				<p>
					<?php esc_html_e( 'Thank you for installing Roles & Rules B2B for WooCommerce. You can now start creating roles and rules. ', 'woo-roles-rules-b2b' ); ?>
					<?php echo wp_kses( $out_str, $allowed_tags ); ?>
				</p>
				<p class="submit">
					<a href="<?php echo esc_url( admin_url( 'admin.php?page=rrb2b&tab=rules' ) ); ?>" class="button-primary"><?php esc_html_e( 'Start Roles & Rules', 'woo-roles-rules-b2b' ); ?></a>
					<a href="<?php echo esc_url( admin_url( 'admin.php?page=wc-settings&tab=rrb2b' ) ); ?>" class="button-secondary"><?php esc_html_e( 'Settings', 'woo-roles-rules-b2b' ); ?></a>
				</p>
			</div>

			<?php
			delete_transient( 'rrb2b-admin-notice-activated' );
		}
	}

	/**
	 * Set footer text.
	 */
	public static function rrb2b_set_footer_text( $text ) {

		$page = filter_input( 1, 'page', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( 'rrb2b' === $page ) {
			$img_file = plugins_url( '../consortia-100.png', __FILE__ );

			/* translators: %s: url to vendor and logo */
			printf( esc_html__( '- developed by %1$s%2$s%3$s', 'woo-roles-rules-b2b' ), '<a href="https://www.consortia.no/en/" target="_blank">', '<img src="' . esc_attr( $img_file ) . '" class="cas-logo">', '</a>' );

		} else {

			return $text;

		}

	}

	/**
	 * Add button to list users 
	 */
	public static function rrb2b_add_button_users() {
		
		global $current_screen;

		if ( 'users' !== $current_screen->id ) {
			return;
		}

		?>
		<script>
		jQuery(function(){
			jQuery('h1').append(' <a href="<?php echo esc_url( admin_url( 'admin.php?page=rrb2b' ) ); ?>" class="page-title-action"><?php esc_attr_e( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ); ?></a>');
		});
		</script>
		<?php
		
	}

	/**
	 * Delete rule
	 */
	public static function rrb2b_delete_rule_callback() {
		
		if ( check_ajax_referer( 'rrb2b_id', 'nonce' ) === 1 ) {
			$data      = wp_unslash( $_POST );
			$functions = new Rrb2b_Functions();
			$functions->rrb2b_delete_rule( $data );
		}
		wp_safe_redirect( admin_url( 'admin.php?page=rrb2b&tab=rules' ) );
		exit;
	}

	/**
	 * Create role
	 */
	public static function rrb2b_create_role() {
		
		$data = null;
		if ( isset( $_POST ) ) {
			$data = wp_unslash( $_POST );
		}
		
		if ( ! wp_verify_nonce( $data['_wpnonce'], 'rrb2b_id' ) ) {
			wp_die();
		}
		
		if ( $data ) {
			$functions = new Rrb2b_Functions();
			$functions->rrb2b_add_role( $data );
		}

		wp_safe_redirect( admin_url( 'admin.php?page=rrb2b&tab=roles' ) );
		exit;
	}

	/**
	 * Create rule
	 */
	public static function rrb2b_add_rule() {

		$data = null;
		if ( isset( $_POST ) ) {
			$data = wp_unslash( $_POST );
		}

		if ( ! wp_verify_nonce( $data['_wpnonce'], 'rrb2b_id' ) ) {
			wp_die();
		}

		if ( $data ) {
			$functions = new Rrb2b_Functions();
			$functions->rrb2b_add_rule( $data );
		}

		wp_safe_redirect( admin_url( 'admin.php?page=rrb2b&tab=rules' ) );
		exit;
	}

	/**
	 * Update rule
	 */
	public static function rrb2b_update_rule() {

		$data = null;
		if ( isset( $_POST ) ) {
			$data = wp_unslash( $_POST );
		}
		
		if ( ! wp_verify_nonce( $data['_wpnonce'], 'rrb2b_id' ) ) {
			wp_die();
		}

		if ( $data ) {
			$functions = new Rrb2b_Functions();
			$functions->rrb2b_update_rule( $data );
		} 

		wp_safe_redirect( admin_url( 'admin.php?page=rrb2b&tab=rules' ) );
		exit;
		
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
	 * Create menu
	 */
	public static function rrb2b_create_admin_menu() {

		add_submenu_page(
			'woocommerce',
			__( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ),
			__( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ),
			'manage_woocommerce',
			'rrb2b',
			'rrb2b_plugin_roles_page',
			30
		);

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

	/**
	 * Get products
	 */
	public static function rrb2b_ajax_get_products() {
		
		check_ajax_referer( 'rrb2b_id', 'nonce' );
		$data = wp_unslash( $_REQUEST );
		$txt  = sanitize_text_field( $data['search'] );

		$args_s = array(
			's'       => $txt,
			'limit'   => 20,
			'return'  => 'ids',
		);

		$args_sku = array(
			'sku'     => $txt,
			'limit'   => 20,
			'return'  => 'ids',
		);

		$arr_s   = wc_get_products( $args_s );
		$arr_sku = wc_get_products( $args_sku );
		$arr     = array_merge( $arr_s, $arr_sku ); 
		$list    = implode( ',', $arr );
		$items   = array_map( 'intval', explode( ',', $list ) );

		$args = array(
			'include'  => $items,
			'limit'    => 40,
			'orderby'  => 'title',
			'order'    => 'ASC',
		);
		
		$products    = wc_get_products( $args );
		$product_arr = array();

		foreach ( $products as $product ) {
			
			if ( count( $product->get_children() ) > 0 ) {
				
				$children = $product->get_children();
			
				foreach ( $children as $value ) {
					
					$child        = wc_get_product( $value );
					$attributes   = $child->get_attributes();
					$product_name = $child->get_title();
					
					if ( isset( $attributes ) && is_array( $attributes ) ) {
						foreach ( $attributes as $key => $val ) {
							if ( isset( $val ) && is_string( $val ) && strlen( $val ) > 0 ) {
								$product_name .= ', ' . ucfirst( $val );
							}
						}
					}

					$p_arr = array(
						'value' => $product_name,
						'data'  => $child->get_id(),
					);
		
					array_push( $product_arr, $p_arr );
				}

			} else {
				
				$p_arr = array(
					'value' => $product->get_title(),
					'data'  => $product->get_id(),
					
				);
	
				array_push( $product_arr, $p_arr );
			}

		}
		
		echo wp_json_encode( $product_arr );
		die();
	}

	/**
	 * Get products by category
	 */
	public static function rrb2b_ajax_get_products_category() {
		
		check_ajax_referer( 'rrb2b_id', 'nonce' );
		
		$data = null;
		if ( isset( $_POST ) ) {
			$data = wp_unslash( $_POST );
		}

		$functions = new Rrb2b_Functions();
		
		if ( isset( $data ) && ! empty( $data['category'] ) ) {
		
			//Query products by category
			$products = wc_get_products( array( 'category' => $data['category'], 'status' => 'publish', 'limit' => -1 ) );

			//Loop and add to rule
			foreach ( $products as $product ) {

				$variations = ( count( $product->get_children() ) > 0 ) ? $product->get_children()  : array();

				if ( 'true' === $data['variations'] && count( $variations ) > 0 ) {
					foreach ( $variations as $product_variation ) {
						$p            = wc_get_product( $product_variation ); 
						$attributes   = $p->get_attributes();
						$product_name = $p->get_name();

						if ( isset( $attributes ) && is_array( $attributes ) ) {
							foreach ( $attributes as $key => $val ) {
								if ( isset( $val ) && is_string( $val ) && strlen( $val ) > 0 ) {
									$product_name .= ', ' . $val;
								}
							}
						}

						$functions->rrb2b_add_rule_product( $product_variation, $product_name, $data['id'] );
					}
				} else {
					$functions->rrb2b_add_rule_product( $product->get_id(), $product->get_name(), $data['id'] );
				}

			}

		}

		die();
	}

	/**
	 * Update products to current rule
	 */
	public static function rrb2b_ajax_update_product_rule() {
		
		check_ajax_referer( 'rrb2b_id', 'nonce' );
		$data = null;
		if ( isset( $_POST ) ) {
			$data = wp_unslash( $_POST );
		}

		if ( isset( $data ) ) {
			$functions = new Rrb2b_Functions();
			$functions->rrb2b_update_product_rule( $data );
		} 

		die();

	}

	/**
	 * Update single category rules
	 */
	public static function rrb2b_ajax_update_single_category_rule() {
		
		check_ajax_referer( 'rrb2b_id', 'nonce' );
		$data = null;
		if ( isset( $_POST ) ) {
			$data = wp_unslash( $_POST );
		}

		if ( isset( $data ) ) {
			$functions = new Rrb2b_Functions();
			$functions->rrb2b_update_single_category_rule( $data );
		} 

		die();

	}


	/**
	 * Delete role and role in rrb2b db
	 */
	public static function rrb2b_ajax_delete_role() {

		check_ajax_referer( 'rrb2b_id', 'nonce' );

		$logger  = wc_get_logger();
		$context = array( 'source' => 'rrb2b-role-log' );

		$data = isset( $_POST ) ? wp_unslash( $_POST ) : array();
		$role = isset( $data['the_role'] ) ? sanitize_text_field( $data['the_role'] ) : '';

		if ( empty( $role ) ) {
			$logger->warning( 'No role provided for deletion.', $context );
			wp_send_json_error( __( 'Role missing.', 'woo-roles-rules-b2b' ) );
			wp_die();
		}

		// Delete any matching rules (by title search)
		$args = array(
			'post_status' => 'publish',
			'post_type'   => 'rrb2b',
			'orderby'     => 'title',
			's'           => $role,
		);

		$rules = get_posts( $args );

		if ( ! empty( $rules ) ) {
			foreach ( $rules as $rule ) {
				wp_delete_post( $rule->ID, true );
				$logger->info( 'Deleted rule post ID ' . $rule->ID . ' for role "' . $role . '".', $context );
			}
		} else {
			$logger->info( 'No rules found to delete for role "' . $role . '".', $context );
		}

		// Try to remove the actual role
		if ( get_role( $role ) ) {
			remove_role( $role );
			$logger->info( 'Role "' . $role . '" removed from WordPress.', $context );
			wp_send_json_success( __( 'Role and rules deleted.', 'woo-roles-rules-b2b' ) );
		} else {
			$logger->warning( 'Role "' . $role . '" not found during deletion.', $context );
			wp_send_json_error( __( 'Role not found.', 'woo-roles-rules-b2b' ) );
		}

		wp_die();
	}


	/**
	 * Copy rule from to (several)
	 */
	public static function rrb2b_copy_rules_to_callback() {

		check_ajax_referer( 'rrb2b_id', 'nonce' );
		$data = null;
		if ( isset( $_POST ) ) {
			$data = wp_unslash( $_POST );
		}

		$functions = new Rrb2b_Functions();
		$functions->rrb2b_copy_rules( $data );

		wp_die();
	}

    /**
     * Add register form
     */
    public static function rrb2b_register_form() {
        $data = array();

        // First priority: Check for stored data from validation errors
        if ( WC()->session ) {
            $stored_data = WC()->session->get( 'registration_form_data' );
            if ( $stored_data ) {
                $data = $stored_data;
                // Clear after use
                WC()->session->__unset( 'registration_form_data' );
            }
        }

        // Secondary: If this is a direct POST (shouldn't happen with validation errors)
        if ( empty( $data ) && isset( $_POST['rrb2b_reg_form_nonce'] ) &&
            wp_verify_nonce( $_POST['rrb2b_reg_form_nonce'], 'rrb2b_reg_form' ) ) {
            $data = wp_unslash( $_POST );
        }

        $functions = new Rrb2b_Functions();
        $functions->rrb2b_create_registration_form( $data );
    }

    /**
     * Validate register form
     */
    public static function rrb2b_validate_register_form( $username, $email, $validation_errors ) {

        if ( ! isset( $_POST['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' ) ) {
            return;
        }

        $data      = wp_unslash( $_POST );
        $functions = new Rrb2b_Functions();
        $functions->rrb2b_validate_registration_form( $username, $email, $validation_errors, $data );

        // ADD THIS: Store form data if there are validation errors
        if ( $validation_errors->has_errors() && WC()->session ) {
            WC()->session->set( 'registration_form_data', $data );
        }
    }

	/**
	 * Save register form data
	 */
	public static function rrb2b_save_register_form_data( $customer_id ) {

		$referrer = isset( $_SERVER['HTTP_REFERER'] ) ? sanitize_text_field( $_SERVER['HTTP_REFERER'] ) : 'unknown';
	
		// Check if registration comes from WooCommerce checkout
		$is_checkout_registration = ( strpos( $referrer, 'checkout' ) !== false );

		if ( ! $is_checkout_registration ) { // Skip nonce check for checkout
			if ( ! isset( $_POST['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' ) ) {
				error_log('RRB2B: Nonce verification failed on My Account registration.');
				return;
			}
		}
		
		$data      = wp_unslash( $_POST );
		$functions = new Rrb2b_Functions();
		$functions->rrb2b_save_registration_form( $customer_id, $data );

	}


}
add_action( 'init', array( 'Rrb2b_Woo', 'rrb2b_admin_hooks' ) );



