import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { Role } from '../types';

interface UseRolesReturn {
    roles: Role[];
    isLoading: boolean;
    createRole: (roleData: Partial<Role>) => Promise<Role>;
    deleteRole: (slug: string) => Promise<void>;
    refetch: () => Promise<void>;
}

export const useRoles = (): UseRolesReturn => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { createSuccessNotice, createErrorNotice } = useDispatch(noticesStore);

    const fetchRoles = async (): Promise<void> => {
        setIsLoading(true);
        try {
            const data = await apiFetch<Role[]>({
                path: '/rrb2b/v1/roles',
                method: 'GET'
            });
            setRoles(data);
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            createErrorNotice(`Failed to load roles: ${message}`);
            console.error('Error fetching roles:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRoles();
    }, []);

    const createRole = async (roleData: Partial<Role>): Promise<Role> => {
        try {
            // Transform data to match REST API parameter names
            const apiData = {
                role_name: roleData.name,
                role_slug: roleData.slug,
                role_cap: (roleData as any).baseCap || 'customer', // Use provided baseCap or default to customer
            };

            const response = await apiFetch<{ role: Role }>({
                path: '/rrb2b/v1/roles',
                method: 'POST',
                data: apiData,
            });

            const newRole = response.role;
            setRoles([...roles, newRole]);
            createSuccessNotice('Role created successfully!', { type: 'snackbar' });
            return newRole;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error';
            createErrorNotice(`Failed to create role: ${message}`);
            throw error;
        }
    };

    const deleteRole = async (slug: string): Promise<void> => {
        // Optimistic update
        const oldRoles = [...roles];
        setRoles(roles.filter(r => r.slug !== slug));

        try {
            await apiFetch({
                path: `/rrb2b/v1/roles/${slug}`,
                method: 'DELETE',
            });
            createSuccessNotice('Role deleted successfully!', { type: 'snackbar' });
        } catch (error) {
            // Rollback
            setRoles(oldRoles);
            const message = error instanceof Error ? error.message : 'Unknown error';
            createErrorNotice(`Failed to delete role: ${message}`);
            throw error;
        }
    };

    return {
        roles,
        isLoading,
        createRole,
        deleteRole,
        refetch: fetchRoles,
    };
};
