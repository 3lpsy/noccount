'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const pkg = require('./app/package.json')
const settings = require('./config.js')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let rendererConfig = {
  devtool: '#eval-source-map',
  devServer: { overlay: true },
  entry: {
    renderer: path.join(__dirname, 'app/src/renderer/main.js')
  },
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [ path.resolve(__dirname, 'app/src/renderer') ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.ejs',
      appModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, 'app/node_modules')
        : false,
    }),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'app/dist')
  },
    resolve: {
        alias: {
            'vue': path.join(__dirname, 'app/node_modules/vue/dist/vue.common.js'),
            'main': path.join(__dirname, 'app/src/renderer/main'),
            'bw': path.join(__dirname, 'app/src/main/modules/bw'),
            'low': path.join(__dirname, 'app/src/main/modules/low'),
            'renderer': path.join(__dirname, 'app/src/renderer'),
            'api': path.join(__dirname, 'app/src/renderer/api'),
            'assets': path.join(__dirname, 'app/src/renderer/assets'),
            'pages': path.join(__dirname, 'app/src/renderer/pages'),
            'store': path.join(__dirname, 'app/src/renderer/store'),
            'router': path.join(__dirname, 'app/src/renderer/router'),
            'guards': path.join(__dirname, 'app/src/renderer/router/guards'),
            'contants': path.join(__dirname, 'app/src/renderer/contants'),
            'common': path.join(__dirname, 'app/src/renderer/modules/common'),
            'daemon': path.join(__dirname, 'app/src/renderer/modules/daemon'),
            'home': path.join(__dirname, 'app/src/renderer/modules/home'),
            'mbox': path.join(__dirname, 'app/src/renderer/modules/mbox'),
            'manage': path.join(__dirname, 'app/src/renderer/modules/manage'),

        },
        extensions: ['.js', '.vue', '.json', '.css', '.node'],
        modules: [
            path.join(__dirname, 'app/node_modules'),
            path.join(__dirname, 'node_modules')
        ]
    },
    target: 'electron-renderer'
}


/**
 * Adjust rendererConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  rendererConfig.devtool = ''

  rendererConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = rendererConfig
