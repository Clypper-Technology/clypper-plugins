import { useState, useEffect } from '@wordpress/element';
import { Modal, Button, TabPanel, Spinner } from '@wordpress/components';
import ProductSearch from '../../components/ProductSearch';
import CategoryMultiSelect from '../../components/CategoryMultiSelect';
import { Product, Category } from '../../types';
import apiFetch from '@wordpress/api-fetch';

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProduct: (product: Product) => Promise<void>;
    onAddFromCategory: (categoryIds: number[], includeVariations: boolean) => Promise<void>;
    categories: Category[];
}

const AddProductModal: React.FC<AddProductModalProps> = ({
    isOpen,
    onClose,
    onAddProduct,
    onAddFromCategory,
    categories,
}) => {
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [includeVariations, setIncludeVariations] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

    // Load suggested products when modal opens
    useEffect(() => {
        if (isOpen && suggestedProducts.length === 0) {
            loadSuggestedProducts();
        }
    }, [isOpen]);

    const loadSuggestedProducts = async () => {
        setIsLoadingSuggestions(true);
        try {
            const products = await apiFetch<any[]>({
                path: '/wc/v3/products?per_page=10&orderby=popularity&order=desc',
            });

            const mappedProducts = products.map(p => ({
                id: p.id,
                name: p.name,
                sku: p.sku,
                price: p.price,
                thumbnail: p.images?.[0]?.src || '',
            }));

            setSuggestedProducts(mappedProducts);
        } catch (error) {
            console.error('Failed to load suggested products:', error);
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    const handleAddFromCategory = async () => {
        if (selectedCategories.length === 0) return;

        setIsAdding(true);
        try {
            await onAddFromCategory(selectedCategories, includeVariations);
            setSelectedCategories([]);
            setIncludeVariations(false);
            onClose();
        } catch (error) {
            console.error('Failed to add products from category:', error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleAddProduct = async (product: Product) => {
        setIsAdding(true);
        try {
            await onAddProduct(product);
            onClose();
        } catch (error) {
            console.error('Failed to add product:', error);
        } finally {
            setIsAdding(false);
        }
    };

    if (!isOpen) return null;

    return (
        <Modal
            title="Add Product Rules"
            onRequestClose={onClose}
            className="crp-add-product-modal"
        >
            <TabPanel
                className="crp-add-product-tabs"
                tabs={[
                    {
                        name: 'search',
                        title: 'Add Products',
                    },
                    {
                        name: 'category',
                        title: 'Add from Category',
                    },
                ]}
            >
                {(tab) => {
                    if (tab.name === 'search') {
                        return (
                            <div className="crp-add-product-tabs">
                                <p className="crp-modal__description">
                                    Search and select products to add pricing rules.
                                </p>
                                <ProductSearch
                                    onSelect={handleAddProduct}
                                    placeholder="Search for products..."
                                />

                                {isLoadingSuggestions ? (
                                    <div style={{ padding: '20px', textAlign: 'center' }}>
                                        <Spinner />
                                        <p>Loading suggested products...</p>
                                    </div>
                                ) : suggestedProducts.length > 0 && (
                                    <div style={{ marginTop: '20px' }}>
                                        <h4>Suggested Products</h4>
                                        <div style={{ display: 'grid', gap: '8px' }}>
                                            {suggestedProducts.map(product => (
                                                <button
                                                    key={product.id}
                                                    onClick={() => handleAddProduct(product)}
                                                    className="crp-product-search__result-item"
                                                    style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                                                >
                                                    {product.thumbnail && (
                                                        <img
                                                            src={product.thumbnail}
                                                            alt={product.name}
                                                            className="crp-product-search__result-thumbnail"
                                                        />
                                                    )}
                                                    <div className="crp-product-search__result-details">
                                                        <div className="crp-product-search__result-name">{product.name}</div>
                                                        {product.sku && (
                                                            <div className="crp-product-search__result-sku">
                                                                SKU: {product.sku}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {product.price && (
                                                        <div className="crp-product-search__result-price">
                                                            ${product.price}
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <div className="crp-add-product-tabs">
                            <p className="crp-modal__description">
                                Select categories to add all products from those categories.
                            </p>

                            {categories.length > 0 && (
                                <div style={{ marginBottom: '15px' }}>
                                    <h4>Suggested Categories</h4>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {categories.slice(0, 6).map(cat => (
                                            <Button
                                                key={cat.id}
                                                variant="secondary"
                                                size="small"
                                                onClick={() => {
                                                    if (!selectedCategories.includes(cat.id)) {
                                                        setSelectedCategories([...selectedCategories, cat.id]);
                                                    }
                                                }}
                                                disabled={selectedCategories.includes(cat.id)}
                                            >
                                                {cat.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <CategoryMultiSelect
                                value={selectedCategories}
                                onChange={setSelectedCategories}
                            />
                            <div className="crp-modal__checkbox-label">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={includeVariations}
                                        onChange={(e) => setIncludeVariations(e.target.checked)}
                                        className="crp-modal__checkbox-input"
                                    />
                                    Include product variations
                                </label>
                            </div>
                            <div className="crp-modal__actions">
                                <Button
                                    variant="primary"
                                    onClick={handleAddFromCategory}
                                    isBusy={isAdding}
                                    disabled={selectedCategories.length === 0 || isAdding}
                                >
                                    Add Products from Categories
                                </Button>
                                <Button
                                    variant="tertiary"
                                    onClick={onClose}
                                    disabled={isAdding}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    );
                }}
            </TabPanel>
        </Modal>
    );
};

export default AddProductModal;
