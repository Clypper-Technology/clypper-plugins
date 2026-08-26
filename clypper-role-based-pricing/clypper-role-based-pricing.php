<?php
/**
 *
 * Plugin Name: Clypper's Role Based Pricing
 * Description: Enables role-based pricing, dynamic discounts, VAT exemptions and much more to create tailored B2B and B2C shopping experiences.
 * Version: 1.0.0
 * Author: Clypper Technology
 * Text Domain: clypper-role-based-pricing
 * Author URI:        https://clyppertechnology.com
 * Domain Path: /languages
 *
 * Tested up to: 6.8.0
 * Requires at least: 6.8.0
 * Requires PHP: 5.6
 * WC requires at least: 3.5
 * WC tested up to: 9.8.5
 *
 * Copyright: © 2018-2025 Consortia AS.
 * License: GNU General Public License v3.0
 */

use Automattic\WooCommerce\Utilities\FeaturesUtil;
use ClypperTechnology\RolePricing\Admin\Admin;
use ClypperTechnology\RolePricing\REST\ProductController;
use ClypperTechnology\RolePricing\REST\RoleController;
use ClypperTechnology\RolePricing\REST\RuleController;
use ClypperTechnology\RolePricing\PriceRules;
use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';

const CAS_ROLES_RULES_VS   = '1.0.0';

define( 'CRBP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'CRBP_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

register_activation_hook( __FILE__, 'crbp_install');
register_deactivation_hook( __FILE__, 'crbp_deactivate');
register_uninstall_hook( __FILE__, 'crbp_uninstall');

function crbp_install(): void
{
}

function crbp_deactivate(): void
{
}

function crbp_uninstall(): void {
}

function crbp_load_textdomain(): void
{
    load_plugin_textdomain( 'clypper-role-based-pricing', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'crbp_load_textdomain');

add_action( 'before_woocommerce_init', function() {
    if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
        FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__ );
    }
});

$role_service = new RoleService();
$rule_service = new RuleService( $role_service );

add_action( 'rest_api_init', function() use ( $rule_service, $role_service ) {
    $namespace = 'crbp/v1';

    ( new ProductController( $namespace ) )->register_routes();
    ( new RuleController( $namespace, $rule_service ) )->register_routes();
    ( new RoleController( $namespace, $role_service, $rule_service ) )->register_routes();
});

add_action( 'woocommerce_loaded', function() use ( &$rule_service, &$role_service ) {
    new PriceRules( $rule_service );

    if ( is_admin() ) {
        new Admin();
    }
});

add_action( 'init', function() {
    if ( post_type_exists( 'clypper_rbp' ) ) {
        return;
    }

    register_post_type( 'clypper_rbp', [
        'labels' => [
            'name'          => _x( 'Rules', 'Post Type General Name', 'clypper-role-based-pricing' ),
            'singular_name' => _x( 'Rule', 'Post Type Singular Name', 'clypper-role-based-pricing' ),
        ],
        'public'              => false,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'supports'            => [ 'title', 'editor' ],
        'has_archive'         => false,
        'show_in_rest'        => false,
    ]);
});