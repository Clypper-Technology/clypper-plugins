module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	roots: ['<rootDir>/assets/admin/src'],
	testMatch: [
		'**/__tests__/**/*.+(ts|tsx|js)',
		'**/?(*.)+(spec|test).+(ts|tsx|js)'
	],
	transform: {
		'^.+\\.(ts|tsx)$': ['ts-jest', {
			tsconfig: {
				jsx: 'react',
				esModuleInterop: true,
				allowSyntheticDefaultImports: true,
			}
		}]
	},
	moduleNameMapper: {
		'^@wordpress/element$': '<rootDir>/tests/frontend/mocks/wordpress/element.ts',
		'^@wordpress/data$': '<rootDir>/tests/frontend/mocks/wordpress/data.ts',
		'^@wordpress/api-fetch$': '<rootDir>/tests/frontend/mocks/wordpress/api-fetch.ts',
		'^@wordpress/notices$': '<rootDir>/tests/frontend/mocks/wordpress/notices.ts',
		'^@wordpress/components$': '<rootDir>/tests/frontend/mocks/wordpress/components.tsx',
	},
	setupFilesAfterEnv: ['<rootDir>/tests/frontend/setup.ts'],
	collectCoverageFrom: [
		'assets/admin/src/**/*.{ts,tsx}',
		'!assets/admin/src/**/*.d.ts',
		'!assets/admin/src/types/**',
		'!assets/admin/src/**/*.stories.{ts,tsx}',
	],
	coverageDirectory: '<rootDir>/coverage',
	coverageReporters: ['text', 'lcov', 'html'],
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testPathIgnorePatterns: ['/node_modules/', '/build/'],
	globals: {
		'ts-jest': {
			isolatedModules: true,
		}
	}
};
