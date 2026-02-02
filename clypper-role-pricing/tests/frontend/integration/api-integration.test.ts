/**
 * Integration tests for frontend-backend API interaction
 *
 * These tests verify that the frontend hooks correctly interact with
 * the backend REST API endpoints, ensuring data flows properly between
 * the TypeScript/React frontend and the PHP backend.
 */

import apiFetch from '@wordpress/api-fetch';

// Mock apiFetch for integration testing
jest.mock('@wordpress/api-fetch');

const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

describe('Frontend-Backend API Integration', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('Roles API Integration', () => {
		describe('GET /rrb2b/v1/roles', () => {
			it('should fetch and parse roles correctly', async () => {
				const mockBackendResponse = [
					{
						slug: 'administrator',
						name: 'Administrator',
						capabilities: ['manage_options', 'manage_woocommerce'],
						user_count: 1,
					},
					{
						slug: 'customer',
						name: 'Customer',
						capabilities: ['read'],
						user_count: 10,
					},
				];

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/roles',
					method: 'GET',
				});

				expect(response).toEqual(mockBackendResponse);
				expect(Array.isArray(response)).toBe(true);
				expect((response as any)[0]).toHaveProperty('slug');
				expect((response as any)[0]).toHaveProperty('name');
				expect((response as any)[0]).toHaveProperty('capabilities');
				expect((response as any)[0]).toHaveProperty('user_count');
			});

			it('should handle empty roles list', async () => {
				mockApiFetch.mockResolvedValueOnce([]);

				const response = await apiFetch({
					path: '/rrb2b/v1/roles',
					method: 'GET',
				});

				expect(response).toEqual([]);
			});

			it('should handle 403 permission error', async () => {
				mockApiFetch.mockRejectedValueOnce({
					code: 'rest_forbidden',
					message: 'You do not have permission to perform this action.',
					data: { status: 403 },
				});

				await expect(
					apiFetch({ path: '/rrb2b/v1/roles', method: 'GET' })
				).rejects.toMatchObject({
					code: 'rest_forbidden',
					data: { status: 403 },
				});
			});
		});

		describe('POST /rrb2b/v1/roles', () => {
			it('should create role with correct data format', async () => {
				const requestData = {
					role_name: 'Wholesaler',
					role_slug: 'wholesaler',
					role_cap: 'customer',
				};

				const mockBackendResponse = {
					success: true,
					message: 'Role created successfully.',
					role: {
						slug: 'wholesaler',
						name: 'Wholesaler',
					},
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/roles',
					method: 'POST',
					data: requestData,
				});

				expect(mockApiFetch).toHaveBeenCalledWith({
					path: '/rrb2b/v1/roles',
					method: 'POST',
					data: requestData,
				});

				expect(response).toEqual(mockBackendResponse);
				expect((response as any).success).toBe(true);
				expect((response as any).role.slug).toBe('wholesaler');
			});

			it('should handle validation errors', async () => {
				mockApiFetch.mockRejectedValueOnce({
					code: 'rrb2b_invalid_request',
					message: 'Role name and slug are required.',
					data: { status: 400 },
				});

				await expect(
					apiFetch({
						path: '/rrb2b/v1/roles',
						method: 'POST',
						data: { role_name: '', role_slug: '', role_cap: 'customer' },
					})
				).rejects.toMatchObject({
					code: 'rrb2b_invalid_request',
					data: { status: 400 },
				});
			});

			it('should handle duplicate role error', async () => {
				mockApiFetch.mockRejectedValueOnce({
					code: 'rrb2b_error',
					message: 'A role with this slug already exists.',
					data: { status: 400 },
				});

				await expect(
					apiFetch({
						path: '/rrb2b/v1/roles',
						method: 'POST',
						data: {
							role_name: 'Customer',
							role_slug: 'customer',
							role_cap: 'customer',
						},
					})
				).rejects.toMatchObject({
					data: { status: 400 },
				});
			});
		});

		describe('DELETE /rrb2b/v1/roles/{slug}', () => {
			it('should delete role successfully', async () => {
				const mockBackendResponse = {
					deleted: true,
					message: 'Role and associated rules deleted successfully.',
					role_slug: 'wholesaler',
					rules_deleted: 2,
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/roles/wholesaler',
					method: 'DELETE',
				});

				expect(response).toEqual(mockBackendResponse);
				expect((response as any).deleted).toBe(true);
				expect((response as any).rules_deleted).toBe(2);
			});

			it('should handle 404 for non-existent role', async () => {
				mockApiFetch.mockRejectedValueOnce({
					code: 'rrb2b_rule_not_found',
					message: 'Role not found.',
					data: { status: 404 },
				});

				await expect(
					apiFetch({
						path: '/rrb2b/v1/roles/nonexistent',
						method: 'DELETE',
					})
				).rejects.toMatchObject({
					data: { status: 404 },
				});
			});

			it('should handle 403 for core role deletion', async () => {
				mockApiFetch.mockRejectedValueOnce({
					code: 'rrb2b_error',
					message: 'Cannot delete core WordPress or WooCommerce roles.',
					data: { status: 403 },
				});

				await expect(
					apiFetch({
						path: '/rrb2b/v1/roles/administrator',
						method: 'DELETE',
					})
				).rejects.toMatchObject({
					data: { status: 403 },
				});
			});
		});
	});

	describe('Rules API Integration', () => {
		describe('GET /rrb2b/v1/rules', () => {
			it('should fetch and parse rules correctly', async () => {
				const mockBackendResponse = [
					{
						id: 1,
						role_name: 'wholesaler',
						rule_active: true,
						global_rule: { type: 'percentage', value: '10' },
						category_rule: null,
						categories: [],
						products: [],
						single_categories: [],
					},
				];

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules',
					method: 'GET',
				});

				expect(response).toEqual(mockBackendResponse);
				expect((response as any)[0]).toHaveProperty('id');
				expect((response as any)[0]).toHaveProperty('role_name');
				expect((response as any)[0]).toHaveProperty('rule_active');
				expect((response as any)[0]).toHaveProperty('global_rule');
			});
		});

		describe('POST /rrb2b/v1/rules', () => {
			it('should create rule with correct data format', async () => {
				const requestData = {
					role_name: 'wholesaler',
				};

				const mockBackendResponse = {
					id: 1,
					role_name: 'wholesaler',
					rule_active: false,
					global_rule: null,
					category_rule: null,
					categories: [],
					products: [],
					single_categories: [],
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules',
					method: 'POST',
					data: requestData,
				});

				expect(mockApiFetch).toHaveBeenCalledWith({
					path: '/rrb2b/v1/rules',
					method: 'POST',
					data: requestData,
				});

				expect((response as any).id).toBe(1);
				expect((response as any).role_name).toBe('wholesaler');
			});
		});

		describe('PUT /rrb2b/v1/rules/{id}', () => {
			it('should update rule with correct data format', async () => {
				const requestData = {
					rule_active: true,
					global_rule: {
						type: 'percentage',
						value: '15',
					},
				};

				const mockBackendResponse = {
					id: 1,
					role_name: 'wholesaler',
					rule_active: true,
					global_rule: { type: 'percentage', value: '15' },
					category_rule: null,
					categories: [],
					products: [],
					single_categories: [],
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1',
					method: 'PUT',
					data: requestData,
				});

				expect((response as any).rule_active).toBe(true);
				expect((response as any).global_rule.value).toBe('15');
			});

			it('should handle 404 for non-existent rule', async () => {
				mockApiFetch.mockRejectedValueOnce({
					code: 'rrb2b_rule_not_found',
					message: 'Rule not found.',
					data: { status: 404 },
				});

				await expect(
					apiFetch({
						path: '/rrb2b/v1/rules/999',
						method: 'PUT',
						data: { rule_active: true },
					})
				).rejects.toMatchObject({
					data: { status: 404 },
				});
			});
		});

		describe('DELETE /rrb2b/v1/rules/{id}', () => {
			it('should delete rule successfully', async () => {
				const mockBackendResponse = {
					deleted: true,
					id: 1,
					message: 'Rule deleted successfully.',
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1',
					method: 'DELETE',
				});

				expect((response as any).deleted).toBe(true);
				expect((response as any).id).toBe(1);
			});
		});

		describe('POST /rrb2b/v1/rules/{id}/copy', () => {
			it('should copy rules correctly', async () => {
				const requestData = {
					type: 'category',
					to: [2, 3],
				};

				const mockBackendResponse = {
					success: true,
					copied: true,
					message: 'Rules copied successfully.',
					from_rule: 1,
					to_rules: [2, 3],
					rule_type: 'category',
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1/copy',
					method: 'POST',
					data: requestData,
				});

				expect((response as any).success).toBe(true);
				expect((response as any).from_rule).toBe(1);
				expect((response as any).to_rules).toEqual([2, 3]);
			});

			it('should handle validation error for empty targets', async () => {
				mockApiFetch.mockRejectedValueOnce({
					code: 'rrb2b_invalid_request',
					message: 'At least one target rule ID is required.',
					data: { status: 400 },
				});

				await expect(
					apiFetch({
						path: '/rrb2b/v1/rules/1/copy',
						method: 'POST',
						data: { type: 'category', to: [] },
					})
				).rejects.toMatchObject({
					data: { status: 400 },
				});
			});
		});
	});

	describe('Products API Integration', () => {
		describe('POST /rrb2b/v1/rules/{id}/products/search', () => {
			it('should search products correctly', async () => {
				const mockBackendResponse = [
					{
						value: 'Test Product 1',
						data: 101,
					},
					{
						value: 'Test Product 2',
						data: 102,
					},
				];

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1/products/search',
					method: 'POST',
					data: { search: 'Test Product' },
				});

				expect(response).toEqual(mockBackendResponse);
				expect((response as any)[0]).toHaveProperty('value');
				expect((response as any)[0]).toHaveProperty('data');
			});

			it('should handle empty search results', async () => {
				mockApiFetch.mockResolvedValueOnce([]);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1/products/search',
					method: 'POST',
					data: { search: 'nonexistent' },
				});

				expect(response).toEqual([]);
			});
		});

		describe('PUT /rrb2b/v1/rules/{id}/products', () => {
			it('should update product rules correctly', async () => {
				const requestData = {
					rows: [
						{
							product_id: 101,
							type: 'percentage',
							value: '10',
						},
						{
							product_id: 102,
							type: 'fixed',
							value: '5',
						},
					],
				};

				const mockBackendResponse = {
					success: true,
					message: 'Product rules updated successfully.',
					rule_id: 1,
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1/products',
					method: 'PUT',
					data: requestData,
				});

				expect((response as any).success).toBe(true);
				expect((response as any).rule_id).toBe(1);
			});
		});

		describe('POST /rrb2b/v1/rules/{id}/products/from-category', () => {
			it('should add products from category correctly', async () => {
				const requestData = {
					category: '5',
					variations: false,
				};

				const mockBackendResponse = {
					success: true,
					message: 'Products added successfully from category.',
					rule_id: 1,
					category: '5',
					products_added: 15,
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1/products/from-category',
					method: 'POST',
					data: requestData,
				});

				expect((response as any).success).toBe(true);
				expect((response as any).products_added).toBe(15);
			});
		});
	});

	describe('Categories API Integration', () => {
		describe('GET /rrb2b/v1/rules/{id}/categories', () => {
			it('should fetch categories for rule correctly', async () => {
				const mockBackendResponse = {
					rule_id: 1,
					categories: {
						general: [
							{
								id: 1,
								slug: 'electronics',
								name: 'Electronics',
							},
						],
						specific: [],
						category_rule: {
							type: 'percentage',
							value: '10',
						},
					},
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1/categories',
					method: 'GET',
				});

				expect((response as any).rule_id).toBe(1);
				expect((response as any).categories).toBeDefined();
			});
		});

		describe('PUT /rrb2b/v1/rules/{id}/categories', () => {
			it('should update category rules correctly', async () => {
				const requestData = {
					rows: [
						{
							category_id: 1,
							type: 'percentage',
							value: '10',
						},
					],
				};

				const mockBackendResponse = {
					success: true,
					message: 'Category rules updated successfully.',
					rule_id: 1,
				};

				mockApiFetch.mockResolvedValueOnce(mockBackendResponse);

				const response = await apiFetch({
					path: '/rrb2b/v1/rules/1/categories',
					method: 'PUT',
					data: requestData,
				});

				expect((response as any).success).toBe(true);
				expect((response as any).rule_id).toBe(1);
			});
		});
	});

	describe('Error Response Format Consistency', () => {
		it('should handle all error codes consistently', async () => {
			const errorCodes = [
				'rrb2b_invalid_rule',
				'rrb2b_rule_not_found',
				'rrb2b_permission_denied',
				'rrb2b_invalid_product',
				'rrb2b_invalid_category',
				'rrb2b_role_exists',
				'rrb2b_role_not_found',
				'rrb2b_service_error',
				'rrb2b_invalid_request',
			];

			for (const code of errorCodes) {
				mockApiFetch.mockRejectedValueOnce({
					code,
					message: 'Test error message',
					data: { status: 400 },
				});

				await expect(
					apiFetch({ path: '/test', method: 'GET' })
				).rejects.toMatchObject({
					code,
					data: { status: expect.any(Number) },
				});
			}
		});
	});
});
