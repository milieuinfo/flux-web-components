import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
    displayName: 'integration - Jest tests',
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
    // Jest kiest zijn aantal workers op basis van os.cpus(), en dat is in een Kubernetes pod het CPU-aantal van de
    // node - niet de 2 CPU die deze pod vraagt. Bij libs/map (23 spec bestanden) werden dat evenveel parallelle
    // jsdom workers, samen ruim over de 8Gi memory limit, en dan wordt de hele container gekilld.
    jestConfig.maxWorkers = 2;

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
