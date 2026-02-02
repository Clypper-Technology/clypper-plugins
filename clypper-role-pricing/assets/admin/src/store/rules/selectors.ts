import { RulesState } from './reducer';
import { Rule } from '../../types';
import { createSelector } from '@wordpress/data';

export const getRules = (state: RulesState): Rule[] => {
    return state.rules;
};

export const getRuleById = (state: RulesState, id: number): Rule | undefined => {
    return state.rules.find(r => r.id === id);
};

// Use memoized selector to prevent unnecessary re-renders
export const getRulesByRole = createSelector(
    [
        (state: RulesState) => state.rules,
        (_state: RulesState, role: string) => role,
    ],
    (rules: Rule[], role: string): Rule[] => {
        if (!role) return rules;
        return rules.filter(r => r.role_name === role);
    }
);

export const isLoading = (state: RulesState): boolean => {
    return state.isLoading;
};

export const getError = (state: RulesState): string | null => {
    return state.error;
};
