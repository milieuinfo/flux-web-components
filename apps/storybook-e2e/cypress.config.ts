import { defineConfig } from 'cypress';

export default defineConfig({
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/storybook-e2e/screenshots',
    chromeWebSecurity: false,
    retries: {
        runMode: 5,
        openMode: 0,
    },
    e2e: {
        baseUrl: 'http://localhost:8080',
        specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'src/support/e2e.ts',
    },
});
