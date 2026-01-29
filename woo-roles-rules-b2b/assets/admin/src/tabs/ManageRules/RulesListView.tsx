import { Spinner, Card, CardBody, Button } from '@wordpress/components';
import type { Role } from '../../types';

interface RulesListViewProps {
    roles: Role[];
    isLoading: boolean;
    onSelectRole: (slug: string) => void;
}

const RulesListView: React.FC<RulesListViewProps> = ({ roles, isLoading, onSelectRole }) => {
    if (isLoading) {
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Spinner />
                <p>Loading roles...</p>
            </div>
        );
    }

    return (
        <div className="crp-rules-list-view" style={{ marginTop: '20px' }}>
            <div style={{ marginBottom: '20px' }}>
                <h2>Pricing Rules Management</h2>
                <p>
                    Select a role to configure its pricing rules, discounts, and category-specific settings.
                </p>
            </div>

            <Card>
                <CardBody>
                    <h3>All Roles</h3>
                    <table className="wp-list-table widefat fixed striped">
                        <thead>
                            <tr>
                                <th style={{ width: '35%' }}>Role Name</th>
                                <th style={{ width: '25%' }}>Slug</th>
                                <th style={{ width: '15%' }}>Users</th>
                                <th style={{ width: '25%' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                                        No roles found. Create roles in the "Manage Roles" tab first.
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
                                            <Button
                                                variant="primary"
                                                onClick={() => onSelectRole(role.slug)}
                                            >
                                                Manage Pricing Rules →
                                            </Button>
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

export default RulesListView;
