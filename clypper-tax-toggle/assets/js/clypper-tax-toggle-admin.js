jQuery(document).ready(function($) {
    // Function to toggle the visibility of the popup settings
    function togglePopupSettings() {
        // Check if the checkbox is checked
        if ($('#wc_clypper_popup_enabled').is(':checked')) {
            // Show the popup settings
            $('#wc_clypper_popup_header').closest('tr').show();
            $('#wc_clypper_popup_text').closest('tr').show();
            $('#wc_clypper_no_vat_button_text').closest('tr').show();
            $('#wc_clypper_vat_button_text').closest('tr').show();

            // Show color settings
            $('#wc_clypper_popup_background_color').closest('tr').show();
            $('#wc_clypper_with_tax_button_color').closest('tr').show();
            $('#wc_clypper_with_tax_button_text_color').closest('tr').show();
            $('#wc_clypper_without_tax_button_color').closest('tr').show();
            $('#wc_clypper_without_tax_button_text_color').closest('tr').show();
        } else {
            // Hide the popup settings
            $('#wc_clypper_popup_header').closest('tr').hide();
            $('#wc_clypper_popup_text').closest('tr').hide();
            $('#wc_clypper_no_vat_button_text').closest('tr').hide();
            $('#wc_clypper_vat_button_text').closest('tr').hide();

            // Hide color settings
            $('#wc_clypper_popup_background_color').closest('tr').hide();
            $('#wc_clypper_with_tax_button_color').closest('tr').hide();
            $('#wc_clypper_with_tax_button_text_color').closest('tr').hide();
            $('#wc_clypper_without_tax_button_color').closest('tr').hide();
            $('#wc_clypper_without_tax_button_text_color').closest('tr').hide();
        }
    }

    // Run the toggle function on page load
    togglePopupSettings();

    // Bind the toggle function to the checkbox change event
    $('#wc_clypper_popup_enabled').change(function() {
        togglePopupSettings();
    });
});
