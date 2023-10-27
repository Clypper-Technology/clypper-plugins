<?php

	/**
	 * General
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	if (!defined('ABSPATH')) {
		exit; // Exit if accessed directly
	}

	if (!defined('ABSPATH')) {
		exit; // Exit if accessed directly
	}

	if (!is_admin() || defined('DOING_AJAX')) {
		/**
		 * Update WooCommerce Price.
		 */
		function clypper_price_html($price, $product)
		{
			if (!wc_get_price_including_tax($product)) {
				return $price;
			}

			// Check if the product is taxable and get the tax class.
			$tax_status = $product->is_taxable();
			$product_tax_class = $product->get_tax_class();

			// Get custom text options or use defaults.
			$tax_text = get_option('clypper-tax_text', __('Moms', 'clypper-tax'));
			$incl_text = __('Inkl.', 'clypper-tax');
			$excl_text = __('Ekskl.', 'clypper-tax');
			$zero_text = __('Ingen Moms', 'clypper-tax');
			$from_text = __('Fra', 'clypper-tax');

			// Define decimals and price formatting.
			$dp = wc_get_price_decimals();
			$currency_symbol = null;
			$price_args = ['qty' => 1, 'price' => $product->get_regular_price()];

			// Calculate prices with and without tax.
			$value_including_tax = wc_price(wc_format_decimal(wc_get_price_including_tax($product) * 1, $dp));
			$value_excluding_tax = wc_price(wc_format_decimal(wc_get_price_excluding_tax($product) * 1, $dp));

			// Define suffix messages.
			$tax_incl_message = '<span class="clypper-tax-suffix">' . $incl_text . ' ' . $tax_text . '</span>';
			$tax_excl_message = '<span class="clypper-tax-suffix">' . $excl_text . ' ' . $tax_text . '</span>';

			// Default Toggle Tax display.
			$default = '<span class="amount product-tax-on product-tax" style="display:none;" title="With ' . $tax_text . ' added">' . ($product->has_child() ? $from_text . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_including_tax) . ' ' . $tax_incl_message . '</span><span class="amount product-tax-off product-tax" title="With ' . $tax_text . ' removed">' . ($product->has_child() ? $from_text . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_excluding_tax) . ' ' . $tax_excl_message . '</span>';

			// Handle variable products and sale prices.
			if ($product->is_type('variable') && (!$tax_status || in_array($product_tax_class, ['zero-rate', 'shipping']))) {
				return '<span class="amount product-tax-on product-tax" style="display:none;">' . ($product->has_child() ? $from_text . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_including_tax) . '</span><span class="amount product-tax-off product-tax">' . ($product->has_child() ? $from_text . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_excluding_tax) . '</span>';
			} elseif ($product->get_sale_price()) {
				return '<del><span class="amount product-tax-on product-tax" style="display:none;" title="With ' . $tax_text . ' added">' . ($product->has_child() ? __('From', 'wc-tax') . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, wc_price(wc_format_decimal(wc_get_price_including_tax($product, $price_args) * 1, $dp))) . ' ' . $tax_incl_message . '</span><span class="amount product-tax-off product-tax" title="With ' . $tax_text . ' removed">' . ($product->has_child() ? $from_text . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, wc_price(wc_format_decimal(wc_get_price_excluding_tax($product, $price_args) * 1, $dp))) . ' ' . $tax_excl_message . '</span></del><ins>' . $default . '</ins>';
			}

			return $default;
		}

		add_filter('woocommerce_get_price_html', 'clypper_price_html', 100, 99);
	}