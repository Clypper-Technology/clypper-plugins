import { Rule } from '../../types';

export const setRules = (rules: Rule[]) => ({
    type: 'SET_RULES' as const,
    rules,
});

export const addRule = (rule: Rule) => ({
    type: 'ADD_RULE' as const,
    rule,
});

export const updateRule = (rule: Rule) => ({
    type: 'UPDATE_RULE' as const,
    rule,
});

export const deleteRule = (id: number) => ({
    type: 'DELETE_RULE' as const,
    id,
});

export const setLoading = (isLoading: boolean) => ({
    type: 'SET_LOADING' as const,
    isLoading,
});

export const setError = (error: string | null) => ({
    type: 'SET_ERROR' as const,
    error,
});

export type RulesAction =
    | ReturnType<typeof setRules>
    | ReturnType<typeof addRule>
    | ReturnType<typeof updateRule>
    | ReturnType<typeof deleteRule>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof setError>;
