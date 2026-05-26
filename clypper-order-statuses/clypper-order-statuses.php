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
    private const FAKTURA = 'wc-faktura';

    public function __construct()
    {
        if ( ! class_exists( 'WooCommerce' ) ) {
            return;
        }

        $this->register_statuses();

        add_filter( 'wc_order_statuses', array( $this, 'add_statuses_to_list' ) );
        add_action( 'admin_head', array ($this, 'add_styles' ) );
        add_action( 'woocommerce_order_status_processing', function( $order_id ) {
            $order = wc_get_order( $order_id );
            if ( $order->get_payment_method() === 'wlab_inv_payment' ||
                    $order->get_payment_method() === 'wlab_ean_payment' ) {
                $order->update_status( self::FAKTURA, 'Betales med faktura.' );
            }
        }, 20 );
    }

    function add_styles() {
        ?>
        <style>
            .order-status.status-faktura {
                background: #d0ae53;
            }
            .order-status.status-vejle, .order-status.status-gadstrup {
                color: #fff !important;
                background: #6d7ec8 !important;
            }
        </style>
        <?php
    }


    public function add_statuses_to_list( array $order_statuses ): array
    {
        $order_statuses[ self::AFHENTNING_VEJLE ] = 'Afhentning Vejle';
        $order_statuses[ self::AFHENTNING_GADSTRUP ] = 'Afhentning Gadstrup';
        $order_statuses[ self::FAKTURA ] = 'Betales med faktura';

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

        register_post_status(
            self::FAKTURA,
            array(
                'label'		=> 'Betales med faktura',
                'public'	=> true,
                'show_in_admin_status_list' => true,
                'label_count'	=> _n_noop( 'Betales med faktura (%s)', 'Betales med faktura (%s)' )
            )
        );
    }
}

add_action('init', function () {
    new ClypperOrderStatuses();
});