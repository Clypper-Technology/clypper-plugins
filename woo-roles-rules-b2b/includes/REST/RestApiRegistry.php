<?php
/**
 * REST API Registry
 *
 * Centralizes registration of all REST controllers
 *
 * @package ClypperTechnology\RolePricing\REST
 */

namespace ClypperTechnology\RolePricing\REST;

use ClypperTechnology\RolePricing\REST\Controllers\RulesController;
use ClypperTechnology\RolePricing\REST\Controllers\RuleProductsController;
use ClypperTechnology\RolePricing\REST\Controllers\RuleCategoriesController;
use ClypperTechnology\RolePricing\REST\Controllers\RolesController;

/**
 * REST API Registry class
 *
 * Manages registration of all REST API controllers
 */
class RestApiRegistry {

	/**
	 * Array of controller instances
	 *
	 * @var array
	 */
	private array $controllers = [];

	/**
	 * Initialize controllers
	 */
	public function __construct() {
		$this->controllers = [
			new RulesController(),
			new RuleProductsController(),
			new RuleCategoriesController(),
			new RolesController(),
		];
	}

	/**
	 * Register all REST API routes
	 *
	 * @return void
	 */
	public function register_routes(): void {
		foreach ( $this->controllers as $controller ) {
			$controller->register_routes();
		}
	}

	/**
	 * Get all registered controllers
	 *
	 * @return array Array of controller instances.
	 */
	public function get_controllers(): array {
		return $this->controllers;
	}
}
