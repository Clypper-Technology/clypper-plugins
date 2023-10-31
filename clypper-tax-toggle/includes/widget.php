<?php

	if (!defined('ABSPATH')) exit;

	class Clypper_Tax_Toggle_Widget extends WP_Widget {

		function __construct() {
			parent::__construct(
				'clypper_tax_toggle_widget',
				esc_html__('Tax Toggle', 'clypper-tax'),
				array(
					'classname' => 'clypperVATWidget',
					'description' => esc_html__('Shows a Tax Toggle for WooCommerce button', 'clypper-tax'),
				)
			);
		}

		function widget($args, $instance) {
			echo $args['before_widget'];
			if (!empty($instance['title'])) {
				echo $args['before_title'] . esc_html($instance['title']) . $args['after_title'];
			}
			echo get_clypper_tax_output(); // Made changes here for better clarity.
			echo $args['after_widget'];
		}

		function form($instance) {
			// Admin panel widget settings form.
		}

		function update($new_instance, $old_instance) {
			$instance = array();
			$instance['title'] = sanitize_text_field($new_instance['title']);
			return $instance;
		}

	}

	add_action('widgets_init', function() {
		register_widget('Clypper_Tax_Toggle_Widget');
	});

// Introduced a helper function for widget output.
	function get_clypper_tax_output() {
		ob_start();
		clypper_tax_output();
		return ob_get_clean();
	}
