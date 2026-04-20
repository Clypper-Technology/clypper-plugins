<?php
/*
Plugin Name: Clypper's Resurs Widget
Description: A WooCommerce plugin to add Resurs' widget anywhere ones pleases.
Version:     1.0.0
Author: Clypper Technology
Author URI: https://clyppertechnology.com
*/

if (!defined('ABSPATH')) {
    exit;
}

class Clypper_resurs {

    public function __construct() {
        $this->init_hooks();
    }

    private function init_hooks() {
        add_filter('flatsome_custom_single_product_3', [$this, 'render_widget'], 25, 2);
    }

    public function render_widget($content, $product = null) {
        if (!\Resursbank\Woocommerce\Modules\PartPayment\PartPayment::isEnabled()) {
            return $content;
        }

        \Resursbank\Woocommerce\Modules\PartPayment\PartPayment::renderWidget();
        return $content;
    }
}

add_action('plugins_loaded', function() {
    new Clypper_resurs();
});