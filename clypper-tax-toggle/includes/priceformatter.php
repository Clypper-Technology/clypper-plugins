<?php

class Price_Formatter {
    private static $instance = null;

    public static function get_instance() {
        if (self::$instance === null) {
            self::$instance = new Price_Formatter();
        }

        return self::$instance;
    }

    private function __construct() {
    }

    public function format_price_cart($product, $quantity): string
    {
        // Calculate base prices (not multiplied by quantity)
        $base_value = wc_format_decimal(wc_get_price_including_tax($product));
        $base_value_ex = wc_format_decimal(wc_get_price_excluding_tax($product));

        return $this->price_element($base_value, $quantity . 'x', '') . $this->price_element($base_value_ex, $quantity . 'x', '', false);

    }

    public function price_element($price, $prefix = '', $suffix ='', $withTax = true): string
    {
        $class = $withTax ? 'product-tax-on' : 'product-tax-off';
        return '<span style="display:none;" class="amount ' . $class . ' product-tax">' . $prefix . ' ' . wc_price($price) . ' ' . $suffix . '</span>';
    }
}
