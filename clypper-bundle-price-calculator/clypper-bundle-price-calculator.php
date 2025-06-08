<?php
/**
 * Plugin Name: Clypper's Bundle Price Calculator
 * Description: A WooCommerce extension providing a dynamic price calculator for bundled products. It allows customers to see the total price of the selected bundle options in real-time.
 * Version: 1.1.4
 * Author: Clypper Technology
 * Author URI: https://clyppertechnology.com
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: clypper-bundle-price-calculator
 */

// Exit if accessed directly
defined('ABSPATH') or die('No script kiddies please!');

function clypper_bundle_price_calculater() {
    global $product;
    $product_price = $product->get_price();

    // Enqueue JavaScript and CSS with version
    wp_enqueue_script('clypper-bundle-price-calculator-script', plugin_dir_url(__FILE__) . 'clypper-bundle-price-calculator.js', array(), '1.1.5');
    wp_localize_script('clypper-bundle-price-calculator-script', 'cbpc_vars', array(
        'basePrice' => $product_price,
    ));
    wp_enqueue_style('clypper-bundle-price-calculator-style', plugin_dir_url(__FILE__) . 'clypper-bundle-price-calculator.css', array(), '1.1.5');

    // Display the final price list container
    ?>
    <div class="final-price"></div>
    <?php
}

add_action('woocommerce_before_add_to_cart_button', 'clypper_bundle_price_calculater', 99999);

