import { useState, useMemo, useEffect } from '@wordpress/element';
import { Button, Spinner, TextControl, SelectControl } from '@wordpress/components';
import ProductRuleRow, { ProductRuleFormData } from './ProductRuleRow';
import { Rule, Product } from '../../types';
import ConfirmDialog from '../../components/ConfirmDialog';
import { RULE_TYPE_OPTIONS } from '../../constants/ruleTypes';
import apiFetch from '@wordpress/api-fetch';

interface ProductRulesTableProps {
    rules: Rule[];
    products: Map<number, Product>;
    isLoading: boolean;
    roleFilter?: string;
    onUpdate: (id: number, updates: Partial<Rule>) => Promise<void>;
    onBulkUpdate: (ruleIds: number[], updates: Partial<Rule>) => Promise<void>;
    onBulkDelete: (ruleIds: number[]) => Promise<void>;
    onAddProduct: (product: Product) => Promise<void>;
    onRefetch?: () => void;
}

const ProductRulesTable: React.FC<ProductRulesTableProps> = ({
    rules,
    products,
    isLoading,
    roleFilter,
    onUpdate,
    onBulkUpdate,
    onBulkDelete,
    onAddProduct,
    onRefetch
}) => {
    const [selectedRules, setSelectedRules] = useState<number[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [bulkRuleType, setBulkRuleType] = useState('');
    const [bulkRuleValue, setBulkRuleValue] = useState('');
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    // Track form data for all rules
    const [formDataMap, setFormDataMap] = useState<Map<number, ProductRuleFormData>>(new Map());
    const [changedRules, setChangedRules] = useState<Set<number>>(new Set());
    const [isSaving, setIsSaving] = useState(false);

    // Initialize form data when rules change
    useEffect(() => {
        const newFormDataMap = new Map<number, ProductRuleFormData>();
        rules.forEach(rule => {
            if (!formDataMap.has(rule.id)) {
                const productRule = rule.products?.[0];
                newFormDataMap.set(rule.id, {
                    rule_type: productRule?.rule?.type || '',
                    rule_value: productRule?.rule?.value || '',
                    min_quantity: productRule?.min_qty || 0,
                    qty_rule_type: productRule?.rule?.quantity_type || '',
                    qty_rule_value: productRule?.rule?.quantity || '',
                });
            } else {
                newFormDataMap.set(rule.id, formDataMap.get(rule.id)!);
            }
        });
        setFormDataMap(newFormDataMap);
    }, [rules]);

    // Filter rules by search term
    const filteredRules = useMemo(() => {
        if (!searchTerm) return rules;

        return rules.filter(rule => {
            const productRules = rule.products || [];
            return productRules.some((prod: any) => {
                const searchLower = searchTerm.toLowerCase();
                // Search by product name directly from rule data
                if (prod.name && prod.name.toLowerCase().includes(searchLower)) {
                    return true;
                }
                // Also check cached product data for SKU
                const product = products.get(prod.id);
                if (product?.sku && product.sku.toLowerCase().includes(searchLower)) {
                    return true;
                }
                return false;
            });
        });
    }, [rules, searchTerm, products]);

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
            // Group all changes by rule ID and update via the products endpoint
            for (const ruleId of Array.from(changedRules)) {
                const rule = rules.find(r => r.id === ruleId);
                if (!rule) continue;

                // Build rows array with all products for this rule
                const rows = rule.products?.map((prod: any) => {
                    const formData = formDataMap.get(ruleId);
                    return {
                        product_id: prod.id,
                        product_name: prod.name,
                        type: formData?.rule_type || prod.rule?.type || 'percentage',
                        value: formData?.rule_value || prod.rule?.value || '0',
                        min_qty: formData?.min_quantity || prod.min_qty || 1,
                        quantity: formData?.qty_rule_value || prod.rule?.quantity || '',
                        quantity_type: formData?.qty_rule_type || prod.rule?.quantity_type || '',
                    };
                }) || [];

                // Update via products endpoint
                await apiFetch({
                    path: `/rrb2b/v1/rules/${ruleId}/products`,
                    method: 'PUT',
                    data: { rows },
                });
            }

            setChangedRules(new Set());
            // Refetch data to show updated values without page reload
            if (onRefetch) {
                onRefetch();
            }
        } catch (error) {
            console.error('Failed to save changes:', error);
        } finally {
            setIsSaving(false);
        }
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
            <div style={{ marginBottom: '16px' }}>
                <div style={{ maxWidth: '300px' }}>
                    <TextControl
                        label="Filter Existing Rules"
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Filter by product name or SKU..."
                        help="Search within the table below"
                    />
                </div>
            </div>

            {selectedRules.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end', flexWrap: 'wrap' }}>
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
                    </div>
                </div>
            )}

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
                <div className="crp-empty-state">
                    <p className="crp-empty-state__text">
                        {searchTerm ? 'No products match your search.' : 'No product rules found. Add products using the search above.'}
                    </p>
                </div>
            ) : (
                <div className="crp-table-container">
                    <table className="wp-list-table widefat fixed striped crp-table">
                        <thead>
                            <tr>
                                <th style={{ width: '40px' }}>
                                    <input
                                        type="checkbox"
                                        checked={selectedRules.length === filteredRules.length && filteredRules.length > 0}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th style={{ width: '60px' }}>Image</th>
                                <th>Product</th>
                                <th>Rule Type</th>
                                <th>Value</th>
                                <th>Minimum Quantity</th>
                                <th>Quantity Rule Type</th>
                                <th>Quantity Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRules.map(rule => {
                                // rule.products is an array of ProductRule objects {id, name, rule, min_qty}
                                const productRule = rule.products?.[0];
                                const product = productRule ? {
                                    id: productRule.id,
                                    name: productRule.name,
                                    sku: '',
                                    thumbnail: products.get(productRule.id)?.thumbnail || '',
                                } : null;

                                const formData = formDataMap.get(rule.id) || {
                                    rule_type: '',
                                    rule_value: '',
                                    min_quantity: 0,
                                    qty_rule_type: '',
                                    qty_rule_value: '',
                                };

                                return (
                                    <ProductRuleRow
                                        key={rule.id}
                                        ruleId={rule.id}
                                        product={product}
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

export default ProductRulesTable;
