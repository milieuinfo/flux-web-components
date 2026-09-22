import * as path from 'path';
import { rmSync } from 'fs';
import dotenv from 'dotenv';
import { defineConfig } from 'cypress';
import registerReportPortalPlugin from '@reportportal/agent-js-cypress/lib/plugin';
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';

dotenv.config(); // laad .env

// CODE_COVERAGE=true: instrumenteer de broncode van de libs met istanbul en verzamel de coverage via
// @cypress/code-coverage. Staat standaard uit: de instrumentatie maakt bouwen en draaien trager.
// Na de run maakt 'pnpm run libs:component-tests:coverage-report' het volledige rapport (zie .nycrc.json).
const codeCoverage = process.env.CODE_COVERAGE === 'true';
const codeCoverageDir = path.resolve('../../build/coverage/cypress-component');

// Pas na ts-loader (enforce: 'post'), zodat istanbul via de source maps van ts-loader op de .ts-bestanden rapporteert.
// Specs en stories tellen niet mee.
const codeCoverageRule = {
    test: /\.ts$/,
    include: path.resolve('../../libs'),
    exclude: [/node_modules/, /\.cy\.ts$/, /\.stories\.ts$/, /stories-arg\.ts$/],
    enforce: 'post',
    use: {
        loader: 'babel-loader',
        options: {
            babelrc: false,
            configFile: false,
            plugins: [['istanbul', { cwd: path.resolve('../..') }]],
        },
    },
};

const cypressConfig: any = {
    experimentalWebKitSupport: true,
    fileServerFolder: '.',
    fixturesFolder: './fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/components/screenshots',
    chromeWebSecurity: false,
    retries: { runMode: 4, openMode: 0 },
    // coverage: false schakelt de hooks van @cypress/code-coverage/support uit
    env: { RP_ACTIVE: process.env.RP_ACTIVE, coverage: codeCoverage },
    component: {
        supportFile: './support/component.ts',
        indexHtmlFile: './support/component-index.html',
        specPattern: '../../libs/**/*.cy.{js,jsx,ts,tsx}',
        setupNodeEvents(on, config) {
            addMatchImageSnapshotPlugin(on);
            if (codeCoverage) {
                // De task leest bij het laden de coverage van een vorige run in en telt die op; bij een
                // 'cypress run' willen we enkel deze run. In 'cypress open' reset de plugin zelf per run.
                if (!config.isInteractive) {
                    rmSync(codeCoverageDir, { recursive: true, force: true });
                }
                // require pas hier: de task maakt bij het laden zijn temp-dir aan en leest die in
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                require('@cypress/code-coverage/task')(on, config);
            }
            return config;
        },
        devServer: {
            bundler: 'webpack',
            // @ts-ignore
            headers: { 'Cache-Control': 'no-store' },
            webpackConfig: {
                ignoreWarnings: [{ module: /cypress-axe/, message: /Critical dependency/ }],
                module: {
                    rules: [
                        {
                            oneOf: [
                                { test: /\.css$/i, resourceQuery: /raw/, type: 'asset/source' },
                                { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
                            ],
                        },
                        { exclude: /(node_modules)/, loader: 'ts-loader', test: /\.[t]sx?$/ },
                        ...(codeCoverage ? [codeCoverageRule] : []),
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
        const updatedConfig = currSetupNodeEvents(on, config);
        registerReportPortalPlugin(on, updatedConfig);
        return updatedConfig;
    };
} else if (process.env.CI === 'true') {
    // CI=true: schrijf JUnit XML naar test-results op de repo-root, waar de junit-step van de Jenkins
    // stage ze oppikt (zie Jenkinsfile.groovy). De 'junit' reporter zit gebundeld in de Cypress binary.
    // [hash] in de bestandsnaam is nodig: Cypress start per spec-bestand een eigen reporter, zonder
    // [hash] overschrijft elke spec het XML-bestand van de vorige.
    // JUNIT_VARIANT (bv. 'firefox') houdt runs die dezelfde specs nogmaals draaien uit elkaar in het
    // Jenkins testrapport: zonder onderscheid staan die tests er dubbel in, zonder browser-attributie.
    const variant = process.env.JUNIT_VARIANT;
    cypressConfig.reporter = 'junit';
    cypressConfig.reporterOptions = {
        mochaFile: `../../test-results/cypress-component${variant ? '-' + variant : ''}.[hash].xml`,
        jenkinsMode: true,
        rootSuiteTitle: `Cypress component tests${variant ? ' - ' + variant : ''}`,
        ...(variant ? { jenkinsClassnamePrefix: variant } : {}),
    };
}

export default defineConfig(cypressConfig);
