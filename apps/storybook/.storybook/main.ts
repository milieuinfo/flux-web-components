import type { StorybookConfig } from '@storybook/web-components-webpack5';

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const tsconfigPathsPlugin = new TsconfigPathsPlugin({
    configFile: './tsconfig.json',
    extensions: ['.ts', '.tsx', '.js'],
});

const config: StorybookConfig = {
    stories: [
        '../docs/**/*.stories.mdx',
        '../docs/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/styles/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/components/src/atom/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/components/src/block/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/components/src/compliance/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/components/src/form/**/*.stories.@(js|jsx|ts|tsx)',
        '../../../libs/map/src/**/*.stories.@(js|jsx|ts|tsx)',
    ],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        'storybook-addon-mock',
        {
            name: 'storybook-addon-swc',
            options: {
                swcLoaderOptions: {
                    isModule: true,
                    module: {
                        type: 'es6',
                        noInterop: true,
                    },
                    jsc: {
                        target: 'es2022',
                        parser: {
                            syntax: 'typescript',
                            tsx: true,
                            decorators: true,
                            dynamicImport: true,
                        },
                        loose: true,
                    },
                },
            },
        },
    ],
    framework: {
        name: '@storybook/web-components-webpack5',
        options: {},
    },
    docs: {
        autodocs: 'tag',
        defaultName: 'documentatie',
    },
    staticDirs: ['../resources/public'],
    async webpackFinal(config, { configType }) {
        if (configType === 'DEVELOPMENT') {
            // Modify config for development
        }
        if (configType === 'PRODUCTION') {
            // Modify config for production
        }
        config.resolve.plugins = [tsconfigPathsPlugin];
        return config;
    },
};

export default config;
