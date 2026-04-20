<?php
/**
 *
 * Plugin Name: Clypper's CVR numre
 * Description: Adds CVR numbers to the registration form and autopopulates the CVR field in checkout
 * Version: 1.0.0
 * Author: Clypper Technology
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
use ClypperTechnology\ClypperCvr\includes\Admin;
use ClypperTechnology\ClypperCvr\includes\RegistrationForm;
use ClypperTechnology\ClypperCvr\includes\FrontEnd;

defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';

const CAS_CVR_VERSION   = '1.0.0';

register_activation_hook( __FILE__, 'clypper_cvr_install' );
register_deactivation_hook( __FILE__, 'clypper_cvr_deactivate' );
register_uninstall_hook( __FILE__, 'clypper_cvr_uninstall');

function clypper_cvr_install(): void
{
    global $wp_version;

    if ( version_compare( $wp_version, '4.1', '<' ) ) {
        wp_die( 'This plugin requires WordPress 4.1 or higher.' );
    }

    set_transient( 'rrb2b-admin-notice-activated', true );
    flush_rewrite_rules();
}

function clypper_cvr_deactivate(): void
{
    flush_rewrite_rules();
}

function clypper_cvr_uninstall(): void {}

add_action( 'before_woocommerce_init', function() {
    if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
        FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__ );
    }
});

add_action( 'plugins_loaded', function() {
    new RegistrationForm();
    new FrontEnd();

    if ( is_admin() ) {
        new Admin( );
    }
});