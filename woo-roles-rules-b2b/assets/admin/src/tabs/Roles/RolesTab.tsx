import { useState, useEffect, createElement } from '@wordpress/element';
import { useRoles } from '../../hooks/useRoles';
import RolesListView from './RolesListView';
import RoleDetailView from './RoleDetailView';

const RolesTab: React.FC = () => {
    // Check URL for pre-selected role
    const urlParams = new URLSearchParams(window.location.search);
    const roleFromUrl = urlParams.get('role');

    const [selectedRoleSlug, setSelectedRoleSlug] = useState<string | null>(roleFromUrl);
    const { roles, isLoading, createRole, deleteRole } = useRoles();

    // Update selected role when URL changes
    useEffect(() => {
        if (roleFromUrl && roleFromUrl !== selectedRoleSlug) {
            setSelectedRoleSlug(roleFromUrl);
        }
    }, [roleFromUrl]);

    // Find the selected role object
    const selectedRole = selectedRoleSlug
        ? roles.find(r => r.slug === selectedRoleSlug)
        : null;

    // Handle role selection
    const handleSelectRole = (slug: string) => {
        setSelectedRoleSlug(slug);
        // Update URL without reload
        const url = new URL(window.location.href);
        url.searchParams.set('role', slug);
        window.history.pushState({}, '', url.toString());
    };

    // Handle back to list
    const handleBack = () => {
        setSelectedRoleSlug(null);
        // Clear role from URL
        const url = new URL(window.location.href);
        url.searchParams.delete('role');
        window.history.pushState({}, '', url.toString());
    };

    // Show detail view if a role is selected
    if (selectedRole) {
        return (
            <RoleDetailView
                role={selectedRole}
                onBack={handleBack}
            />
        );
    }

    // Show list view by default
    return (
        <RolesListView
            roles={roles}
            isLoading={isLoading}
            onSelectRole={handleSelectRole}
            showCreateForm={false}
            showDeleteButton={false}
            showManageRulesButton={true}
        />
    );
};

export default RolesTab;
