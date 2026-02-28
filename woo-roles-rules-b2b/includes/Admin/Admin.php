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
        add_action( 'admin_post_rrb2b_create_role', [ $this, 'create_role' ] );
        add_action( 'admin_menu',                   [ $this, 'create_admin_menu' ] );
        add_filter( 'wp_new_user_notification_email_admin', [ $this, 'add_company_info_to_admin_email' ], 10, 3 );
    }

    public function add_company_info_to_admin_email( $wp_new_user_notification_email, $user, $blogname )
    {
        $company_cvr  = get_user_meta( $user->ID, 'company_cvr', true );
        $company_type = get_user_meta( $user->ID, 'company_type', true );

        if ( ! $company_cvr && ! $company_type ) {
            return $wp_new_user_notification_email;
        }

        $company_info = "\n\n" . __( 'Company Information:', 'woo-roles-rules-b2b' ) . "\n";

        if ( $company_cvr ) {
            $company_info .= __( 'CVR Number:', 'woo-roles-rules-b2b' ) . ' ' . $company_cvr . "\n";
        }

        if ( $company_type ) {
            $company_info .= __( 'Industry:', 'woo-roles-rules-b2b' ) . ' ' . $company_type . "\n";
        }

        $wp_new_user_notification_email['message'] .= $company_info;

        return $wp_new_user_notification_email;
    }

    public function add_rule(): void
    {
        $this->verify_admin_request();

        $rule_name = sanitize_text_field( wp_unslash( $_POST['role'] ?? '' ) );

        if ( empty( $rule_name ) ) {
            $this->redirect_with_error( __( 'Rule name is required.', 'woo-roles-rules-b2b' ) );
        }

        try {
            $rule_id = $this->rule_service->add_rule( $rule_name );
            $this->redirect_with_success( 'rules', [ 'message' => 'rule_created', 'rule_id' => $rule_id ] );
        } catch ( \Exception $e ) {
            error_log( 'Rule creation failed: ' . $e->getMessage() );
            $this->redirect_with_error( __( 'Failed to create rule. Please try again.', 'woo-roles-rules-b2b' ) );
        }
    }

    public function update_rule(): void
    {
        $this->verify_admin_request();

        $rule_id = intval( wp_unslash( $_POST['id'] ?? 0 ) );

        if ( empty( $rule_id ) ) {
            $this->redirect_with_error( __( 'Rule ID is required.', 'woo-roles-rules-b2b' ) );
        }

        try {
            $this->rule_service->update_rule( wp_unslash( $_POST ) );
            $this->redirect_with_success( 'rules', [ 'message' => 'rule_updated' ] );
        } catch ( \Exception $e ) {
            error_log( 'Rule update failed: ' . $e->getMessage() );
            $this->redirect_with_error( __( 'Failed to update rule. Please try again.', 'woo-roles-rules-b2b' ) );
        }
    }

    public function create_role(): void
    {
        $this->verify_admin_request();

        try {
            $this->role_service->add_role( wp_unslash( $_POST ) );
            $this->redirect_with_success( 'roles' );
        } catch ( \Exception $e ) {
            error_log( 'Role creation failed: ' . $e->getMessage() );
            $this->redirect_with_error( __( 'Failed to create role. Please try again.', 'woo-roles-rules-b2b' ) );
        }
    }

    public function create_admin_menu(): void
    {
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

    private function verify_admin_request( string $action = 'rrb2b_id', string $capability = 'manage_woocommerce' ): void
    {
        if ( ! wp_verify_nonce( $_POST['_wpnonce'] ?? '', $action ) ) {
            wp_die(
                __( 'Security check failed. Please try again.', 'woo-roles-rules-b2b' ),
                __( 'Security Error', 'woo-roles-rules-b2b' ),
                [ 'response' => 403 ]
            );
        }

        if ( ! current_user_can( $capability ) ) {
            wp_die(
                __( 'You do not have permission to perform this action.', 'woo-roles-rules-b2b' ),
                __( 'Permission Error', 'woo-roles-rules-b2b' ),
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