<?php
/**
 * Roles & Rules B2B
 *
 * @package  Roles&RulesB2B
 *
 * Plugin Name: Roles & Rules B2B for WooCommerce
 * Description: Enables role-based pricing, dynamic discounts, VAT exemptions and much more to create tailored B2B and B2C shopping experiences.
 * Version: 2.5.5
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
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Woo: 7085464:91f1d1f92de5f2c3adbe62dfaaa3d5ac

 */

use ClypperTechnology\RolePricing\Admin;

require_once plugin_dir_path(__FILE__) . 'vendor/autoload.php';


const CAS_ROLES_RULES_VS   = '2.5.5';
const CAS_ROLES_RULES_PROD = 'true';

add_action( 'before_woocommerce_init', function() {
	if ( class_exists( '\Automattic\WooCommerce\Utilities\FeaturesUtil' ) ) {
		\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
	}
} );

register_activation_hook( __FILE__, 'rrb2b_install' );
register_deactivation_hook( __FILE__, 'rrb2b_deactivate' );
register_uninstall_hook( __FILE__, 'rrb2b_uninstall' );

require_once dirname( __FILE__ ) . '/includes/class-rrb2b-woo.php';
require_once dirname( __FILE__ ) . '/includes/class-rrb2b-rules.php';

if(is_admin()) {
    new Admin();
}

/**
 * Install
 */
function rrb2b_install() {

	global $wp_version;

	if ( version_compare( $wp_version, '4.1', '<' ) ) {
		wp_die( 'This plugin require WordPress 4.1 or higher.' );
	}

	$rrb2b_options_arr = array(
		'rrb2b_net_price_b2b'            => '',
		'rrb2b_net_price_b2b_list'       => array(),
		'rrb2b_auth_new_customer'        => '',
		'rrb2b_tax_exempt_list'          => '',
		'rrb2b_force_b2b_variable_price' => '',
	);

	update_option( 'rrb2b_options', $rrb2b_options_arr );

	set_transient( 'rrb2b-admin-notice-activated', true );

	flush_rewrite_rules();
}

/**
 * Deactivate
 */
function rrb2b_deactivate() {

	flush_rewrite_rules();

}

/**
 * Uninstall
 */
function rrb2b_uninstall() {

}

/**
 * Roles & Rules
 */
function rrb2b_plugin_roles_page() {

	if ( class_exists( 'WooCommerce' ) ) {	

		include_once dirname( __FILE__ ) . '/includes/class-rrb2b-templates.php';

		$main = new Rrb2b_Templates();
		$main->rrb2b_get_main_page();

	}
}

/**
 * Load languages
 */
function rrb2b_load_textdomain() {
	//unload_textdomain( 'woo-roles-rules-b2b' );
	load_plugin_textdomain( 'woo-roles-rules-b2b', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
}
add_action( 'plugins_loaded', 'rrb2b_load_textdomain' );

