var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/tiffinbox.js',
    output: {
        path: __dirname + '/bin/public',
        filename: "[name]-[hash].js",
        //sourceMapFilename: "[name].js.map"
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: "json" },
            { test: /\.css$/, loader: 'style!css?modules!postcss' },
            { test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" }
            //{ test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            //{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?modules!postcss') }
            //{ test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css?css-loader?modules!postcss') }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new webpack.BannerPlugin("For the world"),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.html"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("[name]-[hash].css")
    ],
    devServer: {
        contentBase: __dirname + "/bin/public",
        colors: true,
        historyApiFallback: true,
        inline: true
    }
};
