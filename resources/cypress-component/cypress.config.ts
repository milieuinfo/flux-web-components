import { defineConfig } from 'cypress';
import * as path from 'path';

export default defineConfig({
    fileServerFolder: '.',
    fixturesFolder: './fixtures',
    modifyObstructiveCode: false,
    screenshotsFolder: '../../build/cypress/components/screenshots',
    chromeWebSecurity: false,
    retries: {
        runMode: 5,
        openMode: 0,
    },
    component: {
        supportFile: './support/component.ts',
        indexHtmlFile: './support/component-index.html',
        specPattern: '../../libs/**/*.cy.{js,jsx,ts,tsx}',
        devServer: {
            bundler: 'webpack',
            // @ts-ignore
            headers: {
                'Cache-Control': 'no-store',
            },
            webpackConfig: {
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
                        "@resources/utils-test": path.resolve('../../resources/utils-test/'),
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
});
