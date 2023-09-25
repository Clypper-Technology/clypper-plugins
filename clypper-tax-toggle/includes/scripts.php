<?php
/**
 * Enqueue Scripts
 *
 * @package WordPress
 * @subpackage wc-tax
 * @since 1.2.4
 */

 /**
  * Equeue Styles.
  */
function wootax_stylesheet() {
	wp_enqueue_style( 'clypper-tax-toggle', WOOTAX_URL . '/assets/css/clypper-tax-toggle.css', array(), WOOTAX_VERSION_NUM, 'all' );
}
add_action( 'wp_enqueue_scripts', 'wootax_stylesheet', 99 );

/**
 * Enqueue Scripts.
 */
function wootax_scripts() {

	wp_enqueue_script( 'clypper-tax-toggle', WOOTAX_URL . '/assets/js/clypper-tax-toggle.js', array( 'jquery' ), WOOTAX_VERSION_NUM, true );

}
add_action( 'wp_enqueue_scripts', 'wootax_scripts', 99 );
