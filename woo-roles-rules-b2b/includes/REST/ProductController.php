<?php

namespace ClypperTechnology\RolePricing\REST;

class ProductController extends \WP_REST_Controller
{
    public function __construct( string $namespace )
    {
        $this->namespace     = $namespace;
        $this->resource_name = 'products';
    }

    public function register_routes(): void
    {
        register_rest_route( $this->namespace, '/' . $this->resource_name, [
            [
                'methods'             => \WP_REST_Server::READABLE,
                'callback'            => [ $this, 'get_items' ],
                'permission_callback' => [ $this, 'get_items_permissions_check' ],
                'args'                => [
                    'search' => [
                        'required'          => true,
                        'type'              => 'string',
                        'sanitize_callback' => 'sanitize_text_field',
                    ],
                ],
            ]
        ]);
    }

    public function get_items_permissions_check( $request )
    {
        return current_user_can( 'manage_woocommerce' );
    }

    public function get_items( $request )
    {
        $search   = $request->get_param( 'search' );
        $ids      = $this->search_product_ids( $search );
        $products = wc_get_products([
            'include' => $ids,
            'limit'   => 40,
            'orderby' => 'title',
            'order'   => 'ASC',
        ]);

        $data = array_merge( ...array_map( [ $this, 'prepare_item_for_response' ], $products ) );

        return new \WP_REST_Response( $data, 200 );
    }

    private function search_product_ids( string $search ): array
    {
        $by_name = wc_get_products([ 's'      => $search, 'limit' => 20, 'return' => 'ids' ]);
        $by_sku  = wc_get_products([ 'sku'    => $search, 'limit' => 20, 'return' => 'ids' ]);

        return array_unique( array_merge( $by_name, $by_sku ) );
    }

    public function prepare_item_for_response( $product, $request = null ): array
    {
        if ( ! $product->get_children() ) {
            return [[
                'value' => $product->get_title(),
                'data'  => $product->get_id(),
            ]];
        }

        return array_map( function( $child_id ) {
            $child      = wc_get_product( $child_id );
            $attributes = array_filter( $child->get_attributes(), fn( $v ) => is_string( $v ) && strlen( $v ) > 0 );
            $name       = implode( ', ', [ $child->get_title(), ...array_map( 'ucfirst', $attributes ) ] );

            return [ 'value' => $name, 'data' => $child->get_id() ];
        }, $product->get_children() );
    }
}