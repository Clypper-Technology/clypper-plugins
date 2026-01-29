const apiFetch = jest.fn((options: any) => {
	// Default mock implementation
	return Promise.resolve({});
});

// Allow mocking specific paths
apiFetch.mockImplementation = jest.fn();

export default apiFetch;
