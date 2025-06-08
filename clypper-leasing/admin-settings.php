
<?php

	add_filter('woocommerce_product_data_tabs', 'cl_add_custom_product_data_tab', 50, 1);
	function cl_add_custom_product_data_tab($tabs) {
		$tabs['cl_leasing_options'] = array(
			'label'   => __('Leasing Options', 'woocommerce'),
			'target'  => 'cl_leasing_options_data',
			'class'   => array(),
		);
		return $tabs;
	}

	add_action('woocommerce_product_data_panels', 'cl_leasing_options_data_fields');
	function cl_leasing_options_data_fields() {
		global $post;
		?>
        <div id="cl_leasing_options_data" class="panel woocommerce_options_panel">
            <div class="options_group">
				<?php
					woocommerce_wp_select(array(
						'id'            => '_cl_leasing_option',
						'label'         => __('Leasing Type', 'woocommerce'),
						'options'       => array(
							'none'          => __('Select Option', 'woocommerce'),
							'erhverv'       => __('Erhverv', 'woocommerce'),
							'privat'        => __('Privat', 'woocommerce'),
                            'privat-erhverv' => __('Privat og Erhverv', "woocommerce")
						),
						'desc_tip'      => true,
						'description'   => __('Select the type of leasing for this product.', 'woocommerce'),
					));
				?>
            </div>
        </div>
		<?php
	}

	add_action('woocommerce_process_product_meta', 'cl_save_leasing_option_field');
	function cl_save_leasing_option_field($post_id) {
		if (isset($_POST['_cl_leasing_option'])) {
			update_post_meta($post_id, '_cl_leasing_option', sanitize_text_field($_POST['_cl_leasing_option']));
		}
	}


