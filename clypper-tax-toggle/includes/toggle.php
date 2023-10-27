<?php
	/**
	 * Toggle
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	/**
	 * Output Function
	 */
	function clypper_tax_output() {
		?>

        <div class="toggle-button-wrapper">
            <span class="tax-button active-tax-button">Ekskl. moms</span>
            <span class="tax-button">Inkl. moms</span>
        </div>

        <div class="business-toggle-wrapper-background"></div>
        <div class="business-toggle-wrapper">
            <h2>Privat eller erhverv</h2>
            <h3 style="font-weight: 400;">Se priser med eller uden moms</h3>
            <div class="vat-button-wrapper">
                <button class="button private">Privat</button>
                <button class="button business">Erhverv</button>
            </div>
        </div>

		<?php
	}

	/**
	 * Shortcode.
	 */
	function clypper_tax_shortcode() {
		clypper_tax_output();
	}
	add_shortcode( 'clypper-tax', 'clypper_tax_shortcode' );
