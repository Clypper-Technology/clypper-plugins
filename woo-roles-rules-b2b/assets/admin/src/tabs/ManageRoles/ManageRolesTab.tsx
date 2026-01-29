import { useRoles } from '../../hooks/useRoles';
import RolesListView from '../Roles/RolesListView';

/**
 * ManageRolesTab - Simple role management interface
 * - Create new roles
 * - Delete roles
 * - Clone roles (create based on another's capabilities)
 */
const ManageRolesTab: React.FC = () => {
    const { roles, isLoading, createRole, deleteRole } = useRoles();

    return (
        <RolesListView
            roles={roles}
            isLoading={isLoading}
            onSelectRole={() => {}} // No navigation to detail view
            showCreateForm={true}
            showDeleteButton={true}
            showManageRulesButton={false}
            onCreateRole={createRole}
            onDeleteRole={deleteRole}
        />
    );
};

export default ManageRolesTab;
