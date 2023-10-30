<?php

	/**
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	if (!defined('ABSPATH')) {
		exit; // Exit if accessed directly
	}

	if (is_admin() && !defined('DOING_AJAX')) {
		return;
	}

	include_once 'priceformatter.php';

	$price_formatter = Price_Formatter::get_instance();

	function clypper_price_html($price, $product)
	{
		if (!wc_get_price_including_tax($product)) {
			return $price;
		}

		// Check if the product is taxable and get the tax class.
		$tax_status = $product->is_taxable();
		$product_tax_class = $product->get_tax_class();

		// Get custom text options or use defaults.
		$label_incl = get_option('wc_clypper_tax_included_label');
		$label_excl = get_option('wc_clypper_tax_excluded_label');
		$zero_label = get_option('wc_clypper_tax_zero_label');
		$from_label = get_option('wc_clypper_from_label');

		// Define decimals and price formatting.
		$dp = wc_get_price_decimals();
		$currency_symbol = null;
		$price_args = ['qty' => 1, 'price' => $product->get_regular_price()];

		// Calculate prices with and without tax.
		$value_including_tax = wc_price(wc_format_decimal(wc_get_price_including_tax($product) * 1, $dp));
		$value_excluding_tax = wc_price(wc_format_decimal(wc_get_price_excluding_tax($product) * 1, $dp));

		// Define suffix messages.
		$tax_incl_message = '<span class="clypper-tax-suffix">' . $label_incl . '</span>';
		$tax_excl_message = '<span class="clypper-tax-suffix">' . $label_excl . '</span>';

		// Default Toggle Tax display.
		$default =
			'<span class="amount product-tax-on product-tax" style="display:none;">' .
			($product->has_child() ? $from_label . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_including_tax) . ' ' . $tax_incl_message . '
			</span>
			<span class="amount product-tax-off product-tax">' .
			($product->has_child() ? $from_label . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_excluding_tax) . ' ' . $tax_excl_message .
			'</span>';

		// Handle variable products and sale prices.
		if ($product->is_type('variable') && (!$tax_status || in_array($product_tax_class, ['zero-rate', 'shipping']))) {

			return
				'<span class="amount product-tax-on product-tax" style="display:none;">' .
				($product->has_child() ? $from_label . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_including_tax) .
				'</span>
				<span class="amount product-tax-off product-tax">' .
				($product->has_child() ? $from_label . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_excluding_tax) .
				'</span>';

		} elseif ($product->get_sale_price()) {

			return
				'<del>
					<span class="amount product-tax-on product-tax" style="display:none;">' .
				($product->has_child() ? $from_label . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, wc_price(wc_format_decimal(wc_get_price_including_tax($product, $price_args) * 1, $dp))) . ' ' . $tax_incl_message .
				'</span>
					<span class="amount product-tax-off product-tax">' .
				($product->has_child() ? $from_label . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, wc_price(wc_format_decimal(wc_get_price_excluding_tax($product, $price_args) * 1, $dp))) . ' ' . $tax_excl_message .
				'</span>
				</del>
				<ins>' . $default . '</ins>';
		}

		return $default;
	}

	add_filter('woocommerce_get_price_html', 'clypper_price_html', 100, 99);

	//Variation Prices
	function clypper_variation_price_html($price, $variation): string {

		global $price_formatter;

		return $price_formatter->price_element(wc_format_decimal(wc_get_price_including_tax($variation))) . $price_formatter->price_element(wc_format_decimal(wc_get_price_excluding_tax($variation)), '','', false);
	}
	add_filter('woocommerce_variation_price_html', 'clypper_variation_price_html', 100, 2);

//Variation Sale Price
	function clypper_variation_sale_price_html($price, $variation): string {

		global $price_formatter;

		return $price_formatter->price_element(wc_format_decimal(wc_get_price_including_tax($variation))) . $price_formatter->price_element(wc_format_decimal(wc_get_price_excluding_tax($variation)), '', '', false);
	}
	add_filter('woocommerce_variation_sale_price_html', 'clypper_variation_sale_price_html', 100, 2);
