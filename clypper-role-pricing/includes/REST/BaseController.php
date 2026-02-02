<?php
/**
 * Base REST Controller
 *
 * @package ClypperTechnology\RolePricing\REST
 */

namespace ClypperTechnology\RolePricing\REST;

use WP_Error;
use WP_REST_Controller;
use WP_REST_Request;
use function current_user_can;
use function sanitize_text_field;
use function wp_unslash;

/**
 * Base controller class that all REST controllers extend.
 * Provides common functionality for authentication, validation, and error handling.
 */
abstract class BaseController extends WP_REST_Controller {

	/**
	 * REST API namespace
	 *
	 * @var string
	 */
	protected $namespace = 'rrb2b/v1';

	/**
	 * Standard error codes used across all controllers
	 *
	 * @var array<string, string>
	 */
	protected const array ERROR_CODES = [
		'invalid_rule'       => 'rrb2b_invalid_rule',
		'rule_not_found'     => 'rrb2b_rule_not_found',
		'permission_denied'  => 'rrb2b_permission_denied',
		'invalid_product'    => 'rrb2b_invalid_product',
		'invalid_category'   => 'rrb2b_invalid_category',
		'role_exists'        => 'rrb2b_role_exists',
		'role_not_found'     => 'rrb2b_role_not_found',
		'service_error'      => 'rrb2b_service_error',
		'invalid_request'    => 'rrb2b_invalid_request',
	];

	/**
	 * Check if current user has WooCommerce management permissions
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return bool True if user has permissions, false otherwise.
	 */
	public function check_admin_permissions( WP_REST_Request $request ): bool {
		return current_user_can( 'manage_woocommerce' );
	}

	/**
	 * Check if current user has WordPress options management permissions
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return bool True if user has permissions, false otherwise.
	 */
	public function check_manage_options( WP_REST_Request $request ): bool {
		return current_user_can( 'manage_options' );
	}

	/**
	 * Create a standardized validation error response
	 *
	 * @param string $message Error message.
	 * @return WP_Error WordPress error object.
	 */
	protected function validation_error( string $message ): WP_Error {
		return new WP_Error(
			self::ERROR_CODES['invalid_request'],
			$message,
			[ 'status' => 400 ]
		);
	}

	/**
	 * Create a standardized not found error response
	 *
	 * @param string $resource Resource name that was not found.
	 * @return WP_Error WordPress error object.
	 */
	protected function not_found_error( string $resource = 'Resource' ): WP_Error {
		return new WP_Error(
			self::ERROR_CODES['rule_not_found'],
			sprintf(
				/* translators: %s: Resource name */
				__( '%s not found.', 'clypper-role-pricing' ),
				$resource
			),
			[ 'status' => 404 ]
		);
	}

	/**
	 * Create a standardized permission denied error response
	 *
	 * @return WP_Error WordPress error object.
	 */
	protected function permission_error(): WP_Error {
		return new WP_Error(
			self::ERROR_CODES['permission_denied'],
			__( 'You do not have permission to perform this action.', 'clypper-role-pricing' ),
			[ 'status' => 403 ]
		);
	}

	/**
	 * Create a standardized service error response
	 *
	 * @param string $message Error message.
	 * @return WP_Error WordPress error object.
	 */
	protected function service_error( string $message ): WP_Error {
		return new WP_Error(
			self::ERROR_CODES['service_error'],
			$message,
			[ 'status' => 500 ]
		);
	}

	/**
	 * Create a generic error response
	 *
	 * @param string $message Error message.
	 * @param int    $status  HTTP status code.
	 * @return WP_Error WordPress error object.
	 */
	protected function error_response( string $message, int $status = 400 ): WP_Error {
		return new WP_Error(
			'rrb2b_error',
			$message,
			[ 'status' => $status ]
		);
	}

	/**
	 * Log a message using WooCommerce logger
	 *
	 * @param string $message Message to log.
	 * @param string $level   Log level (debug, info, notice, warning, error, critical, alert, emergency).
	 * @param array  $context Additional context data.
	 * @return void
	 */
	protected function log( string $message, string $level = 'info', array $context = [] ): void {
		if ( function_exists( 'wc_get_logger' ) ) {
			$logger = wc_get_logger();
			$logger->log(
				$level,
				$message,
				array_merge(
					[
						'source' => 'rrb2b-rest-api',
					],
					$context
				)
			);
		}
	}

	/**
	 * Sanitize a text field value
	 *
	 * @param mixed $value Value to sanitize.
	 * @return string Sanitized string.
	 */
	protected function sanitize_text( $value ): string {
		return sanitize_text_field( wp_unslash( $value ) );
	}

	/**
	 * Sanitize an array of values
	 *
	 * @param array $array Array to sanitize.
	 * @return array Sanitized array.
	 */
	protected function sanitize_array( array $array ): array {
		return array_map( [ $this, 'sanitize_text' ], $array );
	}

	/**
	 * Validate that a parameter is not empty
	 *
	 * @param mixed  $value Value to validate.
	 * @param string $key   Parameter key name.
	 * @return bool True if valid, false otherwise.
	 */
	protected function validate_not_empty( $value, string $key ): bool {
		return ! empty( $value );
	}

	/**
	 * Validate that a parameter is a positive integer
	 *
	 * @param mixed           $value   Value to validate.
	 * @param WP_REST_Request $request Request object.
	 * @param string          $param   Parameter name.
	 * @return bool True if valid, false otherwise.
	 */
	public function validate_positive_integer( $value, $request, string $param ): bool {
		return is_numeric( $value ) && $value > 0;
	}

	/**
	 * Execute a callback with a validated rule, handling common error cases
	 *
	 * This method encapsulates the common pattern of:
	 * 1. Fetching a rule by ID
	 * 2. Returning 404 if rule doesn't exist
	 * 3. Executing callback with the rule
	 * 4. Catching and logging exceptions
	 *
	 * @param int      $rule_id       The rule ID to fetch.
	 * @param callable $callback      Callback to execute with the rule. Should accept the rule object as parameter.
	 * @param string   $operation     Operation name for error logging (e.g., 'update rule', 'delete products').
	 * @return mixed The callback's return value or WP_Error on failure.
	 */
	protected function with_rule( int $rule_id, callable $callback, string $operation = 'operation' ) {
		$rule_service = new \ClypperTechnology\RolePricing\Services\RuleService();
		$rule         = $rule_service->get_rules_by_id( $rule_id );

		if ( ! $rule ) {
			return $this->not_found_error( __( 'Rule', 'clypper-role-pricing' ) );
		}

		try {
			return $callback( $rule );
		} catch ( \RuntimeException $e ) {
			$this->log(
				sprintf( 'Failed to %s: %s', $operation, $e->getMessage() ),
				'error',
				[ 'rule_id' => $rule_id ]
			);
			return $this->service_error(
				sprintf(
					/* translators: %s: Operation name */
					__( 'Failed to %s.', 'clypper-role-pricing' ),
					$operation
				)
			);
		}
	}
}
