<?php

namespace ClypperTechnology\RolePricing\Services;

defined( 'ABSPATH' ) || exit;

class RoleService
{
    public function __construct()
    {
    }

    /**
     * Count users for role
     *
     * @param $role
     * @return int|string
     */
    public function users_in_role( $role ): int|string
    {
        $users = count_users();

        return $users['avail_roles'][ $role['name'] ] ?? 0;
    }

    /**
     * Add role (like VIP Customer)
     */
    public function add_role( $data ): void {
        $logger   = wc_get_logger();
        $context  = array( 'source' => 'rrb2b-role-log' );
        $wp_roles = wp_roles();
        $name     = sanitize_text_field( $data['role-name'] );
        $slug     = sanitize_title( $data['role-slug'] );
        $cap      = sanitize_text_field( $data['role-cap'] );

        if ( empty( $name ) || empty( $slug ) ) {
            $logger->warning( 'Missing role name or slug.', $context );
            return;
        }

        // Check if role already exists
        if ( get_role( $slug ) ) {
            $logger->info( 'Role "' . $slug . '" already exists.', $context );
            return;
        }

        // Validate capability base role
        $cap_role = get_role( $cap );
        if ( ! $cap_role ) {
            $logger->error( 'Base capability role "' . $cap . '" not found.', $context );
            return;
        }

        $result = $wp_roles->add_role( $slug, $name, $cap_role->capabilities );

        if ( null === $result ) {
            $logger->error( 'Failed to add role "' . $slug . '".', $context );
        } else {
            $logger->info( 'Role "' . $slug . '" successfully added.', $context );
        }
    }

    public function get_roles() {
        // From rrb2b_get_roles() method
        $wp_roles = wp_roles();
        $roles = $wp_roles->roles;
        $cap_roles = array( 'administrator', 'editor', 'author', 'contributor', 'subscriber', 'customer', 'shop_manager' );

        if ( ! $wp_roles->is_role( 'rrb2b_pending' ) ) {
            $wp_roles->add_role( 'rrb2b_pending', __( 'Pending (no rights)', 'woo-roles-rules-b2b' ), array() );
        }
    }
}