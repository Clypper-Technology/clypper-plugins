<?php

namespace ClypperTechnology\ClypperCvr\includes;

defined( 'ABSPATH' ) || exit;

class Admin
{
    public function __construct()
    {
        add_filter( 'manage_users_columns', array( $this, 'add_cvr_column' ) );
        add_action( 'manage_users_custom_column', array( $this, 'show_cvr_column_content' ), 10, 3 );
        add_action( 'show_user_profile', array( $this, 'show_custom_customer_fields' ) );
        add_action( 'edit_user_profile', array( $this, 'show_custom_customer_fields' ) );
        add_filter( 'wp_new_user_notification_email_admin', [ $this, 'add_company_info_to_admin_email' ], 10, 3 );
        add_action('woocommerce_admin_order_data_after_billing_address', array($this, 'display_fields_in_admin'));
    }



    public function display_fields_in_admin($order): void {

        $cpr_number = get_post_meta($order->get_id(), 'CPR Number', true);

        if ($cpr_number) {
            echo '<p><strong>' . __('CPR Nummer') . ':</strong> ' . esc_html($cpr_number) . '</p>';
        }
    }

    public function add_company_info_to_admin_email( $wp_new_user_notification_email, $user, $blogname )
    {
        $company_cvr  = get_user_meta( $user->ID, CustomerFields::COMPANY_CVR, true );
        $company_type = get_user_meta( $user->ID, CustomerFields::COMPANY_TYPE, true );
        $invoice_email = get_user_meta( $user->ID, CustomerFields::INVOICE_EMAIL, true);

        if ( ! $company_cvr && ! $company_type ) {
            return $wp_new_user_notification_email;
        }

        $company_info = "\n\n" . __( 'Company Information:', 'clypper-role-pricing' ) . "\n";

        if ( $company_cvr ) {
            $company_info .= __( 'CVR Number:', 'clypper-role-pricing' ) . ' ' . $company_cvr . "\n";
        }

        if ( $company_type ) {
            $company_info .= __( 'Industry:', 'clypper-role-pricing' ) . ' ' . $company_type . "\n";
        }

        if ( $invoice_email ) {
            $company_info .= __( 'Faktura e-mail:', 'clypper-role-pricing' ) . ' ' . $invoice_email . "\n";
        }

        $wp_new_user_notification_email['message'] .= $company_info;

        return $wp_new_user_notification_email;
    }

    public function show_custom_customer_fields( $user ): void {
        $company_name = get_user_meta( $user->ID, CustomerFields::COMPANY_NAME, true );
        $company_cvr = get_user_meta( $user->ID, CustomerFields::COMPANY_CVR, true );
        $company_type = get_user_meta( $user->ID, CustomerFields::COMPANY_TYPE, true );

        // Only show if user has company information
        if ( $company_name || $company_cvr || $company_type ) {
            ?>
            <h3>Virksomhedsoplysninger</h3>
            <table class="form-table">
                <?php if ( $company_name ) : ?>
                    <tr>
                        <th><label>Virksomhedsnavn</label></th>
                        <td><?php echo esc_html( $company_name ); ?></td>
                    </tr>
                <?php endif; ?>

                <?php if ( $company_cvr ) : ?>
                    <tr>
                        <th><label>CVR Nummer'</label></th>
                        <td><?php echo esc_html( $company_cvr ); ?></td>
                    </tr>
                <?php endif; ?>

                <?php if ( $company_type ) : ?>
                    <tr>
                        <th><label>Industri</label></th>
                        <td><?php echo esc_html( $company_type ); ?></td>
                    </tr>
                <?php endif; ?>
            </table>
            <?php
        }
    }

    public function add_cvr_column( $columns ) {
        $columns[CustomerFields::COMPANY_CVR] = 'CVR';
        return $columns;
    }

    public function show_cvr_column_content( $value, $column_name, $user_id ) {
        if ( $column_name === CustomerFields::COMPANY_CVR ) {
            return get_user_meta( $user_id, CustomerFields::COMPANY_CVR, true );
        }
        return $value;
    }
}