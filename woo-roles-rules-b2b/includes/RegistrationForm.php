<?php

namespace ClypperTechnology\RolePricing;

class RegistrationForm
{
    public function __construct()
    {
        add_action( 'woocommerce_register_post', array( $this, 'validate_register_form' ), 10, 3 );
        add_action( 'woocommerce_created_customer', array( $this, 'save_register_form_data' ) );
        add_action( 'woocommerce_register_form_start', array( $this, 'register_form' ) );
    }

    /**
     * Validate register form
     */
    public function validate_register_form( $username, $email, $validation_errors ): void {

        if ( ! isset( $_POST['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' ) ) {
            return;
        }

        $data      = wp_unslash( $_POST );
        $this->validate_registration_form( $username, $email, $validation_errors, $data );

        // ADD THIS: Store form data if there are validation errors
        if ( $validation_errors->has_errors() && WC()->session ) {
            WC()->session->set( 'registration_form_data', $data );
        }
    }

    /**
     * Save register form data
     */
    public function save_register_form_data( $customer_id ): void {

        $referrer = isset( $_SERVER['HTTP_REFERER'] ) ? sanitize_text_field( $_SERVER['HTTP_REFERER'] ) : 'unknown';

        // Check if registration comes from WooCommerce checkout
        $is_checkout_registration = ( strpos( $referrer, 'checkout' ) !== false );

        if ( ! $is_checkout_registration ) { // Skip nonce check for checkout
            if ( ! isset( $_POST['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' ) ) {
                error_log('RRB2B: Nonce verification failed on My Account registration.');
                return;
            }
        }

        $data      = wp_unslash( $_POST );

        $this->save_registration_form( $customer_id, $data );
    }

    /**
     * Add register form
     */
    public function register_form(): void {
        $data = array();

        // First priority: Check for stored data from validation errors
        if ( WC()->session ) {
            $stored_data = WC()->session->get( 'registration_form_data' );
            if ( $stored_data ) {
                $data = $stored_data;
                // Clear after use
                WC()->session->__unset( 'registration_form_data' );
            }
        }

        // Secondary: If this is a direct POST (shouldn't happen with validation errors)
        if ( empty( $data ) && isset( $_POST['rrb2b_reg_form_nonce'] ) &&
            wp_verify_nonce( $_POST['rrb2b_reg_form_nonce'], 'rrb2b_reg_form' ) ) {
            $data = wp_unslash( $_POST );
        }

        $this->create_registration_form( $data );
    }

    /**
     * Create registration form
     */
    private function create_registration_form( $data ): void {

        wp_nonce_field( 'rrb2b_reg_form', 'rrb2b_reg_form_nonce' );
        ?>

        <p class="form-row form-row-first">
            <label for="reg_first_name">Fornavn
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="text" class="input-text" name="first_name" id="reg_first_name" value="<?php echo esc_attr($data['first_name'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-last">
            <label for="reg_last_name">Efternavn
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="text" class="input-text" name="last_name" id="reg_last_name" value="<?php echo esc_attr($data['last_name'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-wide">
            <label for="reg_phone">Telenfonnummer
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="tel" class="input-text" name="phone" id="reg_phone" value="<?php echo esc_attr($data['phone'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-wide">
            <label for="reg_company_name">Firmanavn
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="text" class="input-text" name="company_name" id="reg_company_name" value="<?php echo esc_attr($data['company_name'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-first">
            <label for="reg_company_type">Branche
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="text" class="input-text" name="company_type" id="reg_company_type" value="<?php echo esc_attr($data['company_type'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-last">
            <label for="reg_company_cvr">CVR
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="number" class="input-text" name="company_cvr" id="reg_company_cvr" value="<?php echo esc_attr($data['company_cvr'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-wide">
            <label for="reg_company_address">Firmaadresse
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="text" class="input-text" name="company_address" id="reg_company_address" value="<?php echo esc_attr($data['company_address'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-first">
            <label for="reg_company_city">By
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="text" class="input-text" name="company_city" id="reg_company_city" value="<?php echo esc_attr($data['company_city'] ?? ''); ?>" />
        </p>

        <p class="form-row form-row-last">
            <label for="reg_company_postal">Postnummer
                <span class="required">*</span>
            </label>
            <input required autocomplete="on" type="number" class="input-text" name="company_postal" id="reg_company_postal" value="<?php echo esc_attr($data['company_postal'] ?? ''); ?>" />
        </p>

        <?php

    }

    /**
     * Validate registration form
     */
    private function validate_registration_form( $username, $email, $validation_errors, $data ): void
    {
        $logger  = $this->logger;
        $context = $this->context;

        // Verify nonce
        if ( ! isset( $data['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( $data['rrb2b_reg_form_nonce'], 'rrb2b_reg_form' ) ) {
            $validation_errors->add( 'nonce_error', __( 'Nonce verification failed.', 'woo-roles-rules-b2b' ) );
            $logger->info( 'Nonce error in registration form (validate reg form)', $context );
            return;
        }

        if ( empty( $data['first_name'] ) ) {
            $validation_errors->add( 'first_name_error', __( 'Fornavn skal udfyldes!', 'woo-roles-rules-b2b' ) );
        }

        if ( empty( $data['last_name'] ) ) {
            $validation_errors->add( 'last_name_error', __( 'Efternavn skal udfyldes!', 'woo-roles-rules-b2b' ) );
        }

        if ( empty( $data['phone'] ) ) {
            $validation_errors->add( 'phone_error', __( 'Telefonnummer skal udfyldes!', 'woo-roles-rules-b2b' ) );
        }

        if ( empty( $data['company_name'] ) ) {
            $validation_errors->add( 'company_name_error', __( 'Firmanavn skal udfyldes!', 'woo-roles-rules-b2b' ) );
        }

        if ( empty( $data['company_type'] ) ) {
            $validation_errors->add( 'company_type_error', __( 'Branche skal udfyldes!', 'woo-roles-rules-b2b' ) );
        }

        if ( empty( $data['company_cvr'] ) ) {
            $validation_errors->add( 'company_cvr_error', __( 'CVR skal udfyldes!', 'woo-roles-rules-b2b' ) );
        } else {
            $cvr = trim( $data['company_cvr'] );

            // Check if exactly 8 digits
            if ( !preg_match('/^\d{8}$/', $cvr) ) {
                $validation_errors->add( 'company_cvr_error', __( 'CVR skal være præcis 8 cifre!', 'woo-roles-rules-b2b' ) );
            } else {
                // Modulus 11 validation
                if ( !$this->validate_cvr_modulus11( $cvr ) ) {
                    $validation_errors->add( 'company_cvr_error', __( 'Ugyldigt CVR-nummer!', 'woo-roles-rules-b2b' ) );
                }
            }
        }

        if ( empty( $data['company_address'] ) ) {
            $validation_errors->add( 'company_address_error', __( 'Firmaadresse skal udfyldes!', 'woo-roles-rules-b2b' ) );
        }

        if ( empty( $data['company_city'] ) ) {
            $validation_errors->add( 'company_city_error', __( 'By skal udfyldes!', 'woo-roles-rules-b2b' ) );
        }

        if ( empty( $data['company_postal'] ) ) {
            $validation_errors->add( 'company_postal_error', __( 'Postnummer skal udfyldes!', 'woo-roles-rules-b2b' ) );
        } else {
            $postal_number = $data['company_postal'];

            if(strlen($postal_number) < 4) {
                $validation_errors->add( 'company_postal_error', __( 'Postnummer skal indeholde 4 cifre!', 'woo-roles-rules-b2b' ) );
            }
        }
    }

    private function validate_cvr_modulus11( $cvr ): bool
    {
        $weights = [2, 7, 6, 5, 4, 3, 2, 1];
        $sum = 0;

        for ( $i = 0; $i < 8; $i++ ) {
            $sum += (int)$cvr[$i] * $weights[$i];
        }

        return $sum % 11 === 0;
    }

    /**
     * Save registration form data
     */
    private function save_registration_form( $customer_id, $data ): void {
        if ( isset( $data['first_name'] ) ) {
            update_user_meta( $customer_id, 'first_name', sanitize_text_field( $data['first_name'] ) );
            update_user_meta( $customer_id, 'billing_first_name', sanitize_text_field( $data['first_name'] ) );
        }

        if ( isset( $data['last_name'] ) ) {
            update_user_meta( $customer_id, 'last_name', sanitize_text_field( $data['last_name'] ) );
            update_user_meta( $customer_id, 'billing_last_name', sanitize_text_field( $data['last_name'] ) );
        }

        if ( isset( $data['phone'] ) ) {
            update_user_meta( $customer_id, 'phone', sanitize_text_field( $data['phone'] ) );
            update_user_meta( $customer_id, 'billing_phone', sanitize_text_field( $data['phone'] ) );
        }

        // Company Information
        if ( isset( $data['company_name'] ) ) {
            update_user_meta( $customer_id, 'company_name', sanitize_text_field( $data['company_name'] ) );
            update_user_meta( $customer_id, 'billing_company', sanitize_text_field( $data['company_name'] ) );
        }

        if ( isset( $data['company_type'] ) ) {
            update_user_meta( $customer_id, 'company_type', sanitize_text_field( $data['company_type'] ) );
        }

        if ( isset( $data['company_cvr'] ) ) {
            update_user_meta( $customer_id, 'company_cvr', sanitize_text_field( $data['company_cvr'] ) );
        }

        // Address Information
        if ( isset( $data['company_address'] ) ) {
            update_user_meta( $customer_id, 'company_address', sanitize_text_field( $data['company_address'] ) );
            update_user_meta( $customer_id, 'billing_address_1', sanitize_text_field( $data['company_address'] ) );
        }

        if ( isset( $data['company_city'] ) ) {
            update_user_meta( $customer_id, 'company_city', sanitize_text_field( $data['company_city'] ) );
            update_user_meta( $customer_id, 'billing_city', sanitize_text_field( $data['company_city'] ) );
        }

        if ( isset( $data['company_postal'] ) ) {
            update_user_meta( $customer_id, 'company_postal', sanitize_text_field( $data['company_postal'] ) );
            update_user_meta( $customer_id, 'billing_postcode', sanitize_text_field( $data['company_postal'] ) );
        }

        // Set default country to Denmark since this is a Danish B2B form
        update_user_meta( $customer_id, 'billing_country', 'DK' );
    }
}