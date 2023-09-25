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
	wp_enqueue_style( 'wcvat-css', WOOTAX_URL . '/assets/css/wcvat.css', array(), WOOTAX_VERSION_NUM, 'all' );
}
add_action( 'wp_enqueue_scripts', 'wootax_stylesheet', 99 );

/**
 * Enqueue Scripts.
 */
function wootax_scripts() {

	wp_enqueue_script( 'wcvat-js', WOOTAX_URL . '/assets/js/wcvat.js', array( 'jquery' ), WOOTAX_VERSION_NUM, true );

}
add_action( 'wp_enqueue_scripts', 'wootax_scripts', 99 );
