<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;


/**
 * Class for functions
 */
class Rrb2b_Functions {


	/**
	 * Logger
	 */
	public $logger;

	/**
	 * Context
	 */
	public $context;

	/**
	 * Constructor
	 */
	public function __construct() {

		$this->logger  = wc_get_logger();
		$this->context = array( 'source' => 'woo_roles_rules_b2b' );

	}

	/**
	 * Get roles
	 */
	public function rrb2b_get_roles() {
		
		$wp_roles  = wp_roles();
		$roles     = $wp_roles->roles;
		$options   = get_option( 'rrb2b_options' );
		$cap_roles = array( 'administrator', 'editor', 'author', 'contributor', 'subscriber', 'customer', 'shop_manager' );

		if ( ! $wp_roles->is_role( 'rrb2b_pending' ) ) {
			$wp_roles->add_role( 'rrb2b_pending', __( 'Pending (no rights)', 'woo-roles-rules-b2b' ), array() );
		}
		array_push( $cap_roles, 'rrb2b_pending' );

		foreach ( $roles as $key => $role ) {
			
			$net_prices     = false;
			$tax_exempt     = false;
			$net_price_arr  = ( is_array( $options['rrb2b_net_price_b2b_list'] ) ) ? $options['rrb2b_net_price_b2b_list'] : array();
			$tax_exempt_arr = ( is_array( $options['rrb2b_tax_exempt_list'] ) ) ? $options['rrb2b_tax_exempt_list'] : array();

			if ( in_array( strval( $key ), $net_price_arr, true ) ) {
				$net_prices = true;
			}
			if ( in_array( strval( $key ), $tax_exempt_arr, true ) ) {
				$tax_exempt = true;
			}
			?>
			<tr>
				<td><strong><?php esc_attr_e( translate_user_role( $role['name'] ) ); ?></strong><br/>
					<span><?php esc_html_e( 'Slug:', 'woo-roles-rules-b2b' ); ?> <?php echo esc_attr( $key ); ?></span>
				</td>
				<td>
					<button onclick="rrb2b_show_hidden('ul_<?php echo esc_js( $key ); ?>');" class="rrb2b-expand-list"><i class="fas fa-list-ul"></i></button>
					<ul style="margin-top: 2px;margin-bottom:0px;" class="rrb2b-collapsible" id="ul_<?php echo esc_js( $key ); ?>">
					<?php
					foreach ( $role['capabilities'] as $role_key => $role_value ) {
						?>
						<li><?php echo esc_attr( $role_key . ': ' . ( ( $role_value ) ? 'true' : 'false' ) ); ?></li>
						<?php
					}
					?>
					</ul>
				</td>
				<td style="text-align: center;">
					<?php if ( $net_prices ) : ?>
						<i class="fas fa-check"></i>
					<?php endif; ?>
				</td>
				<td style="text-align: center;">
					<?php if ( $tax_exempt ) : ?>
						<i class="fas fa-check"></i>
					<?php endif; ?>
				</td>
				<td style="text-align: center;">
					<?php 
					if ( in_array( $key, $cap_roles, true ) ) {
						?>
						<input type="checkbox" disabled="disabled">
						<?php
					} else {
						?>
						<input type="checkbox" id="<?php echo esc_attr( $key ); ?>" onclick="rrb2b_delete_role('<?php echo esc_js( $key ); ?>', '<?php echo esc_js( $role['name'] ); ?>');">
						<?php
					}
					?>
				</td>
			</tr>
			<?php 
		}
		
	}

	/**
	 * Select role as cap
	 */
	public function rrb2b_select_role() {
		
		$wp_roles  = wp_roles();
		$roles     = $wp_roles->roles;
		$cap_roles = array( 'administrator', 'editor', 'author', 'contributor', 'subscriber', 'customer', 'shop_manager' );

		if ( ! $wp_roles->is_role( 'rrb2b_pending' ) ) {
			$wp_roles->add_role( 'rrb2b_pending', __( 'Pending (no rights)', 'woo-roles-rules-b2b' ), array() );
		}
		array_push( $cap_roles, 'rrb2b_pending' );

		if ( ! current_user_can( 'manage_options' ) ) {
			array_splice( $cap_roles, 0, 1 );
		}

		foreach ( $roles as $key => $role ) {
			$selected     = ( 'customer' === $key ) ? 'selected="selected"' : '';
			$selected_txt = ( 'customer' === $key ) ? __( ' ( default )', 'woo-roles-rules-b2b' ) : '';
			
			if ( in_array( $key, $cap_roles, true ) ) {
				?>
				<option value="<?php echo esc_attr( $key ); ?>" <?php echo esc_html( $selected ); ?>><?php esc_attr_e( translate_user_role( $role['name'] ) ) . esc_attr_e( $selected_txt ); ?></option>
				<?php
			}
		}
		
	}

	/**
	 * Add role (like VIP Customer)
	 */
	public function rrb2b_add_role_OLD( $data ) {
		
		$wp_roles = wp_roles();
		$name     = $data['role-name'];
		$slug     = $data['role-slug'];
		$cap      = $data['role-cap'];

		if ( ! empty( $name ) && ! empty( $slug ) ) {
			$wp_roles->add_role( strtolower( $slug ), $name, get_role( $cap )->capabilities );
		}

	}

	/**
	 * Add role (like VIP Customer)
	 */
	public function rrb2b_add_role( $data ) {
		$logger   = wc_get_logger();
		$context  = array( 'source' => 'rrb2b-role-log' );
		$wp_roles = wp_roles();
		$name     = sanitize_text_field( $data['role-name'] );
		$slug     = sanitize_title( $data['role-slug'] );
		$cap      = sanitize_text_field( $data['role-cap'] );
	
		if ( empty( $name ) || empty( $slug ) ) {
			$logger->warning( 'Missing role name or slug.', $context );
			return;
		}
	
		// Check if role already exists
		if ( get_role( $slug ) ) {
			$logger->info( 'Role "' . $slug . '" already exists.', $context );
			return;
		}
	
		// Validate capability base role
		$cap_role = get_role( $cap );
		if ( ! $cap_role ) {
			$logger->error( 'Base capability role "' . $cap . '" not found.', $context );
			return;
		}
	
		$result = $wp_roles->add_role( $slug, $name, $cap_role->capabilities );
	
		if ( null === $result ) {
			$logger->error( 'Failed to add role "' . $slug . '".', $context );
		} else {
			$logger->info( 'Role "' . $slug . '" successfully added.', $context );
		}
	}
	

	/**
	 * Get query rules
	 */
	public function rrb2b_query_rules() {
		
		$order = ( ! empty( filter_input( INPUT_GET, 'order', FILTER_SANITIZE_FULL_SPECIAL_CHARS ) ) )
				? filter_input( INPUT_GET, 'order', FILTER_SANITIZE_FULL_SPECIAL_CHARS )
				: 'ASC';
		
		$args = array(
			'post_type'      => 'rrb2b',
			'posts_per_page' => -1,
			'orderby'        => array( 'title' => 'ASC', 'date' => 'DESC' ),
			'order'          => 'ASC',
			'post_status'    => array( 'publish', 'private', 'draft', 'pending' )
		);

		$rules = new WP_Query( $args );

		return $rules->get_posts();
	}

	/**
	 * Count users for role
	 * 
	 * @return string
	 */
	public function rrb2b_count_users_for_role( $role ) {

		$count = 0;
		$users = count_users();

		if ( isset( $role ) && ! is_null( $role ) && count( $users ) > 0 ) {
			foreach ( $users['avail_roles'] as $usr => $usr_count ) {
				if ( $role['name'] === $usr ) {
					$count = $usr_count;
					break;
				}
			}
		}
		
		return strval( $count );

	}

	/**
	 * Get general rules
	 */
	public function rrb2b_get_rules() {
		
		$wp_roles    = wp_roles();
		$rules       = $this->rrb2b_query_rules();
		$options     = get_option( 'rrb2b_options' );
		$filter_rule = filter_input( 1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( isset( $filter_rule ) && ! empty( $filter_rule ) ) {
			$rules = array();
			array_push( $rules, get_post( $filter_rule ) );
		}

		foreach ( $rules as $rule ) {
			
			$user_id          = $rule->post_author; // Get the user ID
			$first_name       = get_user_meta( $user_id, 'first_name', true );
			$last_name        = get_user_meta( $user_id, 'last_name', true );
			$last_modified_by = trim( $first_name . ' ' . $last_name );

			if ( empty( $last_modified_by ) ) {
				$last_modified_by = esc_html__( 'Unknown', 'woo-roles-rules-b2b' );
			}
			
			$content    = json_decode( $rule->post_content, true );
			$categories = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
			$is_guest   = ( 'guest' === $rule->post_name );
			$role_obj   = get_role( $rule->post_name );

			if ( ! $is_guest && ! $role_obj ) {
				// Role is missing — fallback handling
				error_log( 'RRB2B: Missing role "' . $rule->post_name . '" for rule ID ' . $rule->ID );

				$role       = null;
				$role_name  = ucfirst( $rule->post_name ) . ' (missing)';
				$user_count = __( 'N/A', 'woo-roles-rules-b2b' );

			} else {
				$role      = ( $is_guest ) ? '0' : $role_obj;
				$role_name = ( $is_guest )
					? __( 'Guest', 'woo-roles-rules-b2b' )
					: translate_user_role( $wp_roles->roles[ $rule->post_name ]['name'] );

				$user_count = ( $is_guest )
					? __( 'Regular guests (B2C)', 'woo-roles-rules-b2b' )
					: $this->rrb2b_count_users_for_role( (array) $role );
				
			}

			$coupon_selected = ( isset( $content['coupon'] ) ) ? intval( $content['coupon'] ) : '';
			$guest_message   = ( $is_guest ) ? __( 'When active (checked) this rule(s) overrides your current sales prices! Read more in the documentation.', 'woo-roles-rules-b2b' ) : '';
			$role_active     = ( isset( $content['rule_active'] ) && 'on' === $content['rule_active'] ) ? true : false;

			//Check for storwide sale
			$active_sale = false;
			$time_from   = ( isset( $content['time_from'] ) ) ? ' ' . $content['time_from'] : ' 00:00';
			$time_to     = ( isset( $content['time_to'] ) ) ? ' ' . $content['time_to'] : ' 23:59';
			$sale_from   = ( isset( $content['date_from'] ) && ! empty( $content['date_from'] ) ) ? gmdate( 'YmdHi', strtotime( $content['date_from'] . $time_from ) ) : '';
			$sale_to     = ( isset( $content['date_to'] ) && ! empty( $content['date_to'] ) ) ? gmdate( 'YmdHi', strtotime( $content['date_to'] . $time_to ) ) : ''; 
			$now         = current_time('YmdHi');
			$net_prices  = false;
			$tax_exempt  = false;
	
			if ( ! empty( $sale_from ) && ! empty( $sale_to ) ) {
				$now       = intval( $now );
				$sale_from = intval( $sale_from );
				$sale_to   = intval( $sale_to );
				if ( $now >= $sale_from && $now <= $sale_to ) {
					$active_sale = true;
				}
			}

			if ( isset( $role->name ) && is_array( $options['rrb2b_net_price_b2b_list'] ) && in_array( $role->name, $options['rrb2b_net_price_b2b_list'], true ) ) {
				$net_prices = true;
			}
			if ( isset( $role->name ) && is_array( $options['rrb2b_tax_exempt_list'] ) && in_array( $role->name, $options['rrb2b_tax_exempt_list'], true ) ) {
				$tax_exempt = true;
			}

			$cat_keys = array_map( function( $item ) {
				return key( $item ); // Get the key of each array element
			}, $categories );
			?>
			<tr>
				<td>
					<form method="post" name="rrb2b_update_rule" autocomplete="off" action="<?php esc_attr_e( admin_url( 'admin-post.php' ) ); ?>">
					<input type="hidden" name="action" value="rrb2b_update_rule">
					<input type="hidden" name="id" value="<?php esc_attr_e( $rule->ID ); ?>">
					<?php wp_nonce_field( 'rrb2b_id' ); ?>
					<input type="checkbox" onchange="formChanged('<?php echo esc_js( $rule->ID ); ?>');" name="rule_active" <?php echo ( $role_active ) ? 'checked="checked"' : ''; ?>>
				</td>
				<td>
					
					<h2 style="font-size:1.2rem;margin-top:5px;"><?php esc_attr_e( $role_name ); ?></h2>
					<?php if ( $role_active ) : ?>
						<h3 class="rrb2b-circle-green-h3">
							<i class="fas fa-circle-check rrb2b-circle-green"></i>
							<?php esc_attr_e( 'ACTIVE', 'woo-roles-rules-b2b' ); ?>
						</h3>
					<?php else : ?>
						<h3 class="rrb2b-circle-gray-h3">
							<i class="fas fa-circle rrb2b-circle-gray"></i>
							<?php esc_attr_e( 'NOT ACTIVATED', 'woo-roles-rules-b2b' ); ?>
						</h3>
					<?php endif; ?>
					<?php if ( ! $is_guest && ! $role_obj ) : ?>
						<p style="color:red;"><strong><?php echo esc_html__( 'Warning: This role no longer exists on the site.', 'woo-roles-rules-b2b' ); ?></strong></p>
					<?php endif; ?>
					<?php if ( '0' !== $user_count && ! $is_guest ) : ?>
					<a href="<?php echo esc_attr( admin_url( 'users.php?role=' . $rule->post_name ) ); ?>" target="_new">
					<?php endif; ?>
					<span style="font-size:.8rem;"><i class="fas fa-users"></i> <?php esc_html_e( 'Users:', 'woo-roles-rules-b2b' ); ?> <?php esc_attr_e( $user_count ); ?></span>
					<?php if ( '0' !== $user_count && ! $is_guest ) : ?>
					</a>
					<?php endif; ?>
					<?php
					if ( $is_guest ) {
						?>
						<br/><br/><span style="font-size:.8rem;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( $guest_message ); ?></span>
						<?php
					}
					if ( $net_prices ) {
						?>
						<br/><span style="font-size:.8rem;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( 'Ex. VAT for role', 'woo-roles-rules-b2b' ); ?></span>
						<?php
					}
					if ( $tax_exempt ) {
						?>
						<br/><span style="font-size:.8rem;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( 'Tax exempt for role', 'woo-roles-rules-b2b' ); ?></span>
						<?php
					}
					?>
					
				</td>
				<td>
					<div class="cas-white-bg-border">
						<div  style="margin-top: 5px;margin-bottom:10px;">

							<select name="reduce_regular_type" class="rrb2b-select" oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');">
								<option value="" <?php echo ( isset( $content['reduce_regular_type'] ) && '' === $content['reduce_regular_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Select', 'woo-roles-rules-b2b' ); ?></option>
								<option value="percent" <?php echo ( isset( $content['reduce_regular_type'] ) && 'percent' === $content['reduce_regular_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
								<option value="fixed" <?php echo ( isset( $content['reduce_regular_type'] ) && 'fixed' === $content['reduce_regular_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce by fixed amount', 'woo-roles-rules-b2b' ); ?></option>
								<option value="percent_add" <?php echo ( isset( $content['reduce_regular_type'] ) && 'percent_add' === $content['reduce_regular_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Increase by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
								<option value="fixed_add" <?php echo ( isset( $content['reduce_regular_type'] ) && 'fixed_add' === $content['reduce_regular_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Increase by fixed amount', 'woo-roles-rules-b2b' ); ?></option>	
							</select>
						
						</div>
						<p>
						<label for="reduce_regular_type"><?php esc_html_e( 'General rule for all products', 'woo-roles-rules-b2b' ); ?> <i title="<?php esc_html_e( 'Add value below (general discount). Tip: Use Product Rules tab for better customization.', 'woo-roles-rules-b2b' ); ?>" class="fa-solid fa-circle-info"></i></label><br/>
						<input type="number" oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" value="<?php echo esc_attr( isset( $content['reduce_regular_value'] ) ? $content['reduce_regular_value'] : '' ); ?>" class="cas-number" name="reduce_regular_value"  style="margin-top:10px;" placeholder="<?php esc_html_e( 'e.g. 10', 'woo-roles-rules-b2b' ); ?>">
						</p>
						<p>
						<label for="reduce_categories"><?php esc_html_e( 'General rule for selected categories', 'woo-roles-rules-b2b' ); ?> <i title="<?php esc_html_e( 'Add value below (general discount). Tip: Use Category Rules tab for better customization.', 'woo-roles-rules-b2b' ); ?>" class="fa-solid fa-circle-info"></i></label><br/>
						<input oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" type="number" class="cas-number" value="<?php echo esc_attr( isset( $content['reduce_categories_value'] ) ? $content['reduce_categories_value'] : '' ); ?>" name="reduce_categories_value" style="margin-top:10px;" placeholder="<?php esc_html_e( 'e.g. 20', 'woo-roles-rules-b2b' ); ?>">
						</p>
						<input type="hidden" name="selected_categories" id="selected_categories_<?php echo esc_js( $rule->ID ); ?>" data-ruleid="<?php echo esc_js( $rule->ID ); ?>" value="<?php echo esc_attr( implode( ',', $cat_keys ) ); ?>">
						<?php self::rrb2b_get_categories_select_dropdown_list( 'reduce_categories', 'reduce_categories_list_' . $rule->ID ); ?>

						<div style="margin-top:10px;margin-bottom:10px;">
							<input type="checkbox" id="chk-all-cat_<?php echo esc_js( $rule->ID ); ?>" onclick="genCatCheck(<?php echo esc_js( $rule->ID ); ?>);"><?php esc_html_e( 'Check / uncheck all categories', 'woo-roles-rules-b2b' ); ?><br/>
							<input oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" type="checkbox" class="cas-checkbox" name="categories_on_sale" <?php echo ( isset( $content['categories_on_sale'] ) && 'on' === $content['categories_on_sale'] ) ? 'checked="checked"' : ''; ?>><?php esc_html_e( 'Set selected category products: On Sale', 'woo-roles-rules-b2b' ); ?>
						</div>
						<div class="cas-action-box cas-coupon-box">
							<label for="coupon" style="line-height: 25px;"><?php esc_html_e( 'Automatically apply a coupon for checkout discounts', 'woo-roles-rules-b2b' ); ?></label><br/>
							<?php $this->rrb2b_get_coupons( $coupon_selected, $rule->ID ); ?>
							<a class="button" href="<?php echo esc_url( admin_url( 'edit.php?post_type=shop_coupon' ) ); ?>"><i class="fa-solid fa-ticket"></i> <?php esc_attr_e( 'Edit Coupons', 'woo-roles-rules-b2b' ); ?></a>
						</div>
					</div>
				</td>
				<td style="display: table-cell;position: relative;">
					<div class="cas-action-box">
					<p><label><?php esc_html_e( 'Set up a storewide sale for this role (overrides other rules)', 'woo-roles-rules-b2b' ); ?></label></p>
					<select name="reduce_sale_type" class="rrb2b-select" style="width: 183px;" oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');">
						<option value="" <?php echo ( isset( $content['reduce_sale_type'] ) && '' === $content['reduce_sale_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce prices by', 'woo-roles-rules-b2b' ); ?></option>
						<option value="percent" <?php echo ( isset( $content['reduce_sale_type'] ) && 'percent' === $content['reduce_sale_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Percent (%)', 'woo-roles-rules-b2b' ); ?></option>
						<option value="fixed" <?php echo ( isset( $content['reduce_sale_type'] ) && 'fixed' === $content['reduce_sale_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Fixed amount', 'woo-roles-rules-b2b' ); ?></option>
					</select>
					<input oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" type="number" value="<?php echo esc_attr( isset( $content['reduce_sale_value'] ) ? $content['reduce_sale_value'] : '' ); ?>" class="cas-number" name="reduce_sale_value" placeholder="<?php esc_html_e( 'i.e 30', 'woo-roles-rules-b2b' ); ?>"  style="width: 183px;" >
					<br/>
					<input oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" type="text" class="input-date" value="<?php echo esc_attr( isset( $content['date_from'] ) ? $content['date_from'] : '' ); ?>" name="date_from" placeholder="<?php esc_attr_e( 'Date start', 'woo-roles-rules-b2b' ); ?>" onfocus="this.value='';">
					<input oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" type="text" class="input-date" value="<?php echo esc_attr( isset( $content['date_to'] ) ? $content['date_to'] : '' ); ?>" name="date_to" placeholder="<?php esc_attr_e( 'Date end', 'woo-roles-rules-b2b' ); ?>" onfocus="this.value='';">
					<br/>
					<div style="margin-top:10px;">
					<label for="time_from" style="padding-right:29px;"><?php esc_html_e( 'Start time', 'woo-roles-rules-b2b' ); ?></label>
					<input oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" type="time" name="time_from" value="<?php echo esc_attr( isset( $content['time_from'] ) ? $content['time_from'] : '00:00' ); ?>" min="00:00" max="23:59">
					<label for="time_to" style="margin-left: 36px;"><?php esc_html_e( 'End time', 'woo-roles-rules-b2b' ); ?></label>
					<input oninput="formChanged('<?php echo esc_js( $rule->ID ); ?>');" type="time" name="time_to" value="<?php echo esc_attr( isset( $content['time_to'] ) ? $content['time_to'] : '23:59' ); ?>" min="00:00" max="23:59">
					</div>
					<?php
					if ( $active_sale ) {
						?>
						<div style="color: green;font-size:26px;padding:50px;">
						<i class="fas fa-tags"></i> <?php esc_html_e( 'Active Sale!', 'woo-roles-rules-b2b' ); ?>
						</div>
						<?php
					}
					?>
					</div>
					<p class="submit_rule">
					<span id="msg_<?php echo esc_js( $rule->ID ); ?>" style="display:none;color:red;padding-bottom:8px;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( 'Changes in rule, please save!', 'woo-roles-rules-b2b' ); ?></span>
						<button class="button button-primary" type="submit" id="btn_<?php echo esc_js( $rule->ID ); ?>"><i class="fas fa-save"></i> <?php esc_attr_e( 'Save Rules', 'woo-roles-rules-b2b' ); ?></button>
						<button class="button" type="button" style="margin-left:5px;margin-right:5px;" onclick="clearSale(this);"><i class="fa-solid fa-eraser"></i> <?php esc_attr_e( 'Remove Storewide Sale', 'woo-roles-rules-b2b' ); ?></button>
						<button class="button" onclick="deleteRule(this);" style="margin-bottom: 5px;"><i class="fas fa-trash-alt"></i> <?php esc_attr_e( 'Delete rule', 'woo-roles-rules-b2b' ); ?></button>
						<br/>
						<span>
							<?php esc_attr_e( 'Last modified:', 'woo-roles-rules-b2b' ); ?> <?php echo esc_attr( $rule->post_modified ); ?>
							<?php esc_attr_e( ' by:', 'woo-roles-rules-b2b' ); ?> <?php echo esc_attr( $last_modified_by ); ?>
						</span>
					</p>
				</form>
				</td>
			</tr>
			<?php
		}

	}

	/**
	 * Get allowed html
	 */
	public function rrb2b_get_allowed_html() {
		$html = array(
			'div'    => array(
				'id'    => array(),
				'class' => array(),
				'style' => array(),
			),
			'span'   => array(
				'id'    => array(),
				'class' => array(),
				'style' => array(),
			),
			'i'   => array(
				'id'    => array(),
				'class' => array(),
				'style' => array(),
			),
			'tr'   => array(
				'id'    => array(),
				'class' => array(),
				'style' => array(),
			),
			'td'   => array(
				'id'    => array(),
				'class' => array(),
				'style' => array(),
			),
			'input'   => array(
				'id'       => array(),
				'class'    => array(),
				'style'    => array(),
				'name'     => array(),
				'type'     => array(),
				'value'    => array(),
				'readonly' => array(),
			),
			'a'   => array(
				'id'     => array(),
				'class'  => array(),
				'style'  => array(),
				'href'   => array(),
				'target' => array(),
			),
			'img'   => array(
				'id'     => array(),
				'class'  => array(),
				'style'  => array(),
				'src'    => array(),
				'height' => array(),
			),
			'select' => array(
				'id'     => array(),
				'class'  => array(),
				'name'   => array(),
				'style'  => array(),
				'src'    => array(),
			),
			'option' => array(
				'id'       => array(),
				'class'    => array(),
				'name'     => array(),
				'style'    => array(),
				'value'    => array(),
				'selected' => array(),
			),
		);
		return $html;
	}

	/**
	 * Add product row to table
	 */
	public function rrb2b_add_table_product( $id, $name, $rule ) {
		
		$rule_id     = filter_input( 1, 'rule', FILTER_SANITIZE_NUMBER_INT );
		$filter_rule = filter_input( 1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$url         = admin_url( 'admin.php?page=rrb2b&tab=products&eid=' . $rule_id );
		
		if ( isset( $filter_rule ) && ! empty( $filter_rule ) ) {
			$url = admin_url( 'admin.php?page=rrb2b&tab=products&filter=' . $filter_rule );
		}

		if ( ! isset( $id ) || 0 === $id ) {
			wp_safe_redirect( $url );
			exit;
		} else {
			//Add empty product rule
			$this->rrb2b_add_rule_product( $id, $name, $rule );
		}
		
		wp_safe_redirect( $url );
		exit;
	
	}

	/**
	 * Add single categories
	 */
	public function rrb2b_add_table_categories( $categories, $rule ) {
		
		//Add empty single categories rule
		$single_categories = explode( ',', $categories );
		$this->rrb2b_add_rule_single_categories( $single_categories, $rule );
		
		$filter_rule = filter_input( 1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$url         = admin_url( 'admin.php?page=rrb2b&tab=categories&eid=' . $rule );
		
		if ( isset( $filter_rule ) && ! empty( $filter_rule ) ) {
			$url = admin_url( 'admin.php?page=rrb2b&tab=categories&filter=' . $filter_rule );
		}
		
		wp_safe_redirect( $url );
		exit;
	
	}

	/**
	 * Get rules for categories
	 */
	public function rrb2b_get_rules_categories() {

		$wp_roles    = wp_roles();
		$rules       = $this->rrb2b_query_rules();
		$add_slugs   = filter_input( 1, 'add', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$add_rule    = filter_input( 1, 'rule', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$filter_rule = filter_input( 1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$options     = get_option( 'rrb2b_options' );
		$edited_id   = filter_input( 1, 'eid', FILTER_VALIDATE_INT );
		
		if ( isset( $add_slugs ) ) {
			$this->rrb2b_add_table_categories( $add_slugs, $add_rule );
		}

		if ( isset( $filter_rule ) && ! empty( $filter_rule ) ) {
			$rules = array();
			array_push( $rules, get_post( $filter_rule ) );
		}

		foreach ( $rules as $rule ) {
			
			$content           = json_decode( $rule->post_content, true );
			$single_categories = ( isset( $content['single_categories'] ) ) ? $content['single_categories'] : array();
			$is_guest          = ( 'guest' === $rule->post_name );
			$role_obj          = get_role( $rule->post_name );

			if ( ! $is_guest && ! $role_obj ) {
				// Role is missing — fallback handling
				error_log( 'RRB2B: Missing role "' . $rule->post_name . '" for rule ID ' . $rule->ID );

				$role       = null;
				$role_name  = ucfirst( $rule->post_name ) . ' (missing)';
				$user_count = __( 'N/A', 'woo-roles-rules-b2b' );

			} else {
				$role      = ( $is_guest ) ? '0' : $role_obj;
				$role_name = ( $is_guest )
					? __( 'Guest', 'woo-roles-rules-b2b' )
					: translate_user_role( $wp_roles->roles[ $rule->post_name ]['name'] );

				$user_count = ( $is_guest )
					? __( 'Regular guests (B2C)', 'woo-roles-rules-b2b' )
					: $this->rrb2b_count_users_for_role( (array) $role );
				
			}

			$url         = admin_url( 'admin.php' ) . '?page=rrb2b&tab=categories&rule=' . $rule->ID . '&add=';
			$net_prices  = false;
			$tax_exempt  = false;
			$role_active = isset( $content['rule_active'] ) && 'on' === $content['rule_active'];

			if ( isset( $filter_rule ) && ! empty( $filter_rule ) ) {
				$url = admin_url( 'admin.php' ) . '?page=rrb2b&tab=categories&filter=' . $filter_rule . '&rule=' . $rule->ID . '&add=';
			}	

			if ( isset( $role->name ) && is_array( $options['rrb2b_net_price_b2b_list'] ) && in_array( $role->name, $options['rrb2b_net_price_b2b_list'], true ) ) {
				$net_prices = true;
			}
			if ( isset( $role->name ) && is_array( $options['rrb2b_tax_exempt_list'] ) && in_array( $role->name, $options['rrb2b_tax_exempt_list'], true ) ) {
				$tax_exempt = true;
			}


			?>
			<tr>
				<td>
					<h2 style="font-size:1.2rem;margin-top:5px;"><?php esc_attr_e( $role_name ); ?></h2>
					<?php if ( $role_active ) : ?>
						<h3 class="rrb2b-circle-green-h3">
						<i class="fas fa-circle-check <?php echo ( $role_active ) ? 'rrb2b-circle-green' : 'rrb2b-circle-gray'; ?>"></i>
							<?php esc_attr_e( 'ACTIVE', 'woo-roles-rules-b2b' ); ?>
						</h3>
					<?php else : ?>
						<h3 class="rrb2b-circle-gray-h3" title="<?php echo esc_attr( ! $role_active ? __( 'Make active in General Rules (tab)', 'woo-roles-rules-b2b' ) : '' ); ?>" >
							<i class="fas fa-circle <?php echo ( $role_active ) ? 'rrb2b-circle-green' : 'rrb2b-circle-gray'; ?>"></i>
							<?php esc_attr_e( 'NOT ACTIVATED', 'woo-roles-rules-b2b' ); ?>
						</h3>
					<?php endif; ?>
					<?php if ( '0' !== $user_count && ! $is_guest ) : ?>
					<a href="<?php echo esc_attr( admin_url( 'users.php?role=' . $rule->post_name ) ); ?>" target="_new">
					<?php endif; ?>
					<span style="font-size:.8rem;"><i class="fas fa-users"></i> <?php esc_html_e( 'Users:', 'woo-roles-rules-b2b' ); ?> <?php esc_attr_e( $user_count ); ?></span>
					<?php if ( '0' !== $user_count && ! $is_guest ) : ?>
					</a>
					<?php endif; ?>
					<?php
					if ( $net_prices ) {
						?>
						<br/><span style="font-size:.8rem;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( 'Ex. VAT for role', 'woo-roles-rules-b2b' ); ?></span>
						<?php
					}
					if ( $tax_exempt ) {
						?>
						<br/><span style="font-size:.8rem;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( 'Tax exempt for role', 'woo-roles-rules-b2b' ); ?></span>
						<?php
					}
					?>
					<br/>
					<div style="margin-top: 10px;<?php echo esc_attr( intval( $filter_rule ) === $rule->ID || intval( $edited_id ) === $rule->ID ? '' : 'display:none;' ); ?>" id="cat_<?php echo esc_js( $rule->ID ); ?>">
						<form name="frm_single_categories" id="frm_single_categories_<?php echo esc_js( $rule->ID ); ?>" >
						<input type="hidden" name="rule_id" value="<?php echo esc_js( $rule->ID ); ?>">
						<input type="hidden" name="rule_url" value="<?php esc_attr_e( $url ); ?>">
						<?php self::rrb2b_get_categories_select_dropdown( $rule->ID ); ?>
						</form>
						<div style="text-align: left;margin-top:10px;">
							<a class="button" href="#" onclick="checkCategories('<?php echo esc_js( $rule->ID ); ?>', this );"><i class="fas fa-check-circle"></i> <?php esc_attr_e( 'Check all', 'woo-roles-rules-b2b' ); ?></a>
							<a id="categories_add_<?php echo esc_js( $rule->ID ); ?>" class="button" href="<?php esc_attr_e( $url ); ?>&eid=<?php echo esc_js( $rule->ID ); ?>"><i class="fas fa-plus-circle"></i> <?php esc_attr_e( 'Add categories', 'woo-roles-rules-b2b' ); ?></a>
						</div>
					</div>
					
				</td>
				<td>
					<div>
					<button class="button" onclick="rrb2b_toggle_div_cat('<?php echo esc_js( $rule->ID ); ?>');"><i class="fas fa-edit"></i> <?php esc_attr_e( 'Edit', 'woo-roles-rules-b2b' ); ?></button>
					</div>
					<div id="div_<?php echo esc_js( $rule->ID ); ?>" style="<?php echo esc_attr( intval( $filter_rule ) === $rule->ID || intval( $edited_id ) === $rule->ID ? '' : 'display:none;' ); ?>">
						
						<table id="rrb2b_table_cat_<?php echo esc_js( $rule->ID ); ?>" style="width:100%;" class="widefat fixed striped posts rrb2b-table_">
						<caption style="margin-bottom:10px;width:100%;text-align:right;">
							<div style="display: inline-block;text-align:right;">
								<input type="search" onmouseover="this.focus();" id="category_filter_<?php echo esc_js( $rule->ID ); ?>" oninput="rrb2b_filter_categories('<?php echo esc_js( $rule->ID ); ?>');" placeholder="<?php esc_html_e( 'Search...', 'woo-roles-rules-b2b' ); ?>" >
							</div>
						</caption>
						<thead>
							<tr>
								<th style="width: 80px;"><?php esc_html_e( 'Remove', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width: 250px;text-align:left;"><?php esc_html_e( 'Category', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width: 30px;"><?php esc_html_e( 'Hide', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width: 30px;"><?php esc_html_e( 'Sale', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:100px;"><?php esc_html_e( 'Rule', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:70px;"><?php esc_html_e( 'Value', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:142px;background-color:silver;border-bottom: 1px solid ghostwhite;"><?php esc_html_e( 'Rule: Qty or more', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:70px;background-color:silver;border-bottom: 1px solid ghostwhite;"><?php esc_html_e( 'Value', 'woo-roles-rules-b2b' ); ?></th>
							</tr>
							<tr>
								<th style="padding-left:1px;">
									<input type="checkbox" id="category_remove_<?php echo esc_js( $rule->ID ); ?>" onclick="catBulkCheck('<?php echo esc_js( $rule->ID ); ?>', 'category_remove', 'rrb2b_table_cat');">
								</th>
								<th style="text-align: right;">
									<?php esc_html_e( 'Bulk set values here', 'woo-roles-rules-b2b' ); ?> <i class="fas fa-arrow-circle-right"></i>
								</th>
								<th style="padding-left:1px;">
									<input type="checkbox" id="category_hidden_<?php echo esc_js( $rule->ID ); ?>" onclick="catBulkCheck('<?php echo esc_js( $rule->ID ); ?>', 'category_hidden', 'rrb2b_table_cat');">
								</th>
								<th style="padding-left:1px;">
									<input type="checkbox" id="category_sale_<?php echo esc_js( $rule->ID ); ?>" onclick="catBulkCheck('<?php echo esc_js( $rule->ID ); ?>', 'category_sale', 'rrb2b_table_cat');">
								</th>
								<th>
									<select id="reduce_regular_type_<?php echo esc_js( $rule->ID ); ?>" class="rrb2b-product-select" onchange="catBulkSelect('<?php echo esc_js( $rule->ID ); ?>', 'reduce_regular_type', 'rrb2b_table_cat');">
										<option value=""><?php esc_html_e( 'Select (Reset)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent"><?php esc_html_e( 'Reduce by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed"><?php esc_html_e( 'Reduce by fixed amount', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent_add"><?php esc_html_e( 'Increase by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed_add"><?php esc_html_e( 'Increase by fixed amount', 'woo-roles-rules-b2b' ); ?></option>
									</select>
								</th>
								<th style="padding-left:1px;">
									<input id="adjust_value_<?php echo esc_js( $rule->ID ); ?>" type="number" class="rrb2b-prod-val" style="width: 94%;padding-left: 5px;" oninput="catBulkInput('<?php echo esc_js( $rule->ID ); ?>', 'adjust_value', 'rrb2b_table_cat');">
								</th>
								<th class="cas-qty-row" style="padding-left:1px;">
									<input id="min_qty_<?php echo esc_js( $rule->ID ); ?>" type="number" class="rrb2b-prod-val" style="width: 42%;padding-left: 5px;" oninput="catBulkInput('<?php echo esc_js( $rule->ID ); ?>', 'min_qty', 'rrb2b_table_cat');">
									<select id="reduce_regular_type_qty_<?php echo esc_js( $rule->ID ); ?>" class="rrb2b-product-select" style="width: 49%;margin-bottom:-11px;" onchange="catBulkSelect('<?php echo esc_js( $rule->ID ); ?>', 'reduce_regular_type_qty', 'rrb2b_table_cat');">
										<option value=""><?php esc_html_e( 'Select (Reset)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent"><?php esc_html_e( 'Percent (%) reduction', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed"><?php esc_html_e( 'Fixed amount reduction', 'woo-roles-rules-b2b' ); ?></option>
									</select>
								</th>
								<th class="cas-qty-row" style="padding-left:1px;">
									<input id="adjust_value_qty_<?php echo esc_js( $rule->ID ); ?>" type="number" class="rrb2b-prod-val" style="width: 94%;padding-left: 5px;" oninput="catBulkInput('<?php echo esc_js( $rule->ID ); ?>', 'adjust_value_qty', 'rrb2b_table_cat');">
								</th>
							</tr>
						</thead>
						<tbody>
						<?php 
						//Get single categories
						if ( isset( $single_categories ) ) {

							usort( $single_categories, function( $a, $b ) {
								return strcmp( $a['name'], $b['name'] );
							} );
				
							foreach ( $single_categories as $obj ) {
								$parents          = get_ancestors( $obj['id'], 'product_cat' );
								$parent_hierarchy = '';

								if ( ! empty( $parents ) ) {
									// Reverse the array to start from the topmost ancestor
									$parents = array_reverse( $parents );

									foreach ( $parents as $parent_id ) {
										$term = get_term_by( 'id', $parent_id, 'product_cat' );
										if ( $term && ! is_wp_error( $term ) ) {
											$parent_hierarchy .= $term->name . ' > ';
										}
									}
								}
								
								?>
								<tr id="<?php echo esc_attr( $obj['id'] ); ?>">
								<td colspan="2">
									<form method="post" name="update_single_category" autocomplete="off">
									<input type="checkbox" name="category_remove">
									<input type="hidden" name="slug" value="<?php echo esc_attr( $obj['slug'] ); ?>">
									<input type="hidden" name="id" value="<?php echo esc_attr( $obj['id'] ); ?>">
								
									<input type="text" value="<?php esc_attr_e( $parent_hierarchy ); ?>" title="<?php esc_attr_e( $parent_hierarchy ); ?>" style="width: 30%;" readonly="readonly">
									<input type="text" name="category_name" readonly="readonly" style="width:60%;" value="<?php echo esc_attr( $obj['name'] ); ?>">
								</td>
								<td><input type="checkbox" name="category_hidden" <?php echo ( 'true' === $obj['hidden'] ) ? 'checked' : ''; ?>></td>
								<td><input type="checkbox" name="category_sale" <?php echo ( 'true' === $obj['on_sale'] ) ? 'checked' : ''; ?>></td>
								<td>
									<select name="reduce_regular_type" class="rrb2b-product-select">
										<option value="" <?php echo ( '' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Select', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent" <?php echo ( 'percent' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed" <?php echo ( 'fixed' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce by fixed amount', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent_add" <?php echo ( 'percent_add' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Increase by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed_add" <?php echo ( 'fixed_add' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Increase by fixed amount', 'woo-roles-rules-b2b' ); ?></option>	
									</select>
								</td>
								<td>
									<input name="adjust_value" type="number" class="rrb2b-prod-val" value="<?php echo esc_attr( $obj['adjust_value'] ); ?>">
								</td>
								<td class="cas-qty-row">
									<input name="min_qty" type="number" class="rrb2b-prod-val" style="width: 42%;margin-top:-1px;" value="<?php echo esc_attr( $obj['min_qty'] ); ?>">
									<select name="reduce_regular_type_qty" class="rrb2b-product-select" style="width: 51%;">
										<option value="" <?php echo ( isset( $obj['adjust_type_qty'] ) && '' === $obj['adjust_type_qty'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Select', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent" <?php echo ( isset( $obj['adjust_type_qty'] ) && 'percent' === $obj['adjust_type_qty'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Percent (%) reduction', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed" <?php echo ( isset( $obj['adjust_type_qty'] ) && 'fixed' === $obj['adjust_type_qty'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Fixed amount reduction', 'woo-roles-rules-b2b' ); ?></option>
									</select>
								</td>
								<td class="cas-qty-row">
									<input name="adjust_value_qty" type="number" class="rrb2b-prod-val" value="<?php echo esc_attr( isset( $obj['adjust_type_qty'] ) ? $obj['adjust_value_qty'] : '' ); ?>">
									</form>
								</td>
								</tr>
								<?php
							}
						}
						?>
						</tbody>
						<tfoot>
						<tr>
							<td>
								<button class="button" onclick="rrb2bFindDuplicates('rrb2b_table_cat_<?php echo esc_js( $rule->ID ); ?>', 'category');"><i class="fa-regular fa-eye"></i> <?php esc_attr_e( 'Find Duplicates', 'woo-roles-rules-b2b' ); ?></button>
							</td>
							<td colspan="7">
								<div style="float:right;">
									<button type="button" id="updateSingleCatButton-<?php echo esc_js( $rule->ID ); ?>" class="button button-primary" onclick="updateSingleCategories('<?php echo esc_js( $rule->ID ); ?>');"><i class="fas fa-save"></i> <?php esc_attr_e( 'Save Changes', 'woo-roles-rules-b2b' ); ?></button>
								</div>
							</td>
						</tr>
						</tfoot>
						</table>
					</div>
				</td>
			</tr>
			<?php
		}
	}

	/**
	 * Get rules for products
	 */
	public function rrb2b_get_rules_products() {

		$wp_roles    = wp_roles();
		$rules       = $this->rrb2b_query_rules();
		$add_id      = filter_input( 1, 'add', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$add_name    = filter_input( 1, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$add_rule    = filter_input( 1, 'rule', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$filter_rule = filter_input( 1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS );
		$options     = get_option( 'rrb2b_options' );
		$edited_id   = filter_input( 1, 'eid', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		if ( isset( $add_id ) && ! empty( $add_id ) ) {
			$this->rrb2b_add_table_product( intval( $add_id ), $add_name, $add_rule );
		}

		if ( isset( $filter_rule ) && ! empty( $filter_rule ) ) {
			$rules = array();
			array_push( $rules, get_post( $filter_rule ) );
		}
		
		foreach ( $rules as $rule ) {
			
			$content  = json_decode( $rule->post_content, true );
			$products = ( isset( $content['products'] ) ) ? $content['products'] : array();
			$is_guest = ( 'guest' === $rule->post_name );
			$role_obj = get_role( $rule->post_name );

			if ( ! $is_guest && ! $role_obj ) {
				// Role is missing — fallback handling
				error_log( 'RRB2B: Missing role "' . $rule->post_name . '" for rule ID ' . $rule->ID );

				$role       = null;
				$role_name  = ucfirst( $rule->post_name ) . ' (missing)';
				$user_count = __( 'N/A', 'woo-roles-rules-b2b' );

			} else {
				$role      = ( $is_guest ) ? '0' : $role_obj;
				$role_name = ( $is_guest )
					? __( 'Guest', 'woo-roles-rules-b2b' )
					: translate_user_role( $wp_roles->roles[ $rule->post_name ]['name'] );

				$user_count = ( $is_guest )
					? __( 'Regular guests (B2C)', 'woo-roles-rules-b2b' )
					: $this->rrb2b_count_users_for_role( (array) $role );
				
			}
			
			$url         = admin_url( 'admin.php' ) . '?page=rrb2b&tab=products&rule=' . $rule->ID . '&add=';
			$net_prices  = false;
			$tax_exempt  = false;
			$role_active = ( isset( $content['rule_active'] ) && 'on' === $content['rule_active'] ) ? true : false;


			if ( isset( $filter_rule ) && ! empty( $filter_rule ) ) {
				$url = admin_url( 'admin.php' ) . '?page=rrb2b&tab=products&filter=' . $filter_rule . '&rule=' . $rule->ID . '&add=';
			}	
			if ( ! empty( $role->name ) && is_array( $options['rrb2b_net_price_b2b_list'] ) && in_array( $role->name, $options['rrb2b_net_price_b2b_list'], true ) ) {
				$net_prices = true;
			}
			if ( ! empty( $role->name ) && is_array( $options['rrb2b_tax_exempt_list'] ) && in_array( $role->name, $options['rrb2b_tax_exempt_list'], true ) ) {
				$tax_exempt = true;
			}
			?>
			<tr>
				<td>
					<h2 style="font-size:1.2rem;margin-top:5px;"><?php esc_attr_e( $role_name ); ?></h2>
					
					<?php if ( $role_active ) : ?>
						<h3 class="rrb2b-circle-green-h3">
						<i class="fas fa-circle-check <?php echo ( $role_active ) ? 'rrb2b-circle-green' : 'rrb2b-circle-gray'; ?>"></i>
							<?php esc_attr_e( 'ACTIVE', 'woo-roles-rules-b2b' ); ?>
						</h3>
					<?php else : ?>
						<h3 class="rrb2b-circle-gray-h3" title="<?php echo esc_attr( ! $role_active ? __( 'Make active in General Rules (tab)', 'woo-roles-rules-b2b' ) : '' ); ?>" >
							<i class="fas fa-circle <?php echo ( $role_active ) ? 'rrb2b-circle-green' : 'rrb2b-circle-gray'; ?>"></i>
							<?php esc_attr_e( 'NOT ACTIVATED', 'woo-roles-rules-b2b' ); ?>
						</h3>
					<?php endif; ?>
					
					<?php if ( '0' !== $user_count && ! $is_guest ) : ?>
						<a href="<?php echo esc_attr( admin_url( 'users.php?role=' . $rule->post_name ) ); ?>" target="_new">
					<?php endif; ?>
					<span style="font-size:.8rem;"><i class="fas fa-users"></i> <?php esc_html_e( 'Users:', 'woo-roles-rules-b2b' ); ?> <?php esc_attr_e( $user_count ); ?></span>
					<?php if ( '0' !== $user_count && ! $is_guest ) : ?>
						</a>
					<?php endif; ?>
					<?php
					if ( $net_prices ) {
						?>
						<br/><span style="font-size:.8rem;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( 'Ex. VAT for role', 'woo-roles-rules-b2b' ); ?></span>
						<?php
					}
					if ( $tax_exempt ) {
						?>
						<br/><span style="font-size:.8rem;"><i class="fas fa-info-circle"></i> <?php esc_attr_e( 'Tax exempt for role', 'woo-roles-rules-b2b' ); ?></span>
						<?php
					}
					?>
					<br/>
					<div id="prod1_<?php echo esc_js( $rule->ID ); ?>" style="<?php echo esc_attr( intval( $filter_rule ) === $rule->ID || intval( $edited_id ) === $rule->ID ? '' : 'display:none;' ); ?>">
						<div style="margin-top: 10px;">
						<input type="text" style="width: 75%;" id="product_search_<?php echo esc_js( $rule->ID ); ?>" name="product_search" oninput="findProducts('<?php echo esc_js( $rule->ID ); ?>');" placeholder="<?php esc_attr_e( 'Search product', 'woo-roles-rules-b2b' ); ?>">
						<a id="product_add_<?php echo esc_js( $rule->ID ); ?>" class="button" href="<?php esc_attr_e( $url ); ?>"><?php esc_attr_e( 'Add', 'woo-roles-rules-b2b' ); ?></a>
						</div>
						<div style="margin-top: 10px;">
							<?php $this->rrb2b_get_categories_select( $rule->ID ); ?>
						</div>
						<div class="rrb2b-saving" id="rrb2b-saving-<?php echo esc_js( $rule->ID ); ?>">
							<progress id="pbar-saving-<?php echo esc_js( $rule->ID ); ?>" class="pbar-saving" value="0" max="100"></progress>
						</div>
					</div>
					
				</td>
				<td>
					<div>
						<button class="button" onclick="rrb2b_toggle_div_prod('<?php echo esc_js( $rule->ID ); ?>');"><i class="fas fa-edit"></i> <?php esc_attr_e( 'Edit', 'woo-roles-rules-b2b' ); ?></button>
					</div>
					<div id="prod2_<?php echo esc_js( $rule->ID ); ?>" style="<?php echo esc_attr( intval( $filter_rule ) === $rule->ID || intval( $edited_id ) === $rule->ID ? '' : 'display:none;' ); ?>">
						
						<table id="rrb2b_table_<?php echo esc_js( $rule->ID ); ?>" style="width:100%;" class="widefat fixed striped posts rrb2b-table_">
						<caption style="margin-bottom:10px;width:100%;text-align:right;">
							<div style="display: inline-block;text-align:right;">
								<input type="search" onmouseover="this.focus();" id="product_filter_<?php echo esc_js( $rule->ID ); ?>" oninput="rrb2b_filter_products('<?php echo esc_js( $rule->ID ); ?>');" placeholder="<?php esc_html_e( 'Search', 'woo-roles-rules-b2b' ); ?>" >
							</div>
						</caption>
						<thead>
							<tr>
								<th style="width:80px;">
									<?php esc_html_e( 'Remove', 'woo-roles-rules-b2b' ); ?>
								</th>
								<th><?php esc_html_e( 'Product', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width: 30px;"><?php esc_html_e( 'Hide', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width: 100px;"><?php esc_html_e( 'Price', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:100px;"><?php esc_html_e( 'Rule', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:100px;"><?php esc_html_e( 'Value', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:142px;background-color:silver;border-bottom: 1px solid ghostwhite;"><?php esc_html_e( 'Rule: Qty or more', 'woo-roles-rules-b2b' ); ?></th>
								<th style="width:100px;background-color:silver;border-bottom: 1px solid ghostwhite;"><?php esc_html_e( 'Value', 'woo-roles-rules-b2b' ); ?></th>
							</tr>
							<tr>
								<th style="padding-left:1px;">
									<input type="checkbox" id="product_remove_<?php echo esc_js( $rule->ID ); ?>" onclick="catBulkCheck('<?php echo esc_js( $rule->ID ); ?>', 'product_remove', 'rrb2b_table');">
								</th>
								<th style="text-align: right;">
									<?php esc_html_e( 'Bulk set values here', 'woo-roles-rules-b2b' ); ?> <i class="fas fa-arrow-circle-right"></i>
								</th>
								<th style="padding-left:1px;">
									<input type="checkbox" id="product_hidden_<?php echo esc_js( $rule->ID ); ?>" onclick="catBulkCheck('<?php echo esc_js( $rule->ID ); ?>', 'product_hidden', 'rrb2b_table');">
								</th>
								<th></th>
								<th>
									<select id="reduce_regular_type_<?php echo esc_js( $rule->ID ); ?>" class="rrb2b-product-select" onchange="catBulkSelect('<?php echo esc_js( $rule->ID ); ?>', 'reduce_regular_type', 'rrb2b_table');">
										<option value=""><?php esc_html_e( 'Select', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent"><?php esc_html_e( 'Reduce by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed"><?php esc_html_e( 'Reduce by fixed amount', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent_add"><?php esc_html_e( 'Increase by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed_add"><?php esc_html_e( 'Increase by fixed amount', 'woo-roles-rules-b2b' ); ?></option>	
										<option value="fixed_set"><?php esc_html_e( 'Fixed price', 'woo-roles-rules-b2b' ); ?></option>
									</select>
								</th>
								<th style="padding-left:1px;">
									<input id="adjust_value_<?php echo esc_js( $rule->ID ); ?>" type="number" class="rrb2b-prod-val" style="width: 94%;padding-left: 5px;" oninput="catBulkInput('<?php echo esc_js( $rule->ID ); ?>', 'adjust_value', 'rrb2b_table');">
								</th>
								<th class="cas-qty-row" style="padding-left:1px;">
									<input id="min_qty_<?php echo esc_js( $rule->ID ); ?>" type="number" class="rrb2b-prod-val" style="width: 42%;padding-left: 5px;" oninput="catBulkInput('<?php echo esc_js( $rule->ID ); ?>', 'min_qty', 'rrb2b_table');">
									<select id="reduce_regular_type_qty_<?php echo esc_js( $rule->ID ); ?>" class="rrb2b-product-select" style="width: 49%;margin-bottom:-11px;" onchange="catBulkSelect('<?php echo esc_js( $rule->ID ); ?>', 'reduce_regular_type_qty', 'rrb2b_table');">
										<option value=""><?php esc_html_e( 'Reduce by', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent"><?php esc_html_e( 'Percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed"><?php esc_html_e( 'Fixed amount', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed_set"><?php esc_html_e( 'Set fixed price', 'woo-roles-rules-b2b' ); ?></option>
									</select>
								</th>
								<th class="cas-qty-row" style="padding-left:1px;">
									<input id="adjust_value_qty_<?php echo esc_js( $rule->ID ); ?>" type="number" class="rrb2b-prod-val" style="width: 94%;padding-left: 5px;" oninput="catBulkInput('<?php echo esc_js( $rule->ID ); ?>', 'adjust_value_qty', 'rrb2b_table');">
								</th>
							</tr>
						</thead>
						<tbody>
						
						<?php 
						//Get products
						if ( isset( $products ) ) {

							usort( $products, function( $a, $b ) {
								return strcmp( $a['name'], $b['name'] );
							} );
							
							foreach ( $products as $obj ) {


								if ( empty( $obj['id'] ) || 0 === intval( $obj['id'] ) ) { 
									continue; 
								}
							
								$product = wc_get_product( $obj['id'] );
							
								// Ensure $product is valid
								if ( ! $product instanceof WC_Product ) {
									continue;
								}

								$product_price = ! empty( $product->get_regular_price() ) ? wc_price( $product->get_regular_price() ) : '';
								$is_variable   = ( $product->is_type( 'variation' ) ) ? true : false;
								$price_ex_vat  = ! empty( $product->get_regular_price() ) ? wc_price( wc_get_price_excluding_tax( $product, array( 'qty' => 1, 'price' => $product->get_regular_price() ) ) ) : '';
								$variable_name = sanitize_text_field( wp_strip_all_tags( $product->get_formatted_name() ) );

								if ( 'variable' === $product->get_type() ) {
									$product       = new WC_Product_Variable( $product );
									$prices_reg    = array( $product->get_variation_regular_price( 'min', false ), $product->get_variation_regular_price( 'max', false ) );
									$product_price = ( count( $prices_reg ) > 0 ) ? $prices_reg[0] . ' - ' . $prices_reg[1] : $product_price;
								}
								if ( $is_variable ) {
									$parent_id = $product->get_parent_id();
									$product   = wc_get_product( $parent_id );
								}

								$categories  = $product->get_category_ids();
								$cat_url     = get_admin_url() . 'edit.php?s&post_status=all&post_type=product&action=-1&product_cat=';
								$product_url = get_admin_url() . 'post.php?action=edit&post=' ;
								$name_sku    = $product->get_name();
								$name_sku   .= $product->get_sku() ? ' (' . $product->get_sku() . ')' : '';
								
								?>
								
								<tr id="<?php echo esc_attr( $obj['id'] ); ?>">
								<td>
									<form method="post" name="update_products" autocomplete="off">
									<input type="checkbox" name="product_remove" style="margin-bottom: 16px;">
									<input type="hidden" name="id" value="<?php echo esc_attr( $obj['id'] ); ?>">
									<input type="hidden" name="variable" value="<?php echo ( $is_variable ) ? 'true' : 'false'; ?>">
									<?php echo wp_kses( get_the_post_thumbnail( $product->get_id(), array( '28', '28' ), array( 'class' => 'rrb2b-thumb' ) ), $this->rrb2b_get_allowed_html() ); ?>
									<a href="<?php echo wp_kses( $product_url . $product->get_id(), $this->rrb2b_get_allowed_html() ); ?>" target="_blank" class="cas-edit-button"><i class="fa-solid fa-pen-to-square"></i></a>
								</td>
								
								<td>
									<input type="hidden" name="product_id" value="<?php echo esc_attr( $obj['id'] ); ?>">
									<input type="text" name="product_name" readonly="readonly" style="width:100%;" 
										value="<?php echo esc_attr( $is_variable ? $variable_name : $product->get_name() ) ; ?>"
										title="<?php echo esc_attr( $is_variable ? $variable_name : $name_sku ) ; ?>">
									<div class="cas-cat-list"><?php esc_html_e( 'Category: ', 'woo-roles-rules-b2b' ); ?>
									<?php  
									if ( ! empty( $categories ) ) {
										$cat_list = '';
										foreach ( $categories as $category_id ) {
											$category = get_term_by( 'id', $category_id, 'product_cat' );
											if ( $category ) {
												$cat_list .= '<a href="' . $cat_url . $category->slug . '" class="cas-cat-list-link" target="_blank">' . $category->name . '</a>, ';
											}
										}
										echo wp_kses( rtrim( $cat_list, ', ' ), $this->rrb2b_get_allowed_html() );
									}
									?>
									
								</td>
								<td><input type="checkbox" name="product_hidden" <?php echo ( isset( $obj['hidden'] ) && 'true' === $obj['hidden'] ) ? 'checked' : ''; ?>></td>
								<td>
									<?php echo wp_kses( $product_price, $this->rrb2b_get_allowed_html() ); ?><br/>
									<span style="font-size:x-small;"><?php echo wp_kses( $price_ex_vat, $this->rrb2b_get_allowed_html() ); ?> <?php echo ( ! empty( $price_ex_vat ) ? esc_attr__( 'Ex.VAT', 'woo-roles-rules-b2b' ) : '' ); ?></span>
								</td>
								<td>
									<select name="reduce_regular_type" class="rrb2b-product-select">
										<option value="" <?php echo ( '' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Select', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent" <?php echo ( 'percent' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed" <?php echo ( 'fixed' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce by fixed amount', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent_add" <?php echo ( 'percent_add' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Increase by percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed_add" <?php echo ( 'fixed_add' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Increase by fixed amount', 'woo-roles-rules-b2b' ); ?></option>	
										<option value="fixed_set" <?php echo ( 'fixed_set' === $obj['adjust_type'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Fixed price', 'woo-roles-rules-b2b' ); ?></option>
									</select>
								</td>
								<td>
									<input name="adjust_value" type="number" class="rrb2b-prod-val" value="<?php echo esc_attr( $obj['adjust_value'] ); ?>">
								</td>
								<td class="cas-qty-row">
									<input name="min_qty" type="number" class="rrb2b-prod-val" style="width: 42%;margin-top:-1px;" value="<?php echo esc_attr( $obj['min_qty'] ); ?>">
									<select name="reduce_regular_type_qty" class="rrb2b-product-select" style="width: 51%;">
										<option value="" <?php echo ( isset( $obj['adjust_type_qty'] ) && '' === $obj['adjust_type_qty'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Reduce by', 'woo-roles-rules-b2b' ); ?></option>
										<option value="percent" <?php echo ( isset( $obj['adjust_type_qty'] ) && 'percent' === $obj['adjust_type_qty'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Percent (%)', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed" <?php echo ( isset( $obj['adjust_type_qty'] ) && 'fixed' === $obj['adjust_type_qty'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Fixed amount', 'woo-roles-rules-b2b' ); ?></option>
										<option value="fixed_set" <?php echo ( isset( $obj['adjust_type_qty'] ) && 'fixed_set' === $obj['adjust_type_qty'] ) ? 'selected="selected"' : ''; ?>><?php esc_html_e( 'Set fixed price', 'woo-roles-rules-b2b' ); ?></option>
									</select>
								</td>
								<td class="cas-qty-row">
									<input name="adjust_value_qty" type="number" class="rrb2b-prod-val" value="<?php echo esc_attr( isset( $obj['adjust_type_qty'] ) ? $obj['adjust_value_qty'] : '' ); ?>">
									</form>
								</td>
								</tr>
								<?php
							}
						}
						?>
						
						</tbody>
						<tfoot>
							<tr>
								<td>
									<button class="button" onclick="rrb2bFindDuplicates('rrb2b_table_<?php echo esc_js( $rule->ID ); ?>', 'product');"><i class="fa-regular fa-eye"></i> <?php esc_attr_e( 'Find Duplicates', 'woo-roles-rules-b2b' ); ?></button>
								</td>
								<td colspan="7">
								<div style="float:right;">
									<button type="button" id="updateButton-<?php echo esc_js( $rule->ID ); ?>" class="button button-primary" onclick="updateProducts('<?php echo esc_js( $rule->ID ); ?>');"><i class="fas fa-save"></i> <?php esc_attr_e( 'Save changes', 'woo-roles-rules-b2b' ); ?></button>
								</div>
								</td>
							</tr>
						</tfoot>
						</table>
						
					</div>
				
				</td>
			</tr>
			<?php
		}
	
	}

	/**
	 * Add rule
	 *
	 * @param var $data post data.
	 */
	public function rrb2b_add_rule( $data ) {
		
		$name = sanitize_text_field( $data['role'] );
		
		if ( ! empty( $name ) ) {

			$rule = array(
				'post_title'   => $name,
				'post_content' => '',
				'post_status'  => 'publish',
				'post_type'    => 'rrb2b',
				'post_author'  => get_current_user_id(),
			);
	
			if ( ! post_exists( $name, '', '', 'rrb2b' ) ) {
				wp_insert_post( apply_filters( 'rrb2b_create_rule', $rule ) );
			}

		}

	}

	/**
	 * Add rules for single categories 
	 */
	public function rrb2b_add_rule_single_categories( $cat_list, $rule ) {
		
		$rule_obj          = get_post( intval( $rule ) );
		$content           = json_decode( $rule_obj->post_content, true );
		$categories        = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
		$products          = ( isset ( $content['products'] ) ) ? $content['products'] : array();
		$single_categories = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();

		foreach ( $cat_list as $slug_name ) {

			$cat = get_term_by( 'slug', $slug_name, 'product_cat' ); 

			$category = array(
				'id'               => $cat->term_id,
				'slug'             => $slug_name,
				'name'             => esc_attr( $cat->name ),
				'active'           => false,
				'adjust_type'      => '',
				'adjust_value'     => '',
				'adjust_type_qty'  => '',
				'adjust_value_qty' => '',
				'min_qty'          => 0,
				'hidden'           => 'false',
				'on_sale'          => 'false',
			);

			array_push( $single_categories, $category );
		}

		$jsonObj = $this->rrb2b_get_json_content_obj( $content, $rule, $categories, $products, $single_categories );

		$args = array(
			'ID'           => $rule,
			'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
			'post_author'  => get_current_user_id(),
		);
		
		wp_update_post( $args, false );

	}

	/**
	 * Add product to rule
	 */
	public function rrb2b_add_rule_product( $id, $name, $rule ) {
		
		$rule_obj          = get_post( intval( $rule ) );
		$content           = json_decode( $rule_obj->post_content, true );
		$categories        = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
		$products          = ( isset ( $content['products'] ) ) ? $content['products'] : array();
		$single_categories = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();

		$product = array(
			'id'               => $id,
			'name'             => esc_attr( $name ),
			'active'           => false,
			'adjust_type'      => '',
			'adjust_value'     => '',
			'adjust_type_qty'  => '',
			'adjust_value_qty' => '',
			'min_qty'          => 0,
			'hidden'           => 'false',
		);

		array_push( $products, $product );

		$jsonObj = $this->rrb2b_get_json_content_obj( $content, $rule, $categories, $products, $single_categories );

		$args = array(
			'ID'           => $rule,
			'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
			'post_author'  => get_current_user_id(),
		);
		
		wp_update_post( $args, false );
	}

	/**
	 * Update single category rules
	 */
	public function rrb2b_update_single_category_rule( $data ) {
		
		$rule_id            = sanitize_text_field( $data['rule_id'] );
		$rule_obj           = get_post( intval( $rule_id ) );
		$content            = json_decode( $rule_obj->post_content, true );
		$categories         = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
		$single_categories  = array();
		$_single_categories = ( isset ( $data['rows'] ) ) ? $data['rows'] : array();
		$products           = ( isset ( $content['products'] ) ) ? $content['products'] : array();

		foreach ( $_single_categories as $item ) {
			
			$remove = sanitize_text_field( $item['remove'] );

			if ( 'false' === $remove ) {

				$category = array(
					'id'               => sanitize_text_field( $item['id'] ),
					'slug'             => sanitize_text_field( $item['slug'] ),
					'name'             => sanitize_text_field( $item['name'] ),
					'active'           => true,
					'adjust_type'      => sanitize_text_field( $item['reduce_type'] ),
					'adjust_value'     => sanitize_text_field( $item['reduce_value'] ),
					'adjust_type_qty'  => sanitize_text_field( $item['reduce_type_qty'] ),
					'adjust_value_qty' => sanitize_text_field( $item['reduce_value_qty'] ),
					'min_qty'          => sanitize_text_field( $item['min_qty'] ),
					'hidden'           => sanitize_text_field( $item['hidden'] ),
					'on_sale'          => sanitize_text_field( $item['sale'] ),
				);

				array_push( $single_categories, $category );
			}
		}

		$jsonObj = $this->rrb2b_get_json_content_obj( $content, $rule_id, $categories, $products, $single_categories );

		$args = array(
			'ID'           => $content['id'],
			'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
			'post_author'  => get_current_user_id(),
		);

		wp_update_post( $args, false );
	}

	/**
	 * Update products to rule
	 */
	public function rrb2b_update_product_rule( $data ) {

		$rule_id           = sanitize_text_field( $data['rule_id'] );
		$rule_obj          = get_post( intval( $rule_id ) );
		$content           = json_decode( $rule_obj->post_content, true );
		$categories        = ( isset ( $content['categories'] ) ) ? $content['categories'] : array();
		$single_categories = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();
		$products          = array();
		$_products         = ( isset ( $data['rows'] ) ) ? $data['rows'] : array();

		foreach ( $_products as $item ) {
			
			$remove = sanitize_text_field( $item['remove'] );

			if ( 'false' === $remove ) {

				$product = array(
					'id'               => sanitize_text_field( $item['product_id'] ),
					'name'             => sanitize_text_field( esc_attr( $item['product_name'] ) ),
					'active'           => ( ! empty( $item['reduce_value'] ) ) ? true : false,
					'adjust_type'      => sanitize_text_field( $item['reduce_type'] ),
					'adjust_value'     => sanitize_text_field( $item['reduce_value'] ),
					'adjust_type_qty'  => sanitize_text_field( $item['reduce_type_qty'] ),
					'adjust_value_qty' => sanitize_text_field( $item['reduce_value_qty'] ),
					'min_qty'          => sanitize_text_field( $item['min_qty'] ),
					'hidden'           => sanitize_text_field( $item['product_hidden'] ),
				);
				
				array_push( $products, $product );
			}	
		}

		$jsonObj = $this->rrb2b_get_json_content_obj( $content, $rule_id, $categories, $products, $single_categories );
		
		$args = array(
			'ID'           => $content['id'],
			'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
			'post_author'  => get_current_user_id(),
		);

		wp_update_post( $args, false );
	
	}

	/**
	 * Copy rules from - to multiple
	 */
	public function rrb2b_copy_rules( $data ) {
		
		$type = $data['type'];
		$from = $data['from'];
		$to   = ( ! empty( $data['to'] ) ) ? explode( ',', $data['to'] ) : array();

		if ( empty( $from ) ) {
			wp_send_json( 'No from rule found' );
			wp_die();
		} 

		$from_rule  = get_post( intval( $from ) );
		$content    = json_decode( $from_rule->post_content, true );
		$cat_rules  = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();
		$prod_rules = ( isset ( $content['products'] ) ) ? $content['products'] : array();

		if ( 'category' === $type ) {

			foreach ( $to as $id ) {
				$item         = get_post( intval( $id ) );
				$item_content = json_decode( $item->post_content, true );
				$jsonObj      = $this->rrb2b_get_json_content_obj( $item_content, $id, $item_content['categories'], $item_content['products'], $cat_rules );

				$args = array(
					'ID'           => $id,
					'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
					'post_author'  => get_current_user_id(),
				);
		
				wp_update_post( $args, false );
			}


		} else { //Products

			foreach ( $to as $id ) {
				$item         = get_post( intval( $id ) );
				$item_content = json_decode( $item->post_content, true );
				$jsonObj      = $this->rrb2b_get_json_content_obj( $item_content, $id, $item_content['categories'], $prod_rules, $item_content['single_categories'] );

				$args = array(
					'ID'           => $id,
					'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
					'post_author'  => get_current_user_id(),
				);
		
				wp_update_post( $args, false );
			}

		}

	}

	/**
	 * Update rule
	 * 
	 * @param var $data post object.
	 */
	public function rrb2b_update_rule( $data ) {

		$rule_obj          = get_post( intval( $data['id'] ) );
		$content           = json_decode( $rule_obj->post_content, true );
		$products          = ( isset( $content['products'] ) ) ? $content['products'] : array();
		$single_categories = ( isset ( $content['single_categories'] ) ) ? $content['single_categories'] : array();
		$categories        = array();

		/*
		foreach ( $data as $key => $value ) {

			if ( preg_match( '/^__/', $key ) === 1 ) {
				$key = str_replace( '__', '', $key );
				array_push( $categories, array( $key => $value ) );
			}
			
		}*/

		$categories_arr = explode( ',', $data['selected_categories'] );
	
		foreach ( $categories_arr as $catId ) {
			array_push( $categories, array( $catId => $catId ) );
		}

		$jsonObj = array(
			'id'                      => $data['id'],
			'rule_active'             => ( isset( $data['rule_active'] ) ) ? $data['rule_active'] : '',
			'reduce_regular_type'     => $data['reduce_regular_type'],
			'reduce_regular_value'    => $data['reduce_regular_value'],
			'reduce_categories_value' => $data['reduce_categories_value'],
			'reduce_sale_type'        => $data['reduce_sale_type'],
			'reduce_sale_value'       => $data['reduce_sale_value'],
			'coupon'                  => $data['coupon'],
			'date_from'               => $data['date_from'],
			'date_to'                 => $data['date_to'],
			'time_from'               => $data['time_from'],
			'time_to'                 => $data['time_to'],
			'categories'              => $categories,
			'categories_on_sale'      => ( isset ( $data['categories_on_sale'] ) && 'on' === $data['categories_on_sale'] ) ? 'on' : 'off',
			'products'                => $products,
			'single_categories'       => $single_categories,
		);
		
		$args = array(
			'ID'           => $data['id'],
			'post_content' => wp_json_encode( $jsonObj, JSON_UNESCAPED_UNICODE ),
			'post_author'  => get_current_user_id(),
		);

		wp_update_post( $args, false );
		
	}

	/**
	 * Get content object
	 */
	public function rrb2b_get_json_content_obj( $content, $rule, $categories, $products, $single_categories ) {
		
		$jsonObj = array(
			'id'                      => ( isset( $content ) ) ? $content['id'] : $rule, 
			'rule_active'             => ( isset( $content ) ) ? $content['rule_active'] : '',
			'reduce_regular_type'     => ( isset( $content ) ) ? $content['reduce_regular_type'] : '',
			'reduce_regular_value'    => ( isset( $content ) ) ? $content['reduce_regular_value'] : '',
			'reduce_categories_value' => ( isset( $content ) ) ? $content['reduce_categories_value'] : '',
			'reduce_sale_type'        => ( isset( $content ) ) ? $content['reduce_sale_type'] : '',
			'reduce_sale_value'       => ( isset( $content ) ) ? $content['reduce_sale_value'] : '',
			'coupon'                  => ( isset( $content ) ) ? $content['coupon'] : '',
			'date_from'               => ( isset( $content ) ) ? $content['date_from'] : '',
			'date_to'                 => ( isset( $content ) ) ? $content['date_to'] : '',
			'time_from'               => ( isset( $content ) ) ? $content['time_from'] : '',
			'time_to'                 => ( isset( $content ) ) ? $content['time_to'] : '',
			'categories'              => $categories,
			'categories_on_sale'      => ( isset( $content ) ) ? $content['categories_on_sale'] : '',
			'products'                => $products,
			'single_categories'       => $single_categories,
		);

		return $jsonObj;
	}

	/**
	 * Delete rule
	 */
	public function rrb2b_delete_rule( $data ) {

		$rule_id = $data['role_id'];

		wp_delete_post( $rule_id, true );

	}

	/**
	 * Get dropdown for all roles (not administrator).
	 *
	 * @param string $selected Role slug to preselect.
	 */
	public function rrb2b_dropdown_roles( $selected = '' ) {
		$output = '';

		// Get editable roles.
		$editable_roles = array_reverse( get_editable_roles() );

		// Sort roles alphabetically by name.
		uasort( $editable_roles, function ( $a, $b ) {
			return strcmp( translate_user_role( $a['name'] ), translate_user_role( $b['name'] ) );
		});

		foreach ( $editable_roles as $role_slug => $details ) {
			// Use the role slug for value and role name for display.
			$role_name = translate_user_role( $details['name'] );

			// Skip administrator role.
			if ( 'administrator' === $role_slug ) {
				continue;
			}

			// Determine if the role is selected.
			$selected_attr = ( $selected === $role_slug ) ? "selected='selected'" : '';

			// Build the option element.
			$output .= sprintf(
				"\n\t<option %s value='%s'>%s</option>",
				$selected_attr,
				esc_attr( $role_slug ),
				esc_html( $role_name )
			);
		}

		// Output the dropdown options with sanitized HTML.
		echo wp_kses( $output, array( 'option' => array( 'selected' => array(), 'value' => array() ) ) );
	}


	/**
	 * Get cupons
	 */
	public function rrb2b_get_coupons( $selected_id, $id ) {
		
		$args = array(
			'posts_per_page'   => -1,
			'orderby'          => 'title',
			'order'            => 'asc',
			'post_type'        => 'shop_coupon',
			'post_status'      => 'publish',
		);
			
		$coupons = get_posts( $args );

		if ( $coupons ) {
			?>
			<select oninput="formChanged(<?php echo esc_js( $id ); ?>);" name="coupon" class="rrb2b-select" style="margin-top: 11px;">
			<option value=""></option>
			<?php
			foreach ( $coupons as $coupon ) {
				?>
				<option value="<?php esc_attr_e( $coupon->ID ); ?>" <?php echo ( $coupon->ID === $selected_id ) ? 'selected="selected"' : ''; ?>><?php esc_attr_e( $coupon->post_title ); ?></option>
				<?php
			}
			?>
			</select>
			<?php
		}
	}

	/**
	 * Get select filter by role
	 */
	public function rrb2b_get_filter_roles() {

		$wp_roles    = wp_roles();
		$roles       = $wp_roles->roles;
		$saved_roles = $this->rrb2b_query_rules();
		$filter_rule = filter_input( 1, 'filter', FILTER_SANITIZE_FULL_SPECIAL_CHARS );

		foreach ( $saved_roles as $role ) {
			
			$role_name = ( 'guest' === $role->post_title ) ? 'Guest' : '';

			if ( '' === $role_name ) {

				foreach ( $roles as $key => $r ) {
					if ( $role->post_title === $key ) {
						$role_name = translate_user_role( $r['name'] );
						break;
					}
				}
			}
			?>
			<option value="<?php echo esc_html( $role->ID ); ?>" <?php echo ( intval( $filter_rule ) === $role->ID ) ? 'selected="selected"' : ''; ?>><?php echo esc_attr( $role_name ); ?></option>
			<?php
		}

	}

	/**
	 * Get category list
	 * 
	 * @param var $cat_list category array.
	 */
	public function rrb2b_get_category_list( $cat_list ) {

		$args = array(
			'taxonomy'   => 'product_cat',
			'orderby'    => 'name', 
			'order'      => 'ASC',
			'parent'     => 0,
			'hide_empty' => 0,
			'pad_counts' => 0,
		);

		$categories = get_categories( $args );

		foreach ( $categories as $category ) {
			$res = false;
			if ( isset( $cat_list ) ) {
				foreach ( (array) $cat_list as $citem ) {
					$res = in_array( $category->slug, array_keys( $citem ), true );
					if ( false !== $res ) {
						break;
					}
				}
			}
			?>
			<input class="cas-check-cat" type="checkbox" <?php echo ( false !== $res ) ? 'checked="checked"' : ''; ?> name="__<?php esc_attr_e( $category->slug ); ?>" value="<?php esc_attr_e( $category->term_id ); ?>"> <?php esc_attr_e( $category->name . ' (' . $category->category_count . ')' ); ?><br/>
			<?php
			$spaceing = 0;
			$this->rrb2b_get_sub_categories( $category, $spaceing, $cat_list );

		}

	}

	/**
	 * Get sub categories
	 */
	private function rrb2b_get_sub_categories( $category, $spaceing, $cat_list ) {

		$sub_categories = get_categories( array( 'taxonomy' => 'product_cat', 'parent' => $category->term_id, 'orderby' => 'name', 'order' => 'ASC' ) );
		$spaceing      += 20;

		foreach ( $sub_categories as $sub ) {
			$res_sub = false;
			if ( isset( $cat_list ) ) {
				foreach ( (array) $cat_list as $cat_item ) {
					$res_sub = in_array( $sub->slug, array_keys( $cat_item ), true );
					if ( false !== $res_sub ) {
						break;
					}
				}
			}
			?>
			<input class="cas-check-cat" <?php echo ( false !== $res_sub ) ? 'checked="checked"' : ''; ?> style="margin-left: <?php echo esc_js( $spaceing ); ?>px;" type="checkbox" name="__<?php esc_attr_e( $sub->slug ); ?>" value="<?php esc_attr_e( $sub->term_id ); ?>"> <?php esc_attr_e( $sub->name . ' (' . $sub->category_count . ')' ); ?><br/>
			<?php
			$this->rrb2b_get_sub_categories( $sub, $spaceing, $cat_list );
		}
	}

	/**
	 * Get categories dropdown
	 */
	public static function rrb2b_get_categories_select_dropdown( $id ) {
		$args = array(
			'pad_counts'         => 1,
			'show_count'         => 1,
			'hierarchical'       => 1,
			'hide_empty'         => 0,
			'show_uncategorized' => 1,
			'orderby'            => 'name',
			'value_field'        => 'slug',
			'taxonomy'           => 'product_cat',
			'name'               => 'product_cat_to_add',
			'id'                 => 'product_cat_to_add_' . $id,
		);

		wp_dropdown_categories( $args );
	}

	/**
	 * Get categories dropdown
	 */
	public static function rrb2b_get_categories_select_dropdown_list( $name, $id ) {
		$args = array(
			'pad_counts'         => 1,
			'show_count'         => 1,
			'hierarchical'       => 1,
			'hide_empty'         => 0,
			'show_uncategorized' => 1,
			'orderby'            => 'name',
			'value_field'        => 'id',
			'taxonomy'           => 'product_cat',
			'name'               => $name,
			'id'                 => $id,
			'option_none_value'  => '',
		);

		wp_dropdown_categories( $args );
	}

	/**
	 * Get products by category - select
	 */
	public function rrb2b_get_categories_select( $id ) {
		
		$args = array(
			'pad_counts'         => 1,
			'show_count'         => 1,
			'hierarchical'       => 1,
			'hide_empty'         => 1,
			'show_uncategorized' => 1,
			'orderby'            => 'name',
			'show_option_none'   => __( 'Add Category Products', 'woo-roles-rules-b2b' ),
			'option_none_value'  => '',
			'value_field'        => 'slug',
			'taxonomy'           => 'product_cat',
			'name'               => 'product_cat',
			'class'              => 'dropdown_product_cat',
			'id'                 => 'product_cat_' . $id,
		);
		?>
		<form name="rrb2b-select-category" id="rrb2b-select-category-<?php echo esc_attr( $id ); ?>" onchange="">  
		<input type="hidden" name="page" value="rrb2b">
		<input type="hidden" name="tab" value="products">
		<input type="hidden" name="rule-id" value="<?php echo esc_attr( $id ); ?>">
		<div style="margin-bottom:10px;margin-top:40px;">
		
		</div>
		<?php
			wp_dropdown_categories( apply_filters( 'rrb2b_category_selector_args', $args ) );
		?>
		<div style="margin-top:10px;">
			<input type="checkbox" name="variations"><?php echo esc_attr_e( 'Include variations', 'woo-roles-rules-b2b' ); ?>
			<button type="button" class="button" onclick="findCategoryProducts('<?php echo esc_attr( $id ); ?>');" style="margin-top:10px;"><?php echo esc_attr_e( 'Get products', 'woo-roles-rules-b2b' ); ?></button>
		</div>
		
		</form>
		<?php
	}

	/**
	 * Create registration form
	 */
	public function rrb2b_create_registration_form( $data ) {
		
		$options = get_option( 'rrb2b_options' );
		
		//Labels
		$first_name = ( isset( $options['rrb2b_reg_lbl_first_name'] ) && ! empty( $options['rrb2b_reg_lbl_first_name'] ) ) ? $options['rrb2b_reg_lbl_first_name'] : __( 'First name', 'woocommerce' );
		$last_name  = ( isset( $options['rrb2b_reg_lbl_last_name'] ) && ! empty( $options['rrb2b_reg_lbl_last_name'] ) ) ? $options['rrb2b_reg_lbl_last_name'] : __( 'Last name', 'woocommerce' );
		$phone      = ( isset( $options['rrb2b_reg_lbl_phone'] ) && ! empty( $options['rrb2b_reg_lbl_phone'] ) ) ? $options['rrb2b_reg_lbl_phone'] : __( 'Phone', 'woocommerce' );
		$company    = ( isset( $options['rrb2b_reg_lbl_company'] ) && ! empty( $options['rrb2b_reg_lbl_company'] ) ) ? $options['rrb2b_reg_lbl_company'] : __( 'Company', 'woocommerce' );
		$address1   = ( isset( $options['rrb2b_reg_lbl_address1'] ) && ! empty( $options['rrb2b_reg_lbl_address1'] ) ) ? $options['rrb2b_reg_lbl_address1'] : __( 'Address line 1', 'woocommerce' );
		$address2   = ( isset( $options['rrb2b_reg_lbl_address2'] ) && ! empty( $options['rrb2b_reg_lbl_address2'] ) ) ? $options['rrb2b_reg_lbl_address2'] : __( 'Address line 2', 'woocommerce' );
		$city       = ( isset( $options['rrb2b_reg_lbl_city'] ) && ! empty( $options['rrb2b_reg_lbl_city'] ) ) ? $options['rrb2b_reg_lbl_city'] : __( 'City', 'woocommerce' );
		$postcode   = ( isset( $options['rrb2b_reg_lbl_postcode'] ) && ! empty( $options['rrb2b_reg_lbl_postcode'] ) ) ? $options['rrb2b_reg_lbl_postcode'] : __( 'Postcode / ZIP', 'woocommerce' );
		$country    = ( isset( $options['rrb2b_reg_lbl_country'] ) && ! empty( $options['rrb2b_reg_lbl_country'] ) ) ? $options['rrb2b_reg_lbl_country'] : __( 'Country', 'woocommerce' );
		$state      = ( isset( $options['rrb2b_reg_lbl_state'] ) && ! empty( $options['rrb2b_reg_lbl_state'] ) ) ? $options['rrb2b_reg_lbl_state'] : __( 'State / County', 'woocommerce' );
		$usr_role   = ( isset( $options['rrb2b_reg_lbl_usr_roles'] ) && ! empty( $options['rrb2b_reg_lbl_usr_roles'] ) ) ? $options['rrb2b_reg_lbl_usr_roles'] : __( 'User role', 'woo-roles-rules-b2b' );
		$message    = ( isset( $options['rrb2b_reg_lbl_message'] ) && ! empty( $options['rrb2b_reg_lbl_message'] ) ) ? $options['rrb2b_reg_lbl_message'] : __( 'Message', 'woo-roles-rules-b2b' );
		

		wp_nonce_field( 'rrb2b_reg_form', 'rrb2b_reg_form_nonce' );
		?>

		<?php if ( 'yes' === $options['rrb2b_reg_roles_first_name'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_first_name"><?php echo esc_attr( $first_name ); ?>
			<?php if ( 'yes' === $options['rrb2b_reg_roles_first_name_req'] ) : ?>
				<span class="required">*</span>
			<?php endif; ?>
			</label>
			<input type="text" class="input-text" name="billing_first_name" id="reg_billing_first_name" value="<?php echo esc_attr( isset( $data['billing_first_name'] ) ? $data['billing_first_name'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_last_name'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_last_name"><?php echo esc_attr( $last_name ); ?>
			<?php if ( 'yes' === $options['rrb2b_reg_form_last_name_req'] ) : ?>
				<span class="required">*</span>
			<?php endif; ?>
			</label>
			<input type="text" class="input-text" name="billing_last_name" id="reg_billing_last_name" value="<?php echo esc_attr( isset( $data['billing_last_name'] ) ? $data['billing_last_name'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_company'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_company"><?php echo esc_attr( $company ); ?>
			<?php if ( 'yes' === $options['rrb2b_reg_form_company_req'] ) : ?>
				<span class="required">*</span>
			<?php endif; ?>
			</label>
			<input type="text" class="input-text" name="billing_company" id="reg_billing_company" value="<?php echo esc_attr( isset( $data['billing_company'] ) ? $data['billing_company'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_phone'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_phone"><?php echo esc_attr( $phone ); ?>
			<?php if ( 'yes' === $options['rrb2b_reg_form_phone_req'] ) : ?>
				<span class="required">*</span>
			<?php endif; ?>
			</label>
			<input type="text" class="input-text" name="billing_phone" id="reg_billing_phone" value="<?php echo esc_attr( isset( $data['billing_phone'] ) ? $data['billing_phone'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_address_1'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_address_1"><?php echo esc_attr( $address1 ); ?>
			</label>
			<input type="text" class="input-text" name="billing_address_1" id="reg_billing_address_1" value="<?php echo esc_attr( isset( $data['billing_address_1'] ) ? $data['billing_address_1'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_address_2'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_address_2"><?php echo esc_attr( $address2 ); ?>
			</label>
			<input type="text" class="input-text" name="billing_address_2" id="reg_billing_address_2" value="<?php echo esc_attr( isset( $data['billing_address_2'] ) ? $data['billing_address_2'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_city'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_city"><?php echo esc_attr( $city ); ?>
			</label>
			<input type="text" class="input-text" name="billing_city" id="reg_billing_city" value="<?php echo esc_attr( isset( $data['billing_city'] ) ? $data['billing_city'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_postcode'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_postcode"><?php echo esc_attr( $postcode ); ?>
			</label>
			<input type="text" class="input-text" name="billing_postcode" id="reg_billing_postcode" value="<?php echo esc_attr( isset( $data['billing_postcode'] ) ? $data['billing_postcode'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_country'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_country"><?php echo esc_attr( $country ); ?>
			</label>
			<select name="billing_country" id="reg_billing_country" style="height: 35px;" class="js_field-country">
			<?php 
			$allowed_countries = WC()->countries->get_allowed_countries();
			foreach ( $allowed_countries as $key => $value ) {
				?>
				<option value="<?php echo esc_attr( $key ); ?>" <?php echo esc_attr( ( ( isset( $data['billing_country'] ) ? $data['billing_country'] : '' ) === $key ) ? 'selected="selected"' : '' ); ?>><?php echo esc_attr( $value ); ?></option>
				<?php
			}
			?>
			</select>
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_state'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_billing_state"><?php echo esc_attr( $state ); ?>
			</label>
			<input type="text" class="input-text" name="billing_state" id="reg_billing_state" value="<?php echo esc_attr( isset( $data['billing_state'] ) ? $data['billing_state'] : '' ); ?>" />
		</p>
		<?php endif; ?>

		<?php if ( is_array( $options['rrb2b_reg_form_roles'] ) && count( $options['rrb2b_reg_form_roles'] ) > 0 ) : ?>
		<p class="form-row form-row-wide">
			<label for="reg_requested_role"><?php echo esc_attr( $usr_role ); ?>
			</label>
			<select name="requested_role" id="reg_requested_role" style="height: 35px;">
			<option value="" selected="selected"><?php echo esc_attr__( 'Select', 'woo-roles-rules-b2b' ); ?></option>
			<?php
			$wp_roles   = wp_roles();
			$roles      = $wp_roles->roles;
			$user_roles = $options['rrb2b_reg_form_roles'];
			foreach ( $roles as $key => $role ) {
				if ( in_array( $key, $user_roles, true ) ) {
					?>
					<option value="<?php echo esc_attr( $key ); ?>" <?php echo esc_attr( ( ( isset( $data['requested_role'] ) ? $data['requested_role'] : '' ) === $key ) ? 'selected="selected"' : '' ); ?>><?php echo esc_attr( translate_user_role(  $role['name'] ) ); ?></option>
					<?php
				}
			}
			?>
			</select>
		</p>
		<?php endif; ?>

		<?php if ( 'yes' === $options['rrb2b_reg_form_message'] ) : ?>
		<p class="form-row form-row-wide">
			<label for="rrb2b_reg_message"><?php echo esc_attr( $message ); ?>
			</label>
			<textarea type="text" class="input-text" name="rrb2b_reg_message" id="rrb2b_reg_message"><?php echo esc_attr( isset( $data['rrb2b_reg_message'] ) ? $data['rrb2b_reg_message'] : '' ); ?></textarea>
		</p>
		<?php endif; ?>

		<?php
	
	}

	/**
	 * Validate registration form
	 */
	public function rrb2b_validate_registration_form( $username, $email, $validation_errors, $data ) {
		
		$options = get_option( 'rrb2b_options' );
		$logger  = $this->logger;
		$context = $this->context;

		// Verify nonce
		if ( ! isset( $data['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( $data['rrb2b_reg_form_nonce'], 'rrb2b_reg_form' ) ) {
			$validation_errors->add( 'nonce_error', __( 'Nonce verification failed.', 'woo-roles-rules-b2b' ) );
			$logger->info( 'Nonce error in registration form (validate reg form)', $context );
			return;
		}

		if ( 'yes' === $options['rrb2b_reg_roles_first_name_req'] && isset( $data['billing_first_name'] ) && empty( $data['billing_first_name'] ) ) {
			$validation_errors->add( 'billing_first_name_error', __( '<strong>Error</strong>: First name is required!', 'woo-roles-rules-b2b' ) );
		}

		if ( 'yes' === $options['rrb2b_reg_form_last_name_req'] && isset( $data['billing_last_name'] ) && empty( $data['billing_last_name'] ) ) {
			$validation_errors->add( 'billing_last_name_error', __( '<strong>Error</strong>: Last name is required!', 'woo-roles-rules-b2b' ) );
		}

		if ( 'yes' === $options['rrb2b_reg_form_company_req'] && isset( $data['billing_company'] ) && empty( $data['billing_company'] ) ) {
			$validation_errors->add( 'billing_company_error', __( '<strong>Error</strong>: Company is required!', 'woo-roles-rules-b2b' ) );
		}

		if ( 'yes' === $options['rrb2b_reg_form_phone_req'] && isset( $data['billing_phone'] ) && empty( $data['billing_phone'] ) ) {
			$validation_errors->add( 'billing_phone_error', __( '<strong>Error</strong>: Phone is required!', 'woo-roles-rules-b2b' ) );
		}

	}

	/**
	 * Save registration form data
	 */
	public function rrb2b_save_registration_form( $customer_id, $data ) {

		$logger  = $this->logger;
		$context = $this->context;

		if ( isset( $data['billing_first_name'] ) ) {
			update_user_meta( $customer_id, 'first_name', sanitize_text_field( $data['billing_first_name'] ) );
			update_user_meta( $customer_id, 'billing_first_name', sanitize_text_field( $data['billing_first_name'] ) );
		}

		if ( isset( $data['billing_last_name'] ) ) {
			update_user_meta( $customer_id, 'last_name', sanitize_text_field( $data['billing_last_name'] ) );
			update_user_meta( $customer_id, 'billing_last_name', sanitize_text_field( $data['billing_last_name'] ) );
		}

		if ( isset( $data['billing_company'] ) ) {
			update_user_meta( $customer_id, 'billing_company', sanitize_text_field( $data['billing_company'] ) );
		}

		if ( isset( $data['billing_phone'] ) ) {
			update_user_meta( $customer_id, 'billing_phone', sanitize_text_field( $data['billing_phone'] ) );
		}

		if ( isset( $data['billing_address_1'] ) ) {
			update_user_meta( $customer_id, 'billing_address_1', sanitize_text_field( $data['billing_address_1'] ) );
		}

		if ( isset( $data['billing_address_2'] ) ) {
			update_user_meta( $customer_id, 'billing_address_2', sanitize_text_field( $data['billing_address_2'] ) );
		}

		if ( isset( $data['billing_city'] ) ) {
			update_user_meta( $customer_id, 'billing_city', sanitize_text_field( $data['billing_city'] ) );
		}

		if ( isset( $data['billing_postcode'] ) ) {
			update_user_meta( $customer_id, 'billing_postcode', sanitize_text_field( $data['billing_postcode'] ) );
		}

		if ( isset( $data['billing_country'] ) ) {
			update_user_meta( $customer_id, 'billing_country', sanitize_text_field( $data['billing_country'] ) );
		}

		if ( isset( $data['billing_state'] ) ) {
			update_user_meta( $customer_id, 'billing_state', sanitize_text_field( $data['billing_state'] ) );
		}

		if ( isset( $data['requested_role'] ) ) {
			
			$user = get_user_by( 'id', $customer_id );
			if ( $user ) {
				$user->set_role( $data['requested_role'] );
			} else {
				$logger->error( 'User creation failed, ID not found.', $context );
			}
			
		}

		if ( isset( $data['rrb2b_reg_message'] ) ) {
			update_user_meta( $customer_id, 'rrb2b_reg_message', gmdate( 'Y-m-d h:i:s' ) . ': ' . sanitize_text_field( $data['rrb2b_reg_message'] ) );
		}
	
	}

}

