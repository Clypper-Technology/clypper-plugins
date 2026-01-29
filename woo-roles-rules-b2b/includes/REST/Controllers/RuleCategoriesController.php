<?php
/**
 * Rule Categories REST Controller
 *
 * Handles REST API endpoints for managing categories within rules
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
use RuntimeException;

use function get_term;
use function is_wp_error;

/**
 * Rule Categories REST Controller
 *
 * Manages category-specific pricing rules via REST API
 */
class RuleCategoriesController extends BaseController {

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
		// GET /rrb2b/v1/rules/{id}/categories - Get categories for rule
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/categories',
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
					'callback'            => [ $this, 'get_categories' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
				],
			]
		);

		// PUT /rrb2b/v1/rules/{id}/categories - Update category rules
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/categories',
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
					'callback'            => [ $this, 'update_categories' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
					'args'                => [
						'rows' => [
							'description' => __( 'Array of category rules to update.', 'clypper-role-pricing' ),
							'type'        => 'array',
							'required'    => true,
						],
					],
				],
			]
		);
	}

	/**
	 * Get categories for a rule
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function get_categories( $request ) {
		$rule_id = (int) $request['id'];

		// Verify rule exists
		$rule = $this->rule_service->get_rules_by_id( $rule_id );
		if ( ! $rule ) {
			return $this->not_found_error( __( 'Rule', 'clypper-role-pricing' ) );
		}

		try {
			$categories = [];

			// Get general categories
			if ( ! empty( $rule->categories ) ) {
				foreach ( $rule->categories as $category_id ) {
					$term = get_term( $category_id, 'product_cat' );
					if ( $term && ! is_wp_error( $term ) ) {
						$categories['general'][] = [
							'id'   => $term->term_id,
							'slug' => $term->slug,
							'name' => $term->name,
						];
					}
				}
			}

			// Get category-specific rules
			if ( ! empty( $rule->single_categories ) ) {
				$categories['specific'] = $rule->single_categories;
			}

			// Get category rule
			$categories['category_rule'] = $rule->category_rule ?? null;

			return new WP_REST_Response(
				[
					'rule_id'    => $rule_id,
					'categories' => $categories,
				],
				200
			);

		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to get categories: ' . $e->getMessage(), 'error', [ 'rule_id' => $rule_id ] );
			return $this->service_error( __( 'Failed to retrieve categories.', 'clypper-role-pricing' ) );
		}
	}

	/**
	 * Update category rules
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function update_categories( $request ) {
		$rule_id = (int) $request['id'];
		$rows    = $request['rows'];

		// Verify rule exists
		$rule = $this->rule_service->get_rules_by_id( $rule_id );
		if ( ! $rule ) {
			return $this->not_found_error( __( 'Rule', 'clypper-role-pricing' ) );
		}

		try {
			$data = [
				'rule_id' => $rule_id,
				'rows'    => $rows,
			];

			$this->rule_service->update_category_rule( $data );

			$this->log(
				'Category rules updated via REST API',
				'info',
				[
					'rule_id'          => $rule_id,
					'categories_count' => count( $rows ),
				]
			);

			return new WP_REST_Response(
				[
					'success' => true,
					'message' => __( 'Category rules updated successfully.', 'clypper-role-pricing' ),
					'rule_id' => $rule_id,
				],
				200
			);

		} catch ( RuntimeException $e ) {
			$this->log( 'Failed to update category rules: ' . $e->getMessage(), 'error', [ 'rule_id' => $rule_id ] );
			return $this->service_error( __( 'Failed to update category rules.', 'clypper-role-pricing' ) );
		}
	}
}
