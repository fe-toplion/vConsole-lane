const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        "vconsole-plugins": "./plugins/app.js",
    },
    output: {
        path: path.join(__dirname, "./dist"),
        filename: "vconsole-plugin-tools.min.js",
        library: "vconsole-plugin-tools",
        libraryTarget: "umd",
        globalObject: 'this'
        // umdNamedDefine: true,
    },
    devServer: {
        host: "0.0.0.0",
        allowedHosts: 'all',
        port: 8080,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "less-loader",
                    },
                ],
            },
            {
                test: /\.js$/i,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                          }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            inject: "head",
            scriptLoading: "blocking",
        }),
        new TerserPlugin()
    ],
};
