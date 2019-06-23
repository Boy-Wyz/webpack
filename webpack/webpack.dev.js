const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const webpack = require('webpack');

let devConfig = {
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    host: '0.0.0.0',
    port: 58080,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    },
    publicPath: '/',
    proxy: {
      "/api": {
        target: "http://192.168.0.102:8080",
        pathRewrite: { "^/api": "/mockjsdata/5/api" }
      }
    },
    quiet: true,
    watchOptions: {
      poll: true,
      ignored: /node_modules/,
      aggregateTimeout: 300
    }
  },
  module: {
    rules: [{
      test: /\.(sc|c|sa)ss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader",
        options: {
          sourceMap: true
        }
      }, {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          sourceMap: true,
          plugins: loader => [
            require('autoprefixer')({ overrideBrowserList: ['> 0.15% in CN'] }) // 添加前缀
          ]
        }
      }, {
        loader: "sass-loader",
        options: {
          sourceMap: true
        }
      }]
    },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = merge(common, devConfig)