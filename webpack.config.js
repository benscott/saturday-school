const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


module.exports = {
    optimization: {
        minimizer: [new OptimizeCSSAssetsPlugin({})],
    },
    entry: {
        main: [
            // './assets/js/main.js', 
            './src/sass/main.scss'
        ],
    },
    output: {
        filename: "[name].min.js",
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images'
                    },
                },
            },
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.(css|scss)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].min.css',
        }),
        new HtmlWebpackPlugin({
            hash: true,
            template: './src/index.html',
            filename: './index.html'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "../docs/"),
        port: 9000,
        hot: true,
        inline: true,
    }
};