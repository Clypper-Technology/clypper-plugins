<?php
	/**
	 * Toggle
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	function clypper_tax_output() {

        $label_incl = get_option('wc_clypper_tax_included_label');
        $label_excl = get_option('wc_clypper_tax_excluded_label');
        $popup = filter_var(get_option('wc_clypper_popup_enabled'), FILTER_VALIDATE_BOOL);

		?>

        <div class="toggle-button-wrapper">
            <span class="tax-button active-tax-button"><?php echo $label_excl ?></span>
            <span class="tax-button"><?php echo $label_incl ?></span>
        </div>

		<?php

        if($popup) {
	        include __DIR__ . '/popup.php';
        }
	}

	/**
	 * Shortcode.
	 */
	function clypper_tax_shortcode() {
		clypper_tax_output();
	}
	add_shortcode( 'clypper-tax', 'clypper_tax_shortcode' );
