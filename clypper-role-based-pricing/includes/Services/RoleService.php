<?php

namespace ClypperTechnology\RolePricing\Services;

use ClypperTechnology\RolePricing\REST\DTOs\RoleDTO;
use ClypperTechnology\RolePricing\Rules\RoleRules;
use WP_User;

defined( 'ABSPATH' ) || exit;

class RoleService
{
    public function __construct() {}

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
     *  asdf
     * @param RoleRules[] $rules
     * @return RoleDTO[]
     */
    public function get_all_roles(array $rules): array {
        //TODO Could be nice to have a user count in the RoleDTO????
        $wp_roles = wp_roles()->get_names();
        $wp_roles['guest'] = 'Guest';
        $roles = [];

        foreach($wp_roles as $role_slug => $role_name) {
            $rule = array_find($rules, fn($rule) => $rule->role_slug == $role_slug);

            if($rule) {
                $roles[] = RoleDTO::from($rule, $role_name);
            } else {
                $roles[] = new RoleDTO(-1, $role_name, $role_slug, false, 0);
            }
        }

        return $roles;
    }

    /**
     * Get user role or 'guest' if user has no role or is not logged in
     *
     * @param WP_User|null $user Optional. User object. Defaults to current user.
     * @return string User role or 'guest'
     */
    public function get_user_role(?WP_User $user = null ): string {
        if ( ! $user ) {
            $user = wp_get_current_user();
        }

        if ( $user->ID === 0 || empty( $user->roles ) ) {
            return 'guest';
        }

        return $user->roles[0];
    }
}