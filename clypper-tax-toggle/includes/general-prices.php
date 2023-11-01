<?php

	if (!defined('ABSPATH')) {
		exit; // Exit if accessed directly
	}

	if (is_admin() && !defined('DOING_AJAX')) {
		return;
	}

	require_once __DIR__ . '/price-formatter.php';

	function clypper_price_html($price, $product)
	{
		if (!wc_get_price_including_tax($product)) {
			return $price;
		}

		$price_formatter = Price_Formatter::get_instance();

		return $price_formatter->format_price($product);
	}

	add_filter('woocommerce_get_price_html', 'clypper_price_html', 100, 99);

	//Variation Prices
	function clypper_variation_price_html($price, $variation): string {

		$price_formatter = Price_Formatter::get_instance();

		return $price_formatter->format_price($variation);
	}
	add_filter('woocommerce_variation_price_html', 'clypper_variation_price_html', 100, 2);

//Variation Sale Price
	function clypper_variation_sale_price_html($price, $variation): string {

		$price_formatter = Price_Formatter::get_instance();

		return $price_formatter->format_price($variation);
	}
	add_filter('woocommerce_variation_sale_price_html', 'clypper_variation_sale_price_html', 100, 2);
