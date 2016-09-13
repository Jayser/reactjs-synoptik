const Webpack = require('webpack');
const WebpackWriteFilePlugin = require('write-file-webpack-plugin');
const cfgBase = require('./base');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:' + cfgBase.port,
        'webpack/hot/only-dev-server',
        './index.js'
    ],
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: 'eslint',
                include: [cfgBase.path.source]
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                include: [cfgBase.path.source],
                loaders: ['react-hot', 'babel']
            },
            {
                test: /\.scss/,
                include: [cfgBase.path.source],
                loaders: ["style", "css?sourceMap", "sass?sourceMap"]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url?limit=10000&mimetype=application/font-woff&name=" + cfgBase.path.fonts + "/[name].[ext]?[hash]"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file?name=" + cfgBase.path.fonts + "/[name].[ext]?[hash]"
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
        new WebpackWriteFilePlugin(),
        new Webpack.HotModuleReplacementPlugin()
    ]
};