<?php

	/*
	Plugin Name: Clypper One-Page Checkout
	Description: Overrides the default WooCommerce checkout to provide a one-page checkout experience.
	Version: 1.0
	Author: Clypper von H
	*/

// Ensure WooCommerce is active
	if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {
		// Your plugin code will go here
	}

	function clypper_enqueue_scripts() {
		wp_enqueue_style('clypper-one-page-checkout', plugin_dir_url(__FILE__) . 'clypper-one-page-checkout.css', array(), '1.0');
	}
	add_action('wp_enqueue_scripts', 'clypper_enqueue_scripts');