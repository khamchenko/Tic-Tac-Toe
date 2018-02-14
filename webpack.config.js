const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: {
		app: [
			'babel-polyfill',
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			path.resolve(__dirname, './client/src/index.js')
		]
	},
	output: {
		path: path.resolve(__dirname, './build'),
    publicPath: '/',
		filename: '[name].js'
	},
	devtool: 'inline-source-map',
  plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: 'production'
			},
		}),
		new CleanWebpackPlugin([path.resolve(__dirname, './build')], {
      root: path.resolve(__dirname),
    }),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html'),
			filename: 'index.html',
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
  resolve: {
   	modules: [path.resolve(__dirname, './client/src'), 'node_modules'],
  },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			},
      {
        test: /\.(css|scss)$/,
        use: [ 'style-loader', 'css-loader','sass-loader'],
      },
			{
				test: /\.(gif|png|jpg|jpeg|svg)$/,
				use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
			}
		]
	}
}
