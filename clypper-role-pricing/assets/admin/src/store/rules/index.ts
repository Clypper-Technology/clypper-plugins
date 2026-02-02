import { createReduxStore, register } from '@wordpress/data';
import { reducer, RulesState } from './reducer';
import * as actions from './actions';
import * as selectors from './selectors';
import * as resolvers from './resolvers';

export const STORE_NAME = 'rrb2b/rules';

const store = createReduxStore(STORE_NAME, {
    reducer,
    actions,
    selectors,
    resolvers,
});

register(store);

export default store;
