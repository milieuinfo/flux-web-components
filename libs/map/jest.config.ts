import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    displayName: 'map - Jest tests',
    transform: {
        '^.+\\.[tj]s$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
            },
        ],
    },
    transformIgnorePatterns: [],
    testEnvironment: 'jsdom',
};

// CI=true (gezet in unit-component-integrator-tests.sh) laat jest ook JUnit XML schrijven naar
// test-results/, waar de junit-step van de Jenkins stage ze oppikt
if (process.env.CI === 'true') {
    jestConfig.reporters = [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: '<rootDir>/../../test-results',
                uniqueOutputName: 'true',
                suiteName: jestConfig.displayName as string,
            },
        ],
    ];
}

export default jestConfig;
