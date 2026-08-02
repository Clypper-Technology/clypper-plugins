<?php
/*
 * Plugin Name: Clypper's WooCommerce Stock Email Throttle
 * Description: Throttles WooCommerce low stock emails to only be sent once per low-stock cycle.
 * Version: 1.0.0
 * Author: Clypper Technology
 * Author URI: https://clyppertechnology.com
 */
defined( 'ABSPATH' ) || exit;

/**
 * Declare compatibility with WooCommerce HPOS and Cart/Checkout Blocks.
 */
add_action( 'before_woocommerce_init', function() {
    if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
        \Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'cart_checkout_blocks', __FILE__, true );
    }
} );
/**
 * Only register our hooks if WooCommerce is active.
 */
add_action( 'plugins_loaded', function() {
    if ( ! class_exists( 'WooCommerce' ) ) {
        return;
    }
    add_filter( 'woocommerce_should_send_low_stock_notification', 'lsno_maybe_suppress_low_stock_email', 10, 2 );
    add_action( 'woocommerce_product_set_stock', 'lsno_maybe_reset_low_stock_flag' );
} );
/**
 * Suppress the low stock email if we have already notified for this crossing.
 */
function lsno_maybe_suppress_low_stock_email( $should_send, $product_id ) {
    $product = wc_get_product( $product_id );
    if ( ! $product ) {
        error_log( 'LSNO: could not load product ' . $product_id );
        return $should_send;
    }
    $notified = $product->get_meta( '_low_stock_notified' );
    $stock    = $product->get_stock_quantity();
    if ( 'yes' === $notified ) {
        error_log( 'LSNO: suppressed email for product ' . $product_id . ' (stock: ' . $stock . ')' );
        return false;
    }
    $product->update_meta_data( '_low_stock_notified', 'yes' );
    $product->save();
    return true;
}
/**
 * Clear the notification flag when stock rises back above the threshold.
 */
function lsno_maybe_reset_low_stock_flag( $product ) {
    if ( 'yes' !== $product->get_meta( '_low_stock_notified' ) ) {
        return;
    }
    $threshold = $product->get_low_stock_amount()
        ?: absint( get_option( 'woocommerce_notify_low_stock_amount', 2 ) );
    $stock = $product->get_stock_quantity();
    if ( $stock > $threshold ) {
        $product->update_meta_data( '_low_stock_notified', '' );
        $product->save();
    }
}