<?php
/**
 * Unit tests for Base REST Controller
 *
 * @package WooRolesRulesB2B
 */

namespace ClypperTechnology\RolePricing\Tests\Unit\REST;

use ClypperTechnology\RolePricing\REST\BaseController;
use WP_REST_Request;
use WP_UnitTestCase;
use ReflectionClass;

/**
 * Test class that extends BaseController for testing
 */
class TestBaseController extends BaseController {
	protected $rest_base = 'test';

	public function register_routes(): void {
		// Not needed for testing
	}

	// Expose protected methods for testing
	public function public_validation_error( string $message ) {
		return $this->validation_error( $message );
	}

	public function public_not_found_error( string $resource = 'Resource' ) {
		return $this->not_found_error( $resource );
	}

	public function public_permission_error() {
		return $this->permission_error();
	}

	public function public_service_error( string $message ) {
		return $this->service_error( $message );
	}

	public function public_error_response( string $message, int $status = 400 ) {
		return $this->error_response( $message, $status );
	}

	public function public_sanitize_text( $value ) {
		return $this->sanitize_text( $value );
	}

	public function public_sanitize_array( array $array ) {
		return $this->sanitize_array( $array );
	}

	public function public_validate_not_empty( $value, string $key ) {
		return $this->validate_not_empty( $value, $key );
	}

	public function public_validate_positive_integer( $value, string $key ) {
		$request = new WP_REST_Request();
		return $this->validate_positive_integer( $value, $request, $key );
	}
}

/**
 * Base REST Controller unit test case.
 */
class BaseControllerTest extends WP_UnitTestCase {

	/**
	 * Test controller instance
	 *
	 * @var TestBaseController
	 */
	private TestBaseController $controller;

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
	 * Set up test environment
	 */
	protected function setUp(): void {
		parent::setUp();

		$this->controller = new TestBaseController();

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
	 * Test namespace is set correctly
	 */
	public function test_namespace_is_set(): void {
		$reflection = new ReflectionClass( $this->controller );
		$property   = $reflection->getProperty( 'namespace' );
		$property->setAccessible( true );

		$this->assertEquals( 'rrb2b/v1', $property->getValue( $this->controller ) );
	}

	/**
	 * Test error codes constant is defined
	 */
	public function test_error_codes_constant_exists(): void {
		$reflection = new ReflectionClass( $this->controller );
		$this->assertTrue( $reflection->hasConstant( 'ERROR_CODES' ) );
	}

	/**
	 * Test admin permissions check passes for admin
	 */
	public function test_admin_permissions_check_passes_for_admin(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'GET', '/test' );
		$result  = $this->controller->check_admin_permissions( $request );

		$this->assertTrue( $result );
	}

	/**
	 * Test admin permissions check passes for shop manager
	 */
	public function test_admin_permissions_check_passes_for_shop_manager(): void {
		wp_set_current_user( $this->shop_manager_id );

		$request = new WP_REST_Request( 'GET', '/test' );
		$result  = $this->controller->check_admin_permissions( $request );

		$this->assertTrue( $result );
	}

	/**
	 * Test admin permissions check fails for customer
	 */
	public function test_admin_permissions_check_fails_for_customer(): void {
		wp_set_current_user( $this->customer_id );

		$request = new WP_REST_Request( 'GET', '/test' );
		$result  = $this->controller->check_admin_permissions( $request );

		$this->assertFalse( $result );
	}

	/**
	 * Test manage options check passes for admin
	 */
	public function test_manage_options_check_passes_for_admin(): void {
		wp_set_current_user( $this->admin_user_id );

		$request = new WP_REST_Request( 'POST', '/test' );
		$result  = $this->controller->check_manage_options( $request );

		$this->assertTrue( $result );
	}

	/**
	 * Test manage options check fails for shop manager
	 */
	public function test_manage_options_check_fails_for_shop_manager(): void {
		wp_set_current_user( $this->shop_manager_id );

		$request = new WP_REST_Request( 'POST', '/test' );
		$result  = $this->controller->check_manage_options( $request );

		$this->assertFalse( $result );
	}

	/**
	 * Test validation error response
	 */
	public function test_validation_error(): void {
		$error = $this->controller->public_validation_error( 'Test validation error' );

		$this->assertInstanceOf( \WP_Error::class, $error );
		$this->assertEquals( 'rrb2b_invalid_request', $error->get_error_code() );
		$this->assertEquals( 'Test validation error', $error->get_error_message() );

		$data = $error->get_error_data();
		$this->assertEquals( 400, $data['status'] );
	}

	/**
	 * Test not found error response
	 */
	public function test_not_found_error(): void {
		$error = $this->controller->public_not_found_error( 'Test Resource' );

		$this->assertInstanceOf( \WP_Error::class, $error );
		$this->assertEquals( 'rrb2b_rule_not_found', $error->get_error_code() );
		$this->assertStringContainsString( 'Test Resource', $error->get_error_message() );

		$data = $error->get_error_data();
		$this->assertEquals( 404, $data['status'] );
	}

	/**
	 * Test not found error with default resource
	 */
	public function test_not_found_error_default_resource(): void {
		$error = $this->controller->public_not_found_error();

		$this->assertInstanceOf( \WP_Error::class, $error );
		$this->assertStringContainsString( 'Resource', $error->get_error_message() );
	}

	/**
	 * Test permission error response
	 */
	public function test_permission_error(): void {
		$error = $this->controller->public_permission_error();

		$this->assertInstanceOf( \WP_Error::class, $error );
		$this->assertEquals( 'rrb2b_permission_denied', $error->get_error_code() );
		$this->assertStringContainsString( 'permission', $error->get_error_message() );

		$data = $error->get_error_data();
		$this->assertEquals( 403, $data['status'] );
	}

	/**
	 * Test service error response
	 */
	public function test_service_error(): void {
		$error = $this->controller->public_service_error( 'Service failed' );

		$this->assertInstanceOf( \WP_Error::class, $error );
		$this->assertEquals( 'rrb2b_service_error', $error->get_error_code() );
		$this->assertEquals( 'Service failed', $error->get_error_message() );

		$data = $error->get_error_data();
		$this->assertEquals( 500, $data['status'] );
	}

	/**
	 * Test generic error response
	 */
	public function test_error_response(): void {
		$error = $this->controller->public_error_response( 'Generic error', 418 );

		$this->assertInstanceOf( \WP_Error::class, $error );
		$this->assertEquals( 'rrb2b_error', $error->get_error_code() );
		$this->assertEquals( 'Generic error', $error->get_error_message() );

		$data = $error->get_error_data();
		$this->assertEquals( 418, $data['status'] );
	}

	/**
	 * Test error response with default status
	 */
	public function test_error_response_default_status(): void {
		$error = $this->controller->public_error_response( 'Default status error' );

		$data = $error->get_error_data();
		$this->assertEquals( 400, $data['status'] );
	}

	/**
	 * Test sanitize text
	 */
	public function test_sanitize_text(): void {
		$result = $this->controller->public_sanitize_text( '  <script>alert("xss")</script>  ' );

		$this->assertIsString( $result );
		$this->assertStringNotContainsString( '<script>', $result );
	}

	/**
	 * Test sanitize text with special characters
	 */
	public function test_sanitize_text_special_characters(): void {
		$result = $this->controller->public_sanitize_text( 'Test & "quotes" <tags>' );

		$this->assertIsString( $result );
		// Tags should be stripped
		$this->assertStringNotContainsString( '<tags>', $result );
	}

	/**
	 * Test sanitize array
	 */
	public function test_sanitize_array(): void {
		$input = [
			'<script>alert("xss")</script>',
			'normal text',
			'  spaced  ',
		];

		$result = $this->controller->public_sanitize_array( $input );

		$this->assertIsArray( $result );
		$this->assertCount( 3, $result );
		$this->assertStringNotContainsString( '<script>', $result[0] );
	}

	/**
	 * Test sanitize empty array
	 */
	public function test_sanitize_empty_array(): void {
		$result = $this->controller->public_sanitize_array( [] );

		$this->assertIsArray( $result );
		$this->assertEmpty( $result );
	}

	/**
	 * Test validate not empty passes
	 */
	public function test_validate_not_empty_passes(): void {
		$result = $this->controller->public_validate_not_empty( 'test value', 'test_key' );

		$this->assertTrue( $result );
	}

	/**
	 * Test validate not empty fails
	 */
	public function test_validate_not_empty_fails(): void {
		$result = $this->controller->public_validate_not_empty( '', 'test_key' );

		$this->assertFalse( $result );
	}

	/**
	 * Test validate not empty with null
	 */
	public function test_validate_not_empty_with_null(): void {
		$result = $this->controller->public_validate_not_empty( null, 'test_key' );

		$this->assertFalse( $result );
	}

	/**
	 * Test validate not empty with zero
	 */
	public function test_validate_not_empty_with_zero(): void {
		$result = $this->controller->public_validate_not_empty( 0, 'test_key' );

		// Zero is considered empty by PHP's empty() function
		$this->assertFalse( $result );
	}

	/**
	 * Test validate positive integer passes
	 */
	public function test_validate_positive_integer_passes(): void {
		$result = $this->controller->public_validate_positive_integer( 42, 'test_key' );

		$this->assertTrue( $result );
	}

	/**
	 * Test validate positive integer with string number
	 */
	public function test_validate_positive_integer_with_string_number(): void {
		$result = $this->controller->public_validate_positive_integer( '42', 'test_key' );

		$this->assertTrue( $result );
	}

	/**
	 * Test validate positive integer fails with zero
	 */
	public function test_validate_positive_integer_fails_with_zero(): void {
		$result = $this->controller->public_validate_positive_integer( 0, 'test_key' );

		$this->assertFalse( $result );
	}

	/**
	 * Test validate positive integer fails with negative
	 */
	public function test_validate_positive_integer_fails_with_negative(): void {
		$result = $this->controller->public_validate_positive_integer( -5, 'test_key' );

		$this->assertFalse( $result );
	}

	/**
	 * Test validate positive integer fails with non-numeric
	 */
	public function test_validate_positive_integer_fails_with_non_numeric(): void {
		$result = $this->controller->public_validate_positive_integer( 'not a number', 'test_key' );

		$this->assertFalse( $result );
	}

	/**
	 * Test validate positive integer with float
	 */
	public function test_validate_positive_integer_with_float(): void {
		$result = $this->controller->public_validate_positive_integer( 42.5, 'test_key' );

		$this->assertTrue( $result );
	}
}
