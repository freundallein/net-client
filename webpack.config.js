const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    module: {
        rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
            loader: "babel-loader"
            }
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader"
            }
          ]
        },
      {
        test: /\.css$/,
        use: ["style-loader" , "css-loader"]
      }
        ]
    },
    plugins: [
      new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      })
    ],
    output: {
        path: '/storage/projects/netfreund/static',
        publicPath: '/',
        filename: 'client.js'
      },
    devServer: {
      contentBase: './src'
    }
};