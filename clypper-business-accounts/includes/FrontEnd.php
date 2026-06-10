<?php

namespace ClypperTechnology\ClypperCvr\includes;

defined( 'ABSPATH' ) || exit;

class FrontEnd
{
    public function __construct()
    {
        // Add CVR column to admin users list
        add_action( 'woocommerce_account_dashboard', array( $this, 'display_company_info_dashboard' ) );
        add_filter( 'woocommerce_checkout_get_value', array( $this, 'prefill_cvr_checkout_field' ), 10, 2 );

        add_action('woocommerce_edit_account_form', [$this, 'render_account_fields']);
        add_filter('woocommerce_save_account_details_errors', [$this, 'validate_account_fields'], 10, 2);
        add_action('woocommerce_save_account_details', [$this, 'save_account_fields']);
    }

    public function render_account_fields(): void
    {
        $user_id = get_current_user_id();
        $value   = get_user_meta($user_id, CustomerFields::INVOICE_EMAIL, true);
        ?>
        <p class="form-row form-row-wide">
            <label for="invoice_email"><?php _e('Faktura e-mail'); ?></label>
            <input
                    type="email"
                    class="input-text"
                    name="invoice_email"
                    id="invoice_email"
                    value="<?php echo esc_attr($value); ?>"
            />
        </p>
        <?php
    }

    public function validate_account_fields(\WP_Error $errors, \stdClass $user): void
    {
        $value = sanitize_email($_POST['invoice_email'] ?? '');

        if (!empty($value) && !is_email($value)) {
            $errors->add('invoice_email_error', __('Ugyldig faktura e-mail.'));
        }
    }

    public function save_account_fields(int $user_id): void
    {
        if (!isset($_POST['invoice_email'])) return;

        update_user_meta($user_id, CustomerFields::INVOICE_EMAIL, sanitize_email($_POST['invoice_email']));
    }
    public function prefill_cvr_checkout_field( $value, $input ) {
        if ( $input === 'billing_cin' && is_user_logged_in() && empty( $value ) ) {
            $value = get_user_meta( get_current_user_id(), 'company_cvr', true );
        }
        return $value;
    }

    public function display_company_info_dashboard(): void {
        $customer_id = get_current_user_id();
        $company_cvr = get_user_meta( $customer_id, CustomerFields::COMPANY_CVR, true );
        $company_type = get_user_meta( $customer_id, 'company_type', true );

        if ( $company_cvr || $company_type ) {
            ?>
            <div class="woocommerce-MyAccount-content">
                <h3><?php _e( 'Virksomhedsoplysninger', 'woo-roles-rules-b2b' ); ?></h3>
                <?php if ( $company_cvr ) : ?>
                    <p><strong><?php _e( 'CVR:', 'woo-roles-rules-b2b' ); ?></strong> <?php echo esc_html( $company_cvr ); ?></p>
                <?php endif; ?>
                <?php if ( $company_type ) : ?>
                    <p><strong><?php _e( 'Industri:', 'woo-roles-rules-b2b' ); ?></strong> <?php echo esc_html( $company_type ); ?></p>
                <?php endif; ?>
            </div>
            <?php
        }
    }

}