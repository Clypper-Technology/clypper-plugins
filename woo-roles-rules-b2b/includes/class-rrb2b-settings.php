<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;

/**
 * Settings for API.
 */
if ( class_exists( 'WC_Settings_Rrb2b', false ) ) {
	return new WC_Settings_Rrb2b();
}

/**
 * WC_Settings_Rrb2b class
 */
class WC_Settings_Rrb2b extends WC_Settings_Page {

	/**
	 * Constructor.
	 */
	public function __construct() {
		
		$this->id    = 'rrb2b';
		$this->label = __( 'Roles & Rules B2B', 'woo-roles-rules-b2b' );

		parent::__construct();

		register_setting( 'rrb2b_options_group', 'rrb2b_options_settings' );

	}

	/**
	 * Settings array
	 *
	 * @return array
	 */
	public function get_settings( $section = '' ) {

		global $current_section;
		$section  = $current_section;
		$settings = array();

		if ( '' === $section ) {

			$settings = array(
				
				array(
					'name' => __( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ),
					'type' => 'title',
					'desc' => __( 'The following options are used to configure Roles & Rules B2B', 'woo-roles-rules-b2b' ),
					'id'   => 'rrb2b_settings',
				),

				array(
					'name'     => __( 'Private store', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Hides prices and add to cart button for not logged in users (Guest user role must not be active)', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_hide_prices]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Private store: Not logged in price text', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set text like: Login for price', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_hide_price_text]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Hide retail price', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Hides retail price, show only B2B price for logged in user', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_hide_retail_price]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Hide variable retail price: from - to', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Hides variable retail price: from - to, show only calculated B2B price', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_hide_variable_price]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Text before variable B2B price', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set text before variable price like: From', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_variable_price_text]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Text after Retail price', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set text like: Retail price', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_retail_price_text]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Text after B2B price', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Display suffix like: inc. VAT (if net prices - use text after net prices)', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_b2b_price_text]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Show reduction in %', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Show the reduction in %', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_b2b_show_discount]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Text before reduction %', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set text like: You save %', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_b2b_discount_text]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Set reduction text after %', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Will show like this: % reduction', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_b2b_discount_text_after]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Coupon label', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'In cart totals, default: Extra discount', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_b2b_coupon_text]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Roles with net prices (ex.VAT)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Select roles to use net prices (ex.VAT) - overrides WooCommerce tax settings', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_net_price_b2b_list]',
					'type'     => 'multiselect',
					'options'  => self::get_roles_list(),
					'class'    => 'cas-multiselect',
				),

				array(
					'name'     => __( 'Text after net prices (ex.VAT)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Display suffix like: ex. VAT (overrides text after B2B prices)', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_b2b_ex_vat_price_text]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Roles with tax exempt', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Select roles to use tax exempt. Orders done by roles with tax exempt are executed without taxes (otherwise taxes will be added to orders)', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_tax_exempt_list]',
					'type'     => 'multiselect',
					'options'  => self::get_roles_list(),
					'class'    => 'cas-multiselect',
				),

				array(
					'name'     => __( 'Force Variation Price', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'If another plugin is affecting WooCommerce prices (e.g., dynamic pricing or membership discounts), enabling this option will bypass filters and use variation base prices instead.', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_force_b2b_variable_price]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'Use Dark Mode (style)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Check to enable Dark Mode style for Roles & Rules B2B', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_use_dark_mode]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				
				array(
					'type' => 'sectionend',
					'id'   => 'rrb2b_gen_settings',
				),
			);

		} elseif ( 'msg' === $section ) {
			
			$settings = array(
				
				array(
					'name' => __( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ),
					'type' => 'title',
					'desc' => __( 'The following options are used to configure Roles & Rules B2B. Use percent sign and s where you like the discount value.', 'woo-roles-rules-b2b' ),
					'id'   => 'rrb2b_settings',
				),

				array(
					'name'        => __( 'Dynamic price label', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Buy X or more - will be used as default', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_label_start]',
					'placeholder' => 'Buy %s or more',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),

				array(
					'name'        => __( 'Dynamic price label (%)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'get X%% discount - will be added to Buy X or more', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_percent]',
					'placeholder' => 'get %s%% discount',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),

				array(
					'name'        => __( 'Dynamic price label (fixed)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'get $10 discount - will be added to Buy X or more', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_fixed]',
					'placeholder' => 'get %s discount',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),

				array(
					'name'        => __( 'Dynamic price label (fixed price)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'for $10 - will be added to Buy X or more', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_fixed_price]',
					'placeholder' => 'for %s',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),

				array(
					'name'        => __( 'Font size', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Font size i.e 10px, uses H5 html tag, style using CSS class: rrb2b_qty_discount', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_font_size]',
					'type'        => 'number',
					'css'         => 'min-width:100px;',
				),

				array(
					'name'        => __( 'Font color', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Font color - use web colors or style CSS class: rrb2b_qty_discount', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_font_color]',
					'placeholder' => 'i.e black or click to select',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
					'class'       => 'colorpick',
				),

				array(
					'name'        => __( 'Background color', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Background color - default none, use web colors or style CSS class: rrb2b_qty_discount', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_bg_color]',
					'placeholder' => 'i.e black or click to select',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
					'class'       => 'colorpick',
				),

				array(
					'name'        => __( 'Padding', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Padding around the message, e.g., 10px 20px 10px 20px', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_padding]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
					'placeholder' => 'e.g., 10px 20px',
				),
				
				array(
					'name'        => __( 'Border', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Border around the message, e.g., 1px solid black', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_border]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
					'placeholder' => 'e.g., 1px solid black',
				),
				
				array(
					'name'        => __( 'Border Radius', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Border radius to round the corners, e.g., 10px', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_border_radius]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
					'placeholder' => 'e.g., 10px',
				),
				
				array(
					'name'        => __( 'Font family', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Font family for the message text, e.g., Arial, sans-serif', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_font_family]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
					'placeholder' => 'e.g., Arial, sans-serif',
				),
				
				array(
					'name'        => __( 'Font weight', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Font weight for the message text, e.g., 400 for normal, 700 for bold', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_font_weight]',
					'type'        => 'number',
					'css'         => 'min-width:100px;',
				),

				array(
					'name'        => __( 'Font Transform', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Transform to uppercase, lowercase or capitalize', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_b2b_msg_font_transform]',
					'type'        => 'select',
					'css'         => 'min-width:200px;',
					'placeholder' => 'e.g., Arial, sans-serif',
					'options' => array(
						'none'       => __( 'None', 'woo-roles-rules-b2b' ),
						'uppercase'  => __( 'Uppercase', 'woo-roles-rules-b2b' ),
						'lowercase'  => __( 'Lowercase', 'woo-roles-rules-b2b' ),
						'capitalize' => __( 'Capitalize', 'woo-roles-rules-b2b' ),
					),
				),

				array(
					'name'     => __( 'Disable dynamic price labels', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'If dynamic prices is not in use, you can disable this for minor performance increase', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_hide_dynamic_labels]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'type' => 'sectionend',
					'id'   => 'rrb2b_msg_settings',
				),

			);
		} elseif ( 'reg' === $section ) {
			$settings = array(
				
				array(
					'name' => __( 'Roles & Rules B2B', 'woo-roles-rules-b2b' ),
					'type' => 'title',
					'desc' => __( 'The form is shown on My account page. In WooCommerce > Settings > Accounts & Privacy enable Allow customers to create an account... for this to work.', 'woo-roles-rules-b2b' ),
					'id'   => 'rrb2b_settings',
				),
			
				array(
					'name'     => __( 'Prevent automatic login on registration', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'If on, new customers will need to verify by e.mail before login', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_auth_new_customer]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),

				array(
					'name'     => __( 'First name', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_roles_first_name]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'First name (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_first_name]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				array(
					'name'     => __( 'First name (required)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set as required field', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_roles_first_name_req]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Last name', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_last_name]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Last name (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_last_name]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				array(
					'name'     => __( 'Last name (required)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set as required field', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_last_name_req]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Phone', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_phone]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Phone (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_phone]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				array(
					'name'     => __( 'Phone (required)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set as required field', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_phone_req]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Company', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_company]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Company (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_company]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				array(
					'name'     => __( 'Company (required)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Set as required field', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_company_req]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Email (required)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Default field (can not be removed)', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_email_req]',
					'type'     => 'checkbox',
					'class'    => 'rrb2b-collapsible',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Email (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_email]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Address line 1', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_address_1]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Address line 1 (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_address1]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Address line 2', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_address_2]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Address line 2 (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_address2]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'City', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_city]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'City (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_city]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Postcode / ZIP', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_postcode]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Postcode / ZIP (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_postcode]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				
				array(
					'name'     => __( 'Country / Region', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_country]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'Country / Region (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_country]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),

				array(
					'name'     => __( 'State / County', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_state]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'        => __( 'State / County (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_state]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				
				array(
					'name'        => __( 'User roles (label)', 'woo-roles-rules-b2b' ),
					'desc_tip'    => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'          => 'rrb2b_options[rrb2b_reg_lbl_usr_roles]',
					'type'        => 'text',
					'css'         => 'min-width:200px;',
				),
				array(
					'name'     => __( 'User roles', 'woo-bulk-table-editor' ),
					'desc_tip' => __( 'Select roles that user can request (no roles = hidden)', 'woo-bulk-table-editor' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_roles]',
					'type'     => 'multiselect',
					'options'  => self::get_roles_list(),
					'class'    => 'cas-multiselect',
				),

				array(
					'name'     => __( 'Customer message (text area)', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_form_message]',
					'type'     => 'checkbox',
					'css'      => 'min-width:200px;',
				),
				array(
					'name'     => __( 'Customer message (label)', 'woo-roles-rules-b2b' ),
					'desc_tip' => __( 'Label for the field in the form', 'woo-roles-rules-b2b' ),
					'id'       => 'rrb2b_options[rrb2b_reg_lbl_message]',
					'type'     => 'text',
					'css'      => 'min-width:200px;',
				),

				array(
					'type' => 'sectionend',
					'id'   => 'rrb2b_reg_settings',
				),
			);
		}

		return apply_filters( 'wc_' . $this->id . '_settings', $settings );
	}

	/**
	 * Get roles - key and name
	 * 
	 * @return array
	 */
	public static function get_roles_list() {
		
		$wp_roles  = wp_roles();
		$roles_arr = array();

		foreach ( $wp_roles->roles as $key => $value ) {
			$roles_arr[$key] = translate_user_role( strval( $value['name'] ) );
		}
		
		return $roles_arr;
	}

	/**
	 * Get sections
	 *
	 * @return array
	 */
	public function get_sections() {

		$sections = array(
			''    => __( 'General', 'woo-roles-rules-b2b' ),
			'msg' => __( 'Dynamic Price Labels', 'woo-roles-rules-b2b' ),
			'reg' => __( 'Registration Form', 'woo-roles-rules-b2b' ),
		);

		/**
		 * Filter to add id and sections
		 * 
		 * @since 2.3.1
		 */
		return apply_filters( 'woocommerce_get_sections_' . $this->id, $sections ); // phpcs:ignore WordPress.NamingConventions.ValidHookName.UseUnderscores
		
	}

	/**
	 * Output the settings
	 *
	 */
	public function output() {

		global $current_section;
		
		$settings = $this->get_settings( $current_section );
		WC_Admin_Settings::output_fields( $settings );
		//echo esc_attr( $this->js_scripts() );
		$this->js_scripts();
	}

	/**
	 * Output JS scripts
	 */
	public function js_scripts() {
		?>
		<script>
		var $ = jQuery;
		jQuery(document).ready(function ( $ ) {
			$('.rrb2b-collapsible').prop('checked',true).attr('readonly','readonly');
			
			// Initialize Select2 on the specific multiselect field
			$('.cas-multiselect').select2({
				allowClear: true,
				width: '300px'
			});
		});
		</script>
		<?php
	}

	/**
	 * Save settings
	 * 
	*/
	public function save() {

		$this->save_settings_for_current_section();
		$this->do_update_options_action();
	}

}
return new WC_Settings_Rrb2b();

