const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const config = {
    mode: 'production',
    entry: './fat-lib-index.ts',
    module: {
        rules: [
            {
                oneOf: [
                    // 1) CSS met ?raw -> importeer als string
                    {
                        test: /\.css$/i,
                        resourceQuery: /raw/, // matcht ?raw
                        type: 'asset/source', // geeft de file-inhoud als string
                    },
                    // 2) normale CSS -> via style/css-loader of extract plugin
                    {
                        test: /\.css$/i,
                        use: [
                            // of MiniCssExtractPlugin.loader als je CSS wil extraheren
                            'style-loader',
                            'css-loader',
                        ],
                    },
                ],
            },
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: './tsconfig.fat-lib-min.json',
                        },
                    },
                ],
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
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.fat-lib-min.json',
            }),
        ],
    },
    output: {
        path: path.resolve(__dirname, '../../build/dist/fat-lib'),
        filename: 'domg-wc-compliance.min.js',
        hashFunction: 'sha256',
        publicPath: '/',
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                extractComments: false,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
            }),
        ],
    },
};

module.exports = (env, argv) => {
    if (argv?.mode === 'development') {
    }
    if (argv?.mode === 'production') {
    }
    return config;
};
