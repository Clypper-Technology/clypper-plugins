import { Spinner } from '@wordpress/components';
import RuleRow from './RuleRow';
import { Rule } from '../../types';

interface RulesTableProps {
    rules: Rule[];
    isLoading: boolean;
    onUpdate: (id: number, updates: Partial<Rule>) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onToggleActive: (id: number) => Promise<void>;
}

const RulesTable: React.FC<RulesTableProps> = ({
    rules,
    isLoading,
    onUpdate,
    onDelete,
    onToggleActive
}) => {
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                <Spinner />
            </div>
        );
    }

    if (rules.length === 0) {
        return (
            <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '4px' }}>
                <p style={{ margin: 0, color: '#757575' }}>
                    No rules found. Create your first rule using the form above.
                </p>
            </div>
        );
    }

    return (
        <div className="wrap">
            <table className="wp-list-table widefat fixed striped" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th style={{ width: '50px' }}>Active</th>
                        <th style={{ width: '190px' }}>
                            <i className="fas fa-user-tag"></i> Role
                        </th>
                        <th>
                            <i className="fas fa-sliders-h"></i> Rule: General
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rules.map(rule => (
                        <RuleRow
                            key={rule.id}
                            rule={rule}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onToggleActive={onToggleActive}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RulesTable;
