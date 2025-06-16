<?php

class Rule_Service {

    public function __construct()
    {

    }

    /**
     * Update single category rules
     */
    public function update_category_rule( $data ): void
    {
        $rule_id            = sanitize_text_field( $data['rule_id'] );
        $rule_obj           = get_post( intval( $rule_id ) );
        $content            = json_decode( $rule_obj->post_content, true );
        $categories         = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
        $single_categories  = array();
        $_single_categories = ( isset ( $data['rows'] ) ) ? $data['rows'] : array();
        $products           = ( isset ( $content['products'] ) ) ? $content['products'] : array();

        foreach ( $_single_categories as $item ) {

            $remove = sanitize_text_field( $item['remove'] );

            if ( 'false' === $remove ) {

                $category = array(
                    'id'               => sanitize_text_field( $item['id'] ),
                    'slug'             => sanitize_text_field( $item['slug'] ),
                    'name'             => sanitize_text_field( $item['name'] ),
                    'active'           => true,
                    'adjust_type'      => sanitize_text_field( $item['reduce_type'] ),
                    'adjust_value'     => sanitize_text_field( $item['reduce_value'] ),
                    'adjust_type_qty'  => sanitize_text_field( $item['reduce_type_qty'] ),
                    'adjust_value_qty' => sanitize_text_field( $item['reduce_value_qty'] ),
                    'min_qty'          => sanitize_text_field( $item['min_qty'] ),
                    'hidden'           => sanitize_text_field( $item['hidden'] ),
                    'on_sale'          => sanitize_text_field( $item['sale'] ),
                );

                $single_categories[] = $category;
            }
        }

        $jsonObj = $this->get_json_content_obj( $content, $rule_id, $categories, $products, $single_categories );

        $args = array(
            'ID'           => $content['id'],
            'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
            'post_author'  => get_current_user_id(),
        );

        wp_update_post( $args, false );
    }

    public function update_product_rule( $data ) {

        $rule_id           = sanitize_text_field( $data['rule_id'] );
        $rule_obj          = get_post( intval( $rule_id ) );
        $content           = json_decode( $rule_obj->post_content, true );
        $categories        = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
        $single_categories = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();
        $products          = array();
        $_products         = ( isset ( $data['rows'] ) ) ? $data['rows'] : array();

        foreach ( $_products as $item ) {

            $remove = sanitize_text_field( $item['remove'] );

            if ( 'false' === $remove ) {

                $product = array(
                    'id'               => sanitize_text_field( $item['product_id'] ),
                    'name'             => sanitize_text_field( esc_attr( $item['product_name'] ) ),
                    'active'           => ( ! empty( $item['reduce_value'] ) ) ? true : false,
                    'adjust_type'      => sanitize_text_field( $item['reduce_type'] ),
                    'adjust_value'     => sanitize_text_field( $item['reduce_value'] ),
                    'adjust_type_qty'  => sanitize_text_field( $item['reduce_type_qty'] ),
                    'adjust_value_qty' => sanitize_text_field( $item['reduce_value_qty'] ),
                    'min_qty'          => sanitize_text_field( $item['min_qty'] ),
                    'hidden'           => sanitize_text_field( $item['product_hidden'] ),
                );

                $products[] = $product;
            }
        }

        $jsonObj = $this->get_json_content_obj( $content, $rule_id, $categories, $products, $single_categories );

        $args = array(
            'ID'           => $content['id'],
            'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
            'post_author'  => get_current_user_id(),
        );

        wp_update_post( $args, false );
    }

    /**
     * Delete rule
     */
    public function delete_rule( string $id ): void {
        wp_delete_post( $id, true );
    }

    /**
     * Copy rules from - to multiple
     */
    public function copy_rules( $data ) {

        $type = $data['type'];
        $from = $data['from'];
        $to   = ( ! empty( $data['to'] ) ) ? explode( ',', $data['to'] ) : array();

        if ( empty( $from ) ) {
            wp_send_json( 'No from rule found' );
            wp_die();
        }

        $from_rule  = get_post( intval( $from ) );
        $content    = json_decode( $from_rule->post_content, true );
        $cat_rules  = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();
        $prod_rules = ( isset ( $content['products'] ) ) ? $content['products'] : array();

        if ( 'category' === $type ) {

            foreach ( $to as $id ) {
                $item         = get_post( intval( $id ) );
                $item_content = json_decode( $item->post_content, true );
                $jsonObj      = $this->get_json_content_obj( $item_content, $id, $item_content['categories'], $item_content['products'], $cat_rules );

                $args = array(
                    'ID'           => $id,
                    'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
                    'post_author'  => get_current_user_id(),
                );

                wp_update_post( $args, false );
            }


        } else { //Products

            foreach ( $to as $id ) {
                $item         = get_post( intval( $id ) );
                $item_content = json_decode( $item->post_content, true );
                $jsonObj      = $this->get_json_content_obj( $item_content, $id, $item_content['categories'], $prod_rules, $item_content['single_categories'] );

                $args = array(
                    'ID'           => $id,
                    'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
                    'post_author'  => get_current_user_id(),
                );

                wp_update_post( $args, false );
            }

        }
    }

    /**
     * Add rule
     *
     * @param var $data post data.
     */
    public function add_rule( $data ) {

        $name = sanitize_text_field( $data['role'] );

        if ( ! empty( $name ) ) {

            $rule = array(
                'post_title'   => $name,
                'post_content' => '',
                'post_status'  => 'publish',
                'post_type'    => 'rrb2b',
                'post_author'  => get_current_user_id(),
            );

            if ( ! post_exists( $name, '', '', 'rrb2b' ) ) {
                return wp_insert_post( apply_filters( 'rrb2b_create_rule', $rule ) );
            }
        }

        return 0;
    }
    /**
     * Update rule
     *
     * @param var $data post object.
     */
    public function update_rule( $data ) {

        $rule_obj          = get_post( intval( $data['id'] ) );
        $content           = json_decode( $rule_obj->post_content, true );
        $products          = ( isset( $content['products'] ) ) ? $content['products'] : array();
        $single_categories = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();
        $categories        = array();


        $categories_arr = explode( ',', $data['selected_categories'] );

        foreach ( $categories_arr as $catId ) {
            $categories[] = array($catId => $catId);
        }

        $jsonObj = array(
            'id'                      => $data['id'],
            'rule_active'             => ( isset( $data['rule_active'] ) ) ? $data['rule_active'] : '',
            'reduce_regular_type'     => $data['reduce_regular_type'],
            'reduce_regular_value'    => $data['reduce_regular_value'],
            'reduce_categories_value' => $data['reduce_categories_value'],
            'reduce_sale_type'        => $data['reduce_sale_type'],
            'reduce_sale_value'       => $data['reduce_sale_value'],
            'coupon'                  => $data['coupon'],
            'date_from'               => $data['date_from'],
            'date_to'                 => $data['date_to'],
            'time_from'               => $data['time_from'],
            'time_to'                 => $data['time_to'],
            'categories'              => $categories,
            'categories_on_sale'      => ( isset ( $data['categories_on_sale'] ) && 'on' === $data['categories_on_sale'] ) ? 'on' : 'off',
            'products'                => $products,
            'single_categories'       => $single_categories,
        );

        $args = array(
            'ID'           => $data['id'],
            'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
            'post_author'  => get_current_user_id(),
        );

        wp_update_post( $args, false );
    }


    /**
     * Add product to rule
     */
    public function add_rule_product( $id, $name, $rule ) {

        $rule_obj          = get_post( intval( $rule ) );
        $content           = json_decode( $rule_obj->post_content, true );
        $categories        = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
        $products          = ( isset ( $content['products'] ) ) ? $content['products'] : array();
        $single_categories = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();

        $product = array(
            'id'               => $id,
            'name'             => esc_attr( $name ),
            'active'           => false,
            'adjust_type'      => '',
            'adjust_value'     => '',
            'adjust_type_qty'  => '',
            'adjust_value_qty' => '',
            'min_qty'          => 0,
            'hidden'           => 'false',
        );

        $products[] = $product;

        $jsonObj = $this->get_json_content_obj( $content, $rule, $categories, $products, $single_categories );

        $args = array(
            'ID'           => $rule,
            'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
            'post_author'  => get_current_user_id(),
        );

        wp_update_post( $args, false );
    }

    /**
     * Get content object
     */
    private function get_json_content_obj( $content, $rule, $categories, $products, $single_categories ): array {

        return array(
            'id'                      => ( isset( $content ) ) ? $content['id'] : $rule,
            'rule_active'             => ( isset( $content ) ) ? $content['rule_active'] : '',
            'reduce_regular_type'     => ( isset( $content ) ) ? $content['reduce_regular_type'] : '',
            'reduce_regular_value'    => ( isset( $content ) ) ? $content['reduce_regular_value'] : '',
            'reduce_categories_value' => ( isset( $content ) ) ? $content['reduce_categories_value'] : '',
            'reduce_sale_type'        => ( isset( $content ) ) ? $content['reduce_sale_type'] : '',
            'reduce_sale_value'       => ( isset( $content ) ) ? $content['reduce_sale_value'] : '',
            'coupon'                  => ( isset( $content ) ) ? $content['coupon'] : '',
            'date_from'               => ( isset( $content ) ) ? $content['date_from'] : '',
            'date_to'                 => ( isset( $content ) ) ? $content['date_to'] : '',
            'time_from'               => ( isset( $content ) ) ? $content['time_from'] : '',
            'time_to'                 => ( isset( $content ) ) ? $content['time_to'] : '',
            'categories'              => $categories,
            'categories_on_sale'      => ( isset( $content ) ) ? $content['categories_on_sale'] : '',
            'products'                => $products,
            'single_categories'       => $single_categories,
        );
    }
}