<?php

	/**
	 * Plugin Name: Clypper Tax Toggle
	 * Description: Adds a Tax Toggle to WooCommerce Sites to show prices with and without tax.
	 * Version: 1.4.1
	 * Author: Clypper von H
	 * License: GPLv2 or later
	 * Text Domain: clypper-tax
	 * Requires PHP: 5.6
	 * Requires at least: 5.0
	 * Tested up to: 5.8.1
	 * WC requires at least: 2.6.0
	 * WC tested up to: 5.8
	 */

	if (!defined('ABSPATH')) {
		exit;
	}

// Initialize the plugin text domain for translation.
	function clypperplugin_init() {
		load_plugin_textdomain('clypper-tax', false, basename(dirname(__FILE__)));
	}
	add_action('woocommerce_init', 'clypperplugin_init');

// Define plugin constants.
	define('CLYPPER_TAX_NAME', trim(dirname(plugin_basename(__FILE__)), '/'));
	define('CLYPPER_TAX_DIR', plugin_dir_url(__FILE__) . '/' . CLYPPER_TAX_NAME);
	define('CLYPPER_TAX_URL', plugins_url() . '/' . CLYPPER_TAX_NAME);
	define('CLYPPER_TAX_VERSION_NUM', '1.4.1'); // Set the version number manually.

// Check for WooCommerce and load additional files if active.
	add_action('plugins_loaded', function() {
		if (class_exists('WooCommerce')) {
			require_once __DIR__ . '/admin/settings.php';
			require_once __DIR__ . '/templates/toggle.php';
			require_once __DIR__ . '/includes/scripts.php';
			require_once __DIR__ . '/includes/general-prices.php';
			require_once __DIR__ . '/includes/minicart.php';
		} else {
			add_action('admin_notices', function() {
				include 'views/html-notice-requirement-wc.php';
			});
		}
	});

// Check if WooCommerce tax is enabled.
	add_action('plugins_loaded', function() {
		if (function_exists('wc_tax_enabled') && !wc_tax_enabled()) {
			add_action('admin_notices', function() {
				include 'views/html-notice-requirement-tax.php';
			});
		}
	});

// Declare compatibility with WooCommerce features.
	add_action('before_woocommerce_init', function() {
		if (class_exists(\Automattic\WooCommerce\Utilities\FeaturesUtil::class)) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility('custom_order_tables', __FILE__, true);
		}
	});
