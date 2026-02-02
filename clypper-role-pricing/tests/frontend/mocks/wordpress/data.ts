// Default mock implementations
const defaultStoreActions = {
	addRule: jest.fn(),
	updateRule: jest.fn(),
	deleteRule: jest.fn(),
	invalidateResolution: jest.fn(),
};

const defaultNoticeActions = {
	createSuccessNotice: jest.fn(),
	createErrorNotice: jest.fn(),
	createNotice: jest.fn(),
	removeNotice: jest.fn(),
};

export const useSelect = jest.fn((callback) => callback({
	getRules: jest.fn(() => []),
	isLoading: jest.fn(() => false),
	getError: jest.fn(() => null),
	getRulesByRole: jest.fn(() => []),
}));

export const useDispatch = jest.fn((storeName: any) => {
	// Handle core/notices store
	if (storeName && (storeName === 'core/notices' || storeName.name === 'core/notices')) {
		return defaultNoticeActions;
	}
	// Handle other stores (rules, etc.)
	return defaultStoreActions;
});

export const select = jest.fn((storeName: string) => ({
	getRules: jest.fn(() => []),
	isLoading: jest.fn(() => false),
	getError: jest.fn(() => null),
	getRulesByRole: jest.fn(() => []),
}));

export const dispatch = jest.fn((storeName: string) => {
	if (storeName === 'core/notices') {
		return defaultNoticeActions;
	}
	return defaultStoreActions;
});

export const registerStore = jest.fn();
export const createReduxStore = jest.fn();
export const register = jest.fn();

export const store = {
	registerStore,
	createReduxStore,
	register,
};
