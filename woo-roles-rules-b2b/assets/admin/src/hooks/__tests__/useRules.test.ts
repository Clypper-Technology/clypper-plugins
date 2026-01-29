import { renderHook, act, waitFor } from '@testing-library/react';
import { useRules } from '../useRules';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch, useSelect } from '@wordpress/data';

// Mock the WordPress modules
jest.mock('@wordpress/api-fetch');
jest.mock('@wordpress/data');

const mockApiFetch = apiFetch as jest.MockedFunction<typeof apiFetch>;
const mockUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>;
const mockUseSelect = useSelect as jest.MockedFunction<typeof useSelect>;

describe('useRules', () => {
	const mockRules = [
		{
			id: 1,
			role_name: 'wholesaler',
			active: true,
			global_rule: { type: 'percentage', value: '10' },
			category_rule: null,
			categories: [],
			products: [],
			single_categories: [],
		},
		{
			id: 2,
			role_name: 'vip_customer',
			active: false,
			global_rule: null,
			category_rule: { type: 'fixed', value: '5' },
			categories: [1, 2, 3],
			products: [],
			single_categories: [],
		},
	];

	const mockDispatchActions = {
		addRule: jest.fn(),
		updateRule: jest.fn(),
		deleteRule: jest.fn(),
		invalidateResolution: jest.fn(),
	};

	const mockNoticeActions = {
		createSuccessNotice: jest.fn(),
		createErrorNotice: jest.fn(),
	};

	beforeEach(() => {
		jest.clearAllMocks();

		mockUseSelect.mockReturnValue({
			rules: mockRules,
			isLoading: false,
			error: null,
		});

		// Reset mock implementations to default
		mockNoticeActions.createSuccessNotice.mockReturnValue(undefined);
		mockNoticeActions.createErrorNotice.mockReturnValue(undefined);
		mockDispatchActions.addRule.mockReturnValue(undefined);
		mockDispatchActions.updateRule.mockReturnValue(undefined);
		mockDispatchActions.deleteRule.mockReturnValue(undefined);
		mockDispatchActions.invalidateResolution.mockReturnValue(undefined);

		mockUseDispatch.mockImplementation((storeName: any) => {
			if (storeName === 'core/notices' || (storeName && storeName.name === 'core/notices')) {
				return mockNoticeActions;
			}
			return mockDispatchActions;
		});
	});

	describe('initialization', () => {
		it('should return rules from store', () => {
			const { result } = renderHook(() => useRules());

			expect(result.current.rules).toEqual(mockRules);
			expect(result.current.isLoading).toBe(false);
			expect(result.current.error).toBeNull();
		});

		it('should filter rules by role', () => {
			const filteredRules = [mockRules[0]];
			mockUseSelect.mockReturnValue({
				rules: filteredRules,
				isLoading: false,
				error: null,
			});

			const { result } = renderHook(() => useRules('wholesaler'));

			expect(result.current.rules).toEqual(filteredRules);
		});

		it('should handle loading state', () => {
			mockUseSelect.mockReturnValue({
				rules: [],
				isLoading: true,
				error: null,
			});

			const { result } = renderHook(() => useRules());

			expect(result.current.isLoading).toBe(true);
		});

		it('should handle error state', () => {
			mockUseSelect.mockReturnValue({
				rules: [],
				isLoading: false,
				error: 'Failed to fetch rules',
			});

			const { result } = renderHook(() => useRules());

			expect(result.current.error).toBe('Failed to fetch rules');
		});
	});

	describe('createRule', () => {
		it('should create a new rule successfully', async () => {
			const newRule = {
				id: 3,
				role_name: 'test_role',
				active: false,
				global_rule: null,
				category_rule: null,
				categories: [],
				products: [],
				single_categories: [],
			};

			mockApiFetch.mockResolvedValueOnce(newRule);

			const { result } = renderHook(() => useRules());

			await act(async () => {
				const created = await result.current.createRule({ role: 'test_role' });
				expect(created).toEqual(newRule);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/rules',
				method: 'POST',
				data: {
					role_name: 'test_role',
				},
			});

			expect(mockDispatchActions.addRule).toHaveBeenCalledWith(newRule);
			expect(mockNoticeActions.createSuccessNotice).toHaveBeenCalledWith(
				'Rule created successfully!',
				{ type: 'snackbar' }
			);
		});

		it('should handle create errors', async () => {
			const mockError = new Error('Failed to create rule');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useRules());

			await expect(
				act(async () => {
					await result.current.createRule({ role: 'test_role' });
				})
			).rejects.toThrow('Failed to create rule');

			expect(mockNoticeActions.createErrorNotice).toHaveBeenCalled();
		});
	});

	describe('updateRule', () => {
		it('should update a rule successfully', async () => {
			const updatedRule = {
				...mockRules[0],
				active: false,
			};

			mockApiFetch.mockResolvedValueOnce(updatedRule);

			const { result } = renderHook(() => useRules());

			await act(async () => {
				const updated = await result.current.updateRule(1, { active: false });
				expect(updated).toEqual(updatedRule);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/rules/1',
				method: 'PUT',
				data: { active: false },  // Frontend sends 'active' (not transformed)
			});

			expect(mockDispatchActions.updateRule).toHaveBeenCalledWith(updatedRule);
			expect(mockNoticeActions.createSuccessNotice).toHaveBeenCalled();
		});

		it('should perform optimistic update', async () => {
			let resolveUpdate: (value: any) => void;
			const updatePromise = new Promise((resolve) => {
				resolveUpdate = resolve;
			});

			mockApiFetch.mockReturnValueOnce(updatePromise as any);

			const { result } = renderHook(() => useRules());

			act(() => {
				result.current.updateRule(1, { rule_active: false });
			});

			// Should optimistically update
			expect(mockDispatchActions.updateRule).toHaveBeenCalled();

			act(() => {
				resolveUpdate!({ ...mockRules[0], rule_active: false });
			});

			await waitFor(() => {
				expect(mockDispatchActions.updateRule).toHaveBeenCalledTimes(2);
			});
		});

		it('should rollback on error', async () => {
			const mockError = new Error('Update failed');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useRules());

			await expect(
				act(async () => {
					await result.current.updateRule(1, { active: false });
				})
			).rejects.toThrow('Update failed');

			// Should rollback - updateRule called twice (optimistic + rollback)
			expect(mockDispatchActions.updateRule).toHaveBeenCalledTimes(2);
			expect(mockNoticeActions.createErrorNotice).toHaveBeenCalled();
		});
	});

	describe('deleteRule', () => {
		it('should delete a rule successfully', async () => {
			mockApiFetch.mockResolvedValueOnce({
				deleted: true,
				id: 1,
				message: 'Rule deleted successfully',
			});

			const { result } = renderHook(() => useRules());

			await act(async () => {
				await result.current.deleteRule(1);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/rules/1',
				method: 'DELETE',
			});

			expect(mockDispatchActions.deleteRule).toHaveBeenCalledWith(1);
			expect(mockNoticeActions.createSuccessNotice).toHaveBeenCalled();
		});

		it('should perform optimistic delete', async () => {
			let resolveDelete: () => void;
			const deletePromise = new Promise<void>((resolve) => {
				resolveDelete = resolve;
			});

			mockApiFetch.mockReturnValueOnce(deletePromise as any);

			const { result } = renderHook(() => useRules());

			act(() => {
				result.current.deleteRule(1);
			});

			// Should optimistically delete
			expect(mockDispatchActions.deleteRule).toHaveBeenCalledWith(1);

			act(() => {
				resolveDelete!();
			});
		});

		it('should handle delete errors', async () => {
			const mockError = new Error('Delete failed');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useRules());

			await expect(
				act(async () => {
					await result.current.deleteRule(1);
				})
			).rejects.toThrow('Delete failed');

			expect(mockNoticeActions.createErrorNotice).toHaveBeenCalled();
		});
	});

	describe('toggleActive', () => {
		it('should toggle rule active state', async () => {
			const updatedRule = {
				...mockRules[0],
				active: false,
			};

			mockApiFetch.mockResolvedValueOnce(updatedRule);

			const { result } = renderHook(() => useRules());

			await act(async () => {
				await result.current.toggleActive(1);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/rules/1',
				method: 'PUT',
				data: { active: false },
			});
		});

		it('should handle non-existent rule', async () => {
			const { result } = renderHook(() => useRules());

			await act(async () => {
				await result.current.toggleActive(999);
			});

			// Should not make API call
			expect(mockApiFetch).not.toHaveBeenCalled();
		});
	});

	describe('copyRule', () => {
		it('should copy rule to other roles', async () => {
			const newRules = [
				{ ...mockRules[0], id: 3, role_name: 'role1' },
				{ ...mockRules[0], id: 4, role_name: 'role2' },
			];

			mockApiFetch.mockResolvedValueOnce(newRules);

			const { result } = renderHook(() => useRules());

			await act(async () => {
				await result.current.copyRule(1, ['role1', 'role2']);
			});

			expect(mockApiFetch).toHaveBeenCalledWith({
				path: '/rrb2b/v1/rules/1/copy',
				method: 'POST',
				data: { destination_roles: ['role1', 'role2'] },
			});

			expect(mockDispatchActions.addRule).toHaveBeenCalledTimes(2);
			expect(mockNoticeActions.createSuccessNotice).toHaveBeenCalled();
		});

		it('should handle copy errors', async () => {
			const mockError = new Error('Copy failed');
			mockApiFetch.mockRejectedValueOnce(mockError);

			const { result } = renderHook(() => useRules());

			await expect(
				act(async () => {
					await result.current.copyRule(1, ['role1']);
				})
			).rejects.toThrow('Copy failed');

			expect(mockNoticeActions.createErrorNotice).toHaveBeenCalled();
		});
	});

	describe('refetch', () => {
		it('should invalidate resolution to trigger refetch', () => {
			const { result } = renderHook(() => useRules());

			act(() => {
				result.current.refetch();
			});

			expect(mockDispatchActions.invalidateResolution).toHaveBeenCalledWith('getRules');
		});
	});
});
