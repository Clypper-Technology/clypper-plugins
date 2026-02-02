import { renderHook, act, waitFor } from '@testing-library/react';
import { useRoles } from '../useRoles';
import apiFetch from '@wordpress/api-fetch';

// Mock the WordPress modules
jest.mock('@wordpress/api-fetch');
jest.mock('@wordpress/data', () => ({
	useDispatch: jest.fn(() => ({
		createSuccessNotice: jest.fn(),
		createErrorNotice: jest.fn(),
	})),
}));

const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;

describe('useRoles', () => {
	const mockRoles = [
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
			user_count: 5,
		},
		{
			slug: 'vip_customer',
			name: 'VIP Customer',
			capabilities: ['read'],
			user_count: 2,
		},
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('fetchRoles', () => {
		it('should fetch roles on mount', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const { result } = renderHook(() => useRoles());

			expect(result.current.isLoading).toBe(true);

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.roles).toEqual(mockRoles);
			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/roles',
				method: 'GET',
			});
		});

		it('should handle fetch errors', async () => {
			const mockError = new Error('Network error');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.roles).toEqual([]);
		});

		it('should set loading state correctly during fetch', async () => {
			let resolvePromise: (value: any) => void;
			const promise = new Promise((resolve) => {
				resolvePromise = resolve;
			});

			mockApiFetch.mockReturnValueOnce(promise as any);

			const { result } = renderHook(() => useRoles());

			expect(result.current.isLoading).toBe(true);

			act(() => {
				resolvePromise!(mockRoles);
			});

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});
		});
	});

	describe('createRole', () => {
		it('should create a new role successfully', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const newRole = {
				slug: 'wholesaler',
				name: 'Wholesaler',
				capabilities: ['read'],
				user_count: 0,
			};

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			mockApiFetch.mockResolvedValueOnce({
				success: true,
				role: newRole,
			});

			let createdRole;
			await act(async () => {
				createdRole = await result.current.createRole({
					name: 'Wholesaler',
					slug: 'wholesaler',
					baseCap: 'customer',
				});
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/roles',
				method: 'POST',
				data: {
					role_name: 'Wholesaler',
					role_slug: 'wholesaler',
					role_cap: 'customer',
				},
			});

			expect(createdRole).toEqual(newRole);
			expect(result.current.roles).toContainEqual(newRole);
		});

		it('should handle create role errors', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			const mockError = new Error('Role already exists');
			mockApiFetch.mockRejectedValueOnce(mockError);

			await expect(
				act(async () => {
					await result.current.createRole({
						name: 'Duplicate',
						slug: 'customer',
						baseCap: 'customer',
					});
				})
			).rejects.toThrow('Role already exists');
		});

		it('should use default baseCap if not provided', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			mockApiFetch.mockResolvedValueOnce({
				success: true,
				role: { slug: 'test', name: 'Test' },
			});

			await act(async () => {
				await result.current.createRole({
					name: 'Test',
					slug: 'test',
				});
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/roles',
				method: 'POST',
				data: {
					role_name: 'Test',
					role_slug: 'test',
					role_cap: 'customer',
				},
			});
		});
	});

	describe('deleteRole', () => {
		it('should delete a role successfully', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.roles).toHaveLength(3);

			mockApiFetch.mockResolvedValueOnce({
				deleted: true,
				message: 'Role deleted successfully',
			});

			await act(async () => {
				await result.current.deleteRole('vip_customer');
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/roles/vip_customer',
				method: 'DELETE',
			});

			expect(result.current.roles).toHaveLength(2);
			expect(result.current.roles.find(r => r.slug === 'vip_customer')).toBeUndefined();
		});

		it('should handle delete role errors with rollback', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			const initialRolesCount = result.current.roles.length;

			const mockError = new Error('Cannot delete core role');
			mockApiFetch.mockRejectedValueOnce(mockError);

			await expect(
				act(async () => {
					await result.current.deleteRole('administrator');
				})
			).rejects.toThrow('Cannot delete core role');

			// Should rollback - roles count should be the same
			expect(result.current.roles).toHaveLength(initialRolesCount);
			expect(result.current.roles.find(r => r.slug === 'administrator')).toBeDefined();
		});

		it('should perform optimistic update', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(result.current.roles.find(r => r.slug === 'vip_customer')).toBeDefined();

			// Don't resolve immediately to test optimistic update
			let resolveDelete: () => void;
			const deletePromise = new Promise<void>((resolve) => {
				resolveDelete = resolve;
			});
			mockApiFetch.mockReturnValueOnce(deletePromise as any);

			act(() => {
				result.current.deleteRole('vip_customer');
			});

			// Should be immediately removed (optimistic)
			expect(result.current.roles.find(r => r.slug === 'vip_customer')).toBeUndefined();

			act(() => {
				resolveDelete!();
			});
		});
	});

	describe('refetch', () => {
		it('should refetch roles', async () => {
			mockApiFetch.mockResolvedValueOnce(mockRoles);

			const { result } = renderHook(() => useRoles());

			await waitFor(() => {
				expect(result.current.isLoading).toBe(false);
			});

			expect(mockApiFetch).toHaveBeenCalledTimes(1);

			const updatedRoles = [...mockRoles, {
				slug: 'new_role',
				name: 'New Role',
				capabilities: ['read'],
				user_count: 0,
			}];

			mockApiFetch.mockResolvedValueOnce(updatedRoles);

			await act(async () => {
				await result.current.refetch();
			});

			expect(mockApiFetch).toHaveBeenCalledTimes(2);
			expect(result.current.roles).toEqual(updatedRoles);
		});
	});
});
