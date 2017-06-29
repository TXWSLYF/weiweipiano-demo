/**
 * Created by Alex on 2017/6/21.
 */

const path = require('path');

module.exports = {
    devtool: "source-map",

    entry: "./app/index.js",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "app")],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: [
                        ["import", {libraryName: "antd", style: "css"}]
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: "file-loader?name=[name].[ext]/"
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://115.159.143.172/admin/api',
                pathRewrite: {"^/api": ""},
                secure: false
            }
        },
        // publicPath: "/build/"               //配置之后发布在localhost:8080/build目录中，不配置则发布在local:8080目录
    }
};