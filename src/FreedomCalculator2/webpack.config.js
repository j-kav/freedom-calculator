module.exports = {
    entry: './wwwroot/scripts/main.js',
    output: {
        path: './wwwroot/scripts/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
              test: /\.vue$/,
              loader: 'vue-loader'
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