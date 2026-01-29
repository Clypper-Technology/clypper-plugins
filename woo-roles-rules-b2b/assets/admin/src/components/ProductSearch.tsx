import { useState, useMemo, useEffect } from '@wordpress/element';
import { TextControl, Spinner } from '@wordpress/components';
import { debounce } from '@wordpress/compose';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';

interface ProductSearchProps {
    onSelect: (product: Product) => void;
    ruleId?: number;
    placeholder?: string;
}

const ProductSearch: React.FC<ProductSearchProps> = ({
    onSelect,
    ruleId,
    placeholder = 'Search products...'
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [localSearching, setLocalSearching] = useState(false);
    const { searchProducts } = useProducts();

    const debouncedSearch = useMemo(
        () =>
            debounce(async (term: string) => {
                if (term.length < 2) {
                    setProducts([]);
                    setLocalSearching(false);
                    return;
                }

                setLocalSearching(true);
                const results = await searchProducts(term, ruleId);
                setProducts(results);
                setIsOpen(true);
                setLocalSearching(false);
            }, 300),
        [ruleId, searchProducts]
    );

    useEffect(() => {
        if (searchTerm.length >= 2) {
            setLocalSearching(true);
        }
        debouncedSearch(searchTerm);
    }, [searchTerm, debouncedSearch]);

    const handleSelect = (product: Product) => {
        onSelect(product);
        setSearchTerm('');
        setProducts([]);
        setIsOpen(false);
    };

    return (
        <div className="crp-product-search">
            <TextControl
                label="Search Products"
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder={placeholder}
                autoComplete="off"
            />
            {localSearching && (
                <div className="crp-product-search__spinner">
                    <Spinner />
                </div>
            )}

            {isOpen && products.length > 0 && (
                <div className="crp-product-search__results">
                    {products.map(product => (
                        <button
                            key={product.id}
                            onClick={() => handleSelect(product)}
                            className="crp-product-search__result-item"
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
            )}

            {searchTerm.length >= 2 && products.length === 0 && !localSearching && (
                <div className="crp-product-search__no-results">
                    No products found
                </div>
            )}
        </div>
    );
};

export default ProductSearch;
