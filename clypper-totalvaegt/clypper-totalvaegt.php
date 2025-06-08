<?php
/*
Plugin Name: Clypper's Totalvægt
Description: A WooCommerce plugin to add and manage trailer weight selection.
Version:     1.0.0
Author: Clypper Technology
Author URI: https://clyppertechnology.com
*/

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

/**
 * Main plugin class for handling trailer weight selection
 */
class Clypper_Totalvaegt {
    /**
     * Initialize the plugin by setting up hooks
     */
    public function __construct() {
        $this->init_hooks();
    }

    /**
     * Register all WordPress hooks used by this plugin
     */
    private function init_hooks() {
        // Frontend display hooks
        add_action('woocommerce_before_add_to_cart_button',
            [$this, 'trailer_weight_selection'],
            9999
        );

        // Cart and checkout hooks
        add_filter('woocommerce_add_cart_item_data',
            [$this, 'save_trailer_weight_selection'],
            10,
            2
        );
        add_filter('woocommerce_get_item_data',
            [$this, 'display_trailer_weight_in_cart'],
            10,
            2
        );
        add_action('woocommerce_checkout_create_order_line_item',
            [$this, 'save_trailer_weight_to_order'],
            10,
            4
        );
    }

    /**
     * Display trailer weight selection dropdown on product pages
     */
    public function trailer_weight_selection(): void
    {
        global $product;

        $weights = $this->get_weight_attributes($product);

        if ($weights) {
            $default_weight = $weights[0];

            echo '<div class="trailer-weight-select">';
            echo '<label for="trailer_weight">Vælg totalvægt: </label>';
            echo '<select name="trailer_weight" id="trailer_weight">';

            foreach ($weights as $weight) {
                $selected = ($weight === $default_weight) ? 'selected' : '';
                echo '<option value="' . esc_attr($weight) . '" ' . $selected . '>' .
                    esc_html($weight) .
                    '</option>';
            }

            echo '</select>';
            echo '</div>';

            echo '<input type="hidden" name="trailer_weight_hidden" value="' .
                esc_attr($default_weight) .
                '">';
        }
    }

    /**
     * Save trailer weight selection in cart item data
     *
     * @param array $cart_item_data The existing cart item data
     * @param int   $product_id     The ID of the product being added to cart
     * @return array Modified cart item data
     */
    public function save_trailer_weight_selection($cart_item_data, $product_id) {
        $product = wc_get_product($product_id);
        $weights = $this->get_weight_attributes($product);

        if (!empty($weights)) {
            $weight_attribute = $_POST['trailer_weight'] ?? $weights[0];

            // Make sure the weight exists in the system.
            if (!in_array($weight_attribute, $weights, true)) {
                $weight_attribute = $weights[0];
            }

            $cart_item_data['trailer_weight'] = sanitize_text_field($weight_attribute);
            $cart_item_data['unique_key'] = md5(
                $product_id . '_' . $cart_item_data['trailer_weight']
            );
        }

        return $cart_item_data;
    }

    /**
     * Display the selected trailer weight in the cart
     *
     * @param array $item_data The array of item data
     * @param array $cart_item The cart item
     * @return array Modified item data
     */
    public function display_trailer_weight_in_cart($item_data, $cart_item) {
        $product = wc_get_product($cart_item['product_id']);
        $weights = $this->get_weight_attributes($product);

        if ($weights) {
            if (empty($cart_item['trailer_weight'])) {
                $cart_item['trailer_weight'] = $weights[0];
            }

            if (isset($cart_item['trailer_weight'])) {
                $item_data[] = array(
                    'name' => 'Totalvægt',
                    'value' => $cart_item['trailer_weight'],
                );
            }
        }

        return $item_data;
    }

    /**
     * Save the trailer weight to the order meta
     *
     * @param WC_Order_Item_Product $item          Order item object
     * @param string               $cart_item_key  Cart item key
     * @param array                $values         Cart item values
     * @param WC_Order             $order         Order object
     */
    public function save_trailer_weight_to_order($item, $cart_item_key, $values, $order) {
        if (isset($values['trailer_weight'])) {
            $item->add_meta_data('Totalvægt', $values['trailer_weight'], true);
        }
    }

    /**
     * Get weight attributes for a product
     *
     * @param WC_Product $product The product object
     * @return array Array of weight options
     */
    private function get_weight_attributes(WC_Product $product): array {
        $weight_attribute = $product->get_attribute('totalvaegt');

        if ($weight_attribute) {
            return explode(', ', $weight_attribute);
        }

        return [];
    }
}

add_action('plugins_loaded', function() {
    new Clypper_Totalvaegt();
});