const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    mode: 'development',
    entry: './src/app-named/main.ts',
    devServer: {
        static: {
            directory: path.resolve(__dirname, '../../build/dist/apps/consumer-named'),
            publicPath: '/',
        },
        port: 4212,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                resourceQuery: /raw/, // matcht ?raw
                type: 'asset/source', // geeft de file-inhoud als string
            },
            {
                test: /\.(ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js)$/,
                resolve: {
                    fullySpecified: false,
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        clean: true,
        filename: '[name].[chunkhash].js',
        path: path.resolve(__dirname, '../../build/dist/apps/consumer-named'),
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
            template: 'src/app-named/index.html',
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
