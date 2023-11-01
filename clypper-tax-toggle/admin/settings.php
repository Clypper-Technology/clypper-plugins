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
        // Label Settings
        'section_labels' => array(
            'name'     => __('Label Settings', 'clypper-tax'),
            'type'     => 'title',
            'desc'     => __('Customize the labels for tax display on products.', 'clypper-tax'),
            'id'       => 'wc_clypper_tax_labels'
        ),
        'tax_included_label' => array(
            'name' => __('Tax Included Label', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('The text displayed next to prices when tax is included (e.g., "incl. VAT").', 'clypper-tax'),
            'id'   => 'wc_clypper_tax_included_label',
            'default' => 'incl. VAT'
        ),
        'tax_excluded_label' => array(
            'name' => __('Tax Excluded Label', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('The text displayed next to prices when tax is not included (e.g., "excl. VAT").', 'clypper-tax'),
            'id'   => 'wc_clypper_tax_excluded_label',
            'default' => 'excl. VAT'
        ),
        'tax_zero_label' => array(
            'name' => __('Zero Tax Label', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('Text to show for products exempt from tax.', 'clypper-tax'),
            'id'   => 'wc_clypper_tax_zero_label',
            'default' => 'No VAT'
        ),

        'from_label' => array(
            'name' => __('Variable Price Prefix', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('Prefix for displaying variable product prices (e.g., "From:").', 'clypper-tax'),
            'id'   => 'wc_clypper_from_label',
            'default' => 'From'
        ),
        // Variable Product Settings
        'section_variable_product' => array(
            'name'     => __('Variable Product Settings', 'clypper-tax'),
            'type'     => 'title',
            'desc'     => __('Adjust the display settings for variable products.', 'clypper-tax'),
            'id'       => 'wc_clypper_variable_product'
        ),

        'popup' => array(
            'name' => __('Enable Popup', 'clypper-tax'),
            'type' => 'checkbox',
            'desc' => __('Enable a popup prompting the user to select a tax preference when required.', 'clypper-tax'),
            'id'   => 'wc_clypper_popup_enabled',
            'default' => 'yes'
        ),
        'popup_header' => array(
            'name' => __('Popup Header', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('The header text for the tax selection popup.', 'clypper-tax'),
            'id'   => 'wc_clypper_popup_header',
            'default' => 'Select Tax Preference'
        ),
        'popup_text' => array(
            'name' => __('Popup Description', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('Additional text to explain the choice in the tax selection popup.', 'clypper-tax'),
            'id'   => 'wc_clypper_popup_text',
            'default' => 'Choose whether prices are shown with or without tax.'
        ),
        'No_vat_button_text' => array(
            'name' => __('Business Button Text', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('Text for the button used by business customers to indicate no tax is to be added.', 'clypper-tax'),
            'id'   => 'wc_clypper_no_vat_button_text',
            'default' => 'Business (No VAT)'
        ),
        'Vat_button_text' => array(
            'name' => __('Private Button Text', 'clypper-tax'),
            'type' => 'text',
            'desc' => __('Text for the button used by private customers to include tax in prices.', 'clypper-tax'),
            'id'   => 'wc_clypper_vat_button_text',
            'default' => 'Private (VAT Included)'
        ),
        // Popup Settings
        'section_popup' => array(
            'name'     => __('Popup Settings', 'clypper-tax'),
            'type'     => 'title',
            'desc'     => __('Manage the settings for the tax selection popup window.', 'clypper-tax'),
            'id'       => 'wc_clypper_popup'
        ),

        // End of Sections
        'section_end' => array(
            'type' => 'sectionend',
            'id'   => 'wc_clypper_tax_section_end'
        )
    );
}
