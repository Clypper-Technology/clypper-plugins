import { SelectControl, TextControl, CheckboxControl } from '@wordpress/components';
import { Product } from '../../types';
import { RULE_TYPE_OPTIONS } from '../../constants/ruleTypes';

interface ProductRuleFormData {
    rule_type: string;
    rule_value: string;
    min_quantity: number;
    qty_rule_type: string;
    qty_rule_value: string;
}

interface ProductRuleRowProps {
    ruleId: number;
    product: Product | null;
    formData: ProductRuleFormData;
    onChange: (ruleId: number, field: string, value: any) => void;
    onSelect: (id: number, selected: boolean) => void;
    isSelected: boolean;
    hasChanges: boolean;
}

const ProductRuleRow: React.FC<ProductRuleRowProps> = ({
    ruleId,
    product,
    formData,
    onChange,
    onSelect,
    isSelected,
    hasChanges
}) => {
    const rowClasses = [
        'crp-product-row',
        isSelected && 'selected-row',
        hasChanges && 'has-changes'
    ].filter(Boolean).join(' ');

    return (
        <tr className={rowClasses}>
            <td className="crp-table__checkbox-cell">
                <CheckboxControl
                    checked={isSelected}
                    onChange={(checked) => onSelect(ruleId, checked)}
                    __nextHasNoMarginBottom
                />
            </td>
            <td className="crp-product-row__thumbnail-cell">
                {product?.thumbnail && (
                    <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="crp-product-row__thumbnail"
                    />
                )}
            </td>
            <td className="crp-product-row__name-cell">
                <strong>{product?.name || 'Unknown Product'}</strong>
                {product?.sku && (
                    <div className="crp-product-row__sku">
                        SKU: {product.sku}
                    </div>
                )}
                {hasChanges && (
                    <div className="crp-product-row__unsaved-indicator">
                        ● Unsaved changes
                    </div>
                )}
            </td>
            <td>
                <SelectControl
                    value={formData.rule_type}
                    options={RULE_TYPE_OPTIONS}
                    onChange={(value) => onChange(ruleId, 'rule_type', value)}
                    __nextHasNoMarginBottom
                />
            </td>
            <td>
                <TextControl
                    value={formData.rule_value}
                    onChange={(value) => onChange(ruleId, 'rule_value', value)}
                    placeholder="0"
                    type="text"
                    __nextHasNoMarginBottom
                />
            </td>
            <td>
                <TextControl
                    value={String(formData.min_quantity)}
                    onChange={(value) => onChange(ruleId, 'min_quantity', parseInt(value) || 0)}
                    placeholder="0"
                    type="number"
                    __nextHasNoMarginBottom
                />
            </td>
            <td>
                <SelectControl
                    value={formData.qty_rule_type}
                    options={RULE_TYPE_OPTIONS}
                    onChange={(value) => onChange(ruleId, 'qty_rule_type', value)}
                    __nextHasNoMarginBottom
                />
            </td>
            <td>
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

export default ProductRuleRow;
export type { ProductRuleFormData };
