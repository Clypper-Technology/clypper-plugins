<?php
/**
 * Rule Products REST Controller
 *
 * Handles REST API endpoints for managing products within rules
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
use function wc_get_products;
use function wc_get_product;
use function wc_attribute_label;

/**
 * Rule Products REST Controller
 *
 * Manages product-specific pricing rules via REST API
 */
class RuleProductsController extends BaseController {

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
		// POST /rrb2b/v1/rules/{id}/products/search - Search products
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/products/search',
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
					'callback'            => [ $this, 'search_products' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
					'args'                => [
						'search' => [
							'description'       => __( 'Search term for product name or SKU.', 'clypper-role-pricing' ),
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
					],
				],
			]
		);

		// PUT /rrb2b/v1/rules/{id}/products - Bulk update products
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/products',
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
					'callback'            => [ $this, 'update_products' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
					'args'                => [
						'rows' => [
							'description' => __( 'Array of product rules to update.', 'clypper-role-pricing' ),
							'type'        => 'array',
							'required'    => true,
						],
					],
				],
			]
		);

		// POST /rrb2b/v1/rules/{id}/products/from-category - Add products by category
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/(?P<id>[\d]+)/products/from-category',
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
					'callback'            => [ $this, 'add_products_from_category' ],
					'permission_callback' => [ $this, 'check_admin_permissions' ],
					'args'                => [
						'category'   => [
							'description'       => __( 'Category slug or ID.', 'clypper-role-pricing' ),
							'type'              => 'string',
							'required'          => true,
							'sanitize_callback' => 'sanitize_text_field',
						],
						'variations' => [
							'description' => __( 'Include product variations.', 'clypper-role-pricing' ),
							'type'        => 'boolean',
							'default'     => false,
						],
					],
				],
			]
		);
	}

	/**
	 * Search products for autocomplete
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function search_products( $request ) {
		$rule_id = (int) $request['id'];
		$search  = $this->sanitize_text( $request['search'] );

		// Validate search query is not empty
		if ( empty( $search ) ) {
			return $this->validation_error( __( 'Search query cannot be empty.', 'clypper-role-pricing' ) );
		}

		return $this->with_rule( $rule_id, function( $rule ) use ( $search ) {
			$args = [
				's'              => $search,
				'post_type'      => 'product',
				'post_status'    => 'publish',
				'posts_per_page' => 40,
				'orderby'        => 'title',
				'order'          => 'ASC',
			];

			// Search by title
			$products_by_title = get_posts( $args );

			// Search by SKU
			$args['meta_query'] = [
				[
					'key'     => '_sku',
					'value'   => $search,
					'compare' => 'LIKE',
				],
			];
			unset( $args['s'] );
			$products_by_sku = get_posts( $args );

			// Combine and deduplicate
			$products    = array_merge( $products_by_title, $products_by_sku );
			$product_ids = array_unique( array_map( fn( $p ) => $p->ID, $products ) );

			$product_arr = [];

			foreach ( $product_ids as $product_id ) {
				$product = wc_get_product( $product_id );
				if ( ! $product ) {
					continue;
				}

				if ( $product->is_type( 'variable' ) ) {
					$variations = $product->get_available_variations();
					foreach ( $variations as $variation ) {
						$variation_obj = wc_get_product( $variation['variation_id'] );
						if ( ! $variation_obj ) {
							continue;
						}

						$attributes = [];
						foreach ( $variation['attributes'] as $key => $value ) {
							$attributes[] = wc_attribute_label( str_replace( 'attribute_', '', $key ) ) . ': ' . $value;
						}

						$product_arr[] = [
							'value' => $product->get_name() . ( ! empty( $attributes ) ? ' [' . implode( ', ', $attributes ) . ']' : '' ),
							'data'  => $variation['variation_id'],
						];
					}
				} else {
					$product_arr[] = [
						'value' => $product->get_name(),
						'data'  => $product->get_id(),
					];
				}
			}

			return new WP_REST_Response( $product_arr, 200 );
		}, 'search products' );
	}

	/**
	 * Update product rules
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function update_products( $request ) {
		$rule_id = (int) $request['id'];
		$rows    = $request['rows'];

		return $this->with_rule( $rule_id, function( $rule ) use ( $rule_id, $rows ) {
			$data = [
				'rule_id' => $rule_id,
				'rows'    => $rows,
			];

			$this->rule_service->update_product_rule( $data );

			$this->log(
				'Product rules updated via REST API',
				'info',
				[
					'rule_id'        => $rule_id,
					'products_count' => count( $rows ),
				]
			);

			return new WP_REST_Response(
				[
					'success' => true,
					'message' => __( 'Product rules updated successfully.', 'clypper-role-pricing' ),
					'rule_id' => $rule_id,
				],
				200
			);
		}, 'update product rules' );
	}

	/**
	 * Add products from a category to rule
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error Response object or error.
	 */
	public function add_products_from_category( $request ) {
		$rule_id    = (int) $request['id'];
		$category   = $this->sanitize_text( $request['category'] );
		$variations = (bool) $request['variations'];

		return $this->with_rule( $rule_id, function( $rule ) use ( $rule_id, $category, $variations ) {
			// Convert category ID to slug if numeric
			$category_param = $category;
			if ( is_numeric( $category ) ) {
				$term = get_term( (int) $category, 'product_cat' );
				if ( $term && ! is_wp_error( $term ) ) {
					$category_param = $term->slug;
				}
			}

			$args = [
				'category'       => [ $category_param ],
				'status'         => 'publish',
				'posts_per_page' => -1,
			];

			$products       = wc_get_products( $args );
			$products_added = 0;

			foreach ( $products as $product ) {
				if ( $variations && $product->is_type( 'variable' ) ) {
					$product_variations = $product->get_available_variations();
					foreach ( $product_variations as $variation ) {
						$variation_obj = wc_get_product( $variation['variation_id'] );
						if ( ! $variation_obj ) {
							continue;
						}

						$attributes = [];
						foreach ( $variation['attributes'] as $key => $value ) {
							$attributes[] = wc_attribute_label( str_replace( 'attribute_', '', $key ) ) . ': ' . $value;
						}

						$variation_name = $product->get_name() . ( ! empty( $attributes ) ? ' [' . implode( ', ', $attributes ) . ']' : '' );

						$this->rule_service->add_product_to_rule( $rule_id, $variation['variation_id'], $variation_name, true );
						$products_added++;
					}
				} else {
					$this->rule_service->add_product_to_rule( $rule_id, $product->get_id(), $product->get_name(), false );
					$products_added++;
				}
			}

			$this->log(
				'Products added from category via REST API',
				'info',
				[
					'rule_id'        => $rule_id,
					'category'       => $category,
					'products_added' => $products_added,
				]
			);

			return new WP_REST_Response(
				[
					'success'        => true,
					'message'        => __( 'Products added successfully from category.', 'clypper-role-pricing' ),
					'rule_id'        => $rule_id,
					'category'       => $category,
					'products_added' => $products_added,
				],
				200
			);
		}, 'add products from category' );
	}
}
