<?php

namespace ClypperTechnology\RolePricing;

use Automattic\WooCommerce\Internal\DataStores\Orders\CustomOrdersTableController;
use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;

class Admin {

    private RuleService $rule_service;
    private RoleService $role_service;

    public function __construct()
    {
        $this->rule_service = new RuleService();
        $this->role_service = new RoleService();

        add_action( 'admin_post_rrb2b_add_rule', array( $this, 'add_rule' ) );
        add_action( 'admin_post_rrb2b_update_rule', array( $this, 'update_rule' ) );
        add_action( 'admin_menu', array( $this, 'create_admin_menu' ) );
        add_action( 'admin_post_rrb2b_create_role', array( $this, 'create_role' ) );
        add_action( 'admin_head', array( $this, 'add_button_to_user_page' ) );
        add_action( 'woocommerce_process_shop_order_meta', array( $this, 'save_selected_role_on_order') );
        add_action( 'add_meta_boxes', array( $this, 'register_role_meta_box' ) );
        add_filter( 'wp_new_user_notification_email_admin', array( $this, 'add_company_info_to_admin_email' ), 10, 3 );
    }

    public function add_company_info_to_admin_email( $wp_new_user_notification_email, $user, $blogname ) {
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
     * Add meta box for Roles & Rules B2B in Order page
     */
    public function register_role_meta_box(): void {

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
     * Save selected role on order
     */
    public function save_selected_role_on_order($order_id ): void {
        $this->verify_admin_request('rrb2b_nonce_id');

        if ( ! empty( $order_id ) && ! empty( $_POST['rrb2b_user_role'] ) ) {
            $order = wc_get_order( $order_id );
            $order->update_meta_data( '_rrb2b_user_role', wc_clean( $_POST['rrb2b_user_role'] ) );
            $order->save();
        }
    }

    /**
     * Create rule
     */
    public function add_rule(): void {
        $this->verify_admin_request();

        $data = wp_unslash( $_POST );
        $rule_name = sanitize_text_field($data['role'] ?? '');

        if ( empty($rule_name) ) {
            $this->redirect_with_error('Rule name is required.');
            return;
        }

        try {
            $rule_id = $this->rule_service->add_rule( $rule_name );

            wp_redirect( add_query_arg(
                array(
                    'message' => 'rule_created',
                    'rule_id' => $rule_id
                ),
                admin_url( 'admin.php?page=rrb2b&tab=rules' )
            ) );
            exit;

        } catch ( Exception $e ) {
            error_log( 'Rule creation failed: ' . $e->getMessage() );

            wp_redirect( add_query_arg(
                array( 'error' => urlencode( 'Failed to create rule: ' . $e->getMessage() ) ),
                admin_url( 'admin.php?page=rrb2b&tab=rules' )
            ) );
            exit;
        }
    }

    /**
     * Update rule
     */
    public function update_rule(): void {
        $this->verify_admin_request();

        $data = wp_unslash( $_POST );

        // Validate required fields
        if ( empty( $data['id'] ) ) {
            $this->redirect_with_error( __( 'Rule ID is required.', 'woo-roles-rules-b2b' ) );
        }

        try {
            $this->rule_service->update_rule( $data );

            // Redirect with success message
            wp_redirect( add_query_arg(
                array( 'message' => 'rule_updated' ),
                admin_url( 'admin.php?page=rrb2b&tab=rules' )
            ) );
            exit;

        } catch ( Exception $e ) {
            error_log( 'Rule update failed: ' . $e->getMessage() );

            wp_redirect( add_query_arg(
                array( 'error' => urlencode( 'Failed to update rule. Please try again.' ) ),
                admin_url( 'admin.php?page=rrb2b&tab=rules' )
            ) );
            exit;
        }
    }

    /**
     * Create role
     */
    public function create_role(): void {
        $this->verify_admin_request();

        $data = wp_unslash( $_POST );

        $this->role_service->add_role( $data );

        wp_safe_redirect( admin_url( 'admin.php?page=rrb2b&tab=roles' ) );
    }

    /**
     * Verify nonce for admin requests
     */
    private function verify_nonce( string $action = 'rrb2b_id', string $nonce_key = '_wpnonce' ): void {
        if ( ! wp_verify_nonce( $_POST[ $nonce_key ] ?? '', $action ) ) {
            wp_die(
                __( 'Security check failed. Please try again.', 'woo-roles-rules-b2b' ),
                __( 'Security Error', 'woo-roles-rules-b2b' ),
                array( 'response' => 403 )
            );
        }
    }

    /**
     * Check user permissions for admin actions
     */
    private function verify_permissions( string $capability = 'manage_woocommerce' ): void {
        if ( ! current_user_can( $capability ) ) {
            wp_die(
                __( 'You do not have permission to perform this action.', 'woo-roles-rules-b2b' ),
                __( 'Permission Error', 'woo-roles-rules-b2b' ),
                array( 'response' => 403 )
            );
        }
    }

    /**
     * Create menu
     */
    public function create_admin_menu() {

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
     * Add button to list users
     */
    public function add_button_to_user_page() {

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
     * Combined verification for admin requests
     */
    private function verify_admin_request( string $action = 'rrb2b_id', string $capability = 'manage_woocommerce' ): void {
        $this->verify_nonce( $action );
        $this->verify_permissions( $capability );
    }

    /**
     * Helper method for error redirects
     */
    private function redirect_with_error( string $error_message ): void {
        wp_redirect( add_query_arg(
            array( 'error' => urlencode( $error_message ) ),
            admin_url( 'admin.php?page=rrb2b&tab=rules' )
        ) );
        exit;
    }
}