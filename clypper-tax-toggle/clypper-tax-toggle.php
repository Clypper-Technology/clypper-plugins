<?php
	/**
	 *
	 *  Clypper Tax Toggle
	 *
	 * @package           clypper-tax
	 * @author            Clypper von H
	 *
	 * @wordpress-plugin
	 * Plugin Name: Clypper Tax Toggle
	 * Description: Adds a Tax Toggle to WooCommerce Sites to show prices with and without tax.
	 * Version: 1.3.8
	 * Author: Clypper von H
	 * License: GPLv2 or later
	 * Text Domain: clypper-tax
	 * Requires PHP: 5.6
	 * Requires at least: 5.0
	 * Tested up to: 5.8.1
	 * WC requires at least: 2.6.0
	 * WC tested up to: 5.8
	 */

	if ( ! defined( 'ABSPATH' ) ) {
		exit; // Exit if accessed directly.
	}

// ... (rest of the code remains unchanged) ...

	/**
	 * Plugin Initializer.
	 */
	function clypperplugin_init() {
		$plugin_dir = basename( dirname( __FILE__ ) );
		load_plugin_textdomain( 'clypper-tax', false, $plugin_dir );
	}
	add_action( 'plugins_loaded', 'clypperplugin_init' );

	/**
	 * Get version number from this plugin version.
	 */
	function clypper_get_version() {
		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		$plugin_folder = get_plugins( '/' . plugin_basename( dirname( __FILE__ ) ) );
		$plugin_file   = basename( ( __FILE__ ) );
		return $plugin_folder[ $plugin_file ]['Version'];
	}

	define( 'CLYPPER_TAX_NAME', trim( dirname( plugin_basename( __FILE__ ) ), '/' ) );
	define( 'CLYPPER_TAX_DIR', plugin_dir_url( __FILE__ ) . '/' . CLYPPER_TAX_NAME );
	define( 'CLYPPER_TAX_URL', plugins_url() . '/' . CLYPPER_TAX_NAME );
	define( 'CLYPPER_TAX_VERSION_NUM', clypper_get_version() );
	add_option( 'CLYPPER_TAX_VERSION_KEY', 'CLYPPER_TAX_VERSION_NUM' );

	if ( ! function_exists( 'is_woocommerce_activated' ) ) {
		/**
		 * See if WooCommerce is active.
		 */
		function is_woocommerce_activated() {
			include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
			if ( is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
				return true;
			} else {
				return false;
			}
		}
	}


	if ( is_woocommerce_activated() ) {
		require_once 'includes/scripts.php';
		require_once 'includes/toggle.php';
		require_once 'includes/general.php';
		require_once 'includes/minicart.php';
	}


	if ( ! function_exists( 'wc_tax_enabled' ) ) {
		/**
		 * Are store-wide taxes enabled?
		 *
		 * @return bool
		 */
		function wc_tax_enabled() {
			return apply_filters( 'wc_tax_enabled', get_option( 'woocommerce_calc_taxes' ) === 'yes' );
		}
	}

	if ( ! is_woocommerce_activated() ) {
		/**
		 * Require WooCommerce.
		 */
		function requirement_wc_notice() {
			include( 'views/html-notice-requirement-wc.php' );
		}
		add_action( 'admin_notices', 'requirement_wc_notice', 10 );
	}


	if ( ! wc_tax_enabled() ) {
		/**
		 * Require Tax to be enabled in WooCommerce.
		 */
		function requirement_tax_notice() {
			include( 'views/html-notice-requirement-tax.php' );
		}
		add_action( 'admin_notices', 'requirement_tax_notice', 10 );
	}

	add_action( 'before_woocommerce_init', function() {
		if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
		}
	} );
