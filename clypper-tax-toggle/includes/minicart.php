<?php
	/**
	 * Minicart
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	if (!defined('ABSPATH')) {
		exit; // Exit if accessed directly
	}

// Avoid including files when in admin area, except for AJAX requests.
	if (is_admin() && !defined('DOING_AJAX')) {
		return;
	}

// Make sure Price_Formatter class is loaded.
	require_once __DIR__ . '/price-formatter.php';

// Override WooCommerce cart item quantity HTML.
	function clypper_cart_override($product_price, $cart_item, $cart_item_key) {
		$price_formatter = Price_Formatter::get_instance();
		return $price_formatter->format_price_cart($cart_item['data'], $cart_item['quantity']);
	}
	add_filter('woocommerce_widget_cart_item_quantity', 'clypper_cart_override', 100, 3);

// Modify the cart subtotal HTML.
	function clypper_cart_subtotal_html($cart_subtotal, $compound, $cart) {
		// Only modify the cart subtotal in specific contexts.
		if (is_cart() || is_checkout() || defined('WOOCOMMERCE_CHECKOUT')) {
			return $cart_subtotal;
		}

		$price_formatter = Price_Formatter::get_instance();

		$value = ($compound) ? $cart->cart_contents_total + $cart->shipping_total + $cart->get_taxes_total(false, false) : $cart->subtotal;
		$value_ex = ($compound) ? $cart->cart_contents_total + $cart->shipping_total - $cart->get_taxes_total(false, false) : $cart->subtotal_ex_tax;
		return $price_formatter->format_cart_subtotal($value, $value_ex);
	}
	add_filter('woocommerce_cart_subtotal', 'clypper_cart_subtotal_html', 100, 3);
