<?php

namespace ClypperTechnology\RolePricing\Admin;

use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;

class Admin {
    public function __construct()
    {
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

        $asset = include CRBP_PLUGIN_PATH . 'build/index.asset.php';

        wp_enqueue_script(
            'clypper-rbp-admin',
            CRBP_PLUGIN_URL . 'build/index.js',
            $asset['dependencies'],
            $asset['version'],
            [ 'in_footer' => true ]
        );

        wp_enqueue_style(
                'clypper-rbp-admin',
                CRBP_PLUGIN_URL . 'build/index.css',
                [ 'wp-components' ],
                $asset['version']
            );

        wp_enqueue_style( 'wp-components' );
    }

  public function create_admin_menu(): void
  {
      add_submenu_page(
          'woocommerce',
          __( 'Roles & Rules B2B', 'clypper-role-based-pricing' ),
          __( 'Roles & Rules B2B', 'clypper-role-based-pricing' ),
          'manage_woocommerce',
          'crbp',
          function (): void {
              echo '<div id="clypper-rbp-app"></div>';
          }
      );
  }
}