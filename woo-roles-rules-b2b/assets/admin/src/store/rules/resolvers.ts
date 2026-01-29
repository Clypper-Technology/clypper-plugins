import apiFetch from '@wordpress/api-fetch';
import { Rule } from '../../types';
import { setRules, setLoading, setError } from './actions';

export const getRules = () => async ({ dispatch }: any) => {
    dispatch(setLoading(true));
    try {
        const rules = await apiFetch<Rule[]>({
            path: '/rrb2b/v1/rules',
        });
        dispatch(setRules(rules));
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load rules';
        dispatch(setError(message));
        console.error('Error fetching rules:', error);
    } finally {
        dispatch(setLoading(false));
    }
};
