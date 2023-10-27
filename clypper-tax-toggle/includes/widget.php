<?php
	/**
	 * Widget
	 *
	 * @package WordPress
	 * @subpackage clypper-tax
	 * @since 1.2.4
	 */

	if ( ! defined( 'ABSPATH' ) ) {
		die( 'No direct access allowed' );
	}

	class Clypper_Tax_Toggle_Widget extends WP_Widget {

		/**
		 * Construct
		 */
		function __construct() {
			parent::__construct(
				'',
				__( 'Tax Toggle', 'clypper-tax' ),
				array(
					'classname' => 'clypperVATWidget',
					'description' => __( 'Shows Tax Toggle for WooCommerce button', 'clypper-tax' ),
				)
			);
		}

		/**
		 * Widget
		 */
		function widget( $args, $instance ) {
			extract( $args, EXTR_SKIP );
			echo $before_widget;
			$title = empty( $instance['title'] ) ? ' ' : apply_filters( 'widget_title', $instance['title'] );
			if ( ! empty( $title ) ) {
				echo $before_title . $title . $after_title;
			};
			clypper_tax_output();
			echo $after_widget;
		}

		/**
		 * Update
		 */
		function update( $new_instance, $old_instance ) {
			$instance = $old_instance;
			$instance['title'] = $new_instance['title'];
			return $instance;
		}

	}
	add_action(
		'widgets_init',
		function() {
			return register_widget( 'Clypper_Tax_Toggle_Widget' );
		}
	);
