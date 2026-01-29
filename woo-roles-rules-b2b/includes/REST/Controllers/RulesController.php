<?php
/**
 * Rules REST Controller
 *
 * Handles REST API endpoints for rule management
 *
 * @package ClypperTechnology\RolePricing\REST\Controllers
 */

namespace ClypperTechnology\RolePricing\REST\Controllers;

use ClypperTechnology\RolePricing\REST\BaseController;
use ClypperTechnology\RolePricing\Services\RuleService;
use WP_REST_Request;
use WP_REST_Response;
use WP_REST_Server;
use WP_Error;
use InvalidArgumentException;
use RuntimeException;

/**
 * Rules REST Controller
 *
 * Manages CRUD operations for pricing rules via REST API
 */
class RulesController extends BaseController {

	/**
	 * REST route base
	 *
	 * @var string
	 */
	protected $rest_base = 'rules';

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
		$this->rule_service = new RuleService();
	}

	/**
	 * Register REST API routes
	 *
	 * @return void
	 */
	public function register_routes(): void {
		// GET /rrb2b/v1/rules - List all rules
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_items' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
				],
				'schema' => [ $this, 'get_public_item_schema' ],
			]
		);

		// POST /rrb2b/v1/rules - Create new rule
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			[
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'create_item' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
					'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::CREATABLE ),
				],
			]
		);

		// GET /rrb2b/v1/rules/{id} - Get single rule
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)',
			[
				'args' => [
					'id' => [
						'description'       => __( 'Unique identifier for the rule.', 'clypper-role-pricing' ),
						'type'              => 'integer',
						'validate_callback' => [ $this, 'validate_positive_integer' ],
					],
				],
				[
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => [ $this, 'get_item' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
				],
			]
		);

		// PUT /rrb2b/v1/rules/{id} - Update rule
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)',
			[
				'args' => [
					'id' => [
						'description'       => __( 'Unique identifier for the rule.', 'clypper-role-pricing' ),
						'type'              => 'integer',
						'validate_callback' => [ $this, 'validate_positive_integer' ],
					],
				],
				[
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'update_item' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
					'args'                => $this->get_endpoint_args_for_item_schema( WP_REST_Server::EDITABLE ),
				],
			]
		);

		// DELETE /rrb2b/v1/rules/{id} - Delete rule
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)',
			[
				'args' => [
					'id' => [
						'description'       => __( 'Unique identifier for the rule.', 'clypper-role-pricing' ),
						'type'              => 'integer',
						'validate_callback' => [ $this, 'validate_positive_integer' ],
					],
				],
				[
					'methods'             => WP_REST_Server::DELETABLE,
					'callback'            => [ $this, 'delete_item' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
				],
			]
		);

		// POST /rrb2b/v1/rules/{id}/copy - Copy rule to other roles
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/copy',
			[
				'args' => [
					'id' => [
						'description'       => __( 'Unique identifier for the rule.', 'clypper-role-pricing' ),
						'type'              => 'integer',
						'validate_callback' => [ $this, 'validate_positive_integer' ],
					],
				],
				[
					'methods'             => WP_REST_Server::CREATABLE,
					'callback'            => [ $this, 'copy_rule' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
					'args'                => [
						'type' => [
							'description'       => __( 'Type of rules to copy (category or product).', 'clypper-role-pricing' ),
							'type'              => 'string',
							'required'          => true,
							'enum'              => [ 'category', 'product' ],
							'sanitize_callback' => 'sanitize_text_field',
						],
						'to'   => [
							'description'       => __( 'Target rule IDs to copy to.', 'clypper-role-pricing' ),
							'type'              => 'array',
							'required'          => true,
							'items'             => [
								'type' => 'integer',
							],
						],
					],
				],
			]
		);
	}

	/**
	 * Get all rules
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function get_items( $request ) {
		try {
			$rules = $this->rule_service->get_all_role_rules();

			$data = [];
			foreach ( $rules as $rule ) {
				$data[] = $this->prepare_item_for_response( $rule, $request );
			}

			return new WP_REST_Response( $data, 200 );

		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to get rules: ' . $e->getMessage(), 'error' );
			return $this->service_error( __( 'Failed to retrieve rules.', 'clypper-role-pricing' ) );
		}
	}

	/**
	 * Get a single rule
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function get_item( $request ) {
		$rule_id = (int) $request['id'];

		try {
			$rule = $this->rule_service->get_rules_by_id( $rule_id );

			if ( ! $rule ) {
				return $this->not_found_error( __( 'Rule', 'clypper-role-pricing' ) );
			}

			return new WP_REST_Response(
				$this->prepare_item_for_response( $rule, $request ),
				200
			);

		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to get rule: ' . $e->getMessage(), 'error', [ 'rule_id' => $rule_id ] );
			return $this->service_error( __( 'Failed to retrieve rule.', 'clypper-role-pricing' ) );
		}
	}

	/**
	 * Create a new rule
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function create_item( $request ) {
		try {
			$this->log( 'Rule creation request received', 'debug', [ 'params' => $request->get_params() ] );

			$role_name = $this->sanitize_text( $request['role_name'] );

			if ( empty( $role_name ) ) {
				return $this->validation_error( __( 'Role name is required.', 'clypper-role-pricing' ) );
			}

			$rule_id = $this->rule_service->add_rule( $role_name );
			$rule    = $this->rule_service->get_rules_by_id( $rule_id );

			if ( ! $rule ) {
				throw new RuntimeException( 'Rule was created but could not be retrieved' );
			}

			$this->log( 'Rule created via REST API', 'info', [ 'rule_id' => $rule_id ] );

			return new WP_REST_Response(
				$this->prepare_item_for_response( $rule, $request ),
				201
			);

		} catch ( InvalidArgumentException $e ) {
			$this->log( 'Invalid argument: ' . $e->getMessage(), 'warning' );
			return $this->validation_error( $e->getMessage() );
		} catch ( RuntimeException $e ) {
			$this->log( 'Runtime error: ' . $e->getMessage(), 'error' );
			return $this->service_error( __( 'Failed to create rule. Please try again.', 'clypper-role-pricing' ) );
		} catch ( \Exception $e ) {
			$this->log( 'Unexpected error: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine(), 'critical' );
			return $this->error_response( 'An unexpected error occurred: ' . $e->getMessage(), 500 );
		}
	}

	/**
	 * Update a rule
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function update_item( $request ) {
		$rule_id = (int) $request['id'];

		// Check if rule exists
		$existing_rule = $this->rule_service->get_rules_by_id( $rule_id );
		if ( ! $existing_rule ) {
			return $this->not_found_error( __( 'Rule', 'clypper-role-pricing' ) );
		}

		try {
			// Prepare data for update
			$data = [
				'id'                          => $rule_id,
				'rule_active'                 => isset( $request['rule_active'] ) ? (bool) $request['rule_active'] : null,
				'reduce_regular_type'         => isset( $request['global_rule']['type'] ) ? $this->sanitize_text( $request['global_rule']['type'] ) : null,
				'reduce_regular_value'        => isset( $request['global_rule']['value'] ) ? $this->sanitize_text( $request['global_rule']['value'] ) : null,
				'reduce_categories_type'      => isset( $request['category_rule']['type'] ) ? $this->sanitize_text( $request['category_rule']['type'] ) : null,
				'reduce_categories_value'     => isset( $request['category_rule']['value'] ) ? $this->sanitize_text( $request['category_rule']['value'] ) : null,
				'selected_categories'         => isset( $request['categories'] ) ? implode( ',', array_map( 'intval', $request['categories'] ) ) : null,
			];

			// Remove null values
			$data = array_filter( $data, fn( $value ) => $value !== null );

			$this->rule_service->update_rule( $data );

			$updated_rule = $this->rule_service->get_rules_by_id( $rule_id );

			$this->log( 'Rule updated via REST API', 'info', [ 'rule_id' => $rule_id ] );

			return new WP_REST_Response(
				$this->prepare_item_for_response( $updated_rule, $request ),
				200
			);

		} catch ( InvalidArgumentException $e ) {
			return $this->validation_error( $e->getMessage() );
		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to update rule: ' . $e->getMessage(), 'error', [ 'rule_id' => $rule_id ] );
			return $this->service_error( __( 'Failed to update rule. Please try again.', 'clypper-role-pricing' ) );
		}
	}

	/**
	 * Delete a rule
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function delete_item( $request ) {
		try {
			$rule_id = (int) $request['id'];

			$this->log( 'Rule deletion request received', 'debug', [ 'rule_id' => $rule_id ] );

			// Check if rule exists
			$rule = $this->rule_service->get_rules_by_id( $rule_id );
			if ( ! $rule ) {
				return $this->not_found_error( __( 'Rule', 'clypper-role-pricing' ) );
			}

			$this->rule_service->delete_rule( $rule_id );

			$this->log( 'Rule deleted via REST API', 'info', [ 'rule_id' => $rule_id ] );

			return new WP_REST_Response(
				[
					'deleted' => true,
					'id'      => $rule_id,
					'message' => __( 'Rule deleted successfully.', 'clypper-role-pricing' ),
				],
				200
			);

		} catch ( RuntimeException $e ) {
			$this->log( 'Runtime error deleting rule: ' . $e->getMessage(), 'error', [ 'rule_id' => $rule_id ?? null ] );
			return $this->service_error( __( 'Failed to delete rule. Please try again.', 'clypper-role-pricing' ) );
		} catch ( \Exception $e ) {
			$this->log( 'Unexpected error deleting rule: ' . $e->getMessage() . ' in ' . $e->getFile() . ':' . $e->getLine(), 'critical' );
			return $this->error_response( 'An unexpected error occurred: ' . $e->getMessage(), 500 );
		}
	}

	/**
	 * Copy rules to other roles
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function copy_rule( $request ) {
		$from_rule_id = (int) $request['id'];
		$type         = $this->sanitize_text( $request['type'] );
		$to_rule_ids  = array_map( 'intval', $request['to'] );

		// Validate type parameter
		$valid_types = [ 'category', 'product', 'products' ];
		if ( ! in_array( $type, $valid_types, true ) ) {
			return $this->validation_error(
				sprintf(
					__( 'Invalid copy type. Must be one of: %s', 'clypper-role-pricing' ),
					implode( ', ', $valid_types )
				)
			);
		}

		if ( empty( $to_rule_ids ) ) {
			return $this->validation_error( __( 'At least one target rule ID is required.', 'clypper-role-pricing' ) );
		}

		try {
			$data = [
				'from' => $from_rule_id,
				'to'   => implode( ',', $to_rule_ids ),
				'type' => $type,
			];

			$result = $this->rule_service->copy_rules( $data );

			$this->log(
				'Rules copied via REST API',
				'info',
				[
					'from' => $from_rule_id,
					'to'   => $to_rule_ids,
					'type' => $type,
				]
			);

			return new WP_REST_Response(
				[
					'success'    => true,
					'copied'     => $result,
					'message'    => __( 'Rules copied successfully.', 'clypper-role-pricing' ),
					'from_rule'  => $from_rule_id,
					'to_rules'   => $to_rule_ids,
					'rule_type'  => $type,
				],
				200
			);

		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to copy rules: ' . $e->getMessage(), 'error' );
			return $this->service_error( __( 'Failed to copy rules. Please try again.', 'clypper-role-pricing' ) );
		}
	}

	/**
	 * Prepare rule data for response
	 *
	 * @param object          $rule    Rule object.
	 * @param WP_REST_Request $request Request object.
	 * @return array Prepared rule data.
	 */
	public function prepare_item_for_response( $rule, $request ): array {
		return [
			'id'                 => $rule->id ?? 0,
			'role_name'          => $rule->role_name ?? '',
			'rule_active'        => (bool) ( $rule->rule_active ?? false ),
			'global_rule'        => $rule->global_rule ? $rule->global_rule->to_array() : null,
			'category_rule'      => $rule->category_rule ? $rule->category_rule->to_array() : null,
			'categories'         => $rule->categories ?? [],
			'products'           => array_map( fn( $p ) => $p->to_array(), $rule->products ?? [] ),
			'single_categories'  => array_map( fn( $c ) => $c->to_array(), $rule->single_categories ?? [] ),
		];
	}

	/**
	 * Get the rule schema
	 *
	 * @return array Schema array.
	 */
	public function get_item_schema(): array {
		if ( $this->schema ) {
			return $this->add_additional_fields_schema( $this->schema );
		}

		$this->schema = [
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'rule',
			'type'       => 'object',
			'properties' => [
				'id'                => [
					'description' => __( 'Unique identifier for the rule.', 'clypper-role-pricing' ),
					'type'        => 'integer',
					'context'     => [ 'view', 'edit' ],
					'readonly'    => true,
				],
				'role_name'         => [
					'description' => __( 'WordPress role name.', 'clypper-role-pricing' ),
					'type'        => 'string',
					'required'    => true,
					'context'     => [ 'view', 'edit' ],
				],
				'rule_active'       => [
					'description' => __( 'Whether the rule is active.', 'clypper-role-pricing' ),
					'type'        => 'boolean',
					'default'     => false,
					'context'     => [ 'view', 'edit' ],
				],
				'global_rule'       => [
					'description' => __( 'Global pricing rule.', 'clypper-role-pricing' ),
					'type'        => [ 'object', 'null' ],
					'context'     => [ 'view', 'edit' ],
				],
				'category_rule'     => [
					'description' => __( 'Category-level pricing rule.', 'clypper-role-pricing' ),
					'type'        => [ 'object', 'null' ],
					'context'     => [ 'view', 'edit' ],
				],
				'categories'        => [
					'description' => __( 'General category IDs.', 'clypper-role-pricing' ),
					'type'        => 'array',
					'items'       => [ 'type' => 'integer' ],
					'context'     => [ 'view', 'edit' ],
				],
				'products'          => [
					'description' => __( 'Product-specific rules.', 'clypper-role-pricing' ),
					'type'        => 'array',
					'context'     => [ 'view', 'edit' ],
				],
				'single_categories' => [
					'description' => __( 'Category-specific rules.', 'clypper-role-pricing' ),
					'type'        => 'array',
					'context'     => [ 'view', 'edit' ],
				],
			],
		];

		return $this->add_additional_fields_schema( $this->schema );
	}
}
