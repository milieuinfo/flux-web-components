import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    displayName: 'styles - Jest tests',
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
    reporters: ['default'],
};

if (process.env.RP_ACTIVE === '1') {
    jestConfig.reporters!.push([
        '@reportportal/agent-js-jest', {
            apiKey: process.env.RP_API_KEY,
            endpoint: process.env.RP_BASE_URL,
            launchId: process.env.RP_LAUNCH_ID,
            project: process.env.RP_PROJECT,
        },
    ]);
}

export default jestConfig;
