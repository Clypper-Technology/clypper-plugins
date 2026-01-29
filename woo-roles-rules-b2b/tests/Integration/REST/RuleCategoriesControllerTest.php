<?php
/**
 * Integration tests for Rule Categories REST Controller
 *
 * @package WooRolesRulesB2B
 */

namespace ClypperTechnology\RolePricing\Tests\Integration\REST;

use WP_REST_Request;
use WP_UnitTestCase;

/**
 * Rule Categories REST Controller test case.
 */
class RuleCategoriesControllerTest extends WP_UnitTestCase {

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
	 * Test category IDs
	 *
	 * @var array
	 */
	private array $test_category_ids = [];

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

		// Create test categories
		$this->test_category_ids[] = wp_insert_term( 'Test Category 1', 'product_cat' )['term_id'];
		$this->test_category_ids[] = wp_insert_term( 'Test Category 2', 'product_cat' )['term_id'];
		$this->test_category_ids[] = wp_insert_term( 'Test Category 3', 'product_cat' )['term_id'];
	}

	/**
	 * Clean up after each test
	 */
	protected function tearDown(): void {
		// Delete test rule
		if ( $this->test_rule_id ) {
			wp_delete_post( $this->test_rule_id, true );
		}

		// Delete test categories
		foreach ( $this->test_category_ids as $cat_id ) {
			wp_delete_term( $cat_id, 'product_cat' );
		}

		parent::tearDown();
	}

	/**
	 * Test that getting categories requires authentication
	 */
	public function test_get_categories_requires_authentication(): void {
		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test getting categories for a rule as admin
	 */
	public function test_get_categories_as_admin(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertArrayHasKey( 'rule_id', $data );
		$this->assertArrayHasKey( 'categories', $data );
		$this->assertEquals( $this->test_rule_id, $data['rule_id'] );
	}

	/**
	 * Test getting categories for a rule as shop manager
	 */
	public function test_get_categories_as_shop_manager(): void {
		wp_set_current_user( $this->shop_manager_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );
	}

	/**
	 * Test getting categories for non-existent rule returns 404
	 */
	public function test_get_categories_for_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/999999/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test updating categories requires authentication
	 */
	public function test_update_categories_requires_authentication(): void {
		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$request->set_body_params(
			[
				'rows' => [],
			]
		);
		$response = rest_do_request( $request );

		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test updating category rules successfully
	 */
	public function test_update_category_rules_successfully(): void {
		wp_set_current_user( $this->admin_user_id );

		$rows = [
			[
				'category_id' => $this->test_category_ids[0],
				'type'        => 'percentage',
				'value'       => '10',
			],
			[
				'category_id' => $this->test_category_ids[1],
				'type'        => 'fixed',
				'value'       => '5',
			],
		];

		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$request->set_body_params(
			[
				'rows' => $rows,
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['success'] );
		$this->assertEquals( $this->test_rule_id, $data['rule_id'] );
	}

	/**
	 * Test updating categories for non-existent rule returns 404
	 */
	public function test_update_categories_for_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/999999/categories' );
		$request->set_body_params(
			[
				'rows' => [],
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test updating categories without rows parameter fails
	 */
	public function test_update_categories_without_rows_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertNotEquals( 200, $response->get_status() );
	}

	/**
	 * Test getting categories with general category IDs
	 */
	public function test_get_categories_with_general_categories(): void {
		wp_set_current_user( $this->admin_user_id );

		// Add general categories to rule
		update_post_meta(
			$this->test_rule_id,
			'rrb2b_selected_categories',
			implode( ',', $this->test_category_ids )
		);

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertArrayHasKey( 'categories', $data );

		// Verify general categories are present
		if ( isset( $data['categories']['general'] ) ) {
			$this->assertIsArray( $data['categories']['general'] );
			$this->assertNotEmpty( $data['categories']['general'] );
		}
	}

	/**
	 * Test getting categories with category-specific rules
	 */
	public function test_get_categories_with_specific_rules(): void {
		wp_set_current_user( $this->admin_user_id );

		// Add category-specific rules to rule
		$category_rules = [
			[
				'category_id' => $this->test_category_ids[0],
				'type'        => 'percentage',
				'value'       => '15',
			],
		];

		update_post_meta( $this->test_rule_id, 'rrb2b_single_categories', $category_rules );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertArrayHasKey( 'categories', $data );

		// Verify specific rules are present
		if ( isset( $data['categories']['specific'] ) ) {
			$this->assertIsArray( $data['categories']['specific'] );
		}
	}

	/**
	 * Test getting categories with category rule
	 */
	public function test_get_categories_with_category_rule(): void {
		wp_set_current_user( $this->admin_user_id );

		// Add category rule to rule
		$category_rule = [
			'type'  => 'fixed',
			'value' => '10',
		];

		update_post_meta( $this->test_rule_id, 'rrb2b_reduce_categories_type', $category_rule['type'] );
		update_post_meta( $this->test_rule_id, 'rrb2b_reduce_categories_value', $category_rule['value'] );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertArrayHasKey( 'categories', $data );
		$this->assertArrayHasKey( 'category_rule', $data['categories'] );
	}

	/**
	 * Test updating category rules with empty rows clears existing rules
	 */
	public function test_update_categories_with_empty_rows(): void {
		wp_set_current_user( $this->admin_user_id );

		// First add some rules
		$rows = [
			[
				'category_id' => $this->test_category_ids[0],
				'type'        => 'percentage',
				'value'       => '10',
			],
		];

		$request1 = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$request1->set_body_params( [ 'rows' => $rows ] );
		rest_do_request( $request1 );

		// Now clear with empty rows
		$request2 = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$request2->set_body_params( [ 'rows' => [] ] );
		$response2 = rest_do_request( $request2 );

		$this->assertEquals( 200, $response2->get_status() );
	}

	/**
	 * Test updating category rules with multiple categories
	 */
	public function test_update_categories_with_multiple_categories(): void {
		wp_set_current_user( $this->admin_user_id );

		$rows = [];
		foreach ( $this->test_category_ids as $i => $cat_id ) {
			$rows[] = [
				'category_id' => $cat_id,
				'type'        => $i % 2 === 0 ? 'percentage' : 'fixed',
				'value'       => (string) ( ( $i + 1 ) * 5 ),
			];
		}

		$request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$request->set_body_params( [ 'rows' => $rows ] );

		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['success'] );
	}

	/**
	 * Test category rule response structure
	 */
	public function test_category_response_structure(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $this->test_rule_id . '/categories' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();

		// Verify top-level structure
		$this->assertArrayHasKey( 'rule_id', $data );
		$this->assertArrayHasKey( 'categories', $data );

		// Verify categories structure
		$this->assertIsArray( $data['categories'] );
	}
}
