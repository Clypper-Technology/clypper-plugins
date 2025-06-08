<?php
/**
 * Plugin Name: Clypper's BIN Numbers
 * Description: Adds a BIN number field to the WooCommerce product inventory settings.
 * Version: 1.0.0
 * Author: Clypper Technology
 * Author URI: https://clyppertechnology.com
 * Text Domain: clypper-bin-numbers
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Include the main plugin class
if ( ! class_exists( 'Clypper_BIN_Numbers' ) ) {

    class Clypper_BIN_Numbers {

        public function __construct() {
            add_action( 'woocommerce_product_options_inventory_product_data', [ $this, 'add_bin_number_field' ] );
            add_action( 'woocommerce_process_product_meta', [ $this, 'save_bin_number_field' ], 25 );
        }

        /**
         * Add BIN number field to the inventory section
         */
        public function add_bin_number_field() {
            global $post;
            // Get the existing BIN number, if any
            $bin_number = get_post_meta($post->ID, '_clypper_bin_number', true);

            echo '<div class="options_group">';
            woocommerce_wp_text_input( [
                'id'            => 'clypper_bin_number',
                'label'         => __( 'BIN Number', 'clypper-bin-numbers' ),
                'placeholder'   => 'Enter BIN number',
                'desc_tip'      => 'true',
                'description'   => __( 'Enter the BIN number for this product.', 'clypper-bin-numbers' ),
                'value'         => $bin_number, // Set the value to the existing BIN number
            ] );
            echo '</div>';
        }


        /**
         * Save BIN number field value
         */
        public function save_bin_number_field( $post_id ) {
            $bin_number = isset( $_POST['clypper_bin_number'] ) ? sanitize_text_field( $_POST['clypper_bin_number'] ) : '';
            update_post_meta( $post_id, '_clypper_bin_number', $bin_number );
        }

        /**
         * Display BIN number on the product page
         */
        public function display_bin_number() {
            global $product;
            $bin_number = get_post_meta( $product->get_id(), '_clypper_bin_number', true );

            if ( $bin_number ) {
                echo '<div class="product-bin-number">';
                echo '<strong>' . __( 'BIN Number:', 'clypper-bin-numbers' ) . '</strong> ' . esc_html( $bin_number );
                echo '</div>';
            }
        }
    }

    new Clypper_BIN_Numbers();
}

/**
 * Display the product's bin location
 */
add_action( 'wpo_wcpdf_after_item_meta', function( $template_type, $item, $order ) {
    if( $template_type == 'packing-slip' ) {
        // check if item exists first
        if( empty($item) ) return;
        // Get bin location
        if( $bin_location = $item['product']->get_meta('_clypper_bin_number') ){
            echo '<div class="bin-location">BIN: ' . $bin_location . '</div>';
        }
    }
}, 10, 3);

function add_custom_field_to_order_item_meta($item_id, $item, $product) {

    if(!isset($product)) {
        return;
    }
    $BIN_number = get_post_meta($product->get_id(), '_clypper_bin_number', true);

    if(!empty($BIN_number)) {
        echo "<p><strong>BIN:</strong> $BIN_number</p>";
    }
}
add_action('woocommerce_after_order_itemmeta', 'add_custom_field_to_order_item_meta', 10, 3);


// Activation and deactivation hooks
register_activation_hook( __FILE__, 'clypper_bin_numbers_activate' );
register_deactivation_hook( __FILE__, 'clypper_bin_numbers_deactivate' );

function clypper_bin_numbers_activate() {
    // Actions to perform on plugin activation
}

function clypper_bin_numbers_deactivate() {
    // Actions to perform on plugin deactivation
}
