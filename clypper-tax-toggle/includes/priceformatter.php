<?php

	class Price_Formatter {
		private static $instance = null;
		private $label_incl;
		private $label_excl;
		private $from_label;

		public static function get_instance() {
			return self::$instance ?? self::$instance = new self();
		}

		private function __construct() {
			$this->label_incl = get_option('wc_clypper_tax_included_label');
			$this->label_excl = get_option('wc_clypper_tax_excluded_label');
			$this->from_label = get_option('wc_clypper_from_label');
		}

		public function format_price_cart($product, $quantity): string
		{
			// Calculate base prices (not multiplied by quantity)
			$base_value = wc_format_decimal(wc_get_price_including_tax($product));
			$base_value_ex = wc_format_decimal(wc_get_price_excluding_tax($product));

			return $this->price_element($base_value, $quantity . 'x', '') . $this->price_element($base_value_ex, $quantity . 'x', '', false);
		}

		private function get_price_with_tax($product, $args = []) {
			$dp = wc_get_price_decimals();
			return wc_format_decimal(wc_get_price_including_tax($product, $args), $dp);
		}

		private function get_price_without_tax($product, $args = []) {
			$dp = wc_get_price_decimals();
			return wc_format_decimal(wc_get_price_excluding_tax($product, $args), $dp);
		}

		public function format_price($product) {
			// Check if the product is taxable and get the tax class.
			$tax_status = $product->is_taxable();
			$product_tax_class = $product->get_tax_class();

			// Calculate prices with and without tax.
			$price_tax = $this->get_price_with_tax($product);
			$price_excl_tax = $this->get_price_without_tax($product);

			// Default Toggle Tax display.
			$default = $this->price_element($price_tax, '', $this->label_incl) . $this->price_element($price_excl_tax, '', $this->label_excl, false);

			// Handle variable products and sale prices.
			if ($product->is_type('variable') && (!$tax_status || in_array($product_tax_class, ['zero-rate', 'shipping']))) {
				return $this->price_element($price_tax, $this->from_label, $this->label_excl) . $this->price_element($price_excl_tax, $this->from_label, $this->label_excl, false);
			} elseif($product->get_sale_price()) {
				return $this->sale_price_element($product);
			}

			return $default;
		}

		private function sale_price_element($product) {
			$price_args = ['qty' => 1, 'price' => $product->get_regular_price()];

			// Calculate sale prices with and without tax.
			$sale_price_tax = $this->get_price_with_tax($product);
			$sale_price_excl_tax = $this->get_price_without_tax($product);
			$regular_price_tax = $this->get_price_with_tax($product, $price_args);
			$regular_price_excl_tax = $this->get_price_without_tax($product, $price_args);

			// HTML for sale and regular prices.
			$regular_prices_html = $this->price_element($regular_price_tax, '', $this->label_incl) . $this->price_element($regular_price_excl_tax, '', $this->label_excl, false);
			$sale_prices_html = $this->price_element($sale_price_tax, '', $this->label_incl) . $this->price_element($sale_price_excl_tax, '', $this->label_excl, false);

			return "<del>{$regular_prices_html}</del><ins>{$sale_prices_html}</ins>";
		}

		public function price_element($price, $prefix = '', $suffix ='', $withTax = true): string
		{
			$class = $withTax ? 'product-tax-on' : 'product-tax-off';
			return '<span class="amount ' . $class . ' product-tax">' . $prefix . ' ' . wc_price($price) . ' ' . $suffix . '</span>';
		}
	}
