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

    public function validate_register_form( $username, $email, $validation_errors ): void
    {
        if ( ! isset( $_POST['rrb2b_reg_form_nonce'] ) ||
                ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' ) ) {
            return;
        }

        $data = wp_unslash( $_POST );

        foreach ( CustomerFields::get_fields() as $name => $field ) {
            if ( $field['required'] && empty( $data[ $name ] ) ) {
                $validation_errors->add(
                        "{$name}_error",
                        sprintf( __( '%s skal udfyldes!', 'woo-roles-rules-b2b' ), $field['label'] )
                );
                continue;
            }

            if ( ! empty( $field['custom'] ) && ! empty( $data[ $name ] ) ) {
                match ( $field['custom'] ) {
                    'cvr'    => $this->validate_cvr( $data[ $name ], $validation_errors ),
                    'postal' => $this->validate_postal( $data[ $name ], $validation_errors ),
                    default  => null,
                };
            }
        }

        if ( $validation_errors->has_errors() && WC()->session ) {
            WC()->session->set( 'registration_form_data', $data );
        }
    }

    public function save_register_form_data( int $customer_id ): void
    {
        $is_checkout = str_contains(
                sanitize_text_field( $_SERVER['HTTP_REFERER'] ?? '' ), 'checkout'
        );

        if ( ! $is_checkout && (
                        ! isset( $_POST['rrb2b_reg_form_nonce'] ) ||
                        ! wp_verify_nonce( sanitize_text_field( $_POST['rrb2b_reg_form_nonce'] ), 'rrb2b_reg_form' )
                ) ) {
            error_log( 'RRB2B: Nonce verification failed on My Account registration.' );
            return;
        }

        $data = wp_unslash( $_POST );

        foreach ( CustomerFields::get_fields() as $name => $field ) {
            if ( ! isset( $data[ $name ] ) ) continue;

            $value = sanitize_text_field( $data[ $name ] );

            foreach ( $field['meta_keys'] as $meta_key ) {
                update_user_meta( $customer_id, $meta_key, $value );
            }
        }

        update_user_meta( $customer_id, 'billing_country', 'DK' );
    }

    public function register_form(): void
    {
        $data = [];

        if ( WC()->session ) {
            $data = WC()->session->get( 'registration_form_data' ) ?? [];
            if ( $data ) WC()->session->__unset( 'registration_form_data' );
        }

        if ( empty( $data ) && isset( $_POST['rrb2b_reg_form_nonce'] ) &&
                wp_verify_nonce( $_POST['rrb2b_reg_form_nonce'], 'rrb2b_reg_form' ) ) {
            $data = wp_unslash( $_POST );
        }

        wp_nonce_field( 'rrb2b_reg_form', 'rrb2b_reg_form_nonce' );

        foreach ( CustomerFields::get_fields() as $name => $field ) {
            $value    = esc_attr( $data[ $name ] ?? '' );
            $required = $field['required'] ? 'required' : '';
            ?>
            <p class="form-row form-row-<?= esc_attr( $field['row'] ) ?>">
                <label for="reg_<?= esc_attr( $name ) ?>">
                    <?= esc_html( $field['label'] ) ?>
                    <?php if ( $field['required'] ) : ?>
                        <span class="required">*</span>
                    <?php endif ?>
                </label>
                <input
                        <?= $required ?>
                        type="<?= esc_attr( $field['type'] ) ?>"
                        class="input-text"
                        name="<?= esc_attr( $name ) ?>"
                        id="reg_<?= esc_attr( $name ) ?>"
                        value="<?= $value ?>"
                        autocomplete="on"
                />
            </p>
            <?php
        }
    }

    private function validate_cvr( string $value, $validation_errors ): void
    {
        $cvr = trim( $value );

        if ( ! preg_match( '/^\d{8}$/', $cvr ) ) {
            $validation_errors->add( 'company_cvr_error', __( 'CVR skal være præcis 8 cifre!', 'woo-roles-rules-b2b' ) );
        } elseif ( ! $this->passes_modulus11( $cvr ) ) {
            $validation_errors->add( 'company_cvr_error', __( 'Ugyldigt CVR-nummer!', 'woo-roles-rules-b2b' ) );
        }
    }

    private function validate_postal( string $value, $validation_errors ): void
    {
        if ( strlen( trim( $value ) ) < 4 ) {
            $validation_errors->add( 'company_postal_error', __( 'Postnummer skal indeholde 4 cifre!', 'woo-roles-rules-b2b' ) );
        }
    }

    private function passes_modulus11( string $cvr ): bool
    {
        $weights = [ 2, 7, 6, 5, 4, 3, 2, 1 ];
        $sum     = 0;

        for ( $i = 0; $i < 8; $i++ ) {
            $sum += (int) $cvr[ $i ] * $weights[ $i ];
        }

        return $sum % 11 === 0;
    }
}