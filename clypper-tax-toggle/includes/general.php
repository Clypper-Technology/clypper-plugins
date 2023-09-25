<?php

/**
 * General
 *
 * @package WordPress
 * @subpackage wc-tax
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
		function wpa83367_price_html($price, $product)
		{
			if (!wc_get_price_including_tax($product)) {
				return $price;
			}

			// Check if the product is taxable and get the tax class.
			$tax_status = $product->is_taxable();
			$product_tax_class = $product->get_tax_class();

			// Get custom text options or use defaults.
			$wootax_text = get_option('wc_tax_text', __('VAT', 'wc-tax'));
			$wc_incl = __('Inkl.', 'wc-tax');
			$wc_excl = __('Ekskl.', 'wc-tax');
			$wc_zero = __('Ingen Moms', 'wc-tax');
			$wc_from = __('Fra', 'wc-tax');

			// Define decimals and price formatting.
			$dp = wc_get_price_decimals();
			$currency_symbol = null;
			$price_args = ['qty' => 1, 'price' => $product->get_regular_price()];

			// Calculate prices with and without tax.
			$value_including_tax = wc_price(wc_format_decimal(wc_get_price_including_tax($product) * 1, $dp));
			$value_excluding_tax = wc_price(wc_format_decimal(wc_get_price_excluding_tax($product) * 1, $dp));

			// Define suffix messages.
			$wootax_incl_message = '<span class="wootax-suffix">' . $wc_incl . ' ' . $wootax_text . '</span>';
			$wootax_excl_message = '<span class="wootax-suffix">' . $wc_excl . ' ' . $wootax_text . '</span>';

			// Default Toggle Tax display.
			$default = '<span class="amount product-tax-on product-tax" style="display:none;" title="With ' . $wootax_text . ' added">' . ($product->has_child() ? $wc_from . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_including_tax) . ' ' . $wootax_incl_message . '</span><span class="amount product-tax-off product-tax" title="With ' . $wootax_text . ' removed">' . ($product->has_child() ? $wc_from . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_excluding_tax) . ' ' . $wootax_excl_message . '</span>';

			// Handle variable products and sale prices.
			if ($product->is_type('variable') && (!$tax_status || in_array($product_tax_class, ['zero-rate', 'shipping']))) {
				return '<span class="amount product-tax-on product-tax" style="display:none;">' . ($product->has_child() ? $wc_from . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_including_tax) . '</span><span class="amount product-tax-off product-tax">' . ($product->has_child() ? $wc_from . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, $value_excluding_tax) . '</span>';
			} elseif ($product->get_sale_price()) {
				return '<del><span class="amount product-tax-on product-tax" style="display:none;" title="With ' . $wootax_text . ' added">' . ($product->has_child() ? __('From', 'wc-tax') . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, wc_price(wc_format_decimal(wc_get_price_including_tax($product, $price_args) * 1, $dp))) . ' ' . $wootax_incl_message . '</span><span class="amount product-tax-off product-tax" title="With ' . $wootax_text . ' removed">' . ($product->has_child() ? $wc_from . ' ' : '') . sprintf(get_woocommerce_price_format(), $currency_symbol, wc_price(wc_format_decimal(wc_get_price_excluding_tax($product, $price_args) * 1, $dp))) . ' ' . $wootax_excl_message . '</span></del><ins>' . $default . '</ins>';
			}

			return $default;
		}

		add_filter('woocommerce_get_price_html', 'wpa83367_price_html', 100, 99);
	}