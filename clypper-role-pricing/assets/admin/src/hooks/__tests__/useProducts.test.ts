import { renderHook, act, waitFor } from '@testing-library/react';
import { useProducts } from '../useProducts';
import apiFetch from '@wordpress/api-fetch';

// Mock the WordPress modules
jest.mock('@wordpress/api-fetch');

const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

describe('useProducts', () => {
	const mockProducts = [
		{
			value: 'Test Product 1',
			data: 101,
		},
		{
			value: 'Test Product 2',
			data: 102,
		},
		{
			value: 'Test Product 3 [Color: Red, Size: L]',
			data: 103,
		},
	];

	const mockWooProducts = [
		{
			id: 201,
			name: 'WooCommerce Product 1',
			price: '19.99',
			sku: 'WC-001',
		},
		{
			id: 202,
			name: 'WooCommerce Product 2',
			price: '29.99',
			sku: 'WC-002',
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('searchProducts', () => {
		it('should return empty array for empty query', async () => {
			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.searchProducts('');
			});

			expect(products).toEqual([]);
			expect(mockApiFetch).not.toHaveBeenCalled();
		});

		it('should return empty array for query less than 2 characters', async () => {
			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.searchProducts('a');
			});

			expect(products).toEqual([]);
			expect(mockApiFetch).not.toHaveBeenCalled();
		});

		it('should search using rule-specific endpoint when ruleId provided', async () => {
			mockApiFetch.mockResolvedValueOnce(mockProducts);

			const { result } = renderHook(() => useProducts());

			expect(result.current.isSearching).toBe(false);

			let products;
			await act(async () => {
				products = await result.current.searchProducts('test', 1);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/rules/1/products/search',
				method: 'POST',
				data: { search: 'test' },
			});

			expect(products).toEqual(mockProducts);
		});

		it('should search using WooCommerce endpoint when no ruleId', async () => {
			mockApiFetch.mockResolvedValueOnce(mockWooProducts);

			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.searchProducts('woocommerce');
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/wc/v3/products?search=woocommerce&per_page=20',
			});

			expect(products).toEqual(mockWooProducts);
		});

		it('should encode search query in URL', async () => {
			mockApiFetch.mockResolvedValueOnce([]);

			const { result } = renderHook(() => useProducts());

			await act(async () => {
				await result.current.searchProducts('test & query');
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: expect.stringContaining(encodeURIComponent('test & query')),
			});
		});

		it('should set isSearching state during search', async () => {
			let resolvePromise: (value: any) => void;
			const promise = new Promise((resolve) => {
				resolvePromise = resolve;
			});

			mockApiFetch.mockReturnValueOnce(promise as any);

			const { result } = renderHook(() => useProducts());

			expect(result.current.isSearching).toBe(false);

			act(() => {
				result.current.searchProducts('test');
			});

			expect(result.current.isSearching).toBe(true);

			act(() => {
				resolvePromise!(mockProducts);
			});

			await waitFor(() => {
				expect(result.current.isSearching).toBe(false);
			});
		});

		it('should handle search errors gracefully', async () => {
			const mockError = new Error('Network error');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.searchProducts('test');
			});

			expect(products).toEqual([]);
			expect(result.current.isSearching).toBe(false);
		});

		it('should return empty array on search error with ruleId', async () => {
			const mockError = new Error('Rule not found');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.searchProducts('test', 999);
			});

			expect(products).toEqual([]);
		});

		it('should handle search with special characters', async () => {
			mockApiFetch.mockResolvedValueOnce(mockProducts);

			const { result } = renderHook(() => useProducts());

			await act(async () => {
				await result.current.searchProducts('test [special] characters', 1);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/rules/1/products/search',
				method: 'POST',
				data: { search: 'test [special] characters' },
			});
		});

		it('should handle search for product variations', async () => {
			const variationProducts = [
				{
					value: 'Variable Product [Color: Red]',
					data: 301,
				},
				{
					value: 'Variable Product [Color: Blue]',
					data: 302,
				},
			];

			mockApiFetch.mockResolvedValueOnce(variationProducts);

			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.searchProducts('variable', 1);
			});

			expect(products).toEqual(variationProducts);
			expect(products).toHaveLength(2);
		});
	});

	describe('getProductsByCategory', () => {
		it('should fetch products by category ID', async () => {
			mockApiFetch.mockResolvedValueOnce(mockWooProducts);

			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.getProductsByCategory(10);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/wc/v3/products?category=10&per_page=100',
			});

			expect(products).toEqual(mockWooProducts);
		});

		it('should set isSearching state during fetch', async () => {
			let resolvePromise: (value: any) => void;
			const promise = new Promise((resolve) => {
				resolvePromise = resolve;
			});

			mockApiFetch.mockReturnValueOnce(promise as any);

			const { result } = renderHook(() => useProducts());

			expect(result.current.isSearching).toBe(false);

			act(() => {
				result.current.getProductsByCategory(10);
			});

			expect(result.current.isSearching).toBe(true);

			act(() => {
				resolvePromise!(mockWooProducts);
			});

			await waitFor(() => {
				expect(result.current.isSearching).toBe(false);
			});
		});

		it('should handle fetch errors gracefully', async () => {
			const mockError = new Error('Category not found');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.getProductsByCategory(999);
			});

			expect(products).toEqual([]);
			expect(result.current.isSearching).toBe(false);
		});

		it('should fetch up to 100 products per category', async () => {
			mockApiFetch.mockResolvedValueOnce(mockWooProducts);

			const { result } = renderHook(() => useProducts());

			await act(async () => {
				await result.current.getProductsByCategory(5);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: expect.stringContaining('per_page=100'),
			});
		});

		it('should return empty array for invalid category ID', async () => {
			mockApiFetch.mockResolvedValueOnce([]);

			const { result } = renderHook(() => useProducts());

			let products;
			await act(async () => {
				products = await result.current.getProductsByCategory(0);
			});

			expect(products).toEqual([]);
		});
	});

	describe('concurrent searches', () => {
		it('should handle multiple concurrent searches', async () => {
			const search1Results = [mockProducts[0]];
			const search2Results = [mockProducts[1]];

			mockApiFetch
				.mockResolvedValueOnce(search1Results)
				.mockResolvedValueOnce(search2Results);

			const { result } = renderHook(() => useProducts());

			let products1, products2;
			await act(async () => {
				[products1, products2] = await Promise.all([
					result.current.searchProducts('product1', 1),
					result.current.searchProducts('product2', 2),
				]);
			});

			expect(products1).toEqual(search1Results);
			expect(products2).toEqual(search2Results);
			expect(mockApiFetch).toHaveBeenCalledTimes(2);
		});

		it('should handle search and category fetch concurrently', async () => {
			mockApiFetch
				.mockResolvedValueOnce(mockProducts)
				.mockResolvedValueOnce(mockWooProducts);

			const { result } = renderHook(() => useProducts());

			let searchResults, categoryResults;
			await act(async () => {
				[searchResults, categoryResults] = await Promise.all([
					result.current.searchProducts('test', 1),
					result.current.getProductsByCategory(10),
				]);
			});

			expect(searchResults).toEqual(mockProducts);
			expect(categoryResults).toEqual(mockWooProducts);
		});
	});

	describe('isSearching state', () => {
		it('should initialize as false', () => {
			const { result } = renderHook(() => useProducts());

			expect(result.current.isSearching).toBe(false);
		});

		it('should reset to false after search completes', async () => {
			mockApiFetch.mockResolvedValueOnce(mockProducts);

			const { result } = renderHook(() => useProducts());

			await act(async () => {
				await result.current.searchProducts('test');
			});

			expect(result.current.isSearching).toBe(false);
		});

		it('should reset to false after error', async () => {
			mockApiFetch.mockRejectedValueOnce(new Error('Error'));

			const { result } = renderHook(() => useProducts());

			await act(async () => {
				await result.current.searchProducts('test');
			});

			expect(result.current.isSearching).toBe(false);
		});
	});
});
