<?php

namespace ClypperTechnology\RolePricing;

defined( 'ABSPATH' ) || exit;

class Users
{
    public function __construct()
    {
        // Add CVR column to admin users list
        add_filter( 'manage_users_columns', array( $this, 'add_cvr_column' ) );
        add_action( 'manage_users_custom_column', array( $this, 'show_cvr_column_content' ), 10, 3 );
        add_action( 'woocommerce_account_dashboard', array( $this, 'display_company_info_dashboard' ) );

        // Add custom fields to admin user edit page
        add_action( 'show_user_profile', array( $this, 'show_custom_customer_fields' ) );
        add_action( 'edit_user_profile', array( $this, 'show_custom_customer_fields' ) );
    }

    public function show_custom_customer_fields( $user ): void {
        $company_name = get_user_meta( $user->ID, 'company_name', true );
        $company_cvr = get_user_meta( $user->ID, 'company_cvr', true );
        $company_type = get_user_meta( $user->ID, 'company_type', true );

        // Only show if user has company information
        if ( $company_name || $company_cvr || $company_type ) {
            ?>
            <h3><?php _e( 'Virksomhedsoplysninger', 'clypper-role-pricing' ); ?></h3>
            <table class="form-table">
                <?php if ( $company_name ) : ?>
                    <tr>
                        <th><label><?php _e( 'Virksomhedsnavn', 'clypper-role-pricing' ); ?></label></th>
                        <td><?php echo esc_html( $company_name ); ?></td>
                    </tr>
                <?php endif; ?>

                <?php if ( $company_cvr ) : ?>
                    <tr>
                        <th><label><?php _e( 'CVR Nummer', 'clypper-role-pricing' ); ?></label></th>
                        <td><?php echo esc_html( $company_cvr ); ?></td>
                    </tr>
                <?php endif; ?>

                <?php if ( $company_type ) : ?>
                    <tr>
                        <th><label><?php _e( 'Industri', 'clypper-role-pricing' ); ?></label></th>
                        <td><?php echo esc_html( $company_type ); ?></td>
                    </tr>
                <?php endif; ?>
            </table>
            <?php
        }
    }

    public function add_cvr_column( $columns ) {
        $columns['company_cvr'] = __( 'CVR', 'clypper-role-pricing' );
        return $columns;
    }

    public function show_cvr_column_content( $value, $column_name, $user_id ) {
        if ( $column_name === 'company_cvr' ) {
            return get_user_meta( $user_id, 'company_cvr', true );
        }
        return $value;
    }

    public function display_company_info_dashboard(): void {
        $customer_id = get_current_user_id();
        $company_cvr = get_user_meta( $customer_id, 'company_cvr', true );
        $company_type = get_user_meta( $customer_id, 'company_type', true );

        if ( $company_cvr || $company_type ) {
            ?>
            <div class="woocommerce-MyAccount-content">
                <h3><?php _e( 'Virksomhedsoplysninger', 'clypper-role-pricing' ); ?></h3>
                <?php if ( $company_cvr ) : ?>
                    <p><strong><?php _e( 'CVR:', 'clypper-role-pricing' ); ?></strong> <?php echo esc_html( $company_cvr ); ?></p>
                <?php endif; ?>
                <?php if ( $company_type ) : ?>
                    <p><strong><?php _e( 'Industri:', 'clypper-role-pricing' ); ?></strong> <?php echo esc_html( $company_type ); ?></p>
                <?php endif; ?>
            </div>
            <?php
        }
    }

}