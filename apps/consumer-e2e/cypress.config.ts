import { defineConfig } from 'cypress';

export default defineConfig({
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/consumer-e2e/screenshots',
    chromeWebSecurity: false,
    // retries: 5,
    e2e: {
        baseUrl: 'http://127.0.0.1:4213',
        specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'src/support/e2e.ts',
    },
});
