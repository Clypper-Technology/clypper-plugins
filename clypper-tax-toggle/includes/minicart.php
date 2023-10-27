<?php
	/**
	 * Minicart
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	if (!is_admin() || defined('DOING_AJAX')) {

		/**
		 * Fetches the tax text.
		 *
		 * @return string Tax text.
		 */

		function get_clypper_tax_text($withTax): string {

			$options = get_option('clypper_tax_options');

			$label_incl = $options['clypper_tax_field_incl'] ?? __('', 'clypper-tax');
			$label_excl = $options['clypper_tax_field_excl'] ?? __('', 'clypper-tax');

			return $withTax ? $label_incl : $label_excl;
		}

		/**
		 * Formats the price display.
		 */
		function format_price_display($value, $prefix = '', $withTax = true): string {
			$suffix = $withTax ? get_clypper_tax_text($withTax) : '';
			$class = $withTax ? 'product-tax-on' : 'product-tax-off';
			return '<span style="display:none;" class="amount ' . $class . ' product-tax">' . $prefix . ' ' . wc_price($value) . ' ' . $suffix . '</span>';
		}

		/**
		 * Mini Cart
		 */
		function clypper_cart_override($product_price, $cart_item): string {

			$_product = $cart_item['data'];
			$product_quantity = $cart_item['quantity'];

			// Calculate base prices (not multiplied by quantity)
			$base_value = wc_format_decimal(wc_get_price_including_tax($_product));
			$base_value_ex = wc_format_decimal(wc_get_price_excluding_tax($_product));

			if (in_array($_product->get_tax_class(), ['zero-rate', 'shipping']) || !$_product->is_taxable()) {
				return format_price_display($base_value, $product_quantity . 'x', true) . format_price_display($base_value_ex, $product_quantity . 'x', false);
			} else {
				return format_price_display($base_value, $product_quantity . 'x', true) . format_price_display($base_value_ex, $product_quantity . 'x', false);
			}
		}
		add_filter('woocommerce_widget_cart_item_quantity', 'clypper_cart_override', 100, 3);

		/**
		 * Variation Prices
		 */
		function clypper_variation_price_html($price, $variation): string {
			return format_price_display(wc_format_decimal(wc_get_price_including_tax($variation))) . format_price_display(wc_format_decimal(wc_get_price_excluding_tax($variation)), '', false);
		}
		add_filter('woocommerce_variation_price_html', 'clypper_variation_price_html', 100, 2);

		/**
		 * Variation Sale Price
		 */
		function clypper_variation_sale_price_html($price, $variation): string {
			return format_price_display(wc_format_decimal(wc_get_price_including_tax($variation))) . format_price_display(wc_format_decimal(wc_get_price_excluding_tax($variation)), '', false);
		}
		add_filter('woocommerce_variation_sale_price_html', 'clypper_variation_sale_price_html', 100, 2);

		/**
		 * Cart Subtotal
		 */
		function clypper_cart_subtotal_html($cart_subtotal, $compound, $cart): string {
			if (is_cart() || is_checkout() || defined('WOOCOMMERCE_CHECKOUT')) {
				return $cart_subtotal;
			}

			$value = ($compound) ? $cart->cart_contents_total + $cart->shipping_total + $cart->get_taxes_total(false) : $cart->subtotal;
			$value_ex = ($compound) ? $cart->cart_contents_total + $cart->shipping_total - $cart->get_taxes_total(false) : $cart->subtotal_ex_tax;

			return format_price_display(wc_format_decimal($value)) . format_price_display(wc_format_decimal($value_ex), '', false);
		}
		add_filter('woocommerce_cart_subtotal', 'clypper_cart_subtotal_html', 100, 3);
	}
