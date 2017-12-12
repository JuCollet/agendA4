const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackHardDiskPlugin = require("html-webpack-harddisk-plugin");

const config = {
    entry : {
        bundle : './src/index.js',
        vendor : ['react', 'lodash']
    },
    output : {
        filename : '[name].[chunkhash].js',
        path : path.resolve(__dirname, "public")
    },
    devServer: {
        historyApiFallback: true,
        contentBase: __dirname + 'public',
        host: process.env.IP,
        port: process.env.PORT
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
                        options : { limit : 2000000, name : "./img/[hash].[ext]"}
                    },
                    "image-webpack-loader"
                ]
            }, {
                test : /\.(ttf)$/,
                use : [ 
                    {
                        loader : "file-loader"
                    }
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
            alwaysWriteToDisk: true,            
            title: 'AgendA4 - Print your Google Agenda with style.',
            template: 'src/index.ejs',
            files : {
                css : ['styles/styles.css', ]
            }
        }),
        new htmlWebpackHardDiskPlugin()
    ]
};

if (process.env.NODE_ENV === 'production') {  
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin()
    );
}

module.exports = config;