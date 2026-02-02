<?php
/**
 * Integration tests for Rules REST Controller
 *
 * @package WooRolesRulesB2B
 */

namespace ClypperTechnology\RolePricing\Tests\Integration\REST;

use WP_REST_Request;
use WP_UnitTestCase;

/**
 * Rules REST Controller test case.
 */
class RulesControllerTest extends WP_UnitTestCase {

	/**
	 * Admin user ID
	 *
	 * @var int
	 */
	private int $admin_user_id;

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

		// Create admin user
		$this->admin_user_id = $this->factory->user->create(
			[
				'role' => 'administrator',
			]
		);
	}

	/**
	 * Test that REST API requires authentication
	 */
	public function test_get_rules_requires_authentication(): void {
		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules' );
		$response = rest_do_request( $request );

		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test getting all rules as admin
	 */
	public function test_get_rules_as_admin(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );
		$this->assertIsArray( $response->get_data() );
	}

	/**
	 * Test creating a rule
	 */
	public function test_create_rule_as_admin(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$request->set_body_params(
			[
				'role_name' => 'test_vip_customer',
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 201, $response->get_status() );

		$data = $response->get_data();
		$this->assertArrayHasKey( 'id', $data );
		$this->assertArrayHasKey( 'role_name', $data );
		$this->assertEquals( 'test_vip_customer', $data['role_name'] );
	}

	/**
	 * Test creating a rule without role name fails
	 */
	public function test_create_rule_without_role_name_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$request->set_body_params( [] );

		$response = rest_do_request( $request );

		$this->assertEquals( 400, $response->get_status() );
	}

	/**
	 * Test getting a single rule
	 */
	public function test_get_single_rule(): void {
		wp_set_current_user( $this->admin_user_id );

		// First create a rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params(
			[
				'role_name' => 'test_wholesaler',
			]
		);
		$create_response = rest_do_request( $create_request );
		$created_rule    = $create_response->get_data();

		// Now get that rule
		$get_request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $created_rule['id'] );
		$get_response = rest_do_request( $get_request );

		$this->assertEquals( 200, $get_response->get_status() );

		$rule_data = $get_response->get_data();
		$this->assertEquals( $created_rule['id'], $rule_data['id'] );
		$this->assertEquals( 'test_wholesaler', $rule_data['role_name'] );
	}

	/**
	 * Test getting non-existent rule returns 404
	 */
	public function test_get_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/999999' );
		$response = rest_do_request( $request );

		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test updating a rule
	 */
	public function test_update_rule(): void {
		wp_set_current_user( $this->admin_user_id );

		// First create a rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params(
			[
				'role_name' => 'test_retailer',
			]
		);
		$create_response = rest_do_request( $create_request );
		$created_rule    = $create_response->get_data();

		// Now update it
		$update_request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $created_rule['id'] );
		$update_request->set_body_params(
			[
				'rule_active' => true,
			]
		);
		$update_response = rest_do_request( $update_request );

		$this->assertEquals( 200, $update_response->get_status() );

		$updated_rule = $update_response->get_data();
		$this->assertTrue( $updated_rule['rule_active'] );
	}

	/**
	 * Test deleting a rule
	 */
	public function test_delete_rule(): void {
		wp_set_current_user( $this->admin_user_id );

		// First create a rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params(
			[
				'role_name' => 'test_delete_me',
			]
		);
		$create_response = rest_do_request( $create_request );
		$created_rule    = $create_response->get_data();

		// Now delete it
		$delete_request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/rules/' . $created_rule['id'] );
		$delete_response = rest_do_request( $delete_request );

		$this->assertEquals( 200, $delete_response->get_status() );

		$data = $delete_response->get_data();
		$this->assertTrue( $data['deleted'] );
		$this->assertEquals( $created_rule['id'], $data['id'] );

		// Verify it's actually deleted
		$get_request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules/' . $created_rule['id'] );
		$get_response = rest_do_request( $get_request );

		$this->assertEquals( 404, $get_response->get_status() );
	}

	/**
	 * Test copying rules between roles
	 */
	public function test_copy_rule_to_other_roles(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create source rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params(
			[
				'role_name' => 'test_source_role',
			]
		);
		$create_response = rest_do_request( $create_request );
		$source_rule     = $create_response->get_data();

		// Create target rules
		$target1_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$target1_request->set_body_params( [ 'role_name' => 'test_target_1' ] );
		$target1_response = rest_do_request( $target1_request );
		$target1_rule     = $target1_response->get_data();

		$target2_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$target2_request->set_body_params( [ 'role_name' => 'test_target_2' ] );
		$target2_response = rest_do_request( $target2_request );
		$target2_rule     = $target2_response->get_data();

		// Copy rules
		$copy_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $source_rule['id'] . '/copy' );
		$copy_request->set_body_params(
			[
				'type' => 'category',
				'to'   => [ $target1_rule['id'], $target2_rule['id'] ],
			]
		);
		$copy_response = rest_do_request( $copy_request );

		$this->assertEquals( 200, $copy_response->get_status() );

		$data = $copy_response->get_data();
		$this->assertTrue( $data['success'] );
		$this->assertEquals( $source_rule['id'], $data['from_rule'] );
		$this->assertEquals( [ $target1_rule['id'], $target2_rule['id'] ], $data['to_rules'] );
		$this->assertEquals( 'category', $data['rule_type'] );
	}

	/**
	 * Test copy rule without target IDs fails
	 */
	public function test_copy_rule_without_targets_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create source rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params( [ 'role_name' => 'test_source' ] );
		$create_response = rest_do_request( $create_request );
		$source_rule     = $create_response->get_data();

		// Try to copy without targets
		$copy_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $source_rule['id'] . '/copy' );
		$copy_request->set_body_params(
			[
				'type' => 'category',
				'to'   => [],
			]
		);
		$copy_response = rest_do_request( $copy_request );

		$this->assertEquals( 400, $copy_response->get_status() );
	}

	/**
	 * Test copy rule with invalid type fails
	 */
	public function test_copy_rule_with_invalid_type_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create rules
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params( [ 'role_name' => 'test_source' ] );
		$create_response = rest_do_request( $create_request );
		$source_rule     = $create_response->get_data();

		$target_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$target_request->set_body_params( [ 'role_name' => 'test_target' ] );
		$target_response = rest_do_request( $target_request );
		$target_rule     = $target_response->get_data();

		// Try to copy with invalid type
		$copy_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules/' . $source_rule['id'] . '/copy' );
		$copy_request->set_body_params(
			[
				'type' => 'invalid_type',
				'to'   => [ $target_rule['id'] ],
			]
		);
		$copy_response = rest_do_request( $copy_request );

		// Should fail validation
		$this->assertNotEquals( 200, $copy_response->get_status() );
	}

	/**
	 * Test updating rule with global pricing
	 */
	public function test_update_rule_with_global_pricing(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params( [ 'role_name' => 'test_wholesale' ] );
		$create_response = rest_do_request( $create_request );
		$rule            = $create_response->get_data();

		// Update with global pricing
		$update_request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $rule['id'] );
		$update_request->set_body_params(
			[
				'rule_active'  => true,
				'global_rule'  => [
					'type'  => 'percentage',
					'value' => '10',
				],
			]
		);
		$update_response = rest_do_request( $update_request );

		$this->assertEquals( 200, $update_response->get_status() );

		$updated_rule = $update_response->get_data();
		$this->assertTrue( $updated_rule['rule_active'] );
		$this->assertNotNull( $updated_rule['global_rule'] );
	}

	/**
	 * Test updating rule with category pricing
	 */
	public function test_update_rule_with_category_pricing(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params( [ 'role_name' => 'test_category_pricing' ] );
		$create_response = rest_do_request( $create_request );
		$rule            = $create_response->get_data();

		// Update with category pricing
		$update_request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/' . $rule['id'] );
		$update_request->set_body_params(
			[
				'rule_active'   => true,
				'category_rule' => [
					'type'  => 'fixed',
					'value' => '5',
				],
				'categories'    => [ 1, 2, 3 ],
			]
		);
		$update_response = rest_do_request( $update_request );

		$this->assertEquals( 200, $update_response->get_status() );

		$updated_rule = $update_response->get_data();
		$this->assertNotNull( $updated_rule['category_rule'] );
		$this->assertNotEmpty( $updated_rule['categories'] );
	}

	/**
	 * Test updating non-existent rule returns 404
	 */
	public function test_update_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$update_request = new WP_REST_Request( 'PUT', '/' . $this->namespace . '/rules/999999' );
		$update_request->set_body_params( [ 'rule_active' => true ] );
		$update_response = rest_do_request( $update_request );

		$this->assertEquals( 404, $update_response->get_status() );
	}

	/**
	 * Test rule response structure
	 */
	public function test_rule_response_structure(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create rule
		$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
		$create_request->set_body_params( [ 'role_name' => 'test_structure' ] );
		$create_response = rest_do_request( $create_request );

		$this->assertEquals( 201, $create_response->get_status() );

		$rule = $create_response->get_data();

		// Verify all required fields are present
		$this->assertArrayHasKey( 'id', $rule );
		$this->assertArrayHasKey( 'role_name', $rule );
		$this->assertArrayHasKey( 'rule_active', $rule );
		$this->assertArrayHasKey( 'global_rule', $rule );
		$this->assertArrayHasKey( 'category_rule', $rule );
		$this->assertArrayHasKey( 'categories', $rule );
		$this->assertArrayHasKey( 'products', $rule );
		$this->assertArrayHasKey( 'single_categories', $rule );

		// Verify data types
		$this->assertIsInt( $rule['id'] );
		$this->assertIsString( $rule['role_name'] );
		$this->assertIsBool( $rule['rule_active'] );
		$this->assertIsArray( $rule['categories'] );
		$this->assertIsArray( $rule['products'] );
		$this->assertIsArray( $rule['single_categories'] );
	}

	/**
	 * Test deleting rule that doesn't exist returns 404
	 */
	public function test_delete_nonexistent_rule_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$delete_request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/rules/999999' );
		$delete_response = rest_do_request( $delete_request );

		$this->assertEquals( 404, $delete_response->get_status() );
	}

	/**
	 * Test pagination for large rule sets
	 */
	public function test_get_rules_returns_all_rules(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create multiple rules
		$rule_ids = [];
		for ( $i = 1; $i <= 5; $i++ ) {
			$create_request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/rules' );
			$create_request->set_body_params( [ 'role_name' => "test_role_$i" ] );
			$create_response = rest_do_request( $create_request );
			$rule            = $create_response->get_data();
			$rule_ids[]      = $rule['id'];
		}

		// Get all rules
		$get_request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/rules' );
		$get_response = rest_do_request( $get_request );

		$this->assertEquals( 200, $get_response->get_status() );

		$rules = $get_response->get_data();
		$this->assertGreaterThanOrEqual( 5, count( $rules ) );

		// Verify all created rules are in the response
		$returned_ids = array_column( $rules, 'id' );
		foreach ( $rule_ids as $rule_id ) {
			$this->assertContains( $rule_id, $returned_ids );
		}
	}
}
