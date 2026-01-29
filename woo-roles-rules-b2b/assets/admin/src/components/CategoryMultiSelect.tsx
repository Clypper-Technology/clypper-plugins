import { useState, useMemo } from '@wordpress/element';
import { CheckboxControl, TextControl, Button, Popover } from '@wordpress/components';
import { useCategories } from '../hooks/useCategories';

interface CategoryMultiSelectProps {
    value: number[];
    onChange: (categoryIds: number[]) => void;
    label?: string;
}

const CategoryMultiSelect: React.FC<CategoryMultiSelectProps> = ({
    value,
    onChange,
    label = 'Categories'
}) => {
    const { categories, isLoading } = useCategories();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const selectedCategories = useMemo(() => {
        return categories.filter(cat => value.includes(cat.id));
    }, [categories, value]);

    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categories;
        return categories.filter(cat =>
            cat.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [categories, searchTerm]);

    const handleToggle = (categoryId: number) => {
        if (value.includes(categoryId)) {
            onChange(value.filter(id => id !== categoryId));
        } else {
            onChange([...value, categoryId]);
        }
    };

    const handleRemove = (categoryId: number) => {
        onChange(value.filter(id => id !== categoryId));
    };

    return (
        <div className="crp-category-multiselect">
            <label className="components-base-control__label">{label}</label>

            <div className="selected-categories" style={{ marginBottom: '8px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {selectedCategories.length === 0 ? (
                    <span style={{ color: '#757575', fontSize: '13px' }}>No categories selected</span>
                ) : (
                    selectedCategories.map(cat => (
                        <span
                            key={cat.id}
                            className="category-tag"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '4px 8px',
                                background: '#f0f0f0',
                                borderRadius: '4px',
                                fontSize: '12px',
                                gap: '6px'
                            }}
                        >
                            {cat.name}
                            <button
                                onClick={() => handleRemove(cat.id)}
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    padding: 0,
                                    fontSize: '14px',
                                    lineHeight: 1
                                }}
                                aria-label={`Remove ${cat.name}`}
                            >
                                ×
                            </button>
                        </span>
                    ))
                )}
            </div>

            <Button
                variant="secondary"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Select Categories'}
            </Button>

            {isOpen && (
                <Popover
                    position="bottom left"
                    onClose={() => setIsOpen(false)}
                    className="crp-category-popover"
                >
                    <div style={{ width: '300px', padding: '12px' }}>
                        <TextControl
                            label="Search"
                            value={searchTerm}
                            onChange={setSearchTerm}
                            placeholder="Search categories..."
                        />

                        {isLoading ? (
                            <p>Loading categories...</p>
                        ) : (
                            <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '8px' }}>
                                {filteredCategories.length === 0 ? (
                                    <p style={{ color: '#757575', fontSize: '13px' }}>No categories found</p>
                                ) : (
                                    filteredCategories.map(cat => (
                                        <CheckboxControl
                                            key={cat.id}
                                            label={cat.name}
                                            checked={value.includes(cat.id)}
                                            onChange={() => handleToggle(cat.id)}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </Popover>
            )}
        </div>
    );
};

export default CategoryMultiSelect;
