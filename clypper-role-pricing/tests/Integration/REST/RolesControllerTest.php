<?php
/**
 * Integration tests for Roles REST Controller
 *
 * @package WooRolesRulesB2B
 */

namespace ClypperTechnology\RolePricing\Tests\Integration\REST;

use WP_REST_Request;
use WP_UnitTestCase;

/**
 * Roles REST Controller test case.
 */
class RolesControllerTest extends WP_UnitTestCase {

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
	 * Customer user ID
	 *
	 * @var int
	 */
	private int $customer_id;

	/**
	 * REST namespace
	 *
	 * @var string
	 */
	private string $namespace = 'rrb2b/v1';

	/**
	 * Test role slug
	 *
	 * @var string
	 */
	private string $test_role_slug = 'test_custom_role';

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

		$this->customer_id = $this->factory->user->create(
			[
				'role' => 'customer',
			]
		);
	}

	/**
	 * Clean up after each test
	 */
	protected function tearDown(): void {
		// Remove test role if it exists
		remove_role( $this->test_role_slug );
		parent::tearDown();
	}

	/**
	 * Test that getting roles requires authentication
	 */
	public function test_get_roles_requires_authentication(): void {
		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/roles' );
		$response = rest_do_request( $request );

		$this->assertEquals( 401, $response->get_status() );
	}

	/**
	 * Test that customers cannot access roles endpoint
	 */
	public function test_customer_cannot_access_roles(): void {
		wp_set_current_user( $this->customer_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/roles' );
		$response = rest_do_request( $request );

		$this->assertEquals( 403, $response->get_status() );
	}

	/**
	 * Test getting all roles as admin
	 */
	public function test_get_roles_as_admin(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/roles' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertIsArray( $data );
		$this->assertNotEmpty( $data );

		// Check that default WordPress roles are present
		$role_slugs = array_column( $data, 'slug' );
		$this->assertContains( 'administrator', $role_slugs );
		$this->assertContains( 'customer', $role_slugs );

		// Verify role structure
		$first_role = $data[0];
		$this->assertArrayHasKey( 'slug', $first_role );
		$this->assertArrayHasKey( 'name', $first_role );
		$this->assertArrayHasKey( 'capabilities', $first_role );
		$this->assertArrayHasKey( 'user_count', $first_role );
	}

	/**
	 * Test getting all roles as shop manager
	 */
	public function test_get_roles_as_shop_manager(): void {
		wp_set_current_user( $this->shop_manager_id );

		$request  = new WP_REST_Request( 'GET', '/' . $this->namespace . '/roles' );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );
		$this->assertIsArray( $response->get_data() );
	}

	/**
	 * Test creating a new role requires manage_options capability
	 */
	public function test_create_role_requires_manage_options(): void {
		wp_set_current_user( $this->shop_manager_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/roles' );
		$request->set_body_params(
			[
				'role_name' => 'Test VIP',
				'role_slug' => $this->test_role_slug,
				'role_cap'  => 'customer',
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 403, $response->get_status() );
	}

	/**
	 * Test creating a new role successfully
	 */
	public function test_create_role_successfully(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/roles' );
		$request->set_body_params(
			[
				'role_name' => 'Test VIP Customer',
				'role_slug' => $this->test_role_slug,
				'role_cap'  => 'customer',
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 201, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['success'] );
		$this->assertArrayHasKey( 'role', $data );
		$this->assertEquals( $this->test_role_slug, $data['role']['slug'] );
		$this->assertEquals( 'Test VIP Customer', $data['role']['name'] );

		// Verify role was actually created
		$role = get_role( $this->test_role_slug );
		$this->assertNotNull( $role );
	}

	/**
	 * Test creating role without required fields fails
	 */
	public function test_create_role_without_required_fields_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/roles' );
		$request->set_body_params(
			[
				'role_name' => '',
				'role_slug' => '',
				'role_cap'  => 'customer',
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 400, $response->get_status() );
	}

	/**
	 * Test creating duplicate role fails
	 */
	public function test_create_duplicate_role_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create first role
		add_role( $this->test_role_slug, 'Test Role', [] );

		// Try to create duplicate
		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/roles' );
		$request->set_body_params(
			[
				'role_name' => 'Test Duplicate',
				'role_slug' => $this->test_role_slug,
				'role_cap'  => 'customer',
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 400, $response->get_status() );
	}

	/**
	 * Test deleting a role requires manage_options capability
	 */
	public function test_delete_role_requires_manage_options(): void {
		wp_set_current_user( $this->shop_manager_id );

		add_role( $this->test_role_slug, 'Test Role', [] );

		$request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/roles/' . $this->test_role_slug );
		$response = rest_do_request( $request );

		$this->assertEquals( 403, $response->get_status() );
	}

	/**
	 * Test deleting a role successfully
	 */
	public function test_delete_role_successfully(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create test role
		add_role( $this->test_role_slug, 'Test Role', [] );

		$request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/roles/' . $this->test_role_slug );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertTrue( $data['deleted'] );
		$this->assertEquals( $this->test_role_slug, $data['role_slug'] );

		// Verify role was actually deleted
		$role = get_role( $this->test_role_slug );
		$this->assertNull( $role );
	}

	/**
	 * Test deleting non-existent role returns 404
	 */
	public function test_delete_nonexistent_role_returns_404(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/roles/nonexistent_role' );
		$response = rest_do_request( $request );

		$this->assertEquals( 404, $response->get_status() );
	}

	/**
	 * Test deleting core WordPress role fails
	 */
	public function test_delete_core_role_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/roles/administrator' );
		$response = rest_do_request( $request );

		$this->assertEquals( 403, $response->get_status() );

		// Verify administrator role still exists
		$role = get_role( 'administrator' );
		$this->assertNotNull( $role );
	}

	/**
	 * Test deleting WooCommerce core role fails
	 */
	public function test_delete_woocommerce_core_role_fails(): void {
		wp_set_current_user( $this->admin_user_id );

		$request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/roles/customer' );
		$response = rest_do_request( $request );

		$this->assertEquals( 403, $response->get_status() );

		// Verify customer role still exists
		$role = get_role( 'customer' );
		$this->assertNotNull( $role );
	}

	/**
	 * Test deleting role also deletes associated rules
	 */
	public function test_delete_role_deletes_associated_rules(): void {
		wp_set_current_user( $this->admin_user_id );

		// Create test role
		add_role( $this->test_role_slug, 'Test Role', [] );

		// Create associated rule
		$rule_id = wp_insert_post(
			[
				'post_type'   => 'rrb2b',
				'post_title'  => $this->test_role_slug,
				'post_status' => 'publish',
			]
		);

		$this->assertGreaterThan( 0, $rule_id );

		// Delete role
		$request  = new WP_REST_Request( 'DELETE', '/' . $this->namespace . '/roles/' . $this->test_role_slug );
		$response = rest_do_request( $request );

		$this->assertEquals( 200, $response->get_status() );

		$data = $response->get_data();
		$this->assertEquals( 1, $data['rules_deleted'] );

		// Verify rule was deleted
		$rule = get_post( $rule_id );
		$this->assertNull( $rule );
	}

	/**
	 * Test role slug sanitization
	 */
	public function test_role_slug_sanitization(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/' . $this->namespace . '/roles' );
		$request->set_body_params(
			[
				'role_name' => 'Test Role With Spaces',
				'role_slug' => 'Test Role With Spaces',
				'role_cap'  => 'customer',
			]
		);

		$response = rest_do_request( $request );

		$this->assertEquals( 201, $response->get_status() );

		$data = $response->get_data();
		// Slug should be sanitized
		$this->assertEquals( 'test-role-with-spaces', $data['role']['slug'] );

		// Clean up
		remove_role( 'test-role-with-spaces' );
	}
}
