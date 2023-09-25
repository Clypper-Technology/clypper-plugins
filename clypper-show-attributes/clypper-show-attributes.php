<?php
	/*
	Plugin Name: Clypper Show Attributes
	Description: Show WooCommerce custom product attributes on the Product, Shop and Cart pages, admin Order Details page and emails.
	Version: 1.6.7
	Author: Clypper von H
	License: GPL2
	Text Domain: woocommerce-show-attributes
	Domain Path: languages

	WooCommerce Show Attributes is free software; you can redistribute it and/or modify
	it under the terms of the GNU General Public License, version 2, as
	published by the Free Software Foundation.
	*/
	if ( ! defined( 'ABSPATH' ) ) exit;
	class WooCommerce_Show_Attributes {
		private static $instance = null;
		public static function get_instance() {
			if ( null == self::$instance ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		private function __construct() {
			add_action( 'woocommerce_init', array( $this, 'load_textdomain' ) );
			add_action( 'woocommerce_single_product_summary', array( $this, 'show_atts_on_product_page' ), 25 );
			add_filter( 'woocommerce_product_tabs', array( $this, 'additional_info_tab' ), 98 );
			add_filter( 'woocommerce_cart_item_name', array( $this, 'show_atts_on_cart' ), 10, 3 );
			add_filter( 'woocommerce_get_settings_products', array( $this, 'add_settings' ), 10, 2 );
			add_filter( 'woocommerce_get_sections_products', array( $this, 'add_section' ) );
			add_action( 'woocommerce_init', array( $this, 'if_show_atts_on_shop' ) );
			add_action( 'woocommerce_grouped_product_list_before_price', array( $this, 'show_atts_grouped_product' ) );
			add_action( 'wp_head', array( $this, 'shop_styling'), 98);
		}

		/**
		 * Load plugin's textdomain
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'woocommerce-show-attributes', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		}

		/**
		 * Get the non-variation attributes of a product.
		 *
		 * @param WC_Product_Simple|WC_Product_Variation $product Product instance.
		 * @param mixed $single_product True when on single product page.
		 * @return array Array of attributes, each with label and value.
		 * @since 1.6.4
		 */
		private function get_attributes($product, $single_product): array {
			$out = [];

			foreach ($product->get_attributes() as $attribute) {
				if (!($attribute instanceof WC_Product_Attribute) || !$attribute->get_visible() || empty($attribute->get_options())) {
					continue;
				}
				$name = $attribute->get_name();
				$data = $attribute->is_taxonomy()
					? $this->get_global_taxonomy_attribute_data($name, $product, $single_product)
					: ['label' => $name, 'value' => esc_html(implode(', ', $attribute->get_options()))];
				$out[] = $data;
			}
			return $out;
		}

		/**
		 * Returns the HTML string for the product attributes.
		 * This does not affect nor include attributes which are used for Variations.
		 *
		 * @param WC_Product_Simple|WC_Product_Variation $product Product instance. Default null to avoid errors.
		 * @param string $element HTML element to wrap each attribute with, accepts span or li.
		 * @param boolean $show_weight whether to show the product weight
		 * @param boolean $show_dimensions whether to show the product dimensions
		 * @param boolean $skip_atts whether to skip the attributes and only honor weight and dimensions
		 * @param mixed $single_product true when on single product page
		 */
		public function the_attributes( $product = null, $element, $show_weight = null, $show_dimensions = null, $skip_atts = null, $single_product = null ) {

			$attibutes_list_wrapper = '';
			$attribute_list = '';

			if (!isset($product) || !is_object($product)) {
				return $attibutes_list_wrapper;
			}

			$hide_labels = get_option('woocommerce_show_attributes_hide_labels') === 'yes';
			$span_option = get_option('woocommerce_show_attributes_span') === 'yes';
			$colon = get_option('wcsa_remove_semicolon') === 'yes' ? ' ' : ': ';

			if ($span_option) {
				$element = 'span';
			}

			// Add weight and dimensions if they opted in

			if ($show_weight && $product->has_weight()) {

				$weight = $product->get_weight();
				$unit = esc_attr( get_option( 'woocommerce_weight_unit' ) );

				$unit = empty( $unit ) ? '' : $unit;
				// weight
				$attribute_list .= '<' . esc_attr( $element ) . ' class="show-attributes-weight">';
				// Hide labels if they want to
				if ( $hide_labels != 'yes' ) {
					$attribute_list .= '<span class="attribute-label">' . __( 'Weight', 'woocommerce-show-attributes' ) . $colon . ' </span> ';
				}
				$attribute_list .= '<span class="attribute-value">' . esc_html( $weight ) . ' ' . esc_html( $unit ) . ' </span></' . esc_attr( $element ) . '>';
				if ( 'span' == $element ) {
					$attribute_list .= '<br />';
				}
			}

			if ($show_dimensions && $product->has_dimensions()) {

				$dimensions = wc_format_dimensions( $product->get_dimensions( false ) );
				// dimensions
				$attribute_list .= '<' . esc_attr( $element ) . ' class="show-attributes-dimensions">';
				// Hide labels if they want to
				if ( $hide_labels != 'yes' ) {
					$attribute_list .= '<span class="attribute-label">' . __( 'Dimensions', 'woocommerce-show-attributes' ) . $colon . ' </span> ';
				}
				$attribute_list .= '<span class="attribute-value">' . esc_html( $dimensions ) . '</span></' . esc_attr( $element ) . '>';
				if ('span' == $element) {
					$attribute_list .= '<br />';
				}
			}

			if ( !$skip_atts && !empty($attributes = $this->get_attributes($product, $single_product)) ) {
				foreach ($attributes as $attribute) {

					$class_string = "attribute-list-item";
					$class_label = esc_attr(sanitize_title($attribute['label']));

					if (!$hide_labels) {
						$attribute_label = '<span class="attribute-label"><span class="attribute-label-text">' . esc_html($attribute['label']) . '</span>' . $colon . ' </span> ';
					} else {
						$attribute_label = '';
					}

					$attribute_list .= sprintf('<%s class="%s">%s<span class="attribute-value">%s</span></%s>', esc_attr($element), $class_string, $attribute_label, $attribute['value'], esc_attr($element));

					if ($element === 'span') {
						$attribute_list .= '<br />';
					}
				}
			}


			if ( $attribute_list ) {
				$attibutes_list_wrapper = ('li' == $element) ? '<ul ' : '<span ';
				$attibutes_list_wrapper .= 'class="custom-attributes">' . $attribute_list;
				$attibutes_list_wrapper .= ('li' == $element) ? '</ul>' : '</span>';
			}
			return $attibutes_list_wrapper;
		}

		/**
		 * Get the attribute label and value for a global attribute.
		 *
		 * Global attributes are those which are stored as taxonomies and created on the Products > Attributes page.
		 *
		 * @param string $name Name of the attribute
		 * @param int|WC_Product_Simple|WC_Product_Variation $product Product id or instance.
		 * @param mixed $single_product true when on single product page
		 * @since 1.6.4
		 */
		private function get_global_taxonomy_attribute_data( $name, $product, $single_product ) {
			$out = array();

			$product_id = is_numeric( $product ) ? $product : $product->get_id();
			$terms = wp_get_post_terms( $product_id, $name, 'all' );

			if ( ! empty( $terms ) && ! is_wp_error( $terms ) ) {
				$tax_object = get_taxonomy( $terms[0]->taxonomy );
				$out['label'] = $tax_object->labels->singular_name ?? (isset($tax_object->label) ? substr($tax_object->label, strlen(__('Product', 'woocommerce-show-attributes') . ' ')) : null);

				$tax_terms = array();
				foreach ( $terms as $term ) {
					$single_term = sprintf( __( '%s', 'woocommerce-show-attributes' ), esc_html( $term->name ) );
					if ( $single_product && get_option( 'wcsa_terms_as_links' ) == 'yes' && ! is_wp_error( $term_link = get_term_link( $term ) ) ) {
						$single_term = '<a href="' . esc_url( $term_link ) . '">' . sprintf( __( '%s', 'woocommerce-show-attributes' ), esc_html( $term->name ) ) . '</a>';
					}
					$tax_terms[] = $single_term;
				}
				$out['value'] = implode( ', ', $tax_terms );
			}

			return $out;
		}

		/**
		 * Show product attributes on the product page.
		 *
		 * Show product attributes above the Add to Cart button on the single product page
		 * and on the Parent of Grouped products.
		 */

		public function show_atts_on_product_page() {


			$show_weight = null;

			if ( get_option( 'wcsa_weight_product' ) == 'yes' ) {
				$show_weight = true;
			}

			$show_dimensions = null;
			if ( get_option( 'wcsa_dimensions_product' ) == 'yes' ) {
				$show_dimensions = true;
			}

			// add a flag to skip the attributes.
			// this way i'll know to only honor weight and dimensions
			if ( get_option( 'wcsa_product' ) != 'no') {
				$skip_atts = null;
			} else {
				$skip_atts = true;
			}


			global $product;
			echo wp_kses_post( $this->the_attributes( $product, 'li', $show_weight, $show_dimensions, $skip_atts, true ) );

		}


		/**
		 * Show product attributes on the Cart page.
		 */
		public function show_atts_on_cart( $name, $cart_item, $cart_item_key ) {

			if(get_option('wcsa_visible_cart') != 'yes') {
				return $name;
			}

			$show_weight = get_option( 'wcsa_weight_cart' ) == 'yes';
			$show_dimensions = get_option( 'wcsa_dimensions_cart' ) == 'yes';
			$skip_atts = get_option( 'wcsa_cart' ) != 'no';

			$product = $cart_item['data'];
			return $name . '<br />' . wp_kses_post( $this->the_attributes( $product, 'span', $show_weight, $show_dimensions, $skip_atts ) );
		}

		/**
		 * Show product attributes on the child products of a Grouped Product page.
		 *
		 * @param object, the product object
		 * @since 1.2.4
		 */
		public function show_atts_grouped_product( $product ) {
			$show_weight = null;
			if ( get_option( 'wcsa_weight_product' ) == 'yes' ) {
				$show_weight = true;
			}
			$show_dimensions = null;
			if ( get_option( 'wcsa_dimensions_product' ) == 'yes' ) {
				$show_dimensions = true;
			}
			if ( get_option( 'wcsa_product' ) != 'no') {
				$skip_atts = null;
			} else {
				$skip_atts = true;
			}
			echo '<td class="grouped-product-custom-attributes">' . wp_kses_post( $this->the_attributes( $product, 'span', $show_weight, $show_dimensions, $skip_atts ) ) . '</td>';
		}

		/**
		 * Show the attributes on the main shop page.
		 * @since 1.2.3
		 */
		public function show_atts_on_shop() {
			global $product;


			echo wp_kses_post( $this->the_attributes( $product, 'li' ) );
		}

		/**
		 * Check if option to show attributes on main shop is enabled.
		 * @since 1.2.3
		 */
		public function if_show_atts_on_shop() {

			$show = get_option( 'woocommerce_show_attributes_on_shop' );

			// if option to show on shop page is enabled, do it
			if ( $show == 'above_title') {
				add_action ( 'woocommerce_shop_loop_item_title', array( $this, 'show_atts_on_shop' ), 4 );
			} elseif ( $show == 'above_price' ) {
				add_action ( 'woocommerce_after_shop_loop_item_title', array( $this, 'show_atts_on_shop' ), 4 );
			} elseif ( $show == 'above_add2cart' ) {
				add_action ( 'woocommerce_after_shop_loop_item', array( $this, 'show_atts_on_shop' ), 4 );
			}
		}

		public function shop_styling() {
			?>

            <style>
                .custom-attributes {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-around;
                    background-color: rgba(0,0,0,0.05);
                    color: #000;
                    padding: 3px 8px;
                }
                .attribute-list-item {
                    margin: unset!important;
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                }
                .attribute-value, .attribute-label {
                    margin: unset!important;
                    font-size: 12px;
                }
                .box-text.text-center {
                    padding: 0px 0px 10px 0px!important;
                }

                @media only screen and (max-width: 750px ) {
                    .attribute-value, .attribute-label {
                        font-size: 10px;
                    }
                }
            </style>

			<?php
		}


		/**
		 * Customize the Additional Information tab to NOT show our custom attributes
		 */
		public function additional_info_tab( $tabs ) {
			global $product;

			if ( ! is_object( $product ) ) {
				return $tabs;
			}

			if ( ! $product->has_attributes() ) {
				if ( $product->has_dimensions() || $product->has_weight() ) {
					if ( get_option( 'wcsa_weight_product' ) == 'yes' && get_option( 'wcsa_dimensions_product' ) == 'yes' ) {
						unset( $tabs['additional_information'] );
					} else {
						$tabs['additional_information']['callback'] = 'additional_info_tab_content';
					}
				}
				return $tabs;
			}

			$need_tab = array_map( function( $attribute ) {
				return is_a( $attribute, 'WC_Product_Attribute' ) && $attribute->get_variation() && $attribute->get_visible() ? 1 : '';
			}, $product->get_attributes() );

			if ( ! in_array( 1, $need_tab ) ) {
				if ( ! $product->has_dimensions() && ! $product->has_weight() ) {
					unset( $tabs['additional_information'] );
				} elseif ( get_option( 'wcsa_weight_product' ) == 'yes' && get_option( 'wcsa_dimensions_product' ) == 'yes' ) {
					unset( $tabs['additional_information'] );
				} else {
					$tabs['additional_information']['callback'] = 'additional_info_tab_content';
				}
			} else {
				$tabs['additional_information']['callback'] = 'additional_info_tab_content';
			}

			return $tabs;
		}

		/**
		 * Add settings to the Show Attributes section.
		 * @since 1.4.0
		 */
		public function add_settings( $settings, $current_section ) {
			if ( 'wc_show_attributes' == $current_section ) {
				return wcsa_all_settings();

				// If not, return the standard settings
			} else {
				return $settings;

			}

		}

		/**
		 * Add our settings section under the Products tab.
		 * @since 1.4.0
		 */
		public function add_section( $sections ) {
			$sections['wc_show_attributes'] = __( 'Show Attributes', 'woocommerce-show-attributes' );
			return $sections;
		}

		/**
		 * Save default options upon plugin activation
		 */
		static function install() {
			$settings = wcsa_all_settings();
			foreach ( $settings as $option ) {
				if ( ! empty( $option['default'] ) ) {// Only if we have any defaults
					$db_option = get_option( $option['id'] );
					if ( empty( $db_option ) ) {// If option is empty, set the default value
						update_option( $option['id'], $option['default'] );
					}
				}
			}

		}

	} // end class

// only if WooCommerce is active
	if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {

		/**
		 * The custom HTML for the Additional Information tab which now excludes our custom attributes.
		 */
		function additional_info_tab_content() { ?>
            <h2><?php _e( 'Additional Information', 'woocommerce-show-attributes' ); ?></h2>
            <table class="shop_attributes">
				<?php
					global $product;
					$attributes = $product->get_attributes();
					$has_weight = $product->has_weight();
					$has_dimensions = $product->has_dimensions();
					$display_dimensions = apply_filters( 'wc_product_enable_dimensions_display', $has_weight || $has_dimensions );

					if ( get_option( 'wcsa_weight_product' ) != 'yes' ) {
						if ( $display_dimensions && $has_weight ) : ?>
                            <tr>
                                <th><?php _e( 'Weight', 'woocommerce-show-attributes' ) ?></th>
                                <td class="product_weight"><?php echo esc_html( wc_format_weight( $product->get_weight() ) ); ?></td>
                            </tr>
						<?php endif;
					}

					if ( get_option( 'wcsa_weight_dimensions' ) != 'yes' ) {


						if ( $display_dimensions && $product->has_dimensions() ) : ?>
                            <tr>
                                <th><?php _e( 'Dimensions', 'woocommerce-show-attributes' ) ?></th>
                                <td class="product_dimensions"><?php echo esc_html( wc_format_dimensions( $product->get_dimensions( false ) ) ); ?></td>
                            </tr>
						<?php endif;
					}


					foreach ( $attributes as $attribute ) :
						$name = $attribute->get_name();
						// Skip atts that are shown above add to cart
						if ( get_option( 'wcsa_product', 'no' ) == 'yes') {
							continue;
						}
						?>
                        <tr>
                            <th><?php echo esc_html( wc_attribute_label( $name ) ); ?></th>
                            <td><?php
									$values = array();
									if ( $attribute->is_taxonomy() ) {
										global $wc_product_attributes;
										$product_terms = wc_get_product_terms( $product->get_id(), $name, array( 'fields' => 'all' ) );
										foreach ( $product_terms as $product_term ) {
											$product_term_name = esc_html( $product_term->name );
											$link = get_term_link( $product_term->term_id, $name );
											if ( ! empty ( $wc_product_attributes[ $name ]->attribute_public ) ) {
												$values[] = '<a href="' . esc_url( $link  ) . '" rel="tag">' . $product_term_name . '</a>';
											} else {
												$values[] = $product_term_name;
											}
										}
									} else {
										$values = $attribute->get_options();
										foreach ( $values as &$value ) {
											$value = esc_html( $value );
										}
									}

									echo apply_filters( 'woocommerce_attribute', wpautop( wptexturize( implode( ', ', $values ) ) ), $attribute, $values );
								?></td>
                        </tr>
					<?php endforeach; ?>
            </table>
			<?php
		}
		$WooCommerce_Show_Attributes = WooCommerce_Show_Attributes::get_instance();
		register_activation_hook(__FILE__, array( $WooCommerce_Show_Attributes, 'install' ) );
	}

	/**
	 * Return an array of all our settings
	 * @since 1.6.1
	 */
	function wcsa_all_settings() {
		$settings = array(
			array(
				'name'	=> __( 'WooCommerce Show Attributes Options', 'woocommerce-show-attributes' ),
				'type'	=> 'title',
				'desc'	=> __( 'Where would you like to show your custom product attributes?', 'woocommerce-show-attributes' ),
				'id'	=> 'wc_show_attributes' ),
			array(
				'name'		=> __( 'Show Attributes on Product Page', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_product',
				'default'	=> 'yes',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Show attributes on the single product above Add To Cart, and on Grouped products.', 'woocommerce-show-attributes' )
			),
			array(
				'name'		=> __( 'Show Attributes on Shop Pages', 'woocommerce-show-attributes' ),
				'desc'		=> __( 'Whether to show attributes on the main shop page and shop category pages.', 'woocommerce-show-attributes' ),
				'id'		=> 'woocommerce_show_attributes_on_shop',
				'css'		=> '',
				'default'	=> 'no',
				'type'		=> 'select',
				'options'	=> array(
					''					=> __( 'No', 'woocommerce-show-attributes' ),
					'above_price'		=> __( 'Show them above the price', 'woocommerce-show-attributes' ),
					'above_add2cart'	=> __( 'Show them above "Add to Cart"', 'woocommerce-show-attributes' ),
					'above_title'       => __( 'Show them above product title', 'woocommerce-show-attributes'),
				),
				'desc_tip'	=> true,
			),
			array(
				'name'		=> __( 'Show Attributes on Cart Page', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_cart',
				'default'	=> 'yes',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Show attributes on the cart and checkout pages.', 'woocommerce-show-attributes' )
			),
			array( 'type' => 'sectionend', 'id' => 'wc_show_attributes' ),
			// style
			array(
				'title'		=> __( 'Style Options', 'woocommerce-show-attributes' ),
				'desc'		=> __( 'These options affect the style or appearance of the attributes.', 'woocommerce-show-attributes' ),
				'type'		=> 'title',
				'id'		=> 'wcsa_style'
			),
			array(
				'name'		=> __( 'Hide the Labels When Showing Product Attributes', 'woocommerce-show-attributes' ),
				'id'		=> 'woocommerce_show_attributes_hide_labels',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Check this box to hide the attribute labels and only show the attribute values.', 'woocommerce-show-attributes' )
			),
			array(
				'name'		=> __( 'Show Attributes in a span Element', 'woocommerce-show-attributes' ),
				'id'		=> 'woocommerce_show_attributes_span',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Check this box to use a span element instead of list bullets when showing product attributes on the single product page.', 'woocommerce-show-attributes' )
			),
			array(
				'name'		=> __( 'Remove Colon From Attribute Labels', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_remove_semicolon',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Check this box to remove the colon from the attribute labels. Useful for RTL languages.', 'woocommerce-show-attributes' )
			),
			array( 'type' => 'sectionend', 'id' => 'wcsa_style' ),
			// weight and Dimensions
			array(
				'title'		=> __( 'Show Weight and Dimensions', 'woocommerce-show-attributes' ),
				'desc'		=> __( 'These options let you show the product weight and dimensions in various places.', 'woocommerce-show-attributes' ),
				'type'		=> 'title',
				'id'		=> 'wc_show_weight_dimensions'
			),
			array(
				'name'		=> __( 'Show Weight on Product Page Above Add To Cart', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_weight_product',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Show product weight on the single product pages, and Grouped products, above Add To Cart instead of in the Additional Information tab.', 'woocommerce-show-attributes' )
			),
			array(
				'name'		=> __( 'Show Dimensions on Product Page Above Add To Cart', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_dimensions_product',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Show product dimensions on the single product pages, and Grouped products, above Add To Cart instead of in the Additional Information tab.', 'woocommerce-show-attributes' )
			),
			array(
				'name'		=> __( 'Show Weight on Cart Page', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_weight_cart',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Show product weight on the cart and checkout pages.', 'woocommerce-show-attributes' )
			),
			array(
				'name'		=> __( 'Show Dimensions on Cart Page', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_dimensions_cart',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Show product dimensions on the cart and checkout pages.', 'woocommerce-show-attributes' )
			),
			array(
				'name'		=> __( 'Show visible attributes on Cart Page', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_visible_cart',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'Show visible product attributes on the cart and checkout pages.', 'woocommerce-show-attributes' )
			),
			array( 'type' => 'sectionend', 'id' => 'wc_show_weight_dimensions' ),
			// Extra Options
			array(
				'title'		=> __( 'Extra Options', 'woocommerce-show-attributes' ),
				'type'		=> 'title',
				'id'		=> 'wcsa_extra_options'
			),
			array(
				'name'		=> __( 'Show Attribute Terms as Links', 'woocommerce-show-attributes' ),
				'id'		=> 'wcsa_terms_as_links',
				'default'	=> 'no',
				'type'		=> 'checkbox',
				'desc'		=> __( 'On the single product page, show the attribute terms as links. They will link to their archive pages. This only works with Global Attributes. Global Attributes are created in Products -> Attributes.', 'woocommerce-show-attributes' )
			),
			array( 'type' => 'sectionend', 'id' => 'wcsa_extra_options' ),
		);

		return $settings;
	}
