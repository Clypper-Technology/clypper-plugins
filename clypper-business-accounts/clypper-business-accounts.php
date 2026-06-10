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
use ClypperTechnology\ClypperCvr\includes\Checkout;
use ClypperTechnology\ClypperCvr\includes\RegistrationForm;
use ClypperTechnology\ClypperCvr\includes\FrontEnd;

defined( 'ABSPATH' ) || exit;

require_once plugin_dir_path( __FILE__ ) . 'vendor/autoload.php';

const CAS_CVR_VERSION   = '1.0.0';

add_action( 'before_woocommerce_init', function() {
    if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
        FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__ );
    }
});

add_action( 'plugins_loaded', function() {
    new RegistrationForm();
    new FrontEnd();
    new Checkout();

    if ( is_admin() ) {
        new Admin( );
    }
});