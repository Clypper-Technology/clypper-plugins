import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Category } from '../types';

interface UseCategoriesReturn {
    categories: Category[];
    isLoading: boolean;
    fetchCategories: () => Promise<void>;
}

export const useCategories = (): UseCategoriesReturn => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchCategories = async (): Promise<void> => {
        setIsLoading(true);
        try {
            // Fetch WooCommerce product categories
            const data = await apiFetch<Category[]>({
                path: '/wc/v3/products/categories?per_page=999',
            });
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        isLoading,
        fetchCategories,
    };
};
