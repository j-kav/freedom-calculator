import nodeExternals from 'webpack-node-externals'
import VueLoaderPlugin from 'vue-loader/lib/plugin'
import 'babel-polyfill'

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
