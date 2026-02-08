<?php

namespace ClypperTechnology\ClypperGetOffer\Admin;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class Admin
{
    public function __construct() {
        add_filter('woocommerce_product_data_tabs', [$this, 'custom_product_data_tab'], 50, 1);
        add_action('woocommerce_product_data_panels', [$this, 'options_data_fields']);
        add_action('woocommerce_process_product_meta', [$this, 'save_get_offer_option_field']);
    }

    public function save_get_offer_option_field($post_id): void {
        $get_offer_enabled = isset($_POST['_cl_enable_get_offer']) ? 'yes' : 'no';
        update_post_meta($post_id, '_cl_enable_get_offer', $get_offer_enabled);
    }

    public function options_data_fields(): void {
        global $post;
        ?>
        <div id="cl_get_offer_options_data" class="panel woocommerce_options_panel">
            <div class="options_group">
                <?php
                woocommerce_wp_checkbox([
                    'id'          => '_cl_enable_get_offer',
                    'label'       => __('Enable Get Offer Button', 'woocommerce'),
                    'description' => __('Check this to add a "Get Offer" button to the product page.', 'woocommerce'),
                    'desc_tip'    => false,
                ]);
                ?>
            </div>
        </div>
        <?php
    }

    public function custom_product_data_tab($tabs): array {
        $tabs['cl_get_offer_options'] = [
            'label'  => __('Get Offer Options', 'woocommerce'),
            'target' => 'cl_get_offer_options_data',
            'class'  => [],
        ];
        return $tabs;
    }
}