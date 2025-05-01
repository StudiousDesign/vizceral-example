/* globals __dirname process module */

'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vizceral.[hash].bundle.js',
    publicPath: '/Vizceral/'
  },
  resolve: {
    alias: {
      react: path.resolve('node_modules/react'),
    },
    extensions: ['.jsx', '.js'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: '', // emit directly to dist/
          publicPath: '/Vizceral/' // ensures fonts resolve correctly under virtual dir
        }
      },
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  }
  ,
  plugins: [
    new webpack.ProvidePlugin({
      // Automtically detect jQuery and $ as free var in modules
      // and inject the jquery library
      // This is required by many jquery plugins
      jQuery: 'jquery',
      $: 'jquery'
    }),
    new webpack.DefinePlugin({
      __HIDE_DATA__: !!process.env.HIDE_DATA
    }),
    new HtmlWebpackPlugin({
      title: 'Vizceral',
      template: './src/index.html',
      favicon: './src/favicon.ico',
      inject: true
    })
  ]
};
