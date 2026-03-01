<?php

namespace ClypperTechnology\RolePricing\Admin;

use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;

class Admin {

    private RuleService $rule_service;
    private RoleService $role_service;

    public function __construct( RuleService $rule_service, RoleService $role_service )
    {
        $this->rule_service = $rule_service;
        $this->role_service = $role_service;

        add_action( 'admin_post_rrb2b_add_rule',    [ $this, 'add_rule' ] );
        add_action( 'admin_post_rrb2b_update_rule', [ $this, 'update_rule' ] );
        add_action( 'admin_menu',                   [ $this, 'create_admin_menu' ] );
        add_action( 'admin_enqueue_scripts',        [ $this, 'enqueue_scripts' ] );
        add_filter( 'wp_new_user_notification_email_admin', [ $this, 'add_company_info_to_admin_email' ], 10, 3 );
    }

    public function enqueue_scripts( string $hook ): void
    {

        if ( 'woocommerce_page_rrb2b' !== $hook ) {
            return;
        }

        wp_register_script( 'rrb2b_jquery-ui', 'https://code.jquery.com/ui/1.13.2/jquery-ui.js', array( 'jquery' ), '1.13.2', true );
        wp_enqueue_script( 'rrb2b_jquery-ui' );

        wp_register_script( 'rrb2b_scripts', RRB2B_PLUGIN_URL . 'assets/js/rrb2b.js',
            [ 'jquery', 'wp-api-fetch', 'jquery-ui-autocomplete' ], CAS_ROLES_RULES_VS, true );
        wp_enqueue_script( 'select2' );
        wp_enqueue_style( 'select2' );


        wp_register_style( 'woocommerce_admin', plugins_url( '../plugins/woocommerce/assets/css/admin.css' ), array(), '1.12.1' );
        wp_enqueue_style( 'woocommerce_admin' );

        wp_register_style( 'fonta', 'https://use.fontawesome.com/releases/v6.4.2/css/all.css', array(), '6.4.2' );
        wp_enqueue_style( 'fonta' );

        wp_register_style( 'jquery-ui-css', 'https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css', array(), '1.13.2', 'all' );
        wp_enqueue_style( 'jquery-ui-css' );

        wp_register_style( 'rrb2b_css',      RRB2B_PLUGIN_URL . 'assets/css/rrb2b.css',      [], CAS_ROLES_RULES_VS );
        wp_enqueue_style( 'rrb2b_css' );

        wp_register_style( 'rrb2b_dark_css', plugins_url( '../assets/css/rrb2b-dark.css', __FILE__ ), array(), CAS_ROLES_RULES_VS );
        wp_register_style( 'rrb2b_dark_css', RRB2B_PLUGIN_URL . 'assets/css/rrb2b-dark.css', [], CAS_ROLES_RULES_VS );

        // Localize the script with new data
        $translation = array(
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
        );
        wp_localize_script( 'rrb2b_scripts', 'cyp_object', $translation );
        wp_enqueue_script( 'rrb2b_scripts' );
    }

    public function add_company_info_to_admin_email( $wp_new_user_notification_email, $user, $blogname )
    {
        $company_cvr  = get_user_meta( $user->ID, 'company_cvr', true );
        $company_type = get_user_meta( $user->ID, 'company_type', true );

        if ( ! $company_cvr && ! $company_type ) {
            return $wp_new_user_notification_email;
        }

        $company_info = "\n\n" . __( 'Company Information:', 'clypper-role-pricing' ) . "\n";

        if ( $company_cvr ) {
            $company_info .= __( 'CVR Number:', 'clypper-role-pricing' ) . ' ' . $company_cvr . "\n";
        }

        if ( $company_type ) {
            $company_info .= __( 'Industry:', 'clypper-role-pricing' ) . ' ' . $company_type . "\n";
        }

        $wp_new_user_notification_email['message'] .= $company_info;

        return $wp_new_user_notification_email;
    }

    public function add_rule(): void
    {
        $this->verify_admin_request();

        $rule_name = sanitize_text_field( wp_unslash( $_POST['role'] ?? '' ) );

        if ( empty( $rule_name ) ) {
            $this->redirect_with_error( __( 'Rule name is required.', 'clypper-role-pricing' ) );
        }

        try {
            $rule_id = $this->rule_service->add_rule( $rule_name );
            $this->redirect_with_success( 'rules', [ 'message' => 'rule_created', 'rule_id' => $rule_id ] );
        } catch ( \Exception $e ) {
            error_log( 'Rule creation failed: ' . $e->getMessage() );
            $this->redirect_with_error( __( 'Failed to create rule. Please try again.', 'clypper-role-pricing' ) );
        }
    }

    public function update_rule(): void
    {
        $this->verify_admin_request();

        $rule_id = intval( wp_unslash( $_POST['id'] ?? 0 ) );

        if ( empty( $rule_id ) ) {
            $this->redirect_with_error( __( 'Rule ID is required.', 'clypper-role-pricing' ) );
        }

        try {
            $this->rule_service->update_rule( wp_unslash( $_POST ) );
            $this->redirect_with_success( 'rules', [ 'message' => 'rule_updated' ] );
        } catch ( \Exception $e ) {
            error_log( 'Rule update failed: ' . $e->getMessage() );
            $this->redirect_with_error( __( 'Failed to update rule. Please try again.', 'clypper-role-pricing' ) );
        }
    }

    public function create_admin_menu(): void
    {
        add_submenu_page(
            'woocommerce',
            __( 'Roles & Rules B2B', 'clypper-role-pricing' ),
            __( 'Roles & Rules B2B', 'clypper-role-pricing' ),
            'manage_woocommerce',
            'rrb2b',
            'rrb2b_plugin_roles_page',
            30
        );
    }

    private function verify_admin_request( string $action = 'rrb2b_id', string $capability = 'manage_woocommerce' ): void
    {
        if ( ! wp_verify_nonce( $_POST['_wpnonce'] ?? '', $action ) ) {
            wp_die(
                __( 'Security check failed. Please try again.', 'clypper-role-pricing' ),
                __( 'Security Error', 'clypper-role-pricing' ),
                [ 'response' => 403 ]
            );
        }

        if ( ! current_user_can( $capability ) ) {
            wp_die(
                __( 'You do not have permission to perform this action.', 'clypper-role-pricing' ),
                __( 'Permission Error', 'clypper-role-pricing' ),
                [ 'response' => 403 ]
            );
        }
    }

    private function admin_url( string $tab, array $args = [] ): string
    {
        return add_query_arg( $args, admin_url( "admin.php?page=rrb2b&tab={$tab}" ) );
    }

    private function redirect_with_success( string $tab, array $args = [] ): void
    {
        wp_redirect( $this->admin_url( $tab, $args ) );
        exit;
    }

    private function redirect_with_error( string $message, string $tab = 'rules' ): void
    {
        wp_redirect( $this->admin_url( $tab, [ 'error' => urlencode( $message ) ] ) );
        exit;
    }
}