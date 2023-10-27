<?php
	/**
	 * Enqueue Scripts
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	/**
	 * Enqueue Styles.
	 */
	function clypper_stylesheet() {
		wp_enqueue_style( 'clypper-tax-toggle', CLYPPER_TAX_URL . '/assets/css/clypper-tax-toggle.css', array(), CLYPPER_TAX_VERSION_NUM, 'all' );
	}
	add_action( 'wp_enqueue_scripts', 'clypper_stylesheet', 99 );

	/**
	 * Enqueue Scripts.
	 */
	function clypper_scripts() {

		wp_enqueue_script( 'clypper-tax-toggle', CLYPPER_TAX_URL . '/assets/js/clypper-tax-toggle.js', array( 'jquery' ), CLYPPER_TAX_VERSION_NUM, true );

	}
	add_action( 'wp_enqueue_scripts', 'clypper_scripts', 99 );
