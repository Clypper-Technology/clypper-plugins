import { useState } from '@wordpress/element';
import { Button, Card, CardBody, CheckboxControl } from '@wordpress/components';
import RoleSelector from '../../components/RoleSelector';
import { Role } from '../../types';

interface CopyRuleFormProps {
    roles: Role[];
    currentRole: string;
    onCopy: (sourceRole: string, destinationRoles: string[]) => Promise<void>;
}

const CopyRuleForm: React.FC<CopyRuleFormProps> = ({ roles, currentRole, onCopy }) => {
    const [sourceRole, setSourceRole] = useState(currentRole || '');
    const [destinationRoles, setDestinationRoles] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Filter out the source role from available destinations
    const availableDestinations = roles.filter(r => r.slug !== sourceRole);

    const handleToggleDestination = (roleSlug: string) => {
        if (destinationRoles.includes(roleSlug)) {
            setDestinationRoles(destinationRoles.filter(r => r !== roleSlug));
        } else {
            setDestinationRoles([...destinationRoles, roleSlug]);
        }
    };

    const handleSelectAll = () => {
        if (destinationRoles.length === availableDestinations.length) {
            setDestinationRoles([]);
        } else {
            setDestinationRoles(availableDestinations.map(r => r.slug));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!sourceRole || destinationRoles.length === 0) return;

        setIsSubmitting(true);
        try {
            await onCopy(sourceRole, destinationRoles);
            setDestinationRoles([]);
        } catch (error) {
            console.error('Failed to copy rules:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Card>
            <CardBody>
                <h3>Copy Category Rules</h3>
                <p style={{ fontSize: '13px', color: '#757575', marginBottom: '16px' }}>
                    Copy all category pricing rules from one role to other roles.
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <RoleSelector
                            value={sourceRole}
                            onChange={setSourceRole}
                            roles={roles}
                            label="Copy From (Source Role)"
                        />
                    </div>

                    {sourceRole && (
                        <div style={{ marginBottom: '16px' }}>
                            <label className="components-base-control__label">
                                Copy To (Destination Roles)
                            </label>

                            {availableDestinations.length === 0 ? (
                                <p style={{ color: '#757575', fontSize: '13px' }}>
                                    No other roles available
                                </p>
                            ) : (
                                <>
                                    <div style={{ marginBottom: '8px' }}>
                                        <Button
                                            variant="secondary"
                                            size="small"
                                            onClick={handleSelectAll}
                                        >
                                            {destinationRoles.length === availableDestinations.length
                                                ? 'Deselect All'
                                                : 'Select All'}
                                        </Button>
                                    </div>

                                    <div style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '4px',
                                        padding: '12px',
                                        maxHeight: '200px',
                                        overflowY: 'auto'
                                    }}>
                                        {availableDestinations.map(role => (
                                            <CheckboxControl
                                                key={role.slug}
                                                label={role.name}
                                                checked={destinationRoles.includes(role.slug)}
                                                onChange={() => handleToggleDestination(role.slug)}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    <Button
                        variant="primary"
                        type="submit"
                        isBusy={isSubmitting}
                        disabled={!sourceRole || destinationRoles.length === 0 || isSubmitting}
                    >
                        Copy Rules ({destinationRoles.length} role{destinationRoles.length !== 1 ? 's' : ''})
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default CopyRuleForm;
