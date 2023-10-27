<?php

	/**
	 * Options
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	add_action('init', 'register_my_filters');
	function register_my_filters() {
		add_filter('woocommerce_settings_tabs_array', 'clypper_add_settings_tab', 50);
		add_action('woocommerce_settings_tabs_clypper_tax', 'clypper_settings_tab');
		add_action('woocommerce_update_options_clypper_tax', 'clypper_update_settings');
	}

    // Add a new section to the WooCommerce settings tabs.
	function clypper_add_settings_tab($settings_tabs) {
		$settings_tabs['clypper_tax'] = __('Clypper Tax', 'clypper-tax');
		error_log("Adding Clypper Tax settings tab.");
		return $settings_tabs;
	}

    // Define the settings to be displayed in the new tab.

	function clypper_settings_tab() {
		woocommerce_admin_fields(clypper_get_settings());
	}

    // Save the settings from our new tab.
	function clypper_update_settings() {
		woocommerce_update_options(clypper_get_settings());
	}

    // Define the actual settings fields.
	function clypper_get_settings() {
		return array(
			'section_title' => array(
				'name'     => __('Clypper Tax Settings', 'clypper-tax'),
				'type'     => 'title',
				'desc'     => '',
				'id'       => 'wc_clypper_tax_section_title'
			),
			'tax_included_label' => array(
				'name' => __('Tax Included Label', 'clypper-tax'),
				'type' => 'text',
				'desc' => __('Label to display when tax is included.', 'clypper-tax'),
				'id'   => 'wc_clypper_tax_included_label',
				'default' => 'incl. vat'
			),
			'tax_excluded_label' => array(
				'name' => __('Tax Excluded Label', 'clypper-tax'),
				'type' => 'text',
				'desc' => __('Label to display when tax is excluded.', 'clypper-tax'),
				'id'   => 'wc_clypper_tax_excluded_label',
				'default' => 'excl. vat'
			),
			'section_end' => array(
				'type' => 'sectionend',
				'id'   => 'wc_clypper_tax_section_end'
			)
		);
	}
