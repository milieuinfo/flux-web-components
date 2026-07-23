const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    mode: 'development',
    entry: {
        main: './src/main.ts',
        vdsFrame: './src/vds-frame.ts',
    },
    devServer: {
        port: 8090,
        static: {
            directory: path.resolve(__dirname, '../../build/dist/apps/playground-lit'),
            publicPath: '/',
        },
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                resourceQuery: /raw/, // matcht ?raw
                type: 'asset/source', // geeft de file-inhoud als string
            },
            {
                // FLUX-704: de VDS-package is voor Vite gebouwd en importeert
                // component-CSS met de Vite-specifieke `?inline`-query (bv.
                // vl-icon.styles.js -> vlaanderen-icon.css?inline). Webpack kent
                // `?inline` niet; lever de CSS als string voor `unsafeCSS`.
                test: /\.css$/i,
                resourceQuery: /inline/,
                type: 'asset/source',
            },
            {
                // FLUX-704: globale VDS-stylesheet (`/css` export) injecteren.
                // css-loader lost de @import-keten + url()-verwijzingen op.
                test: /\.css$/i,
                resourceQuery: { not: [/raw/, /inline/] },
                use: ['style-loader', 'css-loader'],
            },
            {
                // FLUX-704: fonts waarnaar de VDS-CSS via url() verwijst.
                test: /\.(woff2?|ttf|eot|svg)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(js|ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json',
            }),
        ],
    },
    output: {
        clean: true,
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../../build/dist/apps/playground-lit'),
        hashFunction: 'sha256',
        publicPath: '/',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
            }),
        ],
    },
    performance: {
        maxAssetSize: 10 * 1024 * 1024,
        maxEntrypointSize: 10 * 1024 * 1024,
        hints: 'warning',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            chunks: ['main'],
        }),
        new HtmlWebpackPlugin({
            template: 'src/vds-frame.html',
            filename: 'vds-frame.html',
            chunks: ['vdsFrame'],
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv?.mode === 'development') {
    }
    if (argv?.mode === 'production') {
        config.devtool = 'source-map';
    }
    return config;
};
