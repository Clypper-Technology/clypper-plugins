<?php

namespace ClypperTechnology\ClypperCvr\includes;

defined( 'ABSPATH' ) || exit;

class RegistrationForm
{
    public function __construct()
    {
        add_action( 'woocommerce_register_post', array( $this, 'validate_register_form' ), 10, 3 );
        add_action( 'woocommerce_created_customer', array( $this, 'save_register_form_data' ) );
        add_action( 'woocommerce_register_form_start', array( $this, 'register_form' ) );
    }

    /**
     * Field configuration — single source of truth for form, validation, and saving.
     *
     * Keys:
     *   label      — Human-readable Danish label
     *   type       — HTML input type
     *   row        — WooCommerce form-row class suffix (first, last, wide)
     *   required   — Whether the field is required
     *   meta_keys  — User meta keys to save the value to
     *   custom     — Optional custom validation rule (cvr, postal)
     */
    private function get_fields(): array {
        return [
                'first_name'      => [
                        'label'     => 'Fornavn',
                        'type'      => 'text',
                        'row'       => 'first',
                        'required'  => true,
                        'meta_keys' => [ 'first_name', 'billing_first_name' ],
                ],
                'last_name'       => [
                        'label'     => 'Efternavn',
                        'type'      => 'text',
                        'row'       => 'last',
                        'required'  => true,
                        'meta_keys' => [ 'last_name', 'billing_last_name' ],
                ],
                'phone'           => [
                        'label'     => 'Telefonnummer',
                        'type'      => 'tel',
                        'row'       => 'wide',
                        'required'  => true,
                        'meta_keys' => [ 'phone', 'billing_phone' ],
                ],
                'company_name'    => [
                        'label'     => 'Firmanavn',
                        'type'      => 'text',
                        'row'       => 'wide',
                        'required'  => true,
                        'meta_keys' => [ 'company_name', 'billing_company' ],
                ],
                'company_type'    => [
                        'label'     => 'Branche',
                        'type'      => 'text',
                        'row'       => 'first',
                        'required'  => true,
                        'meta_keys' => [ 'company_type' ],
                ],
                'company_cvr'     => [
                        'label'     => 'CVR',
                        'type'      => 'number',
                        'row'       => 'last',
                        'required'  => true,
                        'meta_keys' => [ 'company_cvr' ],
                        'custom'    => 'cvr',
                ],
                'company_address' => [
                        'label'     => 'Firmaadresse',
                        'type'      => 'text',
                        'row'       => 'wide',
                        'required'  => true,
                        'meta_keys' => [ 'company_address', 'billing_address_1' ],
                ],
                'company_city'    => [
                        'label'     => 'By',
                        'type'      => 'text',
                        'row'       => 'first',
                        'required'  => true,
                        'meta_keys' => [ 'company_city', 'billing_city' ],
                ],
                'company_postal'  => [
                        'label'     => 'Postnummer',
                        'type'      => 'number',
                        'row'       => 'last',
                        'required'  => true,
                        'meta_keys' => [ 'company_postal', 'billing_postcode' ],
                        'custom'    => 'postal',
                ],
        ];
    }

    /**
     * Validate register form (public hook callback)
     */
    public function validate_register_form( $username, $email, $validation_errors ): void {
        if ( ! isset( $_POST['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' ) ) {
            return;
        }

        $data = wp_unslash( $_POST );
        $this->validate_registration_form( $username, $email, $validation_errors, $data );

        if ( $validation_errors->has_errors() && WC()->session ) {
            WC()->session->set( 'registration_form_data', $data );
        }
    }

    /**
     * Save register form data (public hook callback)
     */
    public function save_register_form_data( $customer_id ): void {
        $referrer = isset( $_SERVER['HTTP_REFERER'] ) ? sanitize_text_field( $_SERVER['HTTP_REFERER'] ) : 'unknown';
        $is_checkout_registration = (str_contains($referrer, 'checkout'));

        if ( ! $is_checkout_registration ) {
            if ( ! isset( $_POST['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' ) ) {
                error_log( 'RRB2B: Nonce verification failed on My Account registration.' );
                return;
            }
        }

        $this->save_registration_form( $customer_id, wp_unslash( $_POST ) );
    }

    /**
     * Render register form (public hook callback)
     */
    public function register_form(): void {
        $data = [];

        if ( WC()->session ) {
            $stored_data = WC()->session->get( 'registration_form_data' );
            if ( $stored_data ) {
                $data = $stored_data;
                WC()->session->__unset( 'registration_form_data' );
            }
        }

        if ( empty( $data ) && isset( $_POST['rrb2b_reg_form_nonce'] ) &&
                wp_verify_nonce( $_POST['rrb2b_reg_form_nonce'], 'rrb2b_reg_form' ) ) {
            $data = wp_unslash( $_POST );
        }

        $this->create_registration_form( $data );
    }

    /**
     * Render all form fields from config
     */
    private function create_registration_form( $data ): void {
        wp_nonce_field( 'rrb2b_reg_form', 'rrb2b_reg_form_nonce' );

        foreach ( $this->get_fields() as $name => $field ) {
            $value    = esc_attr( $data[ $name ] ?? '' );
            $required = $field['required'] ? 'required' : '';
            ?>
            <p class="form-row form-row-<?php echo esc_attr( $field['row'] ); ?>">
                <label for="reg_<?php echo esc_attr( $name ); ?>">
                    <?php echo esc_html( $field['label'] ); ?>
                    <?php if ( $field['required'] ) : ?>
                        <span class="required">*</span>
                    <?php endif; ?>
                </label>
                <input
                        <?php echo $required; ?>
                        autocomplete="on"
                        type="<?php echo esc_attr( $field['type'] ); ?>"
                        class="input-text"
                        name="<?php echo esc_attr( $name ); ?>"
                        id="reg_<?php echo esc_attr( $name ); ?>"
                        value="<?php echo $value; ?>"
                />
            </p>
            <?php
        }
    }

    /**
     * Validate all fields from config, dispatching custom rules where defined
     */
    private function validate_registration_form( $username, $email, $validation_errors, $data ): void {
        if ( ! isset( $data['rrb2b_reg_form_nonce'] ) || ! wp_verify_nonce( $data['rrb2b_reg_form_nonce'], 'rrb2b_reg_form' ) ) {
            $validation_errors->add( 'nonce_error', __( 'Nonce verification failed.', 'woo-roles-rules-b2b' ) );
            return;
        }

        foreach ( $this->get_fields() as $name => $field ) {
            if ( $field['required'] && empty( $data[ $name ] ) ) {
                $validation_errors->add(
                        "{$name}_error",
                        sprintf( __( '%s skal udfyldes!', 'woo-roles-rules-b2b' ), $field['label'] )
                );
                continue;
            }

            if ( ! empty( $field['custom'] ) && ! empty( $data[ $name ] ) ) {
                match ( $field['custom'] ) {
                    'cvr'    => $this->validate_cvr_field( $data[ $name ], $validation_errors ),
                    'postal' => $this->validate_postal_field( $data[ $name ], $validation_errors ),
                    default  => null,
                };
            }
        }
    }

    /**
     * CVR format + modulus-11 check
     */
    private function validate_cvr_field( $value, $validation_errors ): void {
        $cvr = trim( $value );

        if ( ! preg_match( '/^\d{8}$/', $cvr ) ) {
            $validation_errors->add( 'company_cvr_error', __( 'CVR skal være præcis 8 cifre!', 'woo-roles-rules-b2b' ) );
        } elseif ( ! $this->validate_cvr_modulus11( $cvr ) ) {
            $validation_errors->add( 'company_cvr_error', __( 'Ugyldigt CVR-nummer!', 'woo-roles-rules-b2b' ) );
        }
    }

    /**
     * Postal code length check
     */
    private function validate_postal_field( $value, $validation_errors ): void {
        if ( strlen( trim( $value ) ) < 4 ) {
            $validation_errors->add( 'company_postal_error', __( 'Postnummer skal indeholde 4 cifre!', 'woo-roles-rules-b2b' ) );
        }
    }

    /**
     * Modulus-11 algorithm for Danish CVR numbers
     */
    private function validate_cvr_modulus11( $cvr ): bool {
        $weights = [ 2, 7, 6, 5, 4, 3, 2, 1 ];
        $sum     = 0;

        for ( $i = 0; $i < 8; $i++ ) {
            $sum += (int) $cvr[ $i ] * $weights[ $i ];
        }

        return $sum % 11 === 0;
    }

    /**
     * Save all field values to user meta using the config's meta_keys mapping
     */
    private function save_registration_form( $customer_id, $data ): void {
        foreach ( $this->get_fields() as $name => $field ) {
            if ( ! isset( $data[ $name ] ) ) {
                continue;
            }

            $value = sanitize_text_field( $data[ $name ] );

            foreach ( $field['meta_keys'] as $meta_key ) {
                update_user_meta( $customer_id, $meta_key, $value );
            }
        }

        // Always default to Denmark
        update_user_meta( $customer_id, 'billing_country', 'DK' );
    }
}