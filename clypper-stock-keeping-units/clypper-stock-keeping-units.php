<?php
/**
 * Plugin Name: Clypper's Stock Keeping Units
 * Description: Display Stock Keeping Units on the frontend of your site.
 * Version: 1.0.0
 * Author: Clypper Technology
 * Author URI: https://clyppertechnology.com
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

// Enqueue styles for the frontend
function clypper_enqueue_sku_styles() {
    if (!is_admin()) {
        wp_enqueue_style('clypper-sku-style', plugin_dir_url(__FILE__) . 'clypper-stock-keeping-units.css');
    }
}
add_action('wp_enqueue_scripts', 'clypper_enqueue_sku_styles');

// Display SKU and Stock Status on the frontend
function clypper_display_sku_and_stock_status() {
    global $product;

    if (!$product) {
        return;
    }

    $sku = $product->get_sku();
    $stock_status = $product->get_stock_status();
    $stock_info_text = '';

    if (is_product()) {
        if ($stock_status == 'onbackorder') {
            $stock_info_text = ' - levering 3-10 dage';
        } elseif ($stock_status == 'bestillingsvare') {
            $stock_info_text = ' - levering 4-10 uger';
        }
    }

    $class = is_product() ? 'sku-product-page' : 'sku-product-archive';
    $stock_status_html = '';

    switch ($stock_status) {
        case 'outofstock':
            $stock_status_html = '<div class="stock-status-wrapper"><span class="stock-status-indicator out-of-stock"></span><p class="stock">Ikke på lager' . esc_html($stock_info_text) . '</p></div>';
            break;
        case 'onbackorder':
            $stock_status_html = '<div class="stock-status-wrapper"><span class="stock-status-indicator on-backorder"></span><p class="stock">På fjernlager' . esc_html($stock_info_text) . '</p></div>';
            break;
        case 'bestillingsvare':
            $stock_status_html = '<div class="stock-status-wrapper"><span class="stock-status-indicator custom-order"></span><p class="stock">Bestillingsvare' . esc_html($stock_info_text) . '</p></div>';
            break;
        default:
            $stock_status_html = '<div class="stock-status-wrapper"><span class="stock-status-indicator in-stock"></span><p class="stock">På lager' . esc_html($stock_info_text) . '</p></div>';
            break;
    }

    if ($sku) {
        echo '<p class="' . esc_attr($class) . '"><b>Varenummer:</b> ' . esc_html($sku) . '</p>';
    }

    echo $stock_status_html;
}
add_action('woocommerce_after_shop_loop_item_title', 'clypper_display_sku_and_stock_status', 100);

// Add custom stock status option to WooCommerce
function clypper_add_custom_stock_status($stock_statuses) {
    $stock_statuses['bestillingsvare'] = __('Bestillingsvare', 'woocommerce');
    return $stock_statuses;
}
add_filter('woocommerce_product_stock_status_options', 'clypper_add_custom_stock_status');

// Display custom stock status for Flatsome theme
function clypper_display_custom_stock_status_flatsome() {
    clypper_display_sku_and_stock_status();
}
add_filter('flatsome_custom_single_product_1', 'clypper_display_custom_stock_status_flatsome', 25, 2);

// Customize stock status display in the WooCommerce admin
function clypper_custom_admin_stock_status_display($stock_html, $product) {
    $stock_status = $product->get_stock_status();

    if ($stock_status === 'bestillingsvare') {
        $stock_html = '<mark class="onbackorder">Bestillingsvare</mark>';
    }

    return $stock_html;
}
add_filter('woocommerce_admin_stock_html', 'clypper_custom_admin_stock_status_display', 10, 2);

