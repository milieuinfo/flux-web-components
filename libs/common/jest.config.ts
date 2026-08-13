import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    displayName: 'common - Jest tests',
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
    moduleNameMapper: {
        '@resources/utils-test': '<rootDir>/../../resources/utils-test/index.ts',
    },
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

if (process.env.CI === 'true') {
    jestConfig.reporters!.push([
        'jest-junit', {
            outputDirectory: '<rootDir>/../../test-results',
            uniqueOutputName: 'true',
            suiteName: jestConfig.displayName as string,
            // De default voor beide templates is '{classname} {title}', waardoor de testtitel mee in de classname
            // zit. Jenkins splitst de classname op de laatste punt tot pakket + klasse, dus dan verschuift het
            // splitspunt per test. Zie resources/ci-jenkins/test/test-categories.mjs.
            classNameTemplate: '{classname}',
            titleTemplate: '{title}',
            ancestorSeparator: ' - ',
        },
    ]);
}

export default jestConfig;
