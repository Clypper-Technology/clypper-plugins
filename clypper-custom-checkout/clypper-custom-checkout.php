<?php
	/**
	 * Plugin Name: Clypper Custom Checkout
	 * Description: Clypper's handcrafted checkout fields.
	 * Version: 1.2.2
	 * Author: Clypper von H
	 */

	if (!defined('ABSPATH')) {
		exit; // Exit if accessed directly
	}

	class Custom_WooCommerce_Checkout_Fields
	{
		public function __construct()
		{
			add_action('woocommerce_after_order_notes', array($this, 'add_checkout_fields'));
			add_action('woocommerce_checkout_process', array($this, 'validate_checkout_fields'));
			add_action('woocommerce_checkout_update_order_meta', array($this, 'save_checkout_fields'));
			add_action('woocommerce_admin_order_data_after_billing_address', array($this, 'display_fields_in_admin'));
			add_action('wp_enqueue_scripts', array($this, 'enqueue_checkout_script'));
		}

		public function add_checkout_fields($checkout): void {

			if (!$this->should_display_fields()) {
				return;
			}

			echo '<div id="cvr-checkout-field"><h2>' . __('Indregistrering af trailer') . '</h2>';

			// CPR Number
			woocommerce_form_field('cpr_number', array(
				'type' => 'text',
				'class' => array('form-row-wide'),
				'label' => __('CPR-Nummer'),
				'placeholder' => '123456-1234',
				'required' => true,
			), $checkout->get_value('cpr_number'));

			// User Agreement
			woocommerce_form_field('user_agreement', array(
				'type' => 'checkbox',
				'class' => array('form-row-wide'),
				'label' => __('Jeg bekræfter hermed at Trekantens-Trailercenter.dk må bruge mit CPR-Nummer til at indregistrere min trailer,
				 og at mit CPR-Nummer bliver behandlet som beskrevet i Trekantens-Trailcenter.dks persondatapolitik, der kan findes her: '),
				'required' => true,
			), $checkout->get_value('user_agreement'));

			echo '</div>';
		}

		public function validate_checkout_fields(): void {

			if (!$this->should_display_fields()) {
				return;
			}

			if (empty($_POST['cpr_number'])) {
				wc_add_notice(__('Indtast dit CPR-Nummer.'), 'error');
			}

			if (empty($_POST['user_agreement'])) {
				wc_add_notice(__('Bekræft at du giver samtykke til at dele dit CPR-Nummer med os.'), 'error');
			}

			if (!empty($_POST['cpr_number'])) {
				$cpr_number = sanitize_text_field($_POST['cpr_number']);

				if (!preg_match('/^\d{6}-\d{4}$/', $cpr_number)) { // Checks the CPR number format
					wc_add_notice(__('Ugyldigt CPR-Nummer. Følg dette format: 123456-1234.'), 'error');
				}
			}
		}

		public function save_checkout_fields($order_id): void {

			if (!$this->should_display_fields()) {
				return;
			}

			update_post_meta($order_id, 'CPR Number', sanitize_text_field($_POST['cpr_number']));
		}

		public function display_fields_in_admin($order): void {

			$cpr_number = get_post_meta($order->get_id(), 'CPR Number', true);

			if ($cpr_number) {
				echo '<p><strong>' . __('CPR Nummer') . ':</strong> ' . esc_html($cpr_number) . '</p>';
			}
		}

		public function enqueue_checkout_script(): void {
			if (is_checkout() && $this->should_display_fields()) {
				$plugin_data = get_file_data(__FILE__, array('Version' => 'Version'), false);
				$plugin_version = $plugin_data['Version'];

				wp_enqueue_script('clypper-custom-checkout', plugin_dir_url(__FILE__) . 'clypper-custom-checkout.js', array('jquery'), $plugin_version, true);

			}
		}

		private function should_display_fields(): bool {
			foreach (WC()->cart->get_cart() as $cart_item) {
				if ($cart_item['data']->get_sku() == '1') {
					return true;
				}
			}
			return false;
		}
	}

	add_action('woocommerce_init', function () {
		new Custom_WooCommerce_Checkout_Fields();
	});
