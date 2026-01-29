import { useState } from '@wordpress/element';
import { Button, Card, CardBody } from '@wordpress/components';
import RoleSelector from '../../components/RoleSelector';
import { Role, Rule } from '../../types';

interface AddRuleFormProps {
    roles: Role[];
    onCreate: (ruleData: Partial<Rule>) => Promise<Rule>;
    preselectedRole?: string;
    existingRule?: Rule | null;
    onUpdate?: (id: number, updates: Partial<Rule>) => Promise<void>;
}

const AddRuleForm: React.FC<AddRuleFormProps> = ({
    roles,
    onCreate,
    preselectedRole,
    existingRule
}) => {
    const [selectedRole, setSelectedRole] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If rule already exists, don't show the create form
    if (existingRule) {
        return (
            <Card>
                <CardBody>
                    <p style={{ margin: 0, color: '#757575', fontSize: '13px' }}>
                        Rule exists for this role. Configure settings in the table below.
                    </p>
                </CardBody>
            </Card>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const roleToUse = preselectedRole || selectedRole;
        if (!roleToUse) return;

        setIsSubmitting(true);
        try {
            await onCreate({
                role: roleToUse,
                rule_type: 'percentage',
                rule_value: '0',
                active: true,
                single_categories: [],
                category_value: '',
            });
            if (!preselectedRole) {
                setSelectedRole('');
            }
        } catch (error) {
            console.error('Failed to create rule:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardBody>
                <h3>Create Rule</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
                    {!preselectedRole && (
                        <div style={{ flex: 1 }}>
                            <RoleSelector
                                value={selectedRole}
                                onChange={setSelectedRole}
                                roles={roles}
                                label="Select Role"
                            />
                        </div>
                    )}
                    <Button
                        variant="primary"
                        type="submit"
                        isBusy={isSubmitting}
                        disabled={(!selectedRole && !preselectedRole) || isSubmitting}
                    >
                        Create Rule
                    </Button>
                </form>
                <p style={{ marginTop: '8px', fontSize: '13px', color: '#757575' }}>
                    No rule exists for this role yet. Create one to configure pricing settings.
                </p>
            </CardBody>
        </Card>
    );
};

export default AddRuleForm;
