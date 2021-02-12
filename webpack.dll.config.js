const path = require('path')
const webpack = require('webpack')
const TersetJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: {
        modules: [
            'react',
            'react-dom'
        ]
    },
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'js/[name].[chunkhash].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.join(__dirname, '[name]-manifest.json')
        })
    ],
    optimization: {
        minimizer: [
            new TersetJSPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    },
}