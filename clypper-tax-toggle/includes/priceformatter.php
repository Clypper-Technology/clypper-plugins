<?php

class Price_Formatter {
    private static $instance = null;
	private $label_incl;
	private $label_excl;
	private $zero_label;
	private $from_label;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new Price_Formatter();
        }

        return self::$instance;
    }

    private function __construct() {
	    $this->label_incl= get_option('wc_clypper_tax_included_label');
	    $this->label_excl = get_option('wc_clypper_tax_excluded_label');
	    $this->zero_label = get_option('wc_clypper_tax_zero_label');
	    $this->from_label = get_option('wc_clypper_from_label');
    }

    public function format_price_cart($product, $quantity): string
    {
        // Calculate base prices (not multiplied by quantity)
        $base_value = wc_format_decimal(wc_get_price_including_tax($product));
        $base_value_ex = wc_format_decimal(wc_get_price_excluding_tax($product));

        return $this->price_element($base_value, $quantity . 'x', '') . $this->price_element($base_value_ex, $quantity . 'x', '', false);
    }

	public function format_price($product) {

		// Check if the product is taxable and get the tax class.
		$tax_status = $product->is_taxable();
		$product_tax_class = $product->get_tax_class();

		// Define decimals and price formatting.
		$dp = wc_get_price_decimals();
		$price_args = ['qty' => 1, 'price' => $product->get_regular_price()];

		// Calculate prices with and without tax.
		$price_tax = wc_format_decimal(wc_get_price_including_tax($product) * 1, $dp);
		$price_excl_tax = wc_format_decimal(wc_get_price_excluding_tax($product) * 1, $dp);

		// Default Toggle Tax display.
		$default = $this->price_element($price_tax, '', $this->label_incl) . $this->price_element($price_excl_tax, '', $this->label_excl, false);

		// Handle variable products and sale prices.
		if ($product->is_type('variable') && (!$tax_status || in_array($product_tax_class, ['zero-rate', 'shipping']))) {
			return $this->price_element($price_tax, $this->from_label, $this->label_excl) . $this->price_element($price_excl_tax, $this->from_label, $this->label_excl, false);
		}

		if($product->get_sale_price() && $product->has_child()) {

			$price_tax = wc_format_decimal(wc_get_price_including_tax($product, $price_args) * 1, $dp);
			$price_excl_tax = wc_format_decimal(wc_get_price_excluding_tax($product, $price_args) * 1, $dp);

			return
				'<del>' .
					($product->has_child()) ?
					$this->price_element($price_tax, $this->from_label, $this->label_incl) . $this->price_element($price_excl_tax, $this->from_label, $this->label_excl, false) :
					$this->price_element($price_tax, '', $this->label_incl) . $this->price_element($price_excl_tax, '', $this->label_excl, false) .
				'</del>' .
				'<ins>' . $default . '</ins>';
		}

		if ($product->get_sale_price()) {

			$price_tax = wc_format_decimal(wc_get_price_including_tax($product, $price_args) * 1, $dp);
			$price_excl_tax = wc_format_decimal(wc_get_price_excluding_tax($product, $price_args) * 1, $dp);

			return
				'<del>' .
					$this->price_element($price_tax, '', $this->label_incl) . $this->price_element($price_excl_tax, '', $this->label_excl, false) .
				'</del>' .
				'<ins>' . $default . '</ins>';
		}

		return $default;
	}

    public function price_element($price, $prefix = '', $suffix ='', $withTax = true): string
    {
        $class = $withTax ? 'product-tax-on' : 'product-tax-off';
        return '<span style="display:none;" class="amount ' . $class . ' product-tax">' . $prefix . ' ' . wc_price($price) . ' ' . $suffix . '</span>';
    }
}
