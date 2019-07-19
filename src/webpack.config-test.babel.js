import nodeExternals from 'webpack-node-externals'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import 'babel-polyfill'

// HACK - this is to fix this bug: https://github.com/vuejs/vue-cli/issues/2128
// TODO - remove when the bug is fixed or a better solution is found
import 'jsdom-global'
window.Date = Date;

export default {
    externals: [nodeExternals()],
    plugins: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    }
}
