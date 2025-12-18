<?php

namespace ClypperTechnology\RolePricing;

use ClypperTechnology\RolePricing\Services\RuleService;

defined( 'ABSPATH' ) || exit;

class AjaxHandler {

    private RuleService $rule_service;

    public function __construct()
    {
        $this->rule_service = new RuleService();

        // Only register for logged-in users (admin area)
        add_action( 'wp_ajax_rrb2b_delete_rule_callback', array($this, 'rrb2b_delete_rule_callback' ) );
        add_action( 'wp_ajax_rrb2b_ajax_get_products', array( $this, 'rrb2b_ajax_get_products' ) );
        add_action( 'wp_ajax_rrb2b_ajax_update_product_rule', array( $this, 'rrb2b_ajax_update_product_rule' ) );
        add_action( 'wp_ajax_rrb2b_ajax_get_products_category', array( $this, 'rrb2b_ajax_get_products_category' ) );
        add_action( 'wp_ajax_rrb2b_delete_role', array( $this, 'rrb2b_ajax_delete_role' ) );
        add_action( 'wp_ajax_rrb2b_ajax_update_single_category_rule', array( $this, 'rrb2b_ajax_update_single_category_rule' ) );
        add_action( 'wp_ajax_rrb2b_copy_rules_to', array( $this, 'rrb2b_copy_rules_to_callback' ) );
    }

    /**
     * Update single category rules
     */
    public function rrb2b_ajax_update_single_category_rule(): void {
        // Add capability check since we're in admin context
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error( array( 'message' => 'Insufficient permissions.' ) );
        }

        $this->check_nonce('rrb2b_id');

        $data = wp_unslash( $_POST );
        $this->rule_service->update_category_rule( $data );

        wp_send_json_success( array( 'message' => 'Updated successfully' ) );
    }

    /**
     * Delete rule
     */
    public function rrb2b_delete_rule_callback() {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error( array( 'message' => 'Insufficient permissions.' ) );
        }

        $this->check_nonce('rrb2b_id');

        $data = wp_unslash( $_POST );
        $this->rule_service->delete_rule($data['role_id']);
    }

    /**
     * Get products
     */
    public function rrb2b_ajax_get_products() {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error( array( 'message' => 'Insufficient permissions.' ) );
        }

        $this->check_nonce('rrb2b_id');

        $data = wp_unslash( $_REQUEST );
        $txt  = sanitize_text_field( $data['search'] );

        $args_s = array(
            's'       => $txt,
            'limit'   => 20,
            'return'  => 'ids',
        );

        $args_sku = array(
            'sku'     => $txt,
            'limit'   => 20,
            'return'  => 'ids',
        );

        $arr_s   = wc_get_products( $args_s );
        $arr_sku = wc_get_products( $args_sku );
        $arr     = array_merge( $arr_s, $arr_sku );
        $list    = implode( ',', $arr );
        $items   = array_map( 'intval', explode( ',', $list ) );

        $args = array(
            'include'  => $items,
            'limit'    => 40,
            'orderby'  => 'title',
            'order'    => 'ASC',
        );

        $products    = wc_get_products( $args );
        $product_arr = array();

        foreach ( $products as $product ) {

            if ( count( $product->get_children() ) > 0 ) {

                $children = $product->get_children();

                foreach ( $children as $value ) {

                    $child        = wc_get_product( $value );
                    $attributes   = $child->get_attributes();
                    $product_name = $child->get_title();

                    if ( isset( $attributes ) && is_array( $attributes ) ) {
                        foreach ( $attributes as $key => $val ) {
                            if ( isset( $val ) && is_string( $val ) && strlen( $val ) > 0 ) {
                                $product_name .= ', ' . ucfirst( $val );
                            }
                        }
                    }

                    $p_arr = array(
                        'value' => $product_name,
                        'data'  => $child->get_id(),
                    );

                    $product_arr[] = $p_arr;
                }

            } else {

                $p_arr = array(
                    'value' => $product->get_title(),
                    'data'  => $product->get_id(),

                );

                $product_arr[] = $p_arr;
            }

        }

        echo wp_json_encode( $product_arr );
        die();
    }

    /**
     * Update products to current rule
     */
    public function rrb2b_ajax_update_product_rule(): void {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error( array( 'message' => 'Insufficient permissions.' ) );
        }

        $this->check_nonce('rrb2b_id');
        $data = wp_unslash( $_POST );

        $this->rule_service->update_product_rule( $data );

        wp_send_json_success( __( 'Rule updated.', 'woo-roles-rules-b2b' ) );
    }


    /**
     * Get products by category
     */
    public function rrb2b_ajax_get_products_category() {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error( array( 'message' => 'Insufficient permissions.' ) );
        }

        $this->check_nonce('rrb2b_id');

        $data = wp_unslash( $_POST );

        if( ! isset( $data ) || empty( $data['category'] ) ) {
            return;
        }

        //Query products by category
        $products = wc_get_products( array( 'category' => $data['category'], 'status' => 'publish', 'limit' => -1 ) );

        //Loop and add to rule
        foreach ( $products as $product ) {

            $variations = ( count( $product->get_children() ) > 0 ) ? $product->get_children()  : array();

            if ( 'true' === $data['variations'] && count( $variations ) > 0 ) {
                foreach ( $variations as $product_variation ) {
                    $p            = wc_get_product( $product_variation );
                    $attributes   = $p->get_attributes();
                    $product_name = $p->get_name();

                    if ( isset( $attributes ) && is_array( $attributes ) ) {
                        foreach ( $attributes as $key => $val ) {
                            if ( isset( $val ) && is_string( $val ) && strlen( $val ) > 0 ) {
                                $product_name .= ', ' . $val;
                            }
                        }
                    }

                    $this->rule_service->add_product_to_rule( $product_variation, $product_name, $data['id'] );
                }
            } else {
                $this->rule_service->add_product_to_rule( $product->get_id(), $product->get_name(), $data['id'] );
            }

        }
    }


    /**
     * Delete role and role in rrb2b db
     */
    public function rrb2b_ajax_delete_role() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_send_json_error( array( 'message' => 'Insufficient permissions.' ) );
        }

        $this->check_nonce('rrb2b_id');

        $logger  = wc_get_logger();
        $context = array( 'source' => 'rrb2b-role-log' );

        $data = isset( $_POST ) ? wp_unslash( $_POST ) : array();
        $role = isset( $data['the_role'] ) ? sanitize_text_field( $data['the_role'] ) : '';

        if ( empty( $role ) ) {
            $logger->warning( 'No role provided for deletion.', $context );
            wp_send_json_error( __( 'Role missing.', 'woo-roles-rules-b2b' ) );
            wp_die();
        }

        // Delete any matching rules (by title search)
        $args = array(
            'post_status' => 'publish',
            'post_type'   => 'rrb2b',
            'orderby'     => 'title',
            's'           => $role,
        );

        $rules = get_posts( $args );

        foreach ( $rules as $rule) {
            wp_delete_post( $rule->ID, true );
        }

        // Try to remove the actual role
        if ( get_role( $role ) ) {
            remove_role( $role );
            $logger->info( 'Role "' . $role . '" removed from WordPress.', $context );
            wp_send_json_success( __( 'Role and rules deleted.', 'woo-roles-rules-b2b' ) );
        } else {
            $logger->warning( 'Role "' . $role . '" not found during deletion.', $context );
            wp_send_json_error( __( 'Role not found.', 'woo-roles-rules-b2b' ) );
        }
    }

    /**
     * Copy rule from to (several)
     */
    public function rrb2b_copy_rules_to_callback(): void {
        if ( ! current_user_can( 'manage_woocommerce' ) ) {
            wp_send_json_error( array( 'message' => 'Insufficient permissions.' ) );
        }

        $this->check_nonce('rrb2b_id');

        $data = wp_unslash( $_POST );

        $this->rule_service->copy_rules( $data );
    }

    private function check_nonce( $action = 'rrb2b_ajax_nonce', $nonce_key = 'nonce' ): void {
        if ( ! check_ajax_referer( $action, $nonce_key, false ) ) {
            wp_send_json_error( array(
                'message' => __( 'Security check failed.', 'woo-roles-rules-b2b' )
            ) );
        }
    }
}