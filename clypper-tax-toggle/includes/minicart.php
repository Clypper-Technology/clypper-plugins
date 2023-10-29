<?php
/**
 * Minicart
 * @package WordPress
 * @subpackage clypper-tax
 * @since 1.2.4
 */

include_once 'priceformatter.php';

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

if (is_admin() && !defined('DOING_AJAX')) {
    return;
}

$price_formatter = Price_Formatter::get_instance();

//Mini Cart
function clypper_cart_override($product_price, $cart_item): string {

    global $price_formatter;

    $product = $cart_item['data'];
    $product_quantity = $cart_item['quantity'];

    return $price_formatter->format_price_cart($product, $product_quantity);
}
add_filter('woocommerce_widget_cart_item_quantity', 'clypper_cart_override', 100, 3);

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

//Cart Subtotal
function clypper_cart_subtotal_html($cart_subtotal, $compound, $cart): string {

    if (is_cart() || is_checkout() || defined('WOOCOMMERCE_CHECKOUT')) {
        return $cart_subtotal;
    }

    global $price_formatter;

    $value = ($compound) ? $cart->cart_contents_total + $cart->shipping_total + $cart->get_taxes_total(false) : $cart->subtotal;
    $value_ex = ($compound) ? $cart->cart_contents_total + $cart->shipping_total - $cart->get_taxes_total(false) : $cart->subtotal_ex_tax;

    return $price_formatter->price_element(wc_format_decimal($value)) . $price_formatter->price_element(wc_format_decimal($value_ex), '', false);
}
add_filter('woocommerce_cart_subtotal', 'clypper_cart_subtotal_html', 100, 3);


