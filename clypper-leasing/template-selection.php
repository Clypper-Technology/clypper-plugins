
<?php

	// Hook into the WooCommerce product thumbnails
	add_action('woocommerce_before_add_to_cart_button', 'cl_select_template', 2000);
	function cl_select_template() {
		global $product;

		// Retrieve the leasing type for the product
		$leasing_type = get_post_meta($product->get_id(), '_cl_leasing_option', true);

		// If no leasing type is set, return without doing anything
		if ($leasing_type == 'none' || !$leasing_type) return;

		// Decide which template to display based on the leasing type
		switch ($leasing_type) {
			case 'erhverv':
				include CL_DIR . '/templates/erhverv.php';
				break;
			case 'privat':
				include CL_DIR . '/templates/privat.php';
				break;
			case 'privat-erhverv':
				include CL_DIR . '/templates/privat-erhverv.php';
				break;
		}
	}

