<?php

class Admin {

    private Rule_Service $rule_service;

    public function __construct()
    {
        $this->rule_service = new Rule_Service();

        add_action( 'admin_post_rrb2b_add_rule', array( $this, 'add_rule' ) );
        add_action( 'admin_post_rrb2b_update_rule', array( $this, 'update_rule' ) );
        add_action( 'admin_menu', array( $this, 'create_admin_menu' ) );
    }

    /**
     * Create rule
     */
    public function add_rule(): void {
        $this->verify_admin_request();

        $data = wp_unslash( $_POST );

        // Fix: Check for the actual field your form sends
        if ( empty( $data['role'] ) ) {
            $this->redirect_with_error( 'Role is required.' );
        }

        try {
            $rule_id = $this->rule_service->add_rule( $data );

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
        if ( empty( $data['rule_id'] ) ) {
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