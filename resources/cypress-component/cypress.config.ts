import * as path from 'path';
import dotenv from 'dotenv';
import { defineConfig } from 'cypress';
import registerReportPortalPlugin from '@reportportal/agent-js-cypress/lib/plugin';

dotenv.config(); // laad .env

const cypressConfig: any = {
    fileServerFolder: '.',
    fixturesFolder: './fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/components/screenshots',
    chromeWebSecurity: false,
    retries: { runMode: 5, openMode: 0 },
    env: { RP_ACTIVE: process.env.RP_ACTIVE },
    component: {
        supportFile: './support/component.ts',
        indexHtmlFile: './support/component-index.html',
        specPattern: '../../libs/**/*.cy.{js,jsx,ts,tsx}',
        devServer: {
            bundler: 'webpack',
            // @ts-ignore
            headers: { 'Cache-Control': 'no-store' },
            webpackConfig: {
                module: {
                    rules: [
                        {
                            oneOf: [
                                { test: /\.css$/i, resourceQuery: /raw/, type: 'asset/source' },
                                { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
                            ],
                        },
                        { exclude: /(node_modules)/, loader: 'ts-loader', test: /\.[t]sx?$/ },
                    ],
                },
                resolve: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    alias: {
                        '@resources/utils-test': path.resolve('../../resources/utils-test/'),
                        '@domg-wc/common': path.resolve('../../libs/common/src/'),
                        '@domg-wc/components/atom': path.resolve('../../libs/components/src/atom/'),
                        '@domg-wc/components/block': path.resolve('../../libs/components/src/block/'),
                        '@domg-wc/components/compliance': path.resolve('../../libs/components/src/compliance/'),
                        '@domg-wc/components/form': path.resolve('../../libs/components/src/form/'),
                        '@domg-wc/map': path.resolve('../../libs/map/src/'),
                        '@domg-wc/styles': path.resolve('../../libs/styles/src/'),
                    },
                },
            },
        },
    },
};

if (process.env.RP_ACTIVE === '1') {
    cypressConfig.reporter = '../../node_modules/@reportportal/agent-js-cypress';

    cypressConfig.reporterOptions = {
        apiKey: process.env.RP_API_KEY,
        endpoint: process.env.RP_BASE_URL,
        launchId: process.env.RP_LAUNCH_ID,
        project: process.env.RP_PROJECT,
    };

    const currSetupNodeEvents = cypressConfig.component.setupNodeEvents;
    cypressConfig.component.setupNodeEvents = (on, config) => {
        currSetupNodeEvents(on, config);
        registerReportPortalPlugin(on, config);
        return config;
    };
}

export default defineConfig(cypressConfig);
