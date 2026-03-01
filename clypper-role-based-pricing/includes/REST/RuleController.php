<?php

namespace ClypperTechnology\RolePricing\REST;

use ClypperTechnology\RolePricing\Rules\CategoryRule;
use ClypperTechnology\RolePricing\Rules\ProductRule;
use ClypperTechnology\RolePricing\Services\RuleService;

defined('ABSPATH') || exit;

class RuleController extends \WP_REST_Controller
{
    private RuleService $rule_service;

    public function __construct( string $namespace, RuleService $ruleService )
    {
        $this->namespace     = $namespace;
        $this->resource_name = 'rules';
        $this->rule_service  = $ruleService;
    }

    public function register_routes(): void
    {
        register_rest_route( $this->namespace, '/' . $this->resource_name . '/(?P<id>\d+)', [
            [
                'methods'             => \WP_REST_Server::DELETABLE,
                'callback'            => [ $this, 'delete_item' ],
                'permission_callback' => [ $this, 'permissions_check' ],
            ],
        ]);

        register_rest_route( $this->namespace, '/' . $this->resource_name . '/(?P<id>\d+)/products', [
            [
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => [ $this, 'update_product_rule' ],
                'permission_callback' => [ $this, 'permissions_check' ],
                'args'                => $this->get_update_product_args(),
            ],
        ]);

        register_rest_route( $this->namespace, '/' . $this->resource_name . '/(?P<id>\d+)/categories', [
            [
                'methods'             => \WP_REST_Server::EDITABLE,
                'callback'            => [ $this, 'update_category_rule' ],
                'permission_callback' => [ $this, 'permissions_check' ],
                'args'                => $this->get_update_category_args(),
            ],
        ]);

        register_rest_route( $this->namespace, '/' . $this->resource_name . '/copy', [
            [
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'copy_rules' ],
                'permission_callback' => [ $this, 'permissions_check' ],
                'args'                => [
                    'type' => [
                        'required' => true,
                        'type'     => 'string',
                        'enum'     => [ 'product', 'category' ],
                    ],
                    'from' => [
                        'required' => true,
                        'type'     => 'integer',
                    ],
                    'to' => [
                        'required' => true,
                        'type'     => 'array',
                        'items'    => [ 'type' => 'integer' ],
                    ],
                ],
            ]
        ]);

        register_rest_route( $this->namespace, '/' . $this->resource_name . '/(?P<id>\d+)/products/import', [
            [
                'methods'             => \WP_REST_Server::CREATABLE,
                'callback'            => [ $this, 'import_products_from_category' ],
                'permission_callback' => [ $this, 'permissions_check' ],
                'args'                => [
                    'category'   => [ 'required' => true, 'type' => 'string', 'sanitize_callback' => 'sanitize_text_field' ],
                    'variations' => [ 'required' => false, 'type' => 'boolean', 'default' => false ],
                ],
            ]
        ]);
    }

    public function permissions_check( $request ): \WP_Error|bool
    {
        return current_user_can( 'manage_woocommerce' );
    }

    public function delete_item( $request ): \WP_REST_Response
    {
        $this->rule_service->delete_rule( $request->get_param( 'id' ) );

        return new \WP_REST_Response( null, 204 );
    }

    public function update_product_rule( $request ): \WP_REST_Response
    {
        $this->rule_service->update_product_rule(
            $request->get_param( 'id' ),
            $request->get_param( 'rows' )
        );

        return new \WP_REST_Response( null, 204 );
    }

    public function update_category_rule( $request ): \WP_REST_Response
    {
        $this->rule_service->update_category_rule(
            $request->get_param( 'id' ),
            $request->get_param( 'rows' )
        );

        return new \WP_REST_Response( null, 204 );
    }

    public function copy_rules( $request ): \WP_REST_Response
    {
        $this->rule_service->copy_rules(
            $request->get_param( 'from' ),
            $request->get_param( 'type' ),
            $request->get_param( 'to' )
        );

        return new \WP_REST_Response( null, 204 );
    }

    public function import_products_from_category( $request ): \WP_REST_Response|\WP_Error
    {
        $imported = $this->rule_service->import_products_from_category(
            $request->get_param( 'id' ),
            $request->get_param( 'category' ),
            $request->get_param( 'variations' ),
        );

        if ( ! $imported ) {
            return new \WP_Error( 'no_products', 'No products found in this category.', [ 'status' => 404 ] );
        }

        return new \WP_REST_Response( [ 'imported' => $imported ], 200 );
    }

    private function get_update_product_args(): array
    {
        return [
            'rows' => [
                'required' => true,
                'type'     => 'array',
                'items'    => ProductRule::schema(),
            ],
        ];
    }

    private function get_update_category_args(): array
    {
        return [
            'rows' => [
                'required' => true,
                'type'     => 'array',
                'items'    => CategoryRule::schema(),
            ],
        ];
    }
}