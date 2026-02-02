import { useState, useMemo, useEffect } from '@wordpress/element';
import { Button, Spinner, TextControl, SelectControl } from '@wordpress/components';
import CategoryRuleRow, { CategoryRuleFormData } from './CategoryRuleRow';
import { Rule, Category } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import { RULE_TYPE_OPTIONS } from '../../constants/ruleTypes';
import apiFetch from '@wordpress/api-fetch';

interface CategoryRulesTableProps {
    rules: Rule[];
    categories: Category[];
    isLoading: boolean;
    roleFilter?: string;
    onUpdate: (id: number, updates: Partial<Rule>) => Promise<void>;
    onBulkUpdate: (ruleIds: number[], updates: Partial<Rule>) => Promise<void>;
    onBulkDelete: (ruleIds: number[]) => Promise<void>;
    onRefetch?: () => void;
}

const CategoryRulesTable: React.FC<CategoryRulesTableProps> = ({
    rules,
    categories,
    isLoading,
    roleFilter,
    onUpdate,
    onBulkUpdate,
    onBulkDelete,
    onRefetch
}) => {
    const [selectedRules, setSelectedRules] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [bulkRuleType, setBulkRuleType] = useState('');
    const [bulkRuleValue, setBulkRuleValue] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Track form data for all rules
    const [formDataMap, setFormDataMap] = useState<Map<number, CategoryRuleFormData>>(new Map());
    const [changedRules, setChangedRules] = useState<Set<number>>(new Set());
    const [isSaving, setIsSaving] = useState(false);

    // Initialize form data when rules change
    useEffect(() => {
        const newFormDataMap = new Map<number, CategoryRuleFormData>();
        rules.forEach(rule => {
            if (!formDataMap.has(rule.id)) {
                const categoryRule = rule.single_categories?.[0];
                newFormDataMap.set(rule.id, {
                    rule_type: categoryRule?.rule?.type || '',
                    rule_value: categoryRule?.rule?.value || '',
                    category_value: '',
                    min_quantity: categoryRule?.min_qty || 0,
                    qty_rule_type: categoryRule?.rule?.quantity_type || '',
                    qty_rule_value: categoryRule?.rule?.quantity || '',
                });
            } else {
                newFormDataMap.set(rule.id, formDataMap.get(rule.id)!);
            }
        });
        setFormDataMap(newFormDataMap);
    }, [rules]);

    const handleFieldChange = (ruleId: number, field: string, value: any) => {
        const currentData = formDataMap.get(ruleId);
        if (!currentData) return;

        const newData = { ...currentData, [field]: value };
        const newMap = new Map(formDataMap);
        newMap.set(ruleId, newData);
        setFormDataMap(newMap);

        const newChangedRules = new Set(changedRules);
        newChangedRules.add(ruleId);
        setChangedRules(newChangedRules);
    };

    const handleSaveAll = async () => {
        if (changedRules.size === 0) return;

        setIsSaving(true);
        try {
            for (const ruleId of Array.from(changedRules)) {
                const rule = rules.find(r => r.id === ruleId);
                if (!rule) continue;

                const rows = rule.single_categories?.map((cat: any) => {
                    const formData = formDataMap.get(ruleId);
                    return {
                        category_id: cat.id,
                        type: formData?.rule_type || cat.rule?.type || 'percentage',
                        value: formData?.rule_value || cat.rule?.value || '0',
                        min_qty: formData?.min_quantity || cat.min_qty || 0,
                        quantity: formData?.qty_rule_value || cat.rule?.quantity || '',
                        quantity_type: formData?.qty_rule_type || cat.rule?.quantity_type || '',
                    };
                }) || [];

                await apiFetch({
                    path: `/rrb2b/v1/rules/${ruleId}/categories`,
                    method: 'PUT',
                    data: { rows },
                });
            }

            setChangedRules(new Set());
            if (onRefetch) {
                onRefetch();
            }
        } catch (error) {
            console.error('Failed to save changes:', error);
        } finally {
            setIsSaving(false);
        }
    };

    // Filter rules by search term
    const filteredRules = useMemo(() => {
        if (!searchTerm) return rules;

        return rules.filter(rule => {
            const categoryIds = rule.single_categories || [];
            const matchingCategories = categories.filter(cat =>
                categoryIds.includes(cat.id) &&
                cat.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return matchingCategories.length > 0;
        });
    }, [rules, searchTerm, categories]);

    const handleSelectAll = () => {
        if (selectedRules.length === filteredRules.length) {
            setSelectedRules([]);
        } else {
            setSelectedRules(filteredRules.map(r => r.id));
        }
    };

    const handleSelectRule = (ruleId: number, selected: boolean) => {
        if (selected) {
            setSelectedRules([...selectedRules, ruleId]);
        } else {
            setSelectedRules(selectedRules.filter(id => id !== ruleId));
        }
    };

    const handleBulkTypeUpdate = async () => {
        if (selectedRules.length === 0 || !bulkRuleType) return;

        await onBulkUpdate(selectedRules, { rule_type: bulkRuleType });
        setBulkRuleType('');
    };

    const handleBulkValueUpdate = async () => {
        if (selectedRules.length === 0 || !bulkRuleValue) return;

        await onBulkUpdate(selectedRules, { rule_value: bulkRuleValue });
        setBulkRuleValue('');
    };

    const handleBulkDelete = async () => {
        if (selectedRules.length === 0) return;

        await onBulkDelete(selectedRules);
        setSelectedRules([]);
        setDeleteConfirm(false);
    };

    const getCategoryName = (rule: Rule): string => {
        const singleCategories = rule.single_categories || [];
        if (singleCategories.length === 0) return 'No categories';

        // single_categories is an array of CategoryRule objects, not just IDs
        const categoryNames = singleCategories.map((cat: any) => cat.name || cat.slug || 'Unknown');

        return categoryNames.join(', ') || 'Unknown';
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
            <div style={{ marginBottom: '16px', display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '200px' }}>
                    <TextControl
                        label="Search Categories"
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Filter by category name..."
                    />
                </div>

                {selectedRules.length > 0 && (
                    <>
                        <div style={{ minWidth: '150px' }}>
                            <SelectControl
                                label="Bulk Rule Type"
                                value={bulkRuleType}
                                options={RULE_TYPE_OPTIONS}
                                onChange={setBulkRuleType}
                            />
                        </div>
                        <Button
                            variant="secondary"
                            onClick={handleBulkTypeUpdate}
                            disabled={!bulkRuleType}
                        >
                            Apply Type
                        </Button>

                        <div style={{ minWidth: '100px' }}>
                            <TextControl
                                label="Bulk Value"
                                value={bulkRuleValue}
                                onChange={setBulkRuleValue}
                                placeholder="e.g., 10"
                            />
                        </div>
                        <Button
                            variant="secondary"
                            onClick={handleBulkValueUpdate}
                            disabled={!bulkRuleValue}
                        >
                            Apply Value
                        </Button>

                        <Button
                            variant="secondary"
                            isDestructive
                            onClick={() => setDeleteConfirm(true)}
                        >
                            Delete ({selectedRules.length})
                        </Button>
                    </>
                )}
            </div>

            {changedRules.size > 0 && (
                <div className="crp-save-banner">
                    <span className="crp-save-banner__message">
                        <strong>{changedRules.size}</strong> unsaved change{changedRules.size !== 1 ? 's' : ''}
                    </span>
                    <div className="crp-save-banner__actions">
                        <Button
                            variant="secondary"
                            onClick={() => window.location.reload()}
                            disabled={isSaving}
                        >
                            Discard Changes
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSaveAll}
                            isBusy={isSaving}
                            disabled={isSaving}
                        >
                            Save All Changes
                        </Button>
                    </div>
                </div>
            )}

            {filteredRules.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', background: '#f9f9f9', borderRadius: '4px' }}>
                    <p style={{ margin: 0, color: '#757575' }}>
                        {searchTerm ? 'No categories match your search.' : 'No category rules found.'}
                    </p>
                </div>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table className="wp-list-table widefat fixed striped" style={{ minWidth: '1200px' }}>
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRules.length === filteredRules.length && filteredRules.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th>Category</th>
                                <th>Rule Type</th>
                                <th>Value</th>
                                <th>Cat. Value</th>
                                <th>Min Qty</th>
                                <th>Qty Rule Type</th>
                                <th>Qty Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRules.map(rule => {
                                const formData = formDataMap.get(rule.id) || {
                                    rule_type: '',
                                    rule_value: '',
                                    category_value: '',
                                    min_quantity: 0,
                                    qty_rule_type: '',
                                    qty_rule_value: '',
                                };

                                return (
                                    <CategoryRuleRow
                                        key={rule.id}
                                        ruleId={rule.id}
                                        categoryName={getCategoryName(rule)}
                                        formData={formData}
                                        onChange={handleFieldChange}
                                        onSelect={handleSelectRule}
                                        isSelected={selectedRules.includes(rule.id)}
                                        hasChanges={changedRules.has(rule.id)}
                                    />
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmDialog
                isOpen={deleteConfirm}
                title="Delete Selected Rules"
                message={`Are you sure you want to delete ${selectedRules.length} selected rule(s)? This action cannot be undone.`}
                onConfirm={handleBulkDelete}
                onCancel={() => setDeleteConfirm(false)}
                isDangerous={true}
            />
        </>
    );
};

export default CategoryRulesTable;
