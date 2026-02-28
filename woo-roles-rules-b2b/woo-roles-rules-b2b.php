<?php
/**
 * Roles & Rules B2B
 *
 * @package  Roles&RulesB2B
 *
 * Plugin Name: Roles & Rules B2B for WooCommerce
 * Description: Enables role-based pricing, dynamic discounts, VAT exemptions and much more to create tailored B2B and B2C shopping experiences.
 * Version: 2.5.8
 * Author: Consortia
 * Text Domain: woo-roles-rules-b2b
 * Domain Path: /languages
 *
 * Tested up to: 6.8.1
 * Requires at least: 5.0
 * Requires PHP: 5.6
 * WC requires at least: 3.5
 * WC tested up to: 9.8.5
 *
 * Copyright: © 2018-2025 Consortia AS.
 * License: GNU General Public License v3.0
 */

use ClypperTechnology\RolePricing\Admin\Admin;
use ClypperTechnology\RolePricing\REST\ProductController;
use ClypperTechnology\RolePricing\REST\RuleController;
use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';
require_once dirname( __FILE__ ) . '/includes/class-rrb2b-woo.php';
require_once dirname( __FILE__ ) . '/includes/class-rrb2b-rules.php';

const CAS_ROLES_RULES_VS   = '2.5.8';
const CAS_ROLES_RULES_PROD = 'true';

register_activation_hook( __FILE__, 'rrb2b_install' );
register_deactivation_hook( __FILE__, 'rrb2b_deactivate' );
register_uninstall_hook( __FILE__, 'rrb2b_uninstall' );

function rrb2b_install(): void
{
    global $wp_version;

    if ( version_compare( $wp_version, '4.1', '<' ) ) {
        wp_die( 'This plugin requires WordPress 4.1 or higher.' );
    }

    set_transient( 'rrb2b-admin-notice-activated', true );
    flush_rewrite_rules();
}

function rrb2b_deactivate(): void
{
    flush_rewrite_rules();
}

function rrb2b_uninstall(): void {}

function rrb2b_load_textdomain(): void
{
    load_plugin_textdomain( 'woo-roles-rules-b2b', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'rrb2b_load_textdomain' );

add_action( 'before_woocommerce_init', function() {
    if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
    }
});

/**
 * Bootstrap the plugin after WooCommerce is loaded
 */
add_action( 'woocommerce_loaded', function() {
    $rule_service = new RuleService();
    $role_service = new RoleService();

    // Frontend pricing rules
    $rules = new Rrb2b_Rules( $rule_service );

    // Admin
    if ( is_admin() ) {
        new Admin( $rule_service, $role_service );
    }

    // REST API
    add_action( 'rest_api_init', function() use ( $rule_service ) {
        $namespace = 'rrb2b/v1';

        $product_controller = new ProductController( $namespace );
        $rule_controller    = new RuleController( $namespace, $rule_service );

        $product_controller->register_routes();
        $rule_controller->register_routes();
    });
});

/**
 * Admin page renderer
 */
function rrb2b_plugin_roles_page(): void
{
    if ( ! class_exists( 'WooCommerce' ) ) {
        return;
    }

    include_once dirname( __FILE__ ) . '/includes/class-rrb2b-templates.php';

    $main = new Rrb2b_Templates();
    $main->rrb2b_get_main_page();
}