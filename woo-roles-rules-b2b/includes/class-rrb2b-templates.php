<?php
/**
 * Roles & Rules B2B - Templates
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Template class - Handles page rendering (React mount points only)
 */
class Rrb2b_Templates {

	/**
	 * Options
	 *
	 * @var array $options Plugin options
	 */
	public $options;

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->options = get_option( 'rrb2b_options' );
	}

	/**
	 * Get main page - Entry point
	 */
	public function rrb2b_get_main_page() {
		$tab = ( ! empty( filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) ) )
			? filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS )
			: 'rules';

		?>
		<div class="rrb2b-main">
		<?php
		$this->rrb2b_get_main_header();
		self::rrb2b_get_notices();

		switch ( $tab ) {
			case 'roles':
				$this->rrb2b_manage_roles();
				break;
			case 'rules':
			default:
				$this->rrb2b_manage_rules();
				break;
		}
		?>
		</div>
		<?php
	}

	/**
	 * Get notices
	 */
	public static function rrb2b_get_notices() {
		?>
		<div id="cas-notice-rules-copied" class="notice notice-info is-dismissible cas-notice3">
			<p><?php echo esc_attr__( 'Rules Copied', 'clypper-role-pricing' ); ?></p>
		</div>
		<?php
	}

	/**
	 * Main header with navigation tabs
	 */
	public function rrb2b_get_main_header() {
		$tab = ( ! empty( filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) ) )
			? filter_input( INPUT_GET, 'tab', FILTER_SANITIZE_FULL_SPECIAL_CHARS )
			: 'rules';
		$url = admin_url( 'admin.php?page=rrb2b' );

		?>
		<div class="wrap woocommerce">
			<h1 class="wp-heading-inline">
				<?php esc_html_e( 'Roles & Rules B2B', 'clypper-role-pricing' ); ?>
			</h1>

			<nav class="nav-tab-wrapper woo-nav-tab-wrapper" style="margin-top: 10px; margin-bottom: 20px;">
				<a href="<?php echo esc_url( $url . '&tab=rules' ); ?>" class="nav-tab <?php echo ( 'rules' === $tab ) ? 'nav-tab-active' : ''; ?>">
					<i class="fas fa-sliders-h"></i> <?php esc_attr_e( 'Manage Rules', 'clypper-role-pricing' ); ?>
				</a>
				<a href="<?php echo esc_url( $url . '&tab=roles' ); ?>" class="nav-tab <?php echo ( 'roles' === $tab ) ? 'nav-tab-active' : ''; ?>">
					<i class="fas fa-user-tag"></i> <?php esc_attr_e( 'Manage Roles', 'clypper-role-pricing' ); ?>
				</a>
			</nav>

			<div style="margin: 15px 0;">
				<a class="button" href="<?php echo esc_url( admin_url( 'users.php' ) ); ?>">
					<i class="fas fa-users"></i> <?php esc_attr_e( 'Manage Users', 'clypper-role-pricing' ); ?>
				</a>
				<a class="button" style="margin-left: 5px;" href="<?php echo esc_url( admin_url( 'admin.php?page=wc-settings&tab=rrb2b' ) ); ?>">
					<i class="fas fa-cog"></i> <?php esc_attr_e( 'Settings', 'clypper-role-pricing' ); ?>
				</a>
			</div>
		</div>
		<?php
	}

	/**
	 * Roles management - React mount point (for Manage Roles tab)
	 */
	public function rrb2b_manage_roles() {
		?>
		<div id="rrb2b-roles-root"></div>
		<?php
	}

	/**
	 * Rules management - React mount point (for Manage Rules tab)
	 */
	public function rrb2b_manage_rules() {
		?>
		<div id="rrb2b-rules-root"></div>
		<?php
	}
}
