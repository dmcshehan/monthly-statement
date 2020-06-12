const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/js/main.js',
		firebaseui: './src/js/auth/firebaseui.js',
	},
	output: {
		filename: 'js/[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	devServer: {
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
			{
				test: /\.(sa|sc|c)ss$$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
					},
					'css-loader',
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css',
		}),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html',
			chunks: ['firebaseui'],
		}),
		new HtmlWebpackPlugin({
			filename: 'dashboard.html',
			template: './src/dashboard.html',
			chunks: ['main'],
		}),
	],
};
