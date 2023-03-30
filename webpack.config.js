const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const prod = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        myAppName: path.resolve(__dirname, "./src/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: prod ? "[name].[contenthash].js" : "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(css|sass|scss)$/,
                exclude: /node_modules/,
                use: [
                    prod ? MiniCssExtractPlugin.loader : "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: !prod
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: !prod
                        }
                    },
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.scss']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack App",
            template: "./index.html",
        }),
        new MiniCssExtractPlugin({
            filename: prod ? "[name].[contenthash].css" : "[name].css",
        })
    ],
    devServer: {
        port: 3000,
        hot: true,
    },
    mode: prod ? "production" : "development",
}