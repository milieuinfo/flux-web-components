import { defineConfig } from 'cypress';

export default defineConfig({
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    modifyObstructiveCode: false,
    experimentalCspAllowList: ['default-src'],
    screenshotsFolder: '../../build/cypress/integrator-e2e/screenshots',
    chromeWebSecurity: false,
    retries: 5,
    e2e: {
        baseUrl: 'http://localhost:4204',
        specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'src/support/e2e.ts',
    },
});
