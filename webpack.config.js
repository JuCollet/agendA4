const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry : {
        bundle : './src/index.js',
        vendor : ['react', 'react-dom']
    },
    output : {
        filename : '[name].[chunkhash].js',
        path : path.resolve(__dirname, "public")
    },
    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + 'public',
        host: process.env.IP,
        port: process.env.PORT,
        "public": "agenda4-julesbe.c9users.io"
    },
    externals: {
        'cheerio': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },    
    module : {
        rules : [
            {
                use : 'babel-loader',
                test : /\.js$/,
                exclude : __dirname + 'node_modules',
            }, {
                loader : ExtractTextPlugin.extract({
                    loader: 'css-loader!postcss-loader!less-loader'
                }),
                test : /\.less$/,
            }, {
                loader : ExtractTextPlugin.extract({
                    loader: 'css-loader'
                }),
                test : /\.css$/,
            }, {
                test : /\.(png|jpeg|jpg|gif|svg)$/,
                use : [
                    {
                        loader : "url-loader",
                        options : { limit : 20000, name : "./img/[hash].[ext]"}
                    },
                    "image-webpack-loader"
                ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles/styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest']
        }),
        new htmlWebpackPlugin({
            title: 'React Redux Boilerplate',
            template: 'src/index.ejs',
            files : {
                css : ['styles/styles.css', ]
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV' : JSON.stringify(process.env.NODE_ENV)
        })
    ]
};