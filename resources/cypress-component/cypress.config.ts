import { defineConfig } from 'cypress';
import * as path from 'path';

const cypressConfig = defineConfig({
    fileServerFolder: '.',
    fixturesFolder: './fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/components/screenshots',
    chromeWebSecurity: false,
    retries: 5,
    component: {
        supportFile: './support/component.ts',
        indexHtmlFile: './support/component-index.html',
        specPattern: '../../libs/**/*.cy.{js,jsx,ts,tsx}',
        // @ts-ignore: Ignoring missing property 'framework'
        devServer: {
            bundler: 'webpack',
            webpackConfig: {
                devServer: {
                    // Tegen de sporadische "An uncaught error was detected outside of a test" / ChunkLoadError in
                    // Jenkins (zie https://github.com/cypress-io/cypress/issues/28644). De Cypress-proxy stuurt de
                    // chunk-requests (/__cypress/src/*) door naar de webpack-dev-server over keep-alive connecties
                    // die ze zelf nooit sluit en niet opnieuw probeert bij een fout; de Node http-server van
                    // webpack-dev-server sluit idle connecties standaard na 5s. Valt een request precies in dat
                    // venster, dan faalt hij (ECONNRESET) en laadt de spec niet. keepAliveTimeout 0 = idle
                    // connecties nooit sluiten; ze verdwijnen pas wanneer de dev-server stopt.
                    onListening: (devServer) => {
                        devServer.server.keepAliveTimeout = 0;
                    },
                },
                module: {
                    rules: [
                        {
                            exclude: /(node_modules)/,
                            loader: 'ts-loader',
                            test: /\.[t]sx?$/,
                        },
                    ],
                },
                resolve: {
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                    alias: {
                        '@domg-wc/common-utilities': path.resolve('../../libs/common/utilities/src/'),
                        '@domg-wc/components': path.resolve('../../libs/components/src/'),
                        '@domg-wc/elements': path.resolve('../../libs/elements/src/'),
                        '@domg-wc/form': path.resolve('../../libs/form/src/'),
                        '@domg-wc/map': path.resolve('../../libs/map/src/'),
                        '@domg-wc/sections': path.resolve('../../libs/sections/src/'),
                    },
                },
            },
        },
    },
});

if (process.env.CI === 'true') {
    // CI=true: schrijf JUnit XML naar test-results op de repo-root, waar de junit-step van de Jenkins
    // stage ze oppikt (zie Jenkinsfile.groovy). De 'junit' reporter zit gebundeld in de Cypress binary.
    // [hash] in de bestandsnaam is nodig: Cypress start per spec-bestand een eigen reporter, zonder
    // [hash] overschrijft elke spec het XML-bestand van de vorige.
    cypressConfig.reporter = 'junit';
    cypressConfig.reporterOptions = {
        mochaFile: '../../test-results/cypress-component.[hash].xml',
        jenkinsMode: true,
        rootSuiteTitle: 'Cypress component tests',
    };
}

export default cypressConfig;
