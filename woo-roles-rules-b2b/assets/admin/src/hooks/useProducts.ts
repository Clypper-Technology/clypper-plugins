import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Product } from '../types';

interface UseProductsReturn {
    searchProducts: (query: string, ruleId?: number) => Promise<Product[]>;
    getProductsByCategory: (categoryId: number) => Promise<Product[]>;
    isSearching: boolean;
}

export const useProducts = (): UseProductsReturn => {
    const [isSearching, setIsSearching] = useState(false);

    const searchProducts = async (query: string, ruleId?: number): Promise<Product[]> => {
        if (!query || query.length < 2) return [];

        setIsSearching(true);
        try {
            if (ruleId) {
                // Use rule-specific search endpoint
                const results = await apiFetch<Product[]>({
                    path: `/rrb2b/v1/rules/${ruleId}/products/search`,
                    method: 'POST',
                    data: { search: query },
                });
                return results;
            } else {
                // Use WooCommerce products endpoint
                const results = await apiFetch<any[]>({
                    path: `/wc/v3/products?search=${encodeURIComponent(query)}&per_page=20`,
                });
                // Map WooCommerce products to our Product type
                return results.map(product => ({
                    id: product.id,
                    name: product.name,
                    sku: product.sku,
                    price: product.price,
                    thumbnail: product.images?.[0]?.src || '',
                }));
            }
        } catch (error) {
            console.error('Error searching products:', error);
            return [];
        } finally {
            setIsSearching(false);
        }
    };

    const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
        setIsSearching(true);
        try {
            const results = await apiFetch<any[]>({
                path: `/wc/v3/products?category=${categoryId}&per_page=100`,
            });
            // Map WooCommerce products to our Product type
            return results.map(product => ({
                id: product.id,
                name: product.name,
                sku: product.sku,
                price: product.price,
                thumbnail: product.images?.[0]?.src || '',
            }));
        } catch (error) {
            console.error('Error fetching products by category:', error);
            return [];
        } finally {
            setIsSearching(false);
        }
    };

    return {
        searchProducts,
        getProductsByCategory,
        isSearching,
    };
};
