import { useSelect, useDispatch } from '@wordpress/data';
import { useDispatch as useNoticesDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import apiFetch from '@wordpress/api-fetch';
import { Rule } from '../types';
import { STORE_NAME } from '../store/rules';

interface UseRulesReturn {
    rules: Rule[];
    isLoading: boolean;
    error: string | null;
    createRule: (ruleData: Partial<Rule>) => Promise<Rule>;
    updateRule: (id: number, updates: Partial<Rule>) => Promise<Rule>;
    deleteRule: (id: number) => Promise<void>;
    toggleActive: (id: number) => Promise<void>;
    copyRule: (sourceRuleId: number, destinationRoles: string[]) => Promise<void>;
    refetch: () => void;
}

export const useRules = (roleFilter?: string): UseRulesReturn => {
    const { rules, isLoading, error } = useSelect((select: any) => {
        const allRules = select(STORE_NAME).getRules();
        const filteredRules = roleFilter
            ? select(STORE_NAME).getRulesByRole(roleFilter)
            : allRules;

        return {
            rules: filteredRules,
            isLoading: select(STORE_NAME).isLoading(),
            error: select(STORE_NAME).getError(),
        };
    }, [roleFilter]);

    const { addRule, updateRule: updateRuleAction, deleteRule: deleteRuleAction, invalidateResolution } = useDispatch(STORE_NAME);
    const { createSuccessNotice, createErrorNotice } = useNoticesDispatch(noticesStore);

    const createRule = async (ruleData: Partial<Rule>): Promise<Rule> => {
        try {
            // Step 1: Create the rule with role_name
            const apiData = {
                role_name: ruleData.role, // API expects role_name, not role
            };

            const newRule = await apiFetch<Rule>({
                path: '/rrb2b/v1/rules',
                method: 'POST',
                data: apiData,
            });

            // Step 2: If products are provided, add them
            if (ruleData.products && ruleData.products.length > 0) {
                const rows = ruleData.products.map((productId, index) => {
                    const productDetail = (ruleData as any).productDetails?.[index];
                    return {
                        product_id: productId,
                        product_name: productDetail?.name || '',
                        type: ruleData.rule_type || 'percentage',
                        value: ruleData.rule_value || '0',
                        min_qty: 1,
                    };
                });

                await apiFetch({
                    path: `/rrb2b/v1/rules/${newRule.id}/products`,
                    method: 'PUT',
                    data: { rows },
                });
            }

            // Step 3: If categories are provided, add them
            if (ruleData.single_categories && ruleData.single_categories.length > 0) {
                const rows = ruleData.single_categories.map(categoryId => ({
                    category_id: categoryId,
                    type: ruleData.rule_type || 'percentage',
                    value: ruleData.rule_value || '0',
                    min_qty: 0,
                }));

                await apiFetch({
                    path: `/rrb2b/v1/rules/${newRule.id}/categories`,
                    method: 'PUT',
                    data: { rows },
                });
            }

            // Step 4: Update rule settings (active status, etc.)
            if (ruleData.active !== undefined || ruleData.rule_type || ruleData.rule_value) {
                await apiFetch<Rule>({
                    path: `/rrb2b/v1/rules/${newRule.id}`,
                    method: 'PUT',
                    data: {
                        rule_active: ruleData.active,
                        global_rule: ruleData.rule_type && ruleData.rule_value ? {
                            type: ruleData.rule_type,
                            value: ruleData.rule_value,
                        } : undefined,
                    },
                });
            }

            // Step 5: Fetch the fully updated rule
            const updatedRule = await apiFetch<Rule>({
                path: `/rrb2b/v1/rules/${newRule.id}`,
                method: 'GET',
            });

            addRule(updatedRule);
            createSuccessNotice('Rule created successfully!', { type: 'snackbar' });
            return updatedRule;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to create rule';
            createErrorNotice(`Failed to create rule: ${message}`);
            throw error;
        }
    };

    const updateRule = async (id: number, updates: Partial<Rule>): Promise<Rule> => {
        // Optimistic update
        const oldRule = rules.find(r => r.id === id);
        if (oldRule) {
            updateRuleAction({ ...oldRule, ...updates });
        }

        try {
            const updatedRule = await apiFetch<Rule>({
                path: `/rrb2b/v1/rules/${id}`,
                method: 'PUT',
                data: updates,
            });
            updateRuleAction(updatedRule);
            createSuccessNotice('Rule updated successfully!', { type: 'snackbar' });
            return updatedRule;
        } catch (error) {
            // Rollback on error
            if (oldRule) {
                updateRuleAction(oldRule);
            }
            const message = error instanceof Error ? error.message : 'Failed to update rule';
            createErrorNotice(`Failed to update rule: ${message}`);
            throw error;
        }
    };

    const deleteRule = async (id: number): Promise<void> => {
        // Optimistic delete
        deleteRuleAction(id);

        try {
            await apiFetch({
                path: `/rrb2b/v1/rules/${id}`,
                method: 'DELETE',
            });
            createSuccessNotice('Rule deleted successfully!', { type: 'snackbar' });
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to delete rule';
            createErrorNotice(`Failed to delete rule: ${message}`);
            throw error;
        }
    };

    const toggleActive = async (id: number): Promise<void> => {
        const rule = rules.find(r => r.id === id);
        if (!rule) return;

        await updateRule(id, { rule_active: !rule.rule_active });
    };

    const copyRule = async (sourceRuleId: number, destinationRoles: string[]): Promise<void> => {
        try {
            const results = await apiFetch<Rule[]>({
                path: `/rrb2b/v1/rules/${sourceRuleId}/copy`,
                method: 'POST',
                data: { destination_roles: destinationRoles },
            });

            // Add new rules to store
            results.forEach(rule => addRule(rule));

            createSuccessNotice(
                `Rule copied to ${destinationRoles.length} role(s) successfully!`,
                { type: 'snackbar' }
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to copy rule';
            createErrorNotice(`Failed to copy rule: ${message}`);
            throw error;
        }
    };

    const bulkUpdate = async (ruleIds: number[], updates: Partial<Rule>): Promise<void> => {
        try {
            // Update all rules in parallel
            const promises = ruleIds.map(id => updateRule(id, updates));
            await Promise.all(promises);
            createSuccessNotice(
                `${ruleIds.length} rule(s) updated successfully!`,
                { type: 'snackbar' }
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to bulk update';
            createErrorNotice(`Bulk update failed: ${message}`);
            throw error;
        }
    };

    const bulkDelete = async (ruleIds: number[]): Promise<void> => {
        try {
            // Delete all rules in parallel
            const promises = ruleIds.map(id => deleteRule(id));
            await Promise.all(promises);
            createSuccessNotice(
                `${ruleIds.length} rule(s) deleted successfully!`,
                { type: 'snackbar' }
            );
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Failed to bulk delete';
            createErrorNotice(`Bulk delete failed: ${message}`);
            throw error;
        }
    };

    const refetch = () => {
        // Trigger resolver to refetch
        invalidateResolution('getRules');
    };

    return {
        rules,
        isLoading,
        error,
        createRule,
        updateRule,
        deleteRule,
        toggleActive,
        copyRule,
        bulkUpdate,
        bulkDelete,
        refetch,
    };
};
