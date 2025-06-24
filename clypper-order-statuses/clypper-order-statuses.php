<?php

/**
 * Plugin Name: Clypper's Order Statuses
 * Description: Clypper's handcrafted order statuses.
 * Version: 1.0.0
 * Author: Clypper Technology
 * Author URI: https://clyppertechnology.com
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly
}

class ClypperOrderStatuses {

    private const AFHENTNING_VEJLE = 'wc-vejle';
    private const AFHENTNING_GADSTRUP = 'wc-gadstrup';

    public function __construct()
    {
        if ( ! class_exists( 'WooCommerce' ) ) {
            return;
        }

        $this->register_statuses();

        add_filter( 'wc_order_statuses', array( $this, 'add_statuses_to_list' ) );
        add_action( 'admin_head', array ($this, 'add_styles' ) );
    }

    function add_styles() {
        ?>
        <style>
            .order-status.status-vejle, .order-status.status-gadstrup {
                color: #fff !important;
                background: #6d7ec8 !important;
            }
        </style>
        <?php
    }


    public function add_statuses_to_list( array $order_statuses ) {
        $order_statuses[ self::AFHENTNING_VEJLE ] = 'Afhentning Vejle';
        $order_statuses[ self::AFHENTNING_GADSTRUP ] = 'Afhentning Gadstrup';

        return $order_statuses;
    }

    private function register_statuses() {
        register_post_status(
            self::AFHENTNING_VEJLE,
            array(
                'label'		=> 'Afhentning Vejle',
                'public'	=> true,
                'show_in_admin_status_list' => true,
                'label_count'	=> _n_noop( 'Afhentning Vejle (%s)', 'Afhentning Vejle (%s)' )
            )
        );

        register_post_status(
            self::AFHENTNING_GADSTRUP,
            array(
                'label'		=> 'Afhentning Gadstrup',
                'public'	=> true,
                'show_in_admin_status_list' => true,
                'label_count'	=> _n_noop( 'Afhentning Gadstrup (%s)', 'Afhentning Gadstrup (%s)' )
            )
        );
    }
}

add_action('init', function () {
    new ClypperOrderStatuses();
});