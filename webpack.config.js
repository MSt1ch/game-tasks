const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
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
            loader: "html-loader",
            options: { minimize: true,
                       interpolate: true,
                     }
          }
        ]
      },
      { test: /\.jpg$/, use: [ "file-loader" ] },
      { test: /\.png$/, use: [ "file-loader" ] },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader?url=false"]
      }
    ]
  },
  // plugins: [
  //   new HtmlWebPackPlugin({
  //     template: "./src/index.html",
  //     filename: "./index.html"
  //   }),

  // entry: ['index.js',
  //         // 'src/landing.js'
  // ],
  // output: {
  //   path: __dirname + '/dist',
  //   filename: 'index_bundle.js'
  // },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }), // Generates default index.html

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([{
        from: './src/fonts',
        to: './fonts'
      },
      {
          from: './src/sounds',
          to: './sounds'
      },
      {
        from: './src/img',
        to: './img'
      }
    ]),
  ]
};
