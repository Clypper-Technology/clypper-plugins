<?php

	class Price_Formatter {
		private static $instance = null;
		private $label_incl;
		private $label_excl;
		private $from_label;
		private $zero_label;

		public static function get_instance(): Price_Formatter {
			return self::$instance ?? self::$instance = new self();
		}

		private function __construct() {
			$this->label_incl = get_option('wc_clypper_tax_included_label');
			$this->label_excl = get_option('wc_clypper_tax_excluded_label');
			$this->from_label = get_option('wc_clypper_from_label');
			$this->zero_label = get_option("wc_clypper_tax_zero_label");
		}

		private function get_price($product, $withTax = true, $args = []) {
			return $withTax ? wc_get_price_including_tax($product, $args) : wc_get_price_excluding_tax($product, $args);
		}

		public function format_price_cart($product, $quantity): string
		{
			// Calculate base prices (not multiplied by quantity)
			$base_value = $this->get_price($product);
			$base_value_ex = $this->get_price($product,false);

			return $this->single_price_element($base_value, $quantity . 'x', '') .
			       $this->single_price_element($base_value_ex, $quantity . 'x', '', false);
		}

		public function format_cart_subtotal($subtotal_tax, $subtotal_excl_tax, $suffixes = false): string {

			$subtotal_tax = wc_format_decimal($subtotal_tax);
			$subtotal_excl_tax = wc_format_decimal($subtotal_excl_tax);

			if($suffixes) {
				$this->single_price_element($subtotal_tax, '', $this->label_incl) .
				$this->single_price_element($subtotal_excl_tax, '', $this->label_excl, false);
			}
			return $this->single_price_element($subtotal_tax) .
			       $this->single_price_element($subtotal_excl_tax, '', '', false);
		}

		public function format_price($product): string {

			// Calculate prices with and without tax.
			$price_tax = $this->get_price($product);
			$price_excl_tax = $this->get_price($product, false);

			// Handle variable products and sale prices.
			if(!$product->is_taxable() || $product->get_tax_class() === 'zero-rate' || $product->get_tax_class() === 'shipping') {

				return $this->single_price_element($price_tax, '', $this->zero_label) .
				       $this->single_price_element($price_excl_tax, '', $this->zero_label, false);

			} elseif($product->get_sale_price()) {

				return $this->sale_price_element($product);

			} elseif ($product->is_type('variable')) {

				return $this->price_element($price_tax, $price_excl_tax, $this->from_label);

			}

			return $this->price_element($price_tax, $price_excl_tax);
		}

		private function sale_price_element($product): string {

			$price_args = ['qty' => 1, 'price' => $product->get_regular_price()];

			// Calculate sale prices with and without tax.
			$sale_price_tax = $this->get_price($product);
			$sale_price_excl_tax = $this->get_price($product, false);
			$regular_price_tax = $this->get_price($product, true, $price_args);
			$regular_price_excl_tax = $this->get_price($product, false, $price_args);

			if($product->is_type('variable')) {
				$regular_prices_html = $this->price_element($sale_price_tax, $sale_price_excl_tax, $this->from_label);
				$sale_prices_html = $this->price_element($regular_price_tax, $regular_price_excl_tax, $this->from_label);
			} else {
				$regular_prices_html = $this->price_element($sale_price_tax, $sale_price_excl_tax);
				$sale_prices_html = $this->price_element($regular_price_tax, $regular_price_excl_tax);
			}

			return "<del>{$regular_prices_html}</del><ins>{$sale_prices_html}</ins>";
		}

		private function price_element($price_tax, $price_excl_tax, $prefix = ''): string {
			return $this->single_price_element($price_tax, $prefix, $this->label_incl) . $this->single_price_element($price_excl_tax, $prefix, $this->label_excl, false);
		}

		private function single_price_element($price, $prefix = '', $suffix ='', $withTax = true): string
		{
			$class = $withTax ? 'product-tax-on' : 'product-tax-off';
			return '<span class="amount ' . $class . ' product-tax">' . $prefix . ' ' . wc_price($price) . ' ' . $suffix . '</span>';
		}
	}
