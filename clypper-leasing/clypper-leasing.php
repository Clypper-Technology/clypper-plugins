<?php
	/*
	Plugin Name: Clypper Leasing
	Description: Displays custom templates for WooCommerce products based on category and price selection.
	Version: 1.0
	Author: Your Name
	*/

// Define constants for plugin directory paths
	define('CL_DIR', plugin_dir_path(__FILE__));
	define('CL_URL', plugin_dir_url(__FILE__));

// Include other required files
	require_once CL_DIR . 'admin-settings.php';
	require_once CL_DIR . 'template-selection.php';
	require_once CL_DIR . 'shortcodes/leasing-form.php';

	function cl_enqueue_plugin_styles() {
		wp_enqueue_style('clypper-leasing-style', CL_URL . "assets/css/clypper-leasing.css");
	}

	add_action('wp_enqueue_scripts', 'cl_enqueue_plugin_styles');
