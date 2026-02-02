/**
 * Shared constants for rule types
 */

export const RULE_TYPE_OPTIONS = [
    { label: 'Select Type', value: '' },
    { label: 'Percentage Discount', value: 'percentage' },
    { label: 'Fixed Amount Discount', value: 'fixed' },
    { label: 'Fixed Price', value: 'fixed_price' },
] as const;
