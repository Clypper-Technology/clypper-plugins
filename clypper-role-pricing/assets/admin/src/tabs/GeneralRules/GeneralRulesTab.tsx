import { useState } from '@wordpress/element';
import { Button, Card, CardBody, SelectControl, TextControl, ToggleControl, Spinner } from '@wordpress/components';
import { useRules } from '../../hooks/useRules';
import { useRoles } from '../../hooks/useRoles';
import RoleSelector from '../../components/RoleSelector';
import CategoryMultiSelect from '../../components/CategoryMultiSelect';
import { RULE_TYPE_OPTIONS } from '../../constants/ruleTypes';
import ConfirmDialog from '../../components/ConfirmDialog';

interface GeneralRulesTabProps {
    roleFilter?: string;
}

const GeneralRulesTab: React.FC<GeneralRulesTabProps> = ({ roleFilter: roleFilterProp }) => {
    const [roleFilterState, setRoleFilterState] = useState('');
    const roleFilter = roleFilterProp || roleFilterState;
    const { roles, isLoading: rolesLoading } = useRoles();
    const {
        rules,
        isLoading: rulesLoading,
        createRule,
        updateRule,
        deleteRule,
        toggleActive
    } = useRules(roleFilter);

    const existingRule = rules.length > 0 ? rules[0] : null;
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        global_rule: existingRule?.global_rule || { type: '', value: '' },
        category_rule: existingRule?.category_rule || { type: '', value: '' },
        categories: existingRule?.categories || [],
    });

    // Update form when rule loads
    useState(() => {
        if (existingRule) {
            setFormData({
                global_rule: existingRule.global_rule || { type: '', value: '' },
                category_rule: existingRule.category_rule || { type: '', value: '' },
                categories: existingRule.categories || [],
            });
        }
    });

    const handleCreate = async () => {
        if (!roleFilter) return;

        setIsSaving(true);
        try {
            await createRule({
                role: roleFilter,
                rule_type: 'percentage',
                rule_value: '0',
                active: true,
            });
        } catch (error) {
            console.error('Failed to create rule:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleSave = async () => {
        if (!existingRule) return;

        setIsSaving(true);
        try {
            await updateRule(existingRule.id, formData);
        } catch (error) {
            console.error('Failed to save rule:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!existingRule) return;

        try {
            await deleteRule(existingRule.id);
            setDeleteConfirm(false);
        } catch (error) {
            console.error('Failed to delete rule:', error);
        }
    };

    const handleToggleActive = async () => {
        if (!existingRule) return;
        await toggleActive(existingRule.id);
    };

    return (
        <div className="crp-rules-tab">
            {!roleFilterProp && (
                <div style={{ marginBottom: '20px' }}>
                    <h2>General Pricing Rules</h2>
                    <p>
                        Configure global pricing rules and category-specific rules for a role.
                    </p>
                </div>
            )}

            {!roleFilterProp && (
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <RoleSelector
                            value={roleFilter}
                            onChange={setRoleFilterState}
                            roles={roles}
                            label="Select Role"
                            disabled={rolesLoading}
                        />
                    </div>
                </div>
            )}

            {roleFilter && rulesLoading && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
                    <Spinner />
                </div>
            )}

            {roleFilter && !rulesLoading && !existingRule && (
                <Card>
                    <CardBody>
                        <h3>Create Rule for {roleFilter}</h3>
                        <p style={{ color: '#757575', fontSize: '13px' }}>
                            No rule exists for this role yet. Create one to configure pricing settings.
                        </p>
                        <Button
                            variant="primary"
                            onClick={handleCreate}
                            isBusy={isSaving}
                            disabled={isSaving}
                        >
                            Create Rule
                        </Button>
                    </CardBody>
                </Card>
            )}

            {roleFilter && !rulesLoading && existingRule && (
                <Card>
                    <CardBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ margin: 0 }}>Pricing Rule for {existingRule.role_name}</h3>
                            <ToggleControl
                                label="Active"
                                checked={existingRule.rule_active}
                                onChange={handleToggleActive}
                            />
                        </div>

                        <h4>Global Rule</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                            <SelectControl
                                label="Rule Type"
                                value={formData.global_rule?.type || ''}
                                options={RULE_TYPE_OPTIONS}
                                onChange={(value) => setFormData({ ...formData, global_rule: { ...formData.global_rule, type: value } })}
                            />
                            <TextControl
                                label="Value"
                                value={formData.global_rule?.value || ''}
                                onChange={(value) => setFormData({ ...formData, global_rule: { ...formData.global_rule, value } })}
                                placeholder="e.g., 10"
                            />
                        </div>

                        <h4>Category Rule</h4>
                        <div style={{ marginBottom: '16px' }}>
                            <CategoryMultiSelect
                                value={formData.categories || []}
                                onChange={(value) => setFormData({ ...formData, categories: value })}
                                label="Apply to Categories"
                            />
                        </div>

                        {formData.categories && formData.categories.length > 0 && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                                <SelectControl
                                    label="Category Rule Type"
                                    value={formData.category_rule?.type || ''}
                                    options={RULE_TYPE_OPTIONS}
                                    onChange={(value) => setFormData({ ...formData, category_rule: { ...formData.category_rule, type: value } })}
                                />
                                <TextControl
                                    label="Category Value"
                                    value={formData.category_rule?.value || ''}
                                    onChange={(value) => setFormData({ ...formData, category_rule: { ...formData.category_rule, value } })}
                                    placeholder="e.g., 15"
                                />
                            </div>
                        )}

                        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
                            <Button
                                variant="primary"
                                onClick={handleSave}
                                isBusy={isSaving}
                                disabled={isSaving}
                            >
                                Save Changes
                            </Button>
                            <Button
                                variant="secondary"
                                isDestructive
                                onClick={() => setDeleteConfirm(true)}
                                disabled={isSaving}
                            >
                                Delete Rule
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            )}

            {!roleFilter && (
                <div className="crp-empty-state">
                    <p className="crp-empty-state__text">
                        Please select a role to configure pricing rules.
                    </p>
                </div>
            )}

            <ConfirmDialog
                isOpen={deleteConfirm}
                title="Delete Rule"
                message={`Are you sure you want to delete this rule? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={() => setDeleteConfirm(false)}
                isDangerous={true}
            />
        </div>
    );
};

export default GeneralRulesTab;
