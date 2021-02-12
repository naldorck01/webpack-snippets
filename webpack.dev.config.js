const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: path.resolve(__dirname, 'index.js'),
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name]-[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'docs'),
        hot: true,
        open: true,
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    'babel-loader'
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.jpg|png|gif|woff|eot|ttf|svg|mp4|webm$/,
                use: {
                  loader: 'file-loader',
                  options: {
                    outputPath: 'assets/'
                  }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './index.html')
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].id.css'
        })    
    ],
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            name: 'commons'
        }
    }
}
