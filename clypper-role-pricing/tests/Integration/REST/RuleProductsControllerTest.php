<?php
/**
 * Integration tests for Rule Products REST Controller
 *
 * @package WooRolesRulesB2B
 */

namespace ClypperTechnology\RolePricing\Tests\Integration\REST;

use WP_REST_Request;
use WP_UnitTestCase;

/**
 * Rule Products REST Controller test case.
 */
class RuleProductsControllerTest extends WP_UnitTestCase {

	/**
	 * Admin user ID
	 *
	 * @var int
	 */
	private int $admin_user_id;

	/**
	 * Shop manager user ID
	 *
	 * @var int
	 */
	private int $shop_manager_id;

	/**
	 * Test rule ID
	 *
	 * @var int
	 */
	private int $test_rule_id;

	/**
	 * Test product IDs
	 *
	 * @var array
	 */
	private array $test_product_ids = [];

	/**
	 * Test category ID
	 *
	 * @var int
	 */
	private int $test_category_id;

	/**
	 * REST namespace
	 *
	 * @var string
	 */
	private string $namespace = 'rrb2b/v1';

	/**
	 * Set up test environment
	 */
	protected function setUp(): void {
		parent::setUp();

		// Create test users
		$this->admin_user_id = $this->factory->user->create(
			[
				'role' => 'administrator',
			]
		);

		$this->shop_manager_id = $this->factory->user->create(
			[
				'role' => 'shop_manager',
			]
		);

		// Create test rule
		$this->test_rule_id = wp_insert_post(
			[
				'post_type'   => 'rrb2b',
				'post_title'  => 'test_role',
				'post_status' => 'publish',
			]
		);

		// Create test category
		$category_result       = wp_insert_term( 'Test Product Category', 'product_cat' );
		$this->test_category_id = $category_result['term_id'];

		// Create test products (requires WooCommerce)
		if ( class_exists( 'WC_Product_Simple' ) ) {
			for ( $i = 1; $i <= 3; $i++ ) {
				$product = new \WC_Product_Simple();
				$product->set_name( "Test Product $i" );
				$product->set_regular_price( 100 );
				$product->set_sku( "TEST-SKU-$i" );
				$product->set_status( 'publish' );
				$product->set_category_ids( [ $this->test_category_id ] );
				$this->test_product_ids[] = $product->save();
			}
		}
	}

	/**
	 * Clean up after each test
	 */
	protected function tearDown(): void {
		// Delete test rule
		if ( $this->test_rule_id ) {
			wp_delete_post( $this->test_rule_id, true );
		}

		// Delete test products
		foreach ( $this->test_product_ids as $product_id ) {
			wp_delete_post( $product_id, true );
		}

		// Delete test category
		if ( $this->test_category_id ) {
			wp_delete_term( $this->test_category_id, 'product_cat' );
		}

		parent::tearDown();
	}

	/**
	 * Test that searching products requires authentication
	 */
	public function test_search_products_requires_authentication(): void {
		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/search' );
		$request->set_body_params( [ 'search' => 'test' ] );
		$response = rest_do_request( $request );

		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test searching products as admin
	 */
	public function test_search_products_as_admin(): void {
		if ( empty( $this->test_product_ids ) ) {
			$this->markTestSkipped( 'WooCommerce not available' );
		}

		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/search' );
		$request->set_body_params( [ 'search' => 'Test Product' ] );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertIsArray( $data );
	}

	/**
	 * Test searching products by name
	 */
	public function test_search_products_by_name(): void {
		if ( empty( $this->test_product_ids ) ) {
			$this->markTestSkipped( 'WooCommerce not available' );
		}

		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/search' );
		$request->set_body_params( [ 'search' => 'Product 1' ] );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertNotEmpty( $data );

		// Verify product structure
		if ( ! empty( $data ) ) {
			$first_product = $data[0];
			$this->assertArrayHasKey( 'value', $first_product );
			$this->assertArrayHasKey( 'data', $first_product );
		}
	}

	/**
	 * Test searching products by SKU
	 */
	public function test_search_products_by_sku(): void {
		if ( empty( $this->test_product_ids ) ) {
			$this->markTestSkipped( 'WooCommerce not available' );
		}

		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/search' );
		$request->set_body_params( [ 'search' => 'TEST-SKU-1' ] );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertNotEmpty( $data );
	}

	/**
	 * Test search with empty query
	 */
	public function test_search_products_with_empty_query(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/search' );
		$request->set_body_params( [ 'search' => '' ] );
		$response = rest_do_request( $request );

		// Should fail validation
		$this->assertNotEquals( 200, $response->get_status() );
	}

	/**
	 * Test search for non-existent rule returns 404
	 */
	public function test_search_products_for_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/999999/products/search' );
		$request->set_body_params( [ 'search' => 'test' ] );
		$response = rest_do_request( $request );

		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test updating products requires authentication
	 */
	public function test_update_products_requires_authentication(): void {
		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products' );
		$request->set_body_params( [ 'rows' => [] ] );
		$response = rest_do_request( $request );

		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test updating product rules successfully
	 */
	public function test_update_product_rules_successfully(): void {
		if ( empty( $this->test_product_ids ) ) {
			$this->markTestSkipped( 'WooCommerce not available' );
		}

		wp_set_current_user( $this->admin_user_id );

		$rows = [
			[
				'product_id' => $this->test_product_ids[0],
				'type'       => 'percentage',
				'value'      => '15',
			],
			[
				'product_id' => $this->test_product_ids[1],
				'type'       => 'fixed',
				'value'      => '10',
			],
		];

		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products' );
		$request->set_body_params( [ 'rows' => $rows ] );

		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['success'] );
		$this->assertEquals( $this->test_rule_id, $data['rule_id'] );
	}

	/**
	 * Test updating products for non-existent rule returns 404
	 */
	public function test_update_products_for_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/999999/products' );
		$request->set_body_params( [ 'rows' => [] ] );

		$response = rest_do_request( $request );

		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test updating products without rows parameter fails
	 */
	public function test_update_products_without_rows_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products' );
		$response = rest_do_request( $request );

		$this->assertNotEquals( 200, $response->get_status() );
	}

	/**
	 * Test adding products from category requires authentication
	 */
	public function test_add_products_from_category_requires_authentication(): void {
		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/from-category' );
		$request->set_body_params(
			[
				'category'   => (string) $this->test_category_id,
				'variations' => false,
			]
		);
		$response = rest_do_request( $request );

		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test adding products from category successfully
	 */
	public function test_add_products_from_category_successfully(): void {
		if ( empty( $this->test_product_ids ) ) {
			$this->markTestSkipped( 'WooCommerce not available' );
		}

		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/from-category' );
		$request->set_body_params(
			[
				'category'   => (string) $this->test_category_id,
				'variations' => false,
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['success'] );
		$this->assertEquals( $this->test_rule_id, $data['rule_id'] );
		$this->assertGreaterThan( 0, $data['products_added'] );
	}

	/**
	 * Test adding products from category with variations
	 */
	public function test_add_products_from_category_with_variations(): void {
		if ( empty( $this->test_product_ids ) || ! class_exists( 'WC_Product_Variable' ) ) {
			$this->markTestSkipped( 'WooCommerce not available' );
		}

		wp_set_current_user( $this->admin_user_id );

		// Create a variable product
		$variable_product = new \WC_Product_Variable();
		$variable_product->set_name( 'Test Variable Product' );
		$variable_product->set_category_ids( [ $this->test_category_id ] );
		$variable_product_id = $variable_product->save();

		$this->test_product_ids[] = $variable_product_id;

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/from-category' );
		$request->set_body_params(
			[
				'category'   => (string) $this->test_category_id,
				'variations' => true,
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['success'] );
	}

	/**
	 * Test adding products from category for non-existent rule returns 404
	 */
	public function test_add_products_from_category_for_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/999999/products/from-category' );
		$request->set_body_params(
			[
				'category'   => (string) $this->test_category_id,
				'variations' => false,
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test adding products from non-existent category
	 */
	public function test_add_products_from_nonexistent_category(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/from-category' );
		$request->set_body_params(
			[
				'category'   => '999999',
				'variations' => false,
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		// Should succeed but add 0 products
		$this->assertEquals( 0, $data['products_added'] );
	}

	/**
	 * Test product search result structure
	 */
	public function test_product_search_result_structure(): void {
		if ( empty( $this->test_product_ids ) ) {
			$this->markTestSkipped( 'WooCommerce not available' );
		}

		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products/search' );
		$request->set_body_params( [ 'search' => 'Test Product' ] );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertIsArray( $data );

		if ( ! empty( $data ) ) {
			$product = $data[0];
			$this->assertArrayHasKey( 'value', $product );
			$this->assertArrayHasKey( 'data', $product );
			$this->assertIsString( $product['value'] );
			$this->assertIsInt( $product['data'] );
		}
	}

	/**
	 * Test updating product rules with empty rows
	 */
	public function test_update_products_with_empty_rows(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/products' );
		$request->set_body_params( [ 'rows' => [] ] );

		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['success'] );
	}
}
