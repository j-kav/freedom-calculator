﻿const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        app: [
            'babel-polyfill',
            'whatwg-fetch',
            'intl',
            'intl/locale-data/jsonp/en.js',
            './wwwroot/scripts/src/main.js'
        ]
    },
    output: {
        path: `${__dirname}/wwwroot/scripts/dist`,
        filename: 'bundle.js'
    },
    plugins: [
        new VueLoaderPlugin()
    ],
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
                use: [{ loader: 'eslint-loader', options: { rules: { semi: 0 } } }]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
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
