<?php

namespace ClypperTechnology\RolePricing\REST;

use ClypperTechnology\RolePricing\REST\DTOs\RoleDTO;
use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;

defined('ABSPATH') || exit;

class RoleController extends  \WP_REST_Controller
{
    private RoleService $roleService;
    private RuleService $ruleService;

    public function __construct( string $namespace, RoleService $roleService, RuleService $ruleService )
    {
        $this->namespace     = $namespace;
        $this->resource_name = 'roles';
        $this->roleService  = $roleService;
        $this->ruleService = $ruleService;
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

    public function get_items( $request ): \WP_REST_Response {
         $status = $request->get_param( "status" );

         if($status == "existing") {
            $roles = $this->get_existing_roles();

            return new \WP_REST_Response( $roles, 200 );
         }

        $roles = $this->roleService->get_all_roles();
        $roleDTOs = [];

        foreach ($roles as $slug => $role_name) {
            $roleDTOs[] = new RoleDTO(0, $role_name, $slug);
        }

        return new \WP_REST_Response($roleDTOs, 200);
    }

    private function get_existing_roles()  {
        $rules = $this->ruleService->get_all_role_rules();
        $roles = $this->roleService->get_all_roles();

        $existing_roles = [];

        foreach ($rules as $rule) {
            if($rule->role_name == "guest") {
                $existing_roles[] = new RoleDTO($rule->id, "Guest", "guest");
                continue;
            }

            $slug = $rule->role_name;
            $role_name = $roles[$slug];


            $existing_roles[] = new RoleDTO($rule->id, $role_name, $slug);
        }

        return $existing_roles;
    }
}
