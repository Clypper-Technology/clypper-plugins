import '@testing-library/jest-dom';

// Global test setup
beforeEach(() => {
	// Clear all mocks before each test
	jest.clearAllMocks();
});

// Mock window.fetch if needed
global.fetch = jest.fn();
