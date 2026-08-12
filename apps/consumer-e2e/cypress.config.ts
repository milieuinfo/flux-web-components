import { defineConfig } from 'cypress';

const cypressConfig = defineConfig({
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/consumer-e2e/screenshots',
    chromeWebSecurity: false,
    // retries: 5,
    e2e: {
        specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'src/support/e2e.ts',
    },
});

if (process.env.CI === 'true') {
    // CI=true: schrijf JUnit XML naar test-results op de repo-root, waar de junit-step van de Jenkins
    // stage ze oppikt (zie Jenkinsfile.groovy). De 'junit' reporter zit gebundeld in de Cypress binary.
    // [hash] in de bestandsnaam is nodig: Cypress start per spec-bestand een eigen reporter, zonder
    // [hash] overschrijft elke spec het XML-bestand van de vorige.
    cypressConfig.reporter = 'junit';
    cypressConfig.reporterOptions = {
        mochaFile: '../../test-results/cypress-consumer-e2e.[hash].xml',
        jenkinsMode: true,
        rootSuiteTitle: 'Cypress consumer e2e tests',
    };
}

export default cypressConfig;
