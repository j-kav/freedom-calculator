var webpack = require('webpack');
var PROD = process.env.NODE_ENV === 'PROD';


module.exports = {
    entry: './wwwroot/scripts/src/main.js',
    output: {
        path: __dirname + '/wwwroot/scripts/dist',
        filename: 'bundle.js'
    },
    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ] : [],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                enforce: 'pre',
                use: [{ loader: 'eslint-loader', options: { rules: { semi: 0 } } }],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    }
}