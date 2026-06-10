<?php

namespace ClypperTechnology\ClypperCvr\includes;

defined( 'ABSPATH' ) || exit;

class Checkout
{
    public function __construct()
    {
        add_action( 'woocommerce_checkout_before_customer_details', [ $this, 'add_invoice_email_field' ] );
        add_action( 'woocommerce_after_order_notes',                [ $this, 'add_checkout_fields' ] );
        add_action( 'woocommerce_checkout_process',                 [ $this, 'validate_checkout_fields' ] );
        add_action( 'woocommerce_checkout_update_order_meta',       [ $this, 'save_checkout_fields' ] );
        add_action( 'wp_enqueue_scripts',                           [ $this, 'enqueue_checkout_script' ] );
    }

    public function add_invoice_email_field(): void
    {
        if ( ! is_user_logged_in() ) return;

        $invoice_email = get_user_meta( get_current_user_id(), CustomerFields::INVOICE_EMAIL, true );
        $edit_url      = wc_get_account_endpoint_url( 'edit-account' );
        ?>
        <div id="invoice-email-field">
            <h3><?= esc_html__( 'Faktura e-mail' ) ?></h3>
            <p><?= esc_html__( 'Din faktura e-mail bruges udelukkende ved fakturakøb, hvor vi også sender fakturaen direkte til dit bogholderi.' ) ?></p>
            <?php if ( empty( $invoice_email ) ) : ?>
                <p class="form-row form-row-wide">
                    <em>
                        <?= esc_html__( 'Du har ikke sat en faktura e-mail endnu.' ) ?>
                        <a href="<?= esc_url( $edit_url ) ?>"><?= esc_html__( 'Tilføj den på din profilside' ) ?></a>
                        <?= esc_html__( 'før du gennemfører købet.' ) ?>
                    </em>
                </p>
            <?php else : ?>
                <p class="form-row form-row-wide">
                    <label for="invoice_email"><?= esc_html__( 'Faktura e-mail' ) ?></label>
                    <input
                            type="email"
                            class="input-text"
                            name="invoice_email"
                            id="invoice_email"
                            value="<?= esc_attr( $invoice_email ) ?>"
                            readonly
                    />
                    <span class="description">
                        <?= esc_html__( 'Du kan ændre faktura e-mail på din ' ) ?>
                        <a href="<?= esc_url( $edit_url ) ?>"><?= esc_html__( 'profilside' ) ?></a>.
                    </span>
                </p>
            <?php endif ?>
        </div>
        <?php
    }

    public function add_checkout_fields( $checkout ): void
    {
        if ( ! $this->should_display_fields() ) return;

        $persondatapolitik_link = "<a href='/privatlivspolitik/'>persondatapolitik</a>";
        ?>
        <div id="cvr-checkout-field">
            <h2><?= esc_html__( 'Indregistrering af trailer' ) ?></h2>
            <p><?= esc_html__( 'Du har lagt en nummerplade i din kurv, og derfor skal vi bruge enten et CVR- eller CPR-nummer til at indregistrere traileren. Repræsenterer du et firma, kan du angive firmaets CVR-nummer længere oppe på siden.' ) ?></p>
            <?php
            woocommerce_form_field( 'cpr_number', [
                    'type'        => 'text',
                    'class'       => [ 'form-row-wide' ],
                    'label'       => __( 'CPR-Nummer' ),
                    'placeholder' => '123456-1234',
                    'required'    => true,
            ], $checkout->get_value( 'cpr_number' ) );

            woocommerce_form_field( 'user_agreement', [
                    'type'     => 'checkbox',
                    'class'    => [ 'form-row-wide' ],
                    'label'    => __( 'Jeg bekræfter hermed at Trekantens-Trailercenter.dk må bruge mit CPR-Nummer til at indregistrere min trailer, og at mit CPR-Nummer bliver behandlet som beskrevet i Trekantens-trailercenter.dks ' ) . $persondatapolitik_link,
                    'required' => true,
            ], $checkout->get_value( 'user_agreement' ) );
            ?>
            <input type="hidden" id="is_cpr_required" name="is_cpr_required" value="1" />
        </div>
        <?php
    }

    public function validate_checkout_fields(): void
    {
        if ( ! $this->should_display_fields() ) return;
        if ( ! isset( $_POST['is_cpr_required'] ) || $_POST['is_cpr_required'] !== '1' ) return;

        if ( empty( $_POST['cpr_number'] ) ) {
            wc_add_notice( __( 'Indtast dit CPR-Nummer.' ), 'error' );
        } elseif ( ! preg_match( '/^\d{6}-\d{4}$/', sanitize_text_field( $_POST['cpr_number'] ) ) ) {
            wc_add_notice( __( 'Ugyldigt CPR-Nummer. Følg dette format: 123456-1234.' ), 'error' );
        }

        if ( empty( $_POST['user_agreement'] ) ) {
            wc_add_notice( __( 'Bekræft at du giver samtykke til at dele dit CPR-Nummer med os.' ), 'error' );
        }
    }

    public function save_checkout_fields( $order_id ): void
    {
        if ( ! $this->should_display_fields() ) return;

        update_post_meta( $order_id, 'CPR Number', sanitize_text_field( $_POST['cpr_number'] ) );
    }

    public function enqueue_checkout_script(): void
    {
        if ( ! is_checkout() || ! $this->should_display_fields() ) return;

        wp_enqueue_script(
                'clypper-custom-checkout',
                plugin_dir_url( __FILE__ ) . '../assets/js/clypper-custom-checkout.js',
                [ 'jquery' ],
                CAS_CVR_VERSION,
                true
        );
    }

    private function should_display_fields(): bool
    {
        foreach ( WC()->cart->get_cart() as $cart_item ) {
            if ( $cart_item['data']->get_sku() == '1' ) return true;
        }
        return false;
    }
}