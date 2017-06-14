const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [
      { test: /\.js$/, 
		loader: 'babel-loader', 
		exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'tests')]},
      { test: /\.jsx$/, 
		loader: 'babel-loader',
		exclude: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'tests')]},
	  {	test:/\.css$/,
		loader: "style-loader!css-loader"}
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}