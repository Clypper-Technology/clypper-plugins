import { useState } from '@wordpress/element';
import { Button, Spinner } from '@wordpress/components';
import ConfirmDialog from '../../components/ConfirmDialog';
import { Role } from '../../types';

interface RolesListProps {
    roles: Role[];
    onDelete: (slug: string) => Promise<void>;
    isLoading: boolean;
}

const RolesList: React.FC<RolesListProps> = ({ roles, onDelete, isLoading }) => {
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; role: Role | null }>({
        isOpen: false,
        role: null
    });

    const handleDeleteClick = (role: Role): void => {
        setDeleteConfirm({ isOpen: true, role });
    };

    const handleConfirmDelete = async (): Promise<void> => {
        if (deleteConfirm.role) {
            try {
                await onDelete(deleteConfirm.role.slug);
            } finally {
                setDeleteConfirm({ isOpen: false, role: null });
            }
        }
    };

    const handleCancelDelete = (): void => {
        setDeleteConfirm({ isOpen: false, role: null });
    };

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <table className="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Role Slug</th>
                        <th>Capabilities</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                                No custom roles found. Create one below.
                            </td>
                        </tr>
                    ) : (
                        roles.map(role => (
                            <tr key={role.slug}>
                                <td><strong>{role.name}</strong></td>
                                <td><code>{role.slug}</code></td>
                                <td>
                                    {role.capabilities && Object.keys(role.capabilities).length > 0
                                        ? Object.keys(role.capabilities).join(', ')
                                        : 'None'
                                    }
                                </td>
                                <td>
                                    <Button
                                        isDestructive
                                        variant="secondary"
                                        onClick={() => handleDeleteClick(role)}
                                        size="small"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            <ConfirmDialog
                isOpen={deleteConfirm.isOpen}
                title="Delete Role"
                message={`Are you sure you want to delete the role "${deleteConfirm.role?.name}"? This action cannot be undone.`}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isDangerous={true}
            />
        </>
    );
};

export default RolesList;
