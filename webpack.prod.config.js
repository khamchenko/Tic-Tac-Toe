const path = require('path');
const webpack = require('webpack');

const serverConfig = require('./config/server-config.json');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var publicPath = `http://localhost:${serverConfig.port}/static`;

module.exports = [
	{
		name: 'client',
		target: 'web',
		entry: './client/src/index.js',
		output: {
			path: path.join(__dirname, 'static'),
			filename: 'app.js',
			publicPath: publicPath,
		},
		resolve: {
	   	modules: [path.resolve(__dirname, './client/src'), 'node_modules'],
	  },
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /(node_modules\/)/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				{
					test: /\.(scss|css)$/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[hash:base64:10]',
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				},
				{
					test: /\.(gif|png|jpg|jpeg|svg)$/,
					use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
				}
			],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: 'production'
				},
				__DEV__: JSON.stringify(!process.env.ENV),
			}),
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					screw_ie8: true,
					drop_console: true,
					drop_debugger: true
				}
			}),
			new webpack.optimize.OccurrenceOrderPlugin(),
		]
	},
	{
		name: 'server',
		target: 'node',
		entry: './server/modules/index.js',
		output: {
			path: path.join(__dirname, 'static'),
			filename: 'modules.js',
			libraryTarget: 'commonjs2',
			publicPath: publicPath,
		},
		devtool: 'source-map',
		resolve: {
			extensions: ['.js', '.jsx']
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /(node_modules\/)/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				{
					test: /\.(scss|css)$/,
					use: ExtractTextPlugin.extract({
						fallback: "isomorphic-style-loader",
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
									importLoaders: 1,
									localIdentName: '[hash:base64:10]',
									sourceMap: true
								}
							},
							{
								loader: 'sass-loader'
							}
						]
					})
				},
				{
					test: /\.(gif|png|jpg|jpeg|svg)$/,
					use: 'url-loader?limit=10000&name=assets/[name]-[hash].[ext]',
				}
			],
		},
		plugins: [
			new ExtractTextPlugin({
				filename: 'styles.css',
				allChunks: true
			}),
			new OptimizeCssAssetsPlugin({
				cssProcessorOptions: { discardComments: { removeAll: true } }
			}),
		]
	}
];
