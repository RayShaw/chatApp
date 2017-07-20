var webpack = require("webpack")
var path = require("path")

module.exports = {
    entry: [
        // for hot loader: WebpackDevServer host and port
        "webpack-dev-server/client?http://localhost:7070",
        // "webpack-dev-server/client?http://192.168.88.101:7070",
        // for hot loader: "only" prevents reload on syntax errors
        "webpack/hot/only-dev-server",
        // our appʼs entry point
        "./src/client/index.js"
    ],
    module: {
        rules: [{
            test: /\.jsx?$/,
            include: path.join(__dirname, "src"),
            // loaders: ["react-hot", "babel"],
            use: ["react-hot-loader", "babel-loader"]
        }]
    },
    // resolve: {
    //     extensions: [".js", ".jsx"]
    // },
    output: {
        filename: "boundle.js",
        path: __dirname + "/public/build",
        publicPath: "http://localhost:7070/build",
        // publicPath: "http://192.168.88.101:7070/build",
    },
    devServer: {
        contentBase: "./public",
        hot: true,
        host: "localhost",
        // host: "192.168.88.101",
        port: 7070,
        proxy: {
            "**": "http://localhost:" + 3000
            // "**": "http://192.168.88.101:" + 3000
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}