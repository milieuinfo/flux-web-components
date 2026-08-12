import path from 'node:path';
import dotenv from 'dotenv';
import { defineConfig } from 'cypress';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import registerReportPortalPlugin from '@reportportal/agent-js-cypress/lib/plugin';

dotenv.config(); // laad .env (optioneel)

const cypressConfig = defineConfig({
    fileServerFolder: '.',
    fixturesFolder: './src/fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/storybook-e2e/screenshots',
    chromeWebSecurity: false,
    retries: { runMode: 5, openMode: 0 },
    env: { RP_ACTIVE: process.env.RP_ACTIVE },
    e2e: {
        baseUrl: 'http://localhost:8080',
        specPattern: 'src/e2e/**/*.cy.{js,jsx,ts,tsx}',
        supportFile: 'src/support/e2e.ts',
        setupNodeEvents(on, config) {
            on(
                'file:preprocessor',
                webpackPreprocessor({
                    webpackOptions: {
                        mode: 'development',
                        resolve: {
                            extensions: ['.ts', '.tsx', '.js'],
                            plugins: [
                                new TsconfigPathsPlugin({
                                    // wijs expliciet naar je root tsconfig met de "paths"
                                    configFile: path.resolve(__dirname, '../../tsconfig.base.json'),
                                }),
                            ],
                        },
                        module: {
                            rules: [
                                // TS/JS (pas aan naar jouw stack)
                                {
                                    test: /\.tsx?$/,
                                    use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
                                    exclude: /node_modules/,
                                },

                                // CSS als *string* wanneer ?raw gebruikt wordt
                                { test: /\.css$/i, resourceQuery: /raw/, type: 'asset/source' },

                                // Of wanneer je bestandsnaam eindigt op .raw.css
                                { test: /\.raw\.css$/i, type: 'asset/source' },

                                // "normale" CSS
                                { test: /\.css$/i, exclude: /\.raw\.css$/i, use: ['style-loader', 'css-loader'] },
                            ],
                        },
                    },
                })
            );
            if (process.env.RP_ACTIVE === '1') {
                registerReportPortalPlugin(on, config);
            }
            return config;
        },
    },
});

if (process.env.RP_ACTIVE === '1') {
    cypressConfig.reporter = '../../node_modules/@reportportal/agent-js-cypress';
    cypressConfig.reporterOptions = {
        apiKey: process.env.RP_API_KEY,
        endpoint: process.env.RP_BASE_URL,
        launchId: process.env.RP_LAUNCH_ID,
        project: process.env.RP_PROJECT,
    };
} else if (process.env.CI === 'true') {
    // CI=true: schrijf JUnit XML naar test-results op de repo-root, waar de junit-step van de Jenkins
    // stage ze oppikt (zie Jenkinsfile.groovy). De 'junit' reporter zit gebundeld in de Cypress binary.
    // [hash] in de bestandsnaam is nodig: Cypress start per spec-bestand een eigen reporter, zonder
    // [hash] overschrijft elke spec het XML-bestand van de vorige.
    cypressConfig.reporter = 'junit';
    cypressConfig.reporterOptions = {
        mochaFile: '../../test-results/cypress-storybook-e2e.[hash].xml',
        jenkinsMode: true,
        rootSuiteTitle: 'Cypress storybook e2e tests',
    };
}

export default cypressConfig;
