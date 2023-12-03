<?php
	/**
	 * Enqueue Scripts
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	function clypper_scripts() {
		wp_enqueue_script( 'clypper-tax-toggle', CLYPPER_TAX_URL . '/assets/js/clypper-tax-toggle.js', array( 'jquery' ), CLYPPER_TAX_VERSION_NUM, true );
	}
	add_action( 'wp_enqueue_scripts', 'clypper_scripts', 99 );

	function clypper_enqueue_admin_scripts($hook) {
		if ('woocommerce_page_wc-settings' !== $hook) {
			return;
		}
		wp_enqueue_script('clypper-tax-toggle-admin-js', CLYPPER_TAX_URL . '/assets/js/clypper-tax-toggle-admin.js', array('jquery'), CLYPPER_TAX_VERSION_NUM, true);
	}
	add_action('admin_enqueue_scripts', 'clypper_enqueue_admin_scripts');

function clypper_enqueue_custom_styles() {

    $toggle_wrapper_background = get_option('wc_clypper_toggle_background_color'); // Default to black if not set
    $active_element = get_option('wc_clypper_active_element_color'); // Default to dark gray if not set
    $toggle_text = get_option('wc_clypper_toggle_text_color');

    $popup_background = get_option('wc_clypper_popup_background_color');
    $with_tax_button_color = get_option('wc_clypper_with_tax_button_color');
    $with_tax_button_text_color = get_option('wc_clypper_with_tax_button_text_color');
    $without_tax_button_color = get_option('wc_clypper_without_tax_button_color');
    $without_tax_button_text_color = get_option('wc_clypper_without_tax_button_text_color');

    $custom_css = "
        :root {
            --clypper-toggle-wrapper-background-color: {$toggle_wrapper_background};
            --clypper-active-toggle-element-color: {$active_element};
            --clypper-toggle-text-color: {$toggle_text};
            --clypper-popup-background-color: {$popup_background};
            --clypper-with-tax-button-color: {$with_tax_button_color};
            --clypper-with-tax-button-text-color: {$with_tax_button_text_color};
            --clypper-without-tax-button-color: {$without_tax_button_color};
            --clypper-without-tax-button-text-color: {$without_tax_button_text_color};
        }";

    wp_enqueue_style( 'clypper-tax-toggle', CLYPPER_TAX_URL . '/assets/css/clypper-tax-toggle.css', array(), CLYPPER_TAX_VERSION_NUM, 'all');
    wp_add_inline_style('clypper-tax-toggle', $custom_css);
}
add_action('wp_enqueue_scripts', 'clypper_enqueue_custom_styles');
