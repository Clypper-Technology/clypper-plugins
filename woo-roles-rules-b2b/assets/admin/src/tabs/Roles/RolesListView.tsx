import { useState } from '@wordpress/element';
import { Button, Card, CardBody } from '@wordpress/components';
import { Role } from '../../types';
import RoleCreateForm from './RoleCreateForm';

interface RolesListViewProps {
    roles: Role[];
    isLoading: boolean;
    onCreateRole?: (roleData: Partial<Role>) => Promise<Role>;
    onDeleteRole?: (slug: string) => Promise<void>;
    onSelectRole?: (slug: string) => void;
    showCreateForm?: boolean;
    showDeleteButton?: boolean;
    showManageRulesButton?: boolean;
}

const RolesListView: React.FC<RolesListViewProps> = ({
    roles,
    isLoading,
    onCreateRole,
    onDeleteRole,
    onSelectRole,
    showCreateForm = true,
    showDeleteButton = true,
    showManageRulesButton = true,
}) => {
    const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
    const [cloneFromSlug, setCloneFromSlug] = useState<string | null>(null);

    const handleDelete = async (slug: string, name: string) => {
        if (!onDeleteRole) return;

        if (!confirm(`Are you sure you want to delete the role "${name}"? This will also delete all associated rules.`)) {
            return;
        }

        setDeletingSlug(slug);
        try {
            await onDeleteRole(slug);
        } finally {
            setDeletingSlug(null);
        }
    };

    const handleClone = (slug: string) => {
        setCloneFromSlug(slug);
        // Scroll to create form
        setTimeout(() => {
            document.querySelector('.crp-roles-list-view')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    if (isLoading) {
        return <div>Loading roles...</div>;
    }

    return (
        <div className="crp-roles-list-view">
            <div style={{ marginBottom: '20px' }}>
                <h2>Role Management</h2>
                <p>
                    Create, delete, and clone custom roles for your B2B customers.
                </p>
            </div>

            {showCreateForm && onCreateRole && (
                <div style={{ marginBottom: '30px' }}>
                    <RoleCreateForm
                        onCreate={onCreateRole}
                        allRoles={roles}
                        cloneFrom={cloneFromSlug || undefined}
                    />
                    {cloneFromSlug && (
                        <Button
                            variant="link"
                            onClick={() => setCloneFromSlug(null)}
                            style={{ marginTop: '10px' }}
                        >
                            Cancel Clone
                        </Button>
                    )}
                </div>
            )}

            <Card>
                <CardBody>
                    <h3>All Roles</h3>
                    <table className="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th style={{ width: '30%' }}>Role Name</th>
                                <th style={{ width: '20%' }}>Slug</th>
                                <th style={{ width: '15%' }}>Users</th>
                                <th style={{ width: '35%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                                        {showCreateForm
                                            ? 'No roles found. Create your first role above.'
                                            : 'No roles found.'}
                                    </td>
                                </tr>
                            ) : (
                                roles.map((role) => (
                                    <tr key={role.slug}>
                                        <td>
                                            <strong>{role.name}</strong>
                                        </td>
                                        <td>
                                            <code>{role.slug}</code>
                                        </td>
                                        <td>
                                            {role.user_count ?? 0}
                                        </td>
                                        <td>
                                            {showManageRulesButton && onSelectRole && (
                                                <Button
                                                    variant="primary"
                                                    onClick={() => onSelectRole(role.slug)}
                                                    style={{ marginRight: '8px' }}
                                                >
                                                    Manage Rules
                                                </Button>
                                            )}
                                            {showCreateForm && onCreateRole && (
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => handleClone(role.slug)}
                                                    style={{ marginRight: '8px' }}
                                                >
                                                    Clone
                                                </Button>
                                            )}
                                            {showDeleteButton && onDeleteRole && (
                                                <Button
                                                    variant="secondary"
                                                    isDestructive
                                                    onClick={() => handleDelete(role.slug, role.name)}
                                                    isBusy={deletingSlug === role.slug}
                                                    disabled={deletingSlug === role.slug}
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </CardBody>
            </Card>
        </div>
    );
};

export default RolesListView;
