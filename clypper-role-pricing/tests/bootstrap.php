<?php
/**
 * PHPUnit bootstrap file for Roles & Rules B2B
 *
 * @package WooRolesRulesB2B
 */

// Load Composer autoloader
require_once dirname( __DIR__ ) . '/vendor/autoload.php';

// Detect where to load test environment from
if ( false !== getenv( 'WP_TESTS_DIR' ) ) {
    $_tests_dir = getenv( 'WP_TESTS_DIR' );
} elseif ( false !== getenv( 'WP_PHPUNIT__DIR' ) ) {
    $_tests_dir = getenv( 'WP_PHPUNIT__DIR' );
} elseif ( file_exists( '/tmp/wordpress-tests-lib/includes/functions.php' ) ) {
    $_tests_dir = '/tmp/wordpress-tests-lib';
} else {
    $_tests_dir = '/tmp/wordpress-tests-lib';
}

if ( ! file_exists( $_tests_dir . '/includes/functions.php' ) ) {
    echo "Could not find $_tests_dir/includes/functions.php\n";
    echo "Please set the WP_TESTS_DIR environment variable.\n";
    exit( 1 );
}

// Give access to tests_add_filter() function
require_once $_tests_dir . '/includes/functions.php';

/**
 * Manually load the plugin being tested.
 */
function _manually_load_plugin() {
    // Load WooCommerce
    require_once dirname( __DIR__ ) . '/../woocommerce/woocommerce.php';

    // Load our plugin
    require_once dirname( __DIR__ ) . '/woo-roles-rules-b2b.php';
}

tests_add_filter( 'muplugins_loaded', '_manually_load_plugin' );

// Start up the WP testing environment
require $_tests_dir . '/includes/bootstrap.php';

// Load WooCommerce test helpers if available
if ( file_exists( dirname( __DIR__ ) . '/../woocommerce/tests/legacy/framework/class-wc-unit-test-case.php' ) ) {
    require_once dirname( __DIR__ ) . '/../woocommerce/tests/legacy/framework/class-wc-unit-test-case.php';
}
