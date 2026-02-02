<?php
/**
 * Roles REST Controller
 *
 * Handles REST API endpoints for WordPress role management
 *
 * @package ClypperTechnology\RolePricing\REST\Controllers
 */

namespace ClypperTechnology\RolePricing\REST\Controllers;

use ClypperTechnology\RolePricing\REST\BaseController;
use ClypperTechnology\RolePricing\Services\RoleService;
use ClypperTechnology\RolePricing\Services\RuleService;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;
use RuntimeException;
use WP_Roles;

use function get_role;
use function sanitize_title;

/**
 * Roles REST Controller
 *
 * Manages WordPress roles via REST API
 */
class RolesController extends BaseController {

	/**
	 * REST route base
	 *
	 * @var string
	 */
	protected $rest_base = 'roles';

	/**
	 * Role service instance
	 *
	 * @var RoleService
	 */
	private RoleService $role_service;

	/**
	 * Rule service instance
	 *
	 * @var RuleService
	 */
	private RuleService $rule_service;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->role_service = new RoleService();
		$this->rule_service = new RuleService();
	}

	/**
	 * Register REST API routes
	 *
	 * @return void
	 */
	public function register_routes(): void {
		// GET /rrb2b/v1/roles - List all roles
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_items' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
				],
			]
		);

		// POST /rrb2b/v1/roles - Create new role
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'create_item' ],
					'permission_callback' => [ $this, 'check_manage_options' ],
					'args'                => [
						'role_name' => [
							'description'       => __( 'Display name for the role.', 'clypper-role-pricing' ),
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
						'role_slug' => [
							'description'       => __( 'Machine-readable role identifier.', 'clypper-role-pricing' ),
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_title',
						],
						'role_cap'  => [
							'description'       => __( 'Base role to inherit capabilities from.', 'clypper-role-pricing' ),
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
				],
			]
		);

		// DELETE /rrb2b/v1/roles/{slug} - Delete role
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<slug>[a-zA-Z0-9_-]+)',
			[
				'args' => [
					'slug' => [
						'description'       => __( 'Role slug identifier.', 'clypper-role-pricing' ),
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_title',
					],
				],
				[
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => [ $this, 'delete_item' ],
					'permission_callback' => [ $this, 'check_manage_options' ],
				],
			]
		);
	}

	/**
	 * Get all roles
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response Response object.
	 */
	public function get_items( $request ): WP_REST_Response {
		global $wp_roles;

		if ( ! isset( $wp_roles ) ) {
			$wp_roles = new \WP_Roles();
		}

		$all_roles = $wp_roles->roles;
		$roles     = [];

		// Get user counts for all roles
		$user_counts = count_users();

		foreach ( $all_roles as $slug => $role_data ) {
			$user_count = $user_counts['avail_roles'][ $slug ] ?? 0;

			$roles[] = [
				'slug'         => $slug,
				'name'         => $role_data['name'],
				'capabilities' => array_keys( array_filter( $role_data['capabilities'] ) ),
				'user_count'   => $user_count,
			];
		}

		return new WP_REST_Response( $roles, 200 );
	}

	/**
	 * Create a new role
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function create_item( $request ) {
		$role_name = $request->get_param( 'role_name' );
		$role_slug = $request->get_param( 'role_slug' );
		$role_cap  = $request->get_param( 'role_cap' );

		if ( empty( $role_name ) || empty( $role_slug ) ) {
			return $this->validation_error( __( 'Role name and slug are required.', 'clypper-role-pricing' ) );
		}

		// Check if role already exists
		if ( get_role( $role_slug ) ) {
			return $this->error_response(
				__( 'A role with this slug already exists.', 'clypper-role-pricing' ),
				400
			);
		}

		try {
			$data = [
				'role-name' => $role_name,
				'role-slug' => $role_slug,
				'role-cap'  => $role_cap,
			];

			$result = $this->role_service->add_role( $data );

			if ( $result ) {
				$this->log(
					'Role created via REST API',
					'info',
					[
						'role_slug' => $role_slug,
						'role_name' => $role_name,
					]
				);

				return new WP_REST_Response(
					[
						'success' => true,
						'message' => __( 'Role created successfully.', 'clypper-role-pricing' ),
						'role'    => [
							'slug' => $role_slug,
							'name' => $role_name,
						],
					],
					201
				);
			} else {
				return $this->service_error( __( 'Failed to create role.', 'clypper-role-pricing' ) );
			}
		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to create role: ' . $e->getMessage(), 'error' );
			return $this->service_error( __( 'Failed to create role.', 'clypper-role-pricing' ) );
		}
	}

	/**
	 * Delete a role and all associated rules
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function delete_item( $request ) {
		$role_slug = sanitize_title( $request['slug'] );

		// Check if role exists
		$role = get_role( $role_slug );
		if ( ! $role ) {
			return $this->not_found_error( __( 'Role', 'clypper-role-pricing' ) );
		}

		// Prevent deletion of core WordPress roles
		$core_roles = [ 'administrator', 'editor', 'author', 'contributor', 'subscriber', 'customer', 'shop_manager' ];
		if ( in_array( $role_slug, $core_roles, true ) ) {
			return $this->error_response(
				__( 'Cannot delete core WordPress or WooCommerce roles.', 'clypper-role-pricing' ),
				403
			);
		}

		try {
			// Find and delete all rules associated with this role
			$args = [
				'post_type'      => 'rrb2b',
				'posts_per_page' => -1,
				'title'          => $role_slug,
			];

			$rules = get_posts( $args );

			foreach ( $rules as $rule ) {
				wp_delete_post( $rule->ID, true );
			}

			// Delete the role
			remove_role( $role_slug );

			$this->log(
				'Role deleted via REST API',
				'info',
				[
					'role_slug'     => $role_slug,
					'rules_deleted' => count( $rules ),
				]
			);

			return new WP_REST_Response(
				[
					'deleted'       => true,
					'message'       => __( 'Role and associated rules deleted successfully.', 'clypper-role-pricing' ),
					'role_slug'     => $role_slug,
					'rules_deleted' => count( $rules ),
				],
				200
			);

		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to delete role: ' . $e->getMessage(), 'error', [ 'role_slug' => $role_slug ] );
			return $this->service_error( __( 'Failed to delete role.', 'clypper-role-pricing' ) );
		}
	}
}
