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
            // New Section Title for Color Settings
            'section_color_settings' => array(
                'name' => __('Toggle styling', 'clypper-tax'),
                'type' => 'title',
                'desc' => __('Customize the look of the tax toggle', 'clypper-tax'),
                'id'   => 'wc_clypper_color_settings'
            ),
            // Color Settings for Toggle background
            'toggle_wrapper_background_color' => array(
                'name' => __('Toggle background color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the bagground color for the tax toggle.', 'clypper-tax'),
                'id'   => 'wc_clypper_toggle_background_color',
                'default' => '#000' // Default color
            ),
            // Color Settings for Active toggle element
            'active_element_color' => array(
                'name' => __('Active toggle element color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the color for the active toggle element.', 'clypper-tax'),
                'id'   => 'wc_clypper_active_element_color',
                'default' => '#4a4b4a' // Default color
            ),

            // Color Settings for text
            'toggle_text_color' => array(
                'name' => __('Toggle text color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the color of the text in the tax toggle.', 'clypper-tax'),
                'id'   => 'wc_clypper_toggle_text_color',
                'default' => '#fff' // Default color
            ),

            // End of Color Settings Section
            'section_end_color_settings' => array(
                'type' => 'sectionend',
                'id'   => 'wc_clypper_color_settings_end'
            ),

			// Section Title for Label Settings
			'section_labels' => array(
				'name'     => __('Label Settings', 'clypper-tax'),
				'type'     => 'title',
				'desc'     => __('Customize the labels for tax display on products.', 'clypper-tax'),
				'id'       => 'wc_clypper_tax_labels'
			),
			// Settings for Label Section
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

			'tax_suffixes_in_cart' => array(
				'name' => __('Show Tax Suffixes in Cart', 'clypper-tax'),
				'type' => 'checkbox',
				'desc' => __('Check this box to show tax suffixes (e.g., "incl. VAT", "excl. VAT") next to prices and subtotal in the cart.', 'clypper-tax'),
				'id'   => 'wc_clypper_tax_suffixes_in_cart',
				'default' => 'false'
			),
			// End of Label Settings Section
			'section_end_labels' => array(
				'type' => 'sectionend',
				'id'   => 'wc_clypper_tax_labels_end'
			),
			// Section Title for Variable Product Settings
			'section_variable_product' => array(
				'name'     => __('Variable Product Settings', 'clypper-tax'),
				'type'     => 'title',
				'desc'     => __('Adjust the display settings for variable products.', 'clypper-tax'),
				'id'       => 'wc_clypper_variable_product'
			),
			// Settings for Variable Product Section
			'from_label' => array(
				'name' => __('Variable Price Prefix', 'clypper-tax'),
				'type' => 'text',
				'desc' => __('Prefix for displaying variable product prices (e.g., "From:").', 'clypper-tax'),
				'id'   => 'wc_clypper_from_label',
				'default' => 'From'
			),
			// End of Variable Product Settings Section
			'section_end_variable_product' => array(
				'type' => 'sectionend',
				'id'   => 'wc_clypper_variable_product_end'
			),
			// Section Title for Popup Settings
			'section_popup' => array(
				'name'     => __('Popup Settings', 'clypper-tax'),
				'type'     => 'title',
				'desc'     => __('Manage the settings for the tax selection popup window.', 'clypper-tax'),
				'id'       => 'wc_clypper_popup'
			),
			// Settings for Popup Section
			'popup' => array(
				'name' => __('Enable Popup', 'clypper-tax'),
				'type' => 'checkbox',
				'desc' => __('Enable a popup prompting the user to select a tax preference when required.', 'clypper-tax'),
				'id'   => 'wc_clypper_popup_enabled',
				'default' => 'true'
			),

            // Color Settings for popup background
            'popup_background_color' => array(
                'name' => __('Popup background color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the bagground color for the popup.', 'clypper-tax'),
                'id'   => 'wc_clypper_popup_background_color',
                'default' => '#fff' // Default color
            ),

            // Color Settings for with tax button
            'with_tax_button_color' => array(
                'name' => __('With tax button color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the color for the with tax button.', 'clypper-tax'),
                'id'   => 'wc_clypper_with_tax_button_color',
                'default' => '#4a4b4a' // Default color
            ),
            // Color Settings for text
            'with_tax_button_text_color' => array(
                'name' => __('With tax button text color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the color of with tax button text color.', 'clypper-tax'),
                'id'   => 'wc_clypper_with_tax_button_text_color',
                'default' => '#fff' // Default color
            ),

            // Color Settings for without tax button
            'without_tax_button_color' => array(
                'name' => __('Without tax button color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the color for the without tax button.', 'clypper-tax'),
                'id'   => 'wc_clypper_without_tax_button_color',
                'default' => '#fff' // Default color
            ),

            // Color Settings for without tax button text
            'without_tax_button_text_color' => array(
                'name' => __('Without tax button text color', 'clypper-tax'),
                'type' => 'color',
                'desc' => __('Select the color of the without tax button text color.', 'clypper-tax'),
                'id'   => 'wc_clypper_without_tax_button_text_color',
                'default' => '#000' // Default color
            ),

			'popup_header' => array(
				'name' => __('Popup Header', 'clypper-tax'),
				'type' => 'text',
				'desc' => __('The header text for the tax selection popup.', 'clypper-tax'),
				'id'   => 'wc_clypper_popup_header',
				'default' => 'Tax Preference'
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
			// End of Popup Settings Section
			'section_end_popup' => array(
				'type' => 'sectionend',
				'id'   => 'wc_clypper_popup_end'
			),
		);
	}

