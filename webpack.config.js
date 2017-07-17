var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');     //1.引入

//获取html-webpack-plugin获取参数的方法
var getHtmlConfig = function(name){
    return {
        template:'./src/view/' + name +'.html',
        filename:'view/' + name + '.html',
        inject:true,
        hash:true,
        chunks:['common',name]
    }
}

var config = {
    entry: {
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
module:{
  loaders:[
      {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
      {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'file-loader?limit=1000&name=resource/[name].[ext]'}

  ]
},
    plugins:[
        //独立通用模块js/base.js
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename:'js/base.js'
        }),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new htmlWebpackPlugin(getHtmlConfig('index')),
        new htmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

module.exports = config

