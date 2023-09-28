<?php
	/*
	Plugin Name: Clypper Show Attributes
	Description: Show WooCommerce custom product attributes on the Product, Shop and Cart pages, admin Order Details page and emails.
	Version: 1.7.0
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
            add_action('wp_enqueue_scripts', array($this, 'enqueue_styles'));
        }

		/**
		 * Load plugin's textdomain
		 */
		public function load_textdomain() {
			load_plugin_textdomain( 'woocommerce-show-attributes', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
        }

        public function enqueue_styles() {
            wp_enqueue_style('clypper-show-attributes', plugin_dir_url(__FILE__) . 'assets/css/clypper-show-attributes.css');
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
            $formatted_attributes = [];

            foreach ($product->get_attributes() as $attribute) {
                if ($attribute instanceof WC_Product_Attribute && $attribute->get_visible() && !empty($attribute->get_options())) {
                    $name = $attribute->get_name();
                    $attribute_data = $attribute->is_taxonomy()
                        ? $this->get_global_taxonomy_attribute_data($name, $product, $single_product)
                        : ['label' => $name, 'value' => esc_html(implode(', ', $attribute->get_options()))];

                    $formatted_attributes[] = $attribute_data;
                }
            }
            return $formatted_attributes;
        }


        public function the_attributes($product = null, $element = 'span', $show_weight = false, $show_dimensions = false, $skip_atts = false, $single_product = false) {
            if (!$product || !is_object($product)) return '';

            $hide_labels = get_option('woocommerce_show_attributes_hide_labels') === 'yes';
            $span_option = get_option('woocommerce_show_attributes_span') === 'yes';
            $colon = get_option('wcsa_remove_semicolon') === 'yes' ? ' ' : ': ';

            $element = $span_option ? 'span' : $element;
            $attribute_list = '';

            if ($show_weight && $product->has_weight())
                $attribute_list .= $this->format_attribute($element, 'Weight', $product->get_weight() . ' ' . get_option('woocommerce_weight_unit', ''), $hide_labels, $colon);

            if ($show_dimensions && $product->has_dimensions())
                $attribute_list .= $this->format_attribute($element, 'Dimensions', wc_format_dimensions($product->get_dimensions(false)), $hide_labels, $colon);

            if (!$skip_atts) {
                foreach ($this->get_attributes($product, $single_product) as $attribute)
                    $attribute_list .= $this->format_attribute($element, $attribute['label'], $attribute['value'], $hide_labels, $colon);
            }

            return $attribute_list ? sprintf('<%s class="custom-attributes">%s</%s>', $element === 'li' ? 'ul' : 'span', $attribute_list, $element === 'li' ? 'ul' : 'span') : '';
        }

        private function format_attribute($element, $label, $value, $hide_labels, $colon) {
            $label_str = $hide_labels ? '' : sprintf('<span class="attribute-label"><span class="attribute-label-text">%s</span>%s </span> ', esc_html($label), $colon);
            return sprintf('<%s class="attribute-list-item">%s<span class="attribute-value">%s</span></%s>%s', esc_attr($element), $label_str, esc_html($value), esc_attr($element), $element === 'span' ? '<br />' : '');
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
        private function get_global_taxonomy_attribute_data($name, $product, $single_product) {
            $out = [];
            $product_id = is_numeric($product) ? $product : $product->get_id();
            $terms = get_the_terms($product_id, $name);

            if (is_array($terms)) {
                $tax_object = get_taxonomy($terms[0]->taxonomy);
                $out['label'] = $tax_object->labels->singular_name ?? (isset($tax_object->label) ? substr($tax_object->label, strlen(__('Product', 'woocommerce-show-attributes') . ' ')) : null);

                $tax_terms = array_map(function($term) use ($single_product) {
                    $term_name = esc_html($term->name);
                    if ($single_product && get_option('wcsa_terms_as_links') === 'yes') {
                        $term_link = get_term_link($term);
                        if (!is_wp_error($term_link)) $term_name = "<a href='" . esc_url($term_link) . "'>$term_name</a>";
                    }
                    return $term_name;
                }, $terms);

                $out['value'] = implode(', ', $tax_terms);
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
            $show_weight = get_option('wcsa_weight_product') === 'yes';
            $show_dimensions = get_option('wcsa_dimensions_product') === 'yes';
            $skip_atts = get_option('wcsa_product') === 'no';

            global $product;
            echo wp_kses_post($this->the_attributes($product, 'li', $show_weight, $show_dimensions, $skip_atts, true));
        }

        /**
		 * Show product attributes on the Cart page.
		 */
        public function show_atts_on_cart($name, $cart_item, $cart_item_key) {
            if (get_option('wcsa_visible_cart') !== 'yes') return $name;

            $show_weight = get_option('wcsa_weight_cart') === 'yes';
            $show_dimensions = get_option('wcsa_dimensions_cart') === 'yes';
            $skip_atts = get_option('wcsa_cart') === 'no';

            $product = $cart_item['data'];
            return $name . '<br />' . wp_kses_post($this->the_attributes($product, 'span', $show_weight, $show_dimensions, $skip_atts));
        }


        /**
		 * Show product attributes on the child products of a Grouped Product page.
		 *
		 * @param object, the product object
		 * @since 1.2.4
		 */
        public function show_atts_grouped_product($product) {
            $show_weight = get_option('wcsa_weight_product') === 'yes';
            $show_dimensions = get_option('wcsa_dimensions_product') === 'yes';
            $skip_atts = get_option('wcsa_product') === 'no';

            echo '<td class="grouped-product-custom-attributes">' . wp_kses_post($this->the_attributes($product, 'span', $show_weight, $show_dimensions, $skip_atts)) . '</td>';
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


		/**
		 * Customize the Additional Information tab to NOT show our custom attributes
		 */
        public function additional_info_tab($tabs)
        {
            global $product;

            if (!is_a($product, 'WC_Product')) return $tabs;

            // Check if the product has any attributes.
            if (!empty($product->get_attributes())) {
                // Modifying the 'additional_information' tab title, callback, and priority.
                $tabs['additional_information']['title'] = __('Specifikationer');
                $tabs['additional_information']['callback'] = [$this, 'clypper_additional_information'];
                $tabs['additional_information']['priority'] = 1;
            } else {
                unset($tabs['additional_information']);
            }

            // You can adjust the priority of other tabs as needed.
            // $tabs['description']['priority'] = 20;
            // $tabs['reviews']['priority'] = 30;

            return $tabs;
        }

        public function clypper_additional_information()
        {
            global $product;
            ?>
            <div class="attribute-wrapper">
                <?php foreach ($product->get_attributes() as $product_attribute) {
                    $this->display_attribute_item($product_attribute);
                } ?>
            </div>
            <?php
        }

        private function display_attribute_item($product_attribute)
        {
            ?>
            <div class="attribute-item">
                <p class="attribute-name">
                    <strong><?php echo esc_html(wc_attribute_label($product_attribute->get_name())) . ':'; ?></strong>
                </p>
                <div class="attribute-value-wrapper">
                    <?php $this->display_attribute_values($product_attribute); ?>
                </div>
            </div>
            <?php
        }

        private function display_attribute_values($product_attribute)
        {
            if ($product_attribute->is_taxonomy()) {
                $attribute_values = $product_attribute->get_terms();
                foreach ($attribute_values as $attribute_value) {
                    if ($attribute_value instanceof WP_Term) {
                        echo sprintf('<p class="attribute-value-single">%s</p>', esc_html($attribute_value->name));
                    }
                }
            } else {
                $attribute_values = $product_attribute->get_options();
                foreach ($attribute_values as $attribute_value) {
                    echo sprintf('<p class="attribute-value-single">%s</p>', esc_html($attribute_value));
                }
            }
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
