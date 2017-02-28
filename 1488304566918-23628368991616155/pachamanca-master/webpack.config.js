var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/tiffinbox.js',
    output: {
        path: __dirname + '/bin',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            { test: /\.(png|jpg)$/, loader: 'url-loader' },
            //{ test: /\.(js|jsx)$/, exclude: __dirname + '/node_modules/', loaders: ['babel-loader'] },
            { test: /\.css$/, loader: 'style!css?modules!postcss' },
            { test: /\.(woff2?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=fonts/[name].[ext]" }
        ]
    },
    postcss: [
        require('autoprefixer')
    ],
    plugins: [
        new webpack.BannerPlugin("For the world"),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmp.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: __dirname + "/app/",
        colors: true,
        historyApiFallback: true,
        inline: true,
        hot: true
    }
};

/*

* html-webpack-plugin: es un plugin de webpack para poder injectar los js en un archivo html
* path: usamos path para manejar mejor las rutas
* loaders:
los loaders sirven para modificar los archivos
en este caso babel para poder pasar la sintaxis de
ecmascript6 a ecmascript5 que reconocen los navegadores
exclude va a evitar los packetes que no se requieran de esa carpeta
* plugins:
en esta seccion se ponen los plugins que hayas instalado
en este caso el de html para injectar los js
* devtool: "source-map",
para que nos genere source maps
y puedas debugear sin importar que ya este compilado todo en un archivo
* contentbase
la carpeta de donde se serviran los archivos
resolve: {
        root: srcPath,
        //se elige la ruta padre para evitar tener que poner "../"
        //y salir de la carpeta y hacer un import o require
        //en este caso los imports empezaran desde src
        extensions: [".js", ""],
        //se eligen las extensiones que usara webpack
        modulesDirectories: ['node_modules']
        //se declara el directorio donde estan los modulos
    },
*/
