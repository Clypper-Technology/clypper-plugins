/**
 * WooCommerce Tax Toggle
 *
 * @package WordPress
 * @subpackage wc-tax
 * @since 1.2.4
 */

jQuery(window).on("load", function() {

	// Function declarations
	function toggleVatPopup() {
		jQuery('.business-toggle-wrapper, .business-toggle-wrapper-background').slideToggle(200);
	}

	function updateElementState() {
		jQuery('.tax-button').toggleClass('active-tax-button');
	}

	function toggleTaxDisplay() {
		const taxElementsStates = {
			true: { show: ".product-tax-on, .cart-contents .product-tax-on", hide: ".product-tax-off, .cart-contents .product-tax-off" },
			false: { show: ".product-tax-off, .cart-contents .product-tax-off", hide: ".product-tax-on, .cart-contents .product-tax-on" }
		};
		const currentState = taxElementsStates[showTax];
		jQuery(currentState.show).show();
		jQuery(currentState.hide).hide();
		Cookies.set('woocommerce_show_tax', showTax, { expires: 7, path: '/' });
	}

	function setTaxOnVariationPrice() {
		if (!showTax) return;
		let display = jQuery(".single_variation span.price .product-tax-on").css("display");
		if (display === "none") {
			jQuery(".single_variation span.price .product-tax-off").hide();
			jQuery(".single_variation span.price .product-tax-on").css("display", "inline");
		}
	}

	function wooTaxThemeFragmentUpdate() {
		jQuery(document.body).trigger('wc_fragment_refresh');
	}

	// Main logic
	let cookieValue = Cookies.get('woocommerce_show_tax');
	let showTax;

	if (cookieValue === undefined) {
		toggleVatPopup();
		jQuery('.business-toggle-wrapper-background').on('click', function() {
			toggleVatPopup();
			showTax = true;
			toggleTaxDisplay();
			updateElementState();
		});

		jQuery('.business').on('click', function() {
			toggleVatPopup();
			showTax = false;
			toggleTaxDisplay();
		});

		jQuery('.private').on('click', function() {
			toggleVatPopup();
			showTax = true;
			toggleTaxDisplay();
			updateElementState();
		});
	} else {
		showTax = (cookieValue === 'true');
		toggleTaxDisplay();
		if (showTax) updateElementState();
	}

	jQuery('.toggle-button-wrapper').on('click', function() {
		showTax = !showTax;
		toggleTaxDisplay();
		updateElementState();
	});

	jQuery('.variations_form').on('show_variation', setTaxOnVariationPrice);
	jQuery('body').on('wc_fragments_loaded wc_fragments_refreshed', toggleTaxDisplay);
});