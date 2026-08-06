<?php

    namespace ClypperTechnology\RolePricing\REST;

    use ClypperTechnology\RolePricing\REST\DTOs\ProductDTO;
    use WC_Product;
    use WP_REST_Request;

    defined('ABSPATH') || exit;

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
            $products = $this->search_product_ids( $search );
            $products = array_merge( ...array_map( fn($product) => $this->prepare_item_for_response($product), $products ) );

            return new \WP_REST_Response( $products, 200 );
        }

        private function search_product_ids( string $search ): array
        {
            $by_name = wc_get_products([ 's'      => $search, 'limit' => 20 ]);
            $by_sku  = wc_get_products([ 'sku'    => $search, 'limit' => 20 ]);

            return array_unique( array_merge( $by_name, $by_sku ) );
        }

        /**
         * @param $item WC_Product
         * @param $request WP_REST_Request
         * @return ProductDTO[]
         */
        public function prepare_item_for_response( $item, $request = null ): array
        {
            if ( ! $item->get_children() ) {
                return [ ProductDTO::from( $item ) ];
            }

            return array_map( function( $child_id ) {
                $child = wc_get_product( $child_id );
                return ProductDTO::from( $child );
            }, $item->get_children() );
        }
    }