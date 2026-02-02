<?php

namespace ClypperTechnology\RolePricing;

use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;

class Admin {
    public function __construct()
    {
        add_action( 'admin_menu', array( $this, 'create_admin_menu' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_styles' ) );
        add_filter( 'wp_new_user_notification_email_admin', array( $this, 'add_company_info_to_admin_email' ), 10, 3 );
    }

    /**
     * Enqueue admin styles
     */
    public function enqueue_admin_styles( $hook ): void
    {
        // Only load on our plugin pages
        if ( strpos( $hook, 'rrb2b' ) === false ) {
            return;
        }

        wp_enqueue_style(
            'crp-admin-styles',
            plugin_dir_url( __DIR__ ) . 'assets/admin/css/admin.css',
            array(),
            filemtime( plugin_dir_path( __DIR__ ) . 'assets/admin/css/admin.css' )
        );
    }

    public function add_company_info_to_admin_email( $wp_new_user_notification_email, $user, $blogname ) {
        $company_cvr = get_user_meta( $user->ID, 'company_cvr', true );
        $company_type = get_user_meta( $user->ID, 'company_type', true );

        if ( $company_cvr || $company_type ) {
            $company_info = "\n\n" . __( 'Company Information:', 'clypper-role-pricing' ) . "\n";

            if ( $company_cvr ) {
                $company_info .= __( 'CVR Number:', 'clypper-role-pricing' ) . ' ' . $company_cvr . "\n";
            }

            if ( $company_type ) {
                $company_info .= __( 'Industry:', 'clypper-role-pricing' ) . ' ' . $company_type . "\n";
            }

            // Add company info to the email message
            $wp_new_user_notification_email['message'] .= $company_info;
        }

        return $wp_new_user_notification_email;
    }


    /**
     * Create menu
     */
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
}