<?php
/**
 *
 * Plugin Name: Clypper's Role Based Pricing
 * Description: Enables role-based pricing, dynamic discounts, VAT exemptions and much more to create tailored B2B and B2C shopping experiences.
 * Version: 1.0.0
 * Author: Clypper Technology
 * Text Domain: clypper-role-pricing
 * Author URI:        https://clyppertechnology.com
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

use Automattic\WooCommerce\Utilities\FeaturesUtil;
use ClypperTechnology\RolePricing\Admin\Admin;
use ClypperTechnology\RolePricing\Admin\Layout;
use ClypperTechnology\RolePricing\RegistrationForm;
use ClypperTechnology\RolePricing\REST\ProductController;
use ClypperTechnology\RolePricing\REST\RuleController;
use ClypperTechnology\RolePricing\PriceRules;
use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;
use ClypperTechnology\RolePricing\Users;

defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';

const CAS_ROLES_RULES_VS   = '1.0.0';

define( 'RRB2B_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'RRB2B_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );

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

add_action( 'init', 'clypper_rbp_migrate_post_type' );

function rrb2b_deactivate(): void
{
    flush_rewrite_rules();
}

function rrb2b_uninstall(): void {}

function rrb2b_load_textdomain(): void
{
    load_plugin_textdomain( 'clypper-role-pricing', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'rrb2b_load_textdomain' );

add_action( 'before_woocommerce_init', function() {
    if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
        FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__ );
    }
});

function clypper_rbp_migrate_post_type(): void
{
    global $wpdb;

    $wpdb->update(
        $wpdb->posts,
        [ 'post_type' => 'clypper_rbp' ],
        [ 'post_type' => 'rrb2b' ]
    );

    flush_rewrite_rules();
}

$rule_service = null;
$role_service = null;

add_action( 'woocommerce_loaded', function() use ( &$rule_service, &$role_service ) {
    $role_service = new RoleService();
    $rule_service = new RuleService( $role_service );

    new PriceRules( $rule_service );
    new RegistrationForm();
    new Users();

    if ( is_admin() ) {
        new Admin( $rule_service, $role_service );
    }

    add_action( 'rest_api_init', function() use ( $rule_service ) {
        $namespace = 'rrb2b/v1';
        ( new ProductController( $namespace ) )->register_routes();
        ( new RuleController( $namespace, $rule_service ) )->register_routes();
    });
});

function rrb2b_plugin_roles_page(): void
{
    global $rule_service, $role_service;

    if ( ! class_exists( 'WooCommerce' ) ) {
        return;
    }

    $main = new Layout( $role_service, $rule_service );
    $main->rrb2b_get_main_page();
}

add_action( 'init', function() {
    if ( post_type_exists( 'clypper_rbp' ) ) {
        return;
    }

    register_post_type( 'clypper_rbp', [
        'labels' => [
            'name'          => _x( 'Rules', 'Post Type General Name', 'clypper-role-pricing' ),
            'singular_name' => _x( 'Rule', 'Post Type Singular Name', 'clypper-role-pricing' ),
        ],
        'public'              => false,
        'publicly_queryable'  => false,
        'exclude_from_search' => true,
        'supports'            => [ 'title', 'editor' ],
        'has_archive'         => false,
        'show_in_rest'        => false,
    ]);
});