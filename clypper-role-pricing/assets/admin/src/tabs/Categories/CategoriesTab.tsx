import { useState } from '@wordpress/element';
import { Button, Card, CardBody, Notice } from '@wordpress/components';
import { useRules } from '../../hooks/useRules';
import { useRoles } from '../../hooks/useRoles';
import { useCategories } from '../../hooks/useCategories';
import CategoryRulesTable from './CategoryRulesTable';
import RoleSelector from '../../components/RoleSelector';
import CategoryMultiSelect from '../../components/CategoryMultiSelect';
import apiFetch from '@wordpress/api-fetch';

interface CategoriesTabProps {
    roleFilter?: string;
}

const CategoriesTab: React.FC<CategoriesTabProps> = ({ roleFilter: roleFilterProp }) => {
    const [roleFilterState, setRoleFilterState] = useState('');
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    const roleFilter = roleFilterProp || roleFilterState;
    const { roles, isLoading: rolesLoading } = useRoles();
    const { categories, isLoading: categoriesLoading } = useCategories();
    const {
        rules,
        isLoading: rulesLoading,
        createRule,
        updateRule,
        bulkUpdate,
        bulkDelete,
        refetch
    } = useRules(roleFilter);

    const categoryRules = rules.filter(rule =>
        rule.single_categories && rule.single_categories.length > 0
    );

    const handleAddCategories = async () => {
        if (!roleFilter || selectedCategories.length === 0) return;

        setIsAdding(true);
        try {
            // Find existing rule for this role, or create if doesn't exist
            const existingRule = rules.find(r => r.role_name === roleFilter);

            if (existingRule) {
                // Update existing rule by adding categories
                const currentCategories = existingRule.single_categories || [];
                const rows = [
                    // Keep existing categories (categories are objects with id, slug, name, rule, min_qty)
                    ...currentCategories.map((cat: any) => ({
                        category_id: cat.id,
                        type: cat.rule?.type || 'percentage',
                        value: cat.rule?.value || '0',
                        min_qty: cat.min_qty || 0,
                    })),
                    // Add new categories
                    ...selectedCategories.map(id => ({
                        category_id: id,
                        type: 'percentage',
                        value: '0',
                        min_qty: 0,
                    }))
                ];

                await apiFetch({
                    path: `/rrb2b/v1/rules/${existingRule.id}/categories`,
                    method: 'PUT',
                    data: { rows },
                });

                // Refetch rules to get updated data
                refetch();
            } else {
                // Create new rule if none exists for this role
                await createRule({
                    role: roleFilter,
                    rule_type: 'percentage',
                    rule_value: '0',
                    active: true,
                    single_categories: selectedCategories,
                });
            }

            setSelectedCategories([]);
            setShowAddForm(false);
        } catch (error) {
            console.error('Failed to add category rules:', error);
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <div className="crp-categories-tab">
            {!roleFilterProp && (
                <>
                    <div style={{ marginBottom: '20px' }}>
                        <h2>Category Pricing Rules</h2>
                        <p>
                            Configure role-based pricing rules for specific product categories.
                        </p>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <RoleSelector
                            value={roleFilter}
                            onChange={setRoleFilterState}
                            roles={roles}
                            label="Filter by Role"
                            disabled={rolesLoading}
                        />
                    </div>
                </>
            )}

            <div style={{ marginBottom: '20px' }}>
                <Button
                    variant="secondary"
                    onClick={() => setShowAddForm(!showAddForm)}
                    disabled={!roleFilter && !roleFilterProp}
                >
                    {showAddForm ? 'Cancel' : '+ Add Category Rules'}
                </Button>
            </div>

            {showAddForm && (
                <Card style={{ marginBottom: '20px' }}>
                    <CardBody>
                        <h3>Add Category Rules</h3>
                        <CategoryMultiSelect
                            value={selectedCategories}
                            onChange={setSelectedCategories}
                        />
                        <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                            <Button
                                variant="primary"
                                onClick={handleAddCategories}
                                isBusy={isAdding}
                                disabled={selectedCategories.length === 0 || isAdding}
                            >
                                Add Selected Categories
                            </Button>
                            <Button
                                variant="tertiary"
                                onClick={() => setShowAddForm(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                        <p style={{ marginTop: '10px', fontSize: '13px', color: '#757575' }}>
                            Select categories and configure pricing rules in the table below.
                        </p>
                    </CardBody>
                </Card>
            )}

            <CategoryRulesTable
                rules={categoryRules}
                categories={categories}
                isLoading={rulesLoading || categoriesLoading}
                roleFilter={roleFilter}
                onUpdate={updateRule}
                onBulkUpdate={bulkUpdate}
                onBulkDelete={bulkDelete}
                onRefetch={refetch}
            />
        </div>
    );
};

export default CategoriesTab;
