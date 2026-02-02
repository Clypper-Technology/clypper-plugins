import { SelectControl, TextControl, CheckboxControl } from '@wordpress/components';
import { RULE_TYPE_OPTIONS } from '../../constants/ruleTypes';

interface CategoryRuleFormData {
    rule_type: string;
    rule_value: string;
    category_value: string;
    min_quantity: number;
    qty_rule_type: string;
    qty_rule_value: string;
}

interface CategoryRuleRowProps {
    ruleId: number;
    categoryName: string;
    formData: CategoryRuleFormData;
    onChange: (ruleId: number, field: string, value: any) => void;
    onSelect: (id: number, selected: boolean) => void;
    isSelected: boolean;
    hasChanges: boolean;
}

const CategoryRuleRow: React.FC<CategoryRuleRowProps> = ({
    ruleId,
    categoryName,
    formData,
    onChange,
    onSelect,
    isSelected,
    hasChanges
}) => {
    return (
        <tr className={`${isSelected ? 'selected-row' : ''} ${hasChanges ? 'has-changes' : ''}`}>
            <td style={{ width: '40px', textAlign: 'center' }}>
                <CheckboxControl
                    checked={isSelected}
                    onChange={(checked) => onSelect(ruleId, checked)}
                    __nextHasNoMarginBottom
                />
            </td>
            <td style={{ minWidth: '150px' }}>
                <strong>{categoryName}</strong>
                {hasChanges && (
                    <div style={{ fontSize: '11px', color: '#d63638', marginTop: '4px' }}>
                        ● Unsaved changes
                    </div>
                )}
            </td>
            <td style={{ minWidth: '150px' }}>
                <SelectControl
                    value={formData.rule_type}
                    options={RULE_TYPE_OPTIONS}
                    onChange={(value) => onChange(ruleId, 'rule_type', value)}
                    __nextHasNoMarginBottom
                />
            </td>
            <td style={{ minWidth: '100px' }}>
                <TextControl
                    value={formData.rule_value}
                    onChange={(value) => onChange(ruleId, 'rule_value', value)}
                    placeholder="0"
                    type="text"
                    __nextHasNoMarginBottom
                />
            </td>
            <td style={{ minWidth: '100px' }}>
                <TextControl
                    value={formData.category_value}
                    onChange={(value) => onChange(ruleId, 'category_value', value)}
                    placeholder="0"
                    type="text"
                    __nextHasNoMarginBottom
                />
            </td>
            <td style={{ minWidth: '100px' }}>
                <TextControl
                    value={String(formData.min_quantity)}
                    onChange={(value) => onChange(ruleId, 'min_quantity', parseInt(value) || 0)}
                    placeholder="0"
                    type="number"
                    __nextHasNoMarginBottom
                />
            </td>
            <td style={{ minWidth: '150px' }}>
                <SelectControl
                    value={formData.qty_rule_type}
                    options={RULE_TYPE_OPTIONS}
                    onChange={(value) => onChange(ruleId, 'qty_rule_type', value)}
                    __nextHasNoMarginBottom
                />
            </td>
            <td style={{ minWidth: '100px' }}>
                <TextControl
                    value={formData.qty_rule_value}
                    onChange={(value) => onChange(ruleId, 'qty_rule_value', value)}
                    placeholder="0"
                    type="text"
                    __nextHasNoMarginBottom
                />
            </td>
        </tr>
    );
};

export default CategoryRuleRow;
export type { CategoryRuleFormData };
