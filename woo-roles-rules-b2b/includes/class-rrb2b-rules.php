<?php
/**
 * Roles & Rules B2B
 *
 * @package Roles&RulesB2B/includes
 */

defined( 'ABSPATH' ) || exit;


/**
 * Class for rules
 */
class Rrb2b_Rules {

    private static array $role_rules = array();

	/**
	 * Set frontend rules
	 */
	public static function rrb2b_frontend_rules() {
		
		//Price
		add_filter( 'woocommerce_product_get_price', array( __CLASS__, 'rrb2b_get_rule_price' ), 20, 2 );		
		add_filter( 'woocommerce_product_variation_get_price', array( __CLASS__, 'rrb2b_get_var_rule_price' ), 20, 2 );
		add_filter( 'woocommerce_get_variation_regular_price', array( __CLASS__, 'rrb2b_get_variation_regular_price' ), 10, 4 );

		//Variation
		add_filter( 'woocommerce_variation_prices_price', array( __CLASS__, 'rrb2b_get_rule_price_variation' ), 20, 3 );

		//On Sale
		add_filter( 'woocommerce_product_is_on_sale', array( __CLASS__, 'rrb2b_product_is_on_sale' ), 10, 2 );

		//Login
		add_filter( 'authenticate', array( __CLASS__, 'rrb2b_user_authenticate' ), 90, 3 );

		//Admin and API pricing
		add_filter( 'rrb2b_rule_get_price_api_and_admin', array( __CLASS__, 'rrb2b_rule_get_price_admin' ), 10, 5 );
	}

	/**
	 * Clear old sessions
	 */
	public static function rrb2b_user_authenticate( $user, $username, $password ) {
		if ( class_exists( 'WooCommerce' ) && ! empty( WC()->session ) ) {
			WC()->session->set( 'rrb2b_today', null );
			WC()->session->set( 'rrb2b_rule', null );
			WC()->session->set( 'rrb2b_user_in_rule', null ); 
		}
		
		return $user;
	}


	/**
	 * Check if product is on sale
	 *
	 * @param var $is_on_sale bool value.
	 * @param var $product product.
	 */
	public static function rrb2b_product_is_on_sale( $is_on_sale, $product ) {

		if ( is_admin() ) {
			return $is_on_sale;
		}

		if ( ! is_admin() && self::rrb2b_user_in_rule() ) {

			if ( WC()->session->get( 'rrb2b_on_sale' ) ) {
				return true;
			}

			if ( WC()->session->get( 'rrb2b_categories_on_sale' ) ) {
				//Check if product is in category
				return self::rrb2b_product_category_on_sale( $product );
			}

			return false;
		}

		return $is_on_sale;
	}


	/**
	 * Get rule price
	 *
	 * @param var $price price.
	 * @param var $product product.
	 */
	public static function rrb2b_get_rule_price( $price, $product ) {
		$user         = wp_get_current_user();
		$is_variation = ( count( $product->get_children() ) > 0 ) && 'variable' === $product->get_type() ? true : false;
		$is_regular   = false;
		$price        = self::get_rule_price( $price, $product, $user, $is_variation, $is_regular );
	
		return $price;
	}

	/**
	 * Get rule price variation
	 *
	 * @param var $price price.
	 * @param var $product product.
	 */
	public static function rrb2b_get_var_rule_price( $price, $product ) {
		
		$user         = wp_get_current_user();
		$is_variation = true;
		$is_regular   = false;
		$price        = self::get_rule_price( $price, $product, $user, $is_variation, $is_regular );

		return $price;
	}

	/**
	 * Get rule price - variation
	 *
	 * @param var $price price.
	 * @param var $variation variation.
	 * @param var $product product.
	 */
	public static function rrb2b_get_rule_price_variation( $price, $variation, $product ) {

		$user         = wp_get_current_user();
		$is_variation = true;
		$is_regular   = false;
		$price        = self::get_rule_price( $price, $variation, $user, $is_variation, $is_regular );

		return $price;
	}

	/**
	 * Check if user has a role or is guest
	 *
	 */
	public static function rrb2b_user_in_rule() {
        return self::rrb2b_user_in_rule_frontend();
	}

	/**
	 * Check if user has a role or is guest frontend
	 *
	 */
	public static function rrb2b_user_in_rule_frontend() {

		if ( empty( WC()->session ) ) {
			return false;
		}

		$user = wp_get_current_user();
		$role = ( ! empty( $user->roles[0] ) ) ? $user->roles[0] : null;
		
		if ( null === $role || 0 === $user->ID ) {
			$role = 'guest';
		}

		$options         = get_option( 'rrb2b_options' );
		$futureTime      = time() + 1 * MINUTE_IN_SECONDS;
		$sessionInterval = WC()->session->get( 'rrb2b_today' );

		if ( ! $sessionInterval || time() > $sessionInterval ) {
			WC()->session->set( 'rrb2b_today', null );
			WC()->session->set( 'rrb2b_rule', null );
			WC()->session->set( 'rrb2b_categories_on_sale', null );
			WC()->session->set( 'rrb2b_user_is_guest', null );
			WC()->session->set( 'rrb2b_msg_options', null );
			WC()->session->set( 'rrb2b_role', null );
			WC()->session->set( 'rrb2b_role', $role ); 
			WC()->session->set( 'rrb2b_today', $futureTime ); 
			WC()->session->set( 'rrb2b_rule', self::get_role_rule( $role ) );
		}

		$rules  = WC()->session->get( 'rrb2b_rule' );
		$active = false;
		
		if ( ! empty( $rules ) && count( (array) $rules ) > 0 ) {
			$rule    = $rules[0];
			$content = json_decode( $rule->post_content, true );
			$active  = ! empty( $content['rule_active'] ) && 'on' === $content['rule_active'];
		}

		// Guest
		if ( $active && 'guest' === $rules[0]->post_name ) {
			return true;
		}

		if ( $active && in_array( $rules[0]->post_name, (array) $user->roles, true ) ) {
			return true;    
		}
		
		return false;
	}


	/**
	 * Check if category is set on sale
	 * 
	 * @param var $product product.
	 */
	public static function rrb2b_product_category_on_sale( $product ) {

		$rules             = WC()->session->get( 'rrb2b_rule' );
		$rule              = $rules[0];
		$content           = json_decode( $rule->post_content, true );
		$categories        = $content['categories'];
		$single_categories = $content['single_categories'];
		$is_variation      = ( count( $product->get_children() ) > 0 ) ? true : false;
		
		//Check for single categories on sale
		if ( ! empty( $single_categories ) ) {
		
			$product_cat = ( $is_variation ) ? get_the_terms( $product->get_parent_id(), 'product_cat' ) : get_the_terms( $product->get_id(), 'product_cat' );
			
			foreach ( $single_categories as $category ) {
			
				if ( $product_cat ) {
					foreach ( $product_cat as $cat ) {
						if ( strval( $cat->term_id ) === strval( $category['id'] ) && 'true' === $category['on_sale'] ) {
							return true;
						}
					}
				}
			}
		}

		//Check for sales on general categories rule 
		if ( ! empty( $categories ) ) {
		
			$product_cat = ( $is_variation ) ? get_the_terms( $product->get_parent_id(), 'product_cat' ) : get_the_terms( $product->get_id(), 'product_cat' );

			foreach ( $categories as $category ) {
			
				$cat_id = array_values( $category );
				
				if ( $product_cat && in_array( strval( $product_cat[0]->term_id ), $cat_id, true ) ) {
					return true;
				}
			}
		}

		return false;
	}

	/**
	 * Get price
	 * 
	 * @param var $price current price.
	 * @param var $product current product.
	 * @param var $user current user.
	 * @param var $is_variation is of type variation.
	 */
	private static function get_rule_price($price, $product, $user, $is_variation, $is_regular ) {

        $user_in_rule = self::rrb2b_user_in_rule();

		if ( ! $user_in_rule || '' === $price || 0 === $price || empty( $price ) ) {
			return $price;
		}


		$price_new = ( empty( $price ) || 0 === $price ) ? ( ( $is_regular ) ? $product->get_regular_price() : $product->get_price() ) : $price;
		$cart_qty  = self::get_cart_item_qty( $product->get_id() );

		if ( $product->get_sale_price() > 0) {
			$price_new = $product->get_regular_price();
		}

		$rules = WC()->session->get( 'rrb2b_rule' );

		if ( isset( $rules[0] ) && ( in_array( $rules[0]->post_name, (array) $user->roles, true ) || 'guest' === $rules[0]->post_name ) ) {
			
			$rule              = $rules[0];
			$content           = json_decode( $rule->post_content, true );
			$categories        = ( ! empty( $content['categories'] ) ) ? $content['categories'] : array();
			$single_categories = ( ! empty( $content['single_categories'] ) ) ? $content['single_categories']: array();
			$_products         = ( ! empty( $content['products'] ) ) ? $content['products'] : array();

            if(!self::product_has_rules($product, $content)) {
                return $price;
            }

			if ( 'on' === $content['rule_active'] ) {
				
				//Guest
				if ( 'guest' === $rule->post_name ) {
					WC()->session->set( 'rrb2b_user_is_guest', 'true' );
				}

				//Check for product rules
				if ( count( $_products ) > 0 ) {
					
					$product_id = $product->get_id();
					$product_rules    = array_filter( $_products, function( $p ) use ( $product_id ) {
						return intval( $p['id'] ) === $product_id;
					});
					
					foreach ( $product_rules as $product_rule ) {
						// Check product quantity in cart - if quantity rule get price
						$min_quantity = ! empty( $product_rule['min_qty'] ) ? intval( $product_rule['min_qty'] ) : 0;

						if ( $cart_qty >= $min_quantity && ! empty( $product_rule['adjust_value_qty'] ) ) {
							$adjust_value_qty = floatval( $product_rule['adjust_value_qty'] );
							
							switch ( $product_rule['adjust_type_qty'] ) {
								case 'percent':
									$price_new *= 1.0 - ( $adjust_value_qty / 100 );
									break;
								case 'fixed':
									$price_new -= $adjust_value_qty;
									break;
								case 'fixed_set':
									$price_new = $adjust_value_qty;
									break;
							}

							return $price_new;
						}

						// Normal product rule
						if ( ! empty( $product_rule['adjust_value'] ) ) {
							$adjust_value = floatval( $product_rule['adjust_value'] );

							switch ( $product_rule['adjust_type'] ) {
								case 'percent':
									$price_new *= 1.0 - ( $adjust_value / 100 );
									break;
								case 'percent_add':
									$price_new *= 1.0 + ( $adjust_value / 100 );
									break;
								case 'fixed':
									$price_new -= $adjust_value;
									break;
								case 'fixed_add':
									$price_new += $adjust_value;
									break;
								case 'fixed_set':
									$price_new = $adjust_value;
									break;
							}

							return $price_new;
						}

					}
					
				}

				//Check for single categories rules
				if ( count( $single_categories ) > 0 ) {

					//Get categories of product
					$product_cats_ids = ( 'variation' === $product->get_type() ) ? wc_get_product_term_ids( $product->get_parent_id(), 'product_cat' ) : wc_get_product_term_ids( $product->get_id(), 'product_cat' );
					
					if ( is_array( $product_cats_ids ) && count( $product_cats_ids ) > 0 ) {
					
						foreach ( $single_categories as $category ) {
						
							foreach ( $product_cats_ids as $cat_id ) {
									
								if ( intval( $category['id'] ) === $cat_id ) {
									
									//Check product qty in cart - if qty rule get price
									$min_quantity = ( ! empty( $category['min_qty'] ) ) ? intval( $category['min_qty'] ) : 0;
										
									if ( $cart_qty >= $min_quantity && ! empty( $category['adjust_value_qty'] ) ) {
											
										switch ( $category['adjust_type_qty'] ) {
											case 'percent':
												$percent   = 1.0 - floatval( $category['adjust_value_qty'] ) / 100;
												$price_new = floatval( $price_new ) * $percent;
												break;
											case 'fixed':
												$price_new = floatval( $price_new ) - floatval( $category['adjust_value_qty'] );
												break;
										}
										
										if ( 'true' === $category['on_sale'] ) {
											WC()->session->set( 'rrb2b_categories_on_sale', true ); 
										}
										
										return $price_new;

									} else {

										//Normal category discounts
										if ( ! empty( $category['adjust_value'] ) ) {

											switch ( $category['adjust_type'] ) {
												case 'percent':
													$percent   = 1.0 - floatval( $category['adjust_value'] ) / 100;
													$price_new = floatval( $price_new ) * $percent;
													break;
												case 'percent_add':
													$percent   = 1.0 + floatval( $category['adjust_value'] ) / 100;
													$price_new = floatval( $price_new ) * $percent;
													break;
												case 'fixed':
													$price_new = floatval( $price_new ) - floatval( $category['adjust_value'] );
													break;
												case 'fixed_add':
													$price_new = floatval( $price_new ) + floatval( $category['adjust_value'] );
													break;
											}
											
											if ( 'true' === $category['on_sale'] ) {
												WC()->session->set( 'rrb2b_categories_on_sale', true ); 
											}
											
											return $price_new;
										}
									}
								}
							}
						}
					
					}

				}

				$changed_in_category = false;

				//Check for general category reductions / increases
				if ( count( $categories ) > 0 ) {
		
					$product_cat = ( $is_variation ) ? get_the_terms( $product->get_parent_id(), 'product_cat' ) : get_the_terms( $product->get_id(), 'product_cat' );

					foreach ( $categories as $category ) {
					
						$cat_id = array_values( $category );
						
						if ( $product_cat && in_array( strval( $product_cat[0]->term_id ), $cat_id, true ) ) {
				
							if ( ! empty( $content['reduce_categories_value'] ) ) {

								switch ( $content['reduce_regular_type'] ) {
									case 'percent':
										$percent   = 1.0 - floatval( $content['reduce_categories_value'] ) / 100;
										$price_new = floatval( $price_new ) * $percent;
										break;
									case 'percent_add':
										$percent   = 1.0 + floatval( $content['reduce_categories_value'] ) / 100;
										$price_new = floatval( $price_new ) * $percent;
										break;
									case 'fixed':
										$price_new = floatval( $price_new ) - floatval( $content['reduce_categories_value'] );
										break;
									case 'fixed_add':
										$price_new = floatval( $price_new ) + floatval( $content['reduce_categories_value'] );
										break;
								}
								
								if ( 'true' === $content['categories_on_sale'] ) {
									WC()->session->set( 'rrb2b_categories_on_sale', true ); 
								}

								$changed_in_category = true;
								break;
							}
						}
					
					}
				} 
						
				//Do normal reduction / increases
				if ( ! empty( $content['reduce_regular_value'] ) && ! $changed_in_category ) {

					$reduce_regular_value = floatval( $content['reduce_regular_value'] );

					switch ( $content['reduce_regular_type'] ) {
						case 'percent':
							$price_new *= 1.0 - ( $reduce_regular_value / 100 );
							break;
						case 'percent_add':
							$price_new *= 1.0 + ( $reduce_regular_value / 100 );
							break;
						case 'fixed':
							$price_new -= $reduce_regular_value;
							break;
						case 'fixed_add':
							$price_new += $reduce_regular_value;
							break;
					}

				}
			}

		} else {
			//No rules found - return price
			return $price;
		}

		return $price_new;

	}

	/**
	 * Get price in admin (Edit Order)
	 * 
	 */
	public static function rrb2b_rule_get_price_admin( $price, $product, $qty, $order_role, $is_api_request ) {

		// If it's not an API request, and it's not in the admin, return the original price
		if ( ! $is_api_request ) {
			if ( ! is_admin() ) {
				return $price;
			}
		}
		
		$is_variation = $product->is_type('variable') ? true : false;
		$price_new    = ( empty( $price ) || 0 === $price ) ? $product->get_regular_price() : $price;
		$cart_qty     = $qty; 
		$role         = $order_role;
		$rules        = self::get_role_rule( $role );


		if ( isset( $rules[0] ) && ! empty( $rules[0] ) ) {
			
			$rule              = $rules[0];
			$content           = json_decode( $rule->post_content, true );
			$categories        = ( ! empty( $content['categories'] ) ) ? $content['categories'] : array();
			$single_categories = ( ! empty( $content['single_categories'] ) ) ? $content['single_categories']: array();
			$_products         = ( ! empty( $content['products'] ) ) ? $content['products'] : array();

            if(! self::product_has_rules( $product, $content ) ) {
                return $price;
            }

			if ( 'on' === $content['rule_active'] ) {
				
				//Check for product rules
				if ( count( $_products ) > 0 ) {
					
					$product_id = $product->get_id();
					$p_rules    = array_filter( $_products, function( $p ) use ( $product_id ) {
						return intval( $p['id'] ) === $product_id;
					});
					
					foreach ( $p_rules as $p_rule ) {
						
						// Check product quantity in cart - if quantity rule get price
						$min_qty = ! empty( $p_rule['min_qty'] ) ? intval( $p_rule['min_qty'] ) : 0;

						if ( $cart_qty >= $min_qty && ! empty( $p_rule['adjust_value_qty'] ) ) {

							$price_new = self::rrb2b_adjust_price_value( $price_new, $p_rule['adjust_value_qty'], $p_rule['adjust_type_qty'] );
							return $price_new;

						}

						// Normal product rule
						if ( ! empty( $p_rule['adjust_value'] ) ) {

							$price_new = self::rrb2b_adjust_price_value( $price_new, $p_rule['adjust_value'], $p_rule['adjust_type'] );
							return $price_new;

						}

					}
					
				}

				//Check for single categories rules
				if ( count( $single_categories ) > 0 ) {

					//Get categories of product
					$product_cats_ids = ( 'variation' === $product->get_type() ) ? wc_get_product_term_ids( $product->get_parent_id(), 'product_cat' ) : wc_get_product_term_ids( $product->get_id(), 'product_cat' );
					
					if ( is_array( $product_cats_ids ) && count( $product_cats_ids ) > 0 ) {
					
						foreach ( $single_categories as $category ) {
						
							foreach ( $product_cats_ids as $cat_id ) {
									
								if ( intval( $category['id'] ) === $cat_id ) {
									
									//Check product qty in cart - if qty rule get price
									$min_qty = ( ! empty( $category['min_qty'] ) ) ? intval( $category['min_qty'] ) : 0;
										
									if ( $cart_qty >= $min_qty && ! empty( $category['adjust_value_qty'] ) ) {
											
										switch ( $category['adjust_type_qty'] ) {
											case 'percent':
												$percent   = 1.0 - floatval( $category['adjust_value_qty'] ) / 100;
												$price_new = floatval( $price_new ) * $percent;
												break;
											case 'fixed':
												$price_new = floatval( $price_new ) - floatval( $category['adjust_value_qty'] );
												break;
										}
										
										return $price_new;

									} else {

										//Normal category discounts
										if ( ! empty( $category['adjust_value'] ) ) {

											switch ( $category['adjust_type'] ) {
												case 'percent':
													$percent   = 1.0 - floatval( $category['adjust_value'] ) / 100;
													$price_new = floatval( $price_new ) * $percent;
													break;
												case 'percent_add':
													$percent   = 1.0 + floatval( $category['adjust_value'] ) / 100;
													$price_new = floatval( $price_new ) * $percent;
													break;
												case 'fixed':
													$price_new = floatval( $price_new ) - floatval( $category['adjust_value'] );
													break;
												case 'fixed_add':
													$price_new = floatval( $price_new ) + floatval( $category['adjust_value'] );
													break;
											}

											return $price_new;
										}
									}
								}
							}
						}
					
					}

				}

				$changed_in_category = false;

				//Check for general category reductions / increases
				if ( count( $categories ) > 0 ) {
		
					$product_cat = ( $is_variation ) ? get_the_terms( $product->get_parent_id(), 'product_cat' ) : get_the_terms( $product->get_id(), 'product_cat' );

					foreach ( $categories as $category ) {
					
						$cat_id = array_values( $category );
						
						if ( $product_cat && in_array( strval( $product_cat[0]->term_id ), $cat_id, true ) ) {
				
							if ( ! empty( $content['reduce_categories_value'] ) ) {

								switch ( $content['reduce_regular_type'] ) {
									case 'percent':
										$percent   = 1.0 - floatval( $content['reduce_categories_value'] ) / 100;
										$price_new = floatval( $price_new ) * $percent;
										break;
									case 'percent_add':
										$percent   = 1.0 + floatval( $content['reduce_categories_value'] ) / 100;
										$price_new = floatval( $price_new ) * $percent;
										break;
									case 'fixed':
										$price_new = floatval( $price_new ) - floatval( $content['reduce_categories_value'] );
										break;
									case 'fixed_add':
										$price_new = floatval( $price_new ) + floatval( $content['reduce_categories_value'] );
										break;
								}

								$changed_in_category = true;
								break;
							}
						}
					
					}
				} 
						
				//Do normal reduction / increases
				if ( ! empty( $content['reduce_regular_value'] ) && ! $changed_in_category ) {
					$price_new = self::rrb2b_adjust_price_value( $price_new, $p_rule['reduce_regular_value'], $p_rule['reduce_regular_type'] );
				}
			}

		} else {
			//No rules found - return price
			return $price;
		}

		return $price_new;

	}

	/**
	 * Function to adjust price value
	 */
	private static function rrb2b_adjust_price_value( $price_new, $value, $type ) {
		
		$adjust_value = floatval( $value );

		switch ( $type ) {
			case 'percent':
				$price_new *= 1.0 - ( $adjust_value / 100 );
				break;
			case 'percent_add':
				$price_new *= 1.0 + ( $adjust_value / 100 );
				break;
			case 'fixed':
				$price_new -= $adjust_value;
				break;
			case 'fixed_add':
				$price_new += $adjust_value;
				break;
			case 'fixed_set':
				$price_new = $adjust_value;
				break;
		}

		return $price_new;
	}


	/**
	 * Get cart quantity for a given product.
	 */
	private static function get_cart_item_qty(int $product_id ): int
    {
		// Ensure the WooCommerce cart is initialized
		if ( ! WC()->cart || ! is_object( WC()->cart ) ) {
			return 0; // Return 0 if the cart is unavailable
		}

		// Get cart quantities
		$qty_arr = WC()->cart->get_cart_item_quantities();

		// Return the quantity if the product exists in the cart
		if ( ! empty( $qty_arr ) && isset( $qty_arr[ $product_id ] ) ) {
			return intval( $qty_arr[ $product_id ] );
		}

		return 0; // Default to 0 if product is not in the cart
	}


	/**
	 * Get rule for role
	 *
	 * @param string $user_role user role.
	 */
	private static function get_role_rule(string $user_role ): array
    {
        if ( isset( self::$role_rules[$user_role] ) ) {
            return self::$role_rules[$user_role];
        }

        $args = array(
            'post_type'  => 'rrb2b',
            'pagename'   => $user_role,
        );

        $rules_query = new WP_Query( $args );
        $rules =  $rules_query->get_posts();

        self::$role_rules[$user_role] = $rules;

        return $rules;
	}


    /**
     * Check if a specific product has B2B rules applied
     */
    private static function product_has_rules($product, $rule_content ): bool
    {

        $product_id = $product->get_id();

        // Check specific product rules
        $_products = ( ! empty( $rule_content['products'] ) ) ? $rule_content['products'] : array();
        if ( ! empty( $_products ) ) {
            foreach ( $_products as $product_rule ) {
                if ( intval( $product_rule['id'] ) === $product_id ) {
                    return true; // Product has specific rule
                }
            }
        }

        // Check category rules
        $single_categories = ( ! empty( $rule_content['single_categories'] ) ) ? $rule_content['single_categories'] : array();
        $categories = ( ! empty( $rule_content['categories'] ) ) ? $rule_content['categories'] : array();

        $product_cats_ids = ( 'variation' === $product->get_type() ) ?
            wc_get_product_term_ids( $product->get_parent_id(), 'product_cat' ) :
            wc_get_product_term_ids( $product->get_id(), 'product_cat' );

        // Check single categories
        if ( ! empty( $single_categories ) && ! empty( $product_cats_ids ) ) {
            if (array_any($single_categories, fn($category) => in_array(intval($category['id']), $product_cats_ids, true))) {
                return true;
            }
        }

        // Check general categories
        if ( ! empty( $categories ) && ! empty( $product_cats_ids ) ) {
            foreach ( $categories as $category ) {
                $cat_ids = array_values( $category );
                if (array_any($cat_ids, fn($cat_id) => in_array(intval($cat_id), $product_cats_ids, true))) {
                    return true;
                }
            }
        }

        // Check global rules
        if ( ! empty( $rule_content['reduce_regular_value'] ) ) {
            return true;
        }

        return false;
    }
}
add_action( 'plugins_loaded', array( 'Rrb2b_Rules', 'rrb2b_frontend_rules' ) );

