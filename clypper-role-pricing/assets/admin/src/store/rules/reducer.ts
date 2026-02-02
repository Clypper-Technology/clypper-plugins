import { Rule } from '../../types';
import { RulesAction } from './actions';

export interface RulesState {
    rules: Rule[];
    isLoading: boolean;
    error: string | null;
}

const DEFAULT_STATE: RulesState = {
    rules: [],
    isLoading: false,
    error: null,
};

export const reducer = (state: RulesState = DEFAULT_STATE, action: RulesAction): RulesState => {
    switch (action.type) {
        case 'SET_RULES':
            return {
                ...state,
                rules: action.rules,
                error: null,
            };

        case 'ADD_RULE':
            return {
                ...state,
                rules: [...state.rules, action.rule],
            };

        case 'UPDATE_RULE':
            return {
                ...state,
                rules: state.rules.map(r =>
                    r.id === action.rule.id ? action.rule : r
                ),
            };

        case 'DELETE_RULE':
            return {
                ...state,
                rules: state.rules.filter(r => r.id !== action.id),
            };

        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case 'SET_ERROR':
            return {
                ...state,
                error: action.error,
            };

        default:
            return state;
    }
};
