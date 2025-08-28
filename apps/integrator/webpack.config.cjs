const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/main.ts',
    devServer: {
        port: 4204,
        headers: {
            'Content-Security-Policy-Report-Only': `default-src 'self' cdn.omgeving.vlaanderen.be; report-uri /csp-report;`,
        },
        open: false,
        static: false,
        compress: true,
        liveReload: true,
        hot: false,
    },
    devtool: false,
    module: {
        rules: [
            {
                test: /\.css$/i,
                resourceQuery: /raw/, // matcht ?raw
                type: 'asset/source', // geeft de file-inhoud als string
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
        path: path.resolve(__dirname, '../../build/dist/apps/integrator'),
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
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv?.mode === 'development') {
    }
    if (argv?.mode === 'production') {
    }
    return config;
};
