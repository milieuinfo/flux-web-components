import { defineConfig } from 'cypress';
import * as path from 'path';

export default defineConfig({
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
        // @ts-expect-error: negeer ontbrekende property 'framework'
        devServer: {
            bundler: 'webpack',
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
                        '@domg-wc/common': path.resolve('../../libs/common/src/'),
                        '@domg-wc/components': path.resolve('../../libs/components/src/'),
                        '@domg-wc/form': path.resolve('../../libs/form/src/'),
                        '@domg-wc/map': path.resolve('../../libs/map/src/'),
                        '@domg-wc/sections': path.resolve('../../libs/sections/src/'),
                        '@domg-wc/styles': path.resolve('../../libs/styles/src/'),
                    },
                },
            },
        },
    },
});
