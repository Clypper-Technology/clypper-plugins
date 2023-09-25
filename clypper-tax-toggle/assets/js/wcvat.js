/**
 * WooCommerce Tax Toggle
 *
 * @package WordPress
 * @subpackage wc-tax
 * @since 1.2.4
 */

jQuery( window ).on(
	"load",
	function($){
		// Code here will be executed on document ready. Use $ as normal.

		jQuery(
			function ($) {

				let showTaxVar;

				jQuery('.business-toggle-wrapper-background').on('click', function() {
					jQuery('.business-toggle-wrapper').slideToggle(200);
					jQuery('.business-toggle-wrapper-background').fadeOut(300);
					showTaxVar = true;
					jQuery('.tax-button').toggleClass('active-tax-button');
					showTax();
					Cookies.set( 'woocommerce_show_tax', showTaxVar, { expires: 7, path: '/' } );
				})

				jQuery('.business').on('click', function() {
					showTaxVar = false;
					showTax();
					jQuery('.business-toggle-wrapper').slideToggle(300);
					jQuery('.business-toggle-wrapper-background').fadeOut(200);
					Cookies.set( 'woocommerce_show_tax', showTaxVar, { expires: 7, path: '/' } );
				})

				jQuery('.private').on('click', function() {
					showTaxVar = true;
					showTax();
					jQuery('.business-toggle-wrapper').slideToggle(300);
					jQuery('.business-toggle-wrapper-background').fadeOut(200);
					jQuery('.tax-button').toggleClass('active-tax-button');
					Cookies.set( 'woocommerce_show_tax', showTaxVar, { expires: 7, path: '/' } );
				})

				// Product Specific.
				jQuery('.toggle-button-wrapper').on(
					'click',
					function(event){
						showTaxVar = ! showTaxVar;
						// set cookie.
						Cookies.set( 'woocommerce_show_tax', showTaxVar, { expires: 7, path: '/' } );

						jQuery('.tax-button').toggleClass('active-tax-button');

						showTax();
					}
				);

				// if no cookie is set.
				if ( Cookies.get( 'woocommerce_show_tax' ) === 'undefined' ||
					Cookies.get( 'woocommerce_show_tax' ) === undefined ||
					Cookies.get( 'woocommerce_show_tax' ) === null ) {

					jQuery('.business-toggle-wrapper').slideToggle(300);
					jQuery('.business-toggle-wrapper-background').fadeIn(200);


				} else {
					// cookie is already set.
					showTaxVar = Cookies.get( 'woocommerce_show_tax' );

					if(showTaxVar ==='true') {
						jQuery('.tax-button').toggleClass('active-tax-button');
					}
				}

				// Convert string into Boolean.
				showTaxVar === 'true' ? showTaxVar = true : showTaxVar = false;

				// Highlight Button if Show is true.
				//showTaxVar === true ? $( "#wcvat-toggle.wcvat-toggle-product" ).toggleClass( "on" ) : $( "#wcvat-toggle.wcvat-toggle-product" ).toggleClass( "" );

				showTax();

				function showTax() {

					if (showTaxVar === true) {
						// products.
						$( ".product-tax-on" ).show();
						$( ".product-tax-off" ).hide();
						$( '.cart-contents .product-tax-on' ).show();
						$( '.cart-contents .product-tax-off' ).hide();

					} else {
						// products.
						$( ".product-tax-on" ).hide();
						$( ".product-tax-off" ).show();
						$( '.cart-contents .product-tax-on' ).hide();
						$( '.cart-contents .product-tax-off' ).show();

					}
				}

				// Fired on any cart interaction.
				$( 'body' ).on(
					'wc_fragments_loaded wc_fragments_refreshed',
					function() {
						setTimeout(
							function(){
								$( 'ul.currency_switcher li a.active' ).trigger( 'click' );
							},
							0
						);
						wooTaxUpdateCart();
					}
				);

				function wooTaxUpdateCart() {
					// Just for Cart Contents in Header.
					if ( showTaxVar === true ) {
						$( '.cart-contents .product-tax-on' ).show();
						$( '.cart-contents .product-tax-off' ).hide();
					} else {
						$( '.cart-contents .product-tax-on' ).hide();
						$( '.cart-contents .product-tax-off' ).show();
					}
				}

				// Wait for Ajax.
				$( document ).ajaxComplete(
					function() {
						if (showTaxVar === true) {
							showTax();
							$( '.cart_totals  .tax-rate' ).show();
							$( '.cart_totals  .tax-total' ).show();
							$( '.cart_totals  .order-total' ).show();
						}
					}
				);

				// Hook to the show_variation trigger and append the tax to the price right after the price is appended and displayed.
				$( '.variations_form' ).on(
					'show_variation',
					function( matching_variations ) {
						setTimeout(
							function() {
								setTaxOnVariationPrice();
							} ,
							0
						);
					}
				);

				/*
				* Append the Tax excl/incl only for the variations price.
				* The Variations price is removed and added for every selection, so this check needs to be done.
				*/
				function setTaxOnVariationPrice() {
					display = $( ".single_variation span.price .product-tax-on" ).css( "display" );
					if ( showTaxVar === true ) {
						if ( display === "none" ) {
							$( ".single_variation span.price .product-tax-off" ).css( "display","none" );
							$( ".single_variation span.price .product-tax-on" ).css( "display","inline" );
						}
					}
				}

				// Currency Switcher.
				$( '.currency_switcher a' ).on(
					'click',
					function() {
						setTimeout(
							function(){
							},
							0
						);
					}
				);

				/**
				 * Trigger fragment refresh.
				 */
				function wooTaxThemeFragmentUpdate(){
					$( document.body ).trigger( 'wc_fragment_refresh' );
				}

				// END.
			}
		);

	}
);
