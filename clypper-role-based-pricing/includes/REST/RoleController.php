<?php

namespace ClypperTechnology\RolePricing\REST;

use ClypperTechnology\RolePricing\Services\RoleService;

defined('ABSPATH') || exit;

class RoleController extends  \WP_REST_Controller
{
    private RoleService $roleService;

    public function __construct( string $namespace, RoleService $roleService )
    {
        $this->namespace     = $namespace;
        $this->resource_name = 'roles';
        $this->roleService  = $roleService;
    }

    public function register_routes(): void
    {
        register_rest_route( $this->namespace, '/' . $this->resource_name, [
            [
                'methods'               => \WP_REST_Server::READABLE,
                'callback'              => [ $this, 'get_items'],
                'permission_callback' => [ $this, 'permissions_check' ],
            ],
        ]);
    }

    public function permissions_check( $request ): \WP_Error|bool
    {
        return current_user_can( 'manage_woocommerce' );
    }

    public function get_items( $args ): \WP_REST_Response {
        $roles = $this->roleService->get_all_roles();

        return new \WP_REST_Response( $roles, 200);
    }
}