import { useState, useEffect } from '@wordpress/element';
import { Button, SelectControl, TextControl, ToggleControl } from '@wordpress/components';
import { Rule } from '../../types';
import CategoryMultiSelect from '../../components/CategoryMultiSelect';
import ConfirmDialog from '../../components/ConfirmDialog';
import { RULE_TYPE_OPTIONS } from '../../constants/ruleTypes';

interface RuleRowProps {
    rule: Rule;
    onUpdate: (id: number, updates: Partial<Rule>) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
    onToggleActive: (id: number) => Promise<void>;
}

const RuleRow: React.FC<RuleRowProps> = ({ rule, onUpdate, onDelete, onToggleActive }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        rule_type: rule.rule_type || '',
        rule_value: rule.rule_value || '',
        single_categories: rule.single_categories || [],
        category_value: rule.category_value || '',
    });

    useEffect(() => {
        // Check if form data differs from original rule
        const changed =
            formData.rule_type !== rule.rule_type ||
            formData.rule_value !== rule.rule_value ||
            formData.category_value !== rule.category_value ||
            JSON.stringify(formData.single_categories) !== JSON.stringify(rule.single_categories);

        setHasChanges(changed);
    }, [formData, rule]);

    const handleFieldChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        setIsEditing(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await onUpdate(rule.id, formData);
            setIsEditing(false);
            setHasChanges(false);
        } catch (error) {
            console.error('Failed to save rule:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        // Reset form to original values
        setFormData({
            rule_type: rule.rule_type || '',
            rule_value: rule.rule_value || '',
            single_categories: rule.single_categories || [],
            category_value: rule.category_value || '',
        });
        setIsEditing(false);
        setHasChanges(false);
    };

    const handleDelete = async () => {
        try {
            await onDelete(rule.id);
        } catch (error) {
            console.error('Failed to delete rule:', error);
        } finally {
            setDeleteConfirm(false);
        }
    };


    return (
        <>
            <tr className={`rule-row ${rule.rule_active ? 'active' : 'inactive'}`}>
                <td style={{ width: '50px', textAlign: 'center' }}>
                    <ToggleControl
                        checked={rule.rule_active}
                        onChange={() => onToggleActive(rule.id)}
                        __nextHasNoMarginBottom
                    />
                </td>
                <td style={{ width: '190px' }}>
                    <strong>{rule.role_name}</strong>
                </td>
                <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>
                            {rule.rule_type ? `${rule.rule_type}: ${rule.rule_value}` : 'No rule set'}
                        </span>
                        <Button
                            variant="secondary"
                            size="small"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? 'Hide Details' : 'Edit'}
                        </Button>
                    </div>
                </td>
            </tr>

            {isExpanded && (
                <tr className="rule-details-row">
                    <td colSpan={3} style={{ padding: '20px', background: '#f9f9f9' }}>
                        <div className="rule-form" style={{ maxWidth: '800px' }}>
                            <h4 style={{ marginTop: 0 }}>Rule Details</h4>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <SelectControl
                                    label="Rule Type"
                                    value={formData.rule_type}
                                    options={RULE_TYPE_OPTIONS}
                                    onChange={(value) => handleFieldChange('rule_type', value)}
                                />

                                <TextControl
                                    label="Rule Value"
                                    value={formData.rule_value}
                                    onChange={(value) => handleFieldChange('rule_value', value)}
                                    placeholder="e.g., 10 or 20.5"
                                />
                            </div>

                            <div style={{ marginBottom: '16px' }}>
                                <CategoryMultiSelect
                                    value={formData.single_categories}
                                    onChange={(value) => handleFieldChange('single_categories', value)}
                                    label="Apply to Specific Categories"
                                />
                            </div>

                            {formData.single_categories.length > 0 && (
                                <TextControl
                                    label="Category-Specific Value (Optional)"
                                    value={formData.category_value}
                                    onChange={(value) => handleFieldChange('category_value', value)}
                                    help="Override the rule value for selected categories"
                                />
                            )}

                            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                                <Button
                                    variant="primary"
                                    onClick={handleSave}
                                    isBusy={isSaving}
                                    disabled={!hasChanges || isSaving}
                                    className={hasChanges ? 'has-changes' : ''}
                                    style={hasChanges ? { background: '#dc3232' } : {}}
                                >
                                    {hasChanges ? 'Save Changes' : 'Saved'}
                                </Button>

                                {hasChanges && (
                                    <Button
                                        variant="secondary"
                                        onClick={handleCancel}
                                        disabled={isSaving}
                                    >
                                        Cancel
                                    </Button>
                                )}

                                <Button
                                    variant="secondary"
                                    isDestructive
                                    onClick={() => setDeleteConfirm(true)}
                                    disabled={isSaving}
                                    style={{ marginLeft: 'auto' }}
                                >
                                    Delete Rule
                                </Button>
                            </div>
                        </div>
                    </td>
                </tr>
            )}

            <ConfirmDialog
                isOpen={deleteConfirm}
                title="Delete Rule"
                message={`Are you sure you want to delete this rule for role "${rule.role}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirm(false)}
                isDangerous={true}
            />
        </>
    );
};

export default RuleRow;
