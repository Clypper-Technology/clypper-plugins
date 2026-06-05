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
        if ( 'woocommerce_page_crbp' !== $hook ) {
            return;
        }

        $asset = include RRB2B_PLUGIN_PATH . 'build/index.asset.php';

        wp_enqueue_script(
            'clypper-rbp-admin',
            RRB2B_PLUGIN_URL . 'build/index.js',
            $asset['dependencies'],
            $asset['version'],
            [ 'in_footer' => true ]
        );

        wp_enqueue_style(
                'clypper-rbp-admin',
                RRB2B_PLUGIN_URL . 'build/index.css',
                [ 'wp-components' ],
                $asset['version']
            );

        wp_enqueue_style( 'wp-components' );
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


  public function create_admin_menu(): void
  {
      add_submenu_page(
          'woocommerce',
          __( 'Roles & Rules B2B', 'clypper-role-pricing' ),
          __( 'Roles & Rules B2B', 'clypper-role-pricing' ),
          'manage_woocommerce',
          'crbp',
          function (): void {
              echo '<div id="clypper-rbp-app"></div>';
          }
      );
  }
}
