import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    displayName: 'components - Jest tests',
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
        '@domg-wc/common-utilities/util': '<rootDir>/../../libs/common/utilities/src/util/index.ts',
        "^!!raw-loader!.*": "raw-loader",
    },
};

export default jestConfig;
