<?php

	if (!defined('ABSPATH')) {
		exit; // Exit if accessed directly
	}

	if (is_admin() && !defined('DOING_AJAX')) {
		return;
	}

	require_once 'price-formatter.php';

	$price_formatter = Price_Formatter::get_instance();

	function clypper_price_html($price, $product)
	{
		if (!wc_get_price_including_tax($product)) {
			return $price;
		}

		global $price_formatter;

		return $price_formatter->format_price($product);
	}

	add_filter('woocommerce_get_price_html', 'clypper_price_html', 100, 99);

	//Variation Prices
	function clypper_variation_price_html($price, $variation): string {

		global $price_formatter;

		return $price_formatter->format_price($variation);
	}
	add_filter('woocommerce_variation_price_html', 'clypper_variation_price_html', 100, 2);

//Variation Sale Price
	function clypper_variation_sale_price_html($price, $variation): string {

		global $price_formatter;

		return $price_formatter->format_price($variation);
	}
	add_filter('woocommerce_variation_sale_price_html', 'clypper_variation_sale_price_html', 100, 2);
