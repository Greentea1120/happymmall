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
//环境变量配置    dev  /  online
var WEBPACK_ENV  =  process.env.WEBPACK_ENV  ||  'dev'
console.log(WEBPACK_ENV)


var config = {
    entry: {
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js',
        publicPath:'/dist'
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
    resolve:{
        alias:{
            util : __dirname + '/src/util',
            page : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image : __dirname + '/src/image',
            node_modules : __dirname + '/node_modules',
        }
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

//做判断
if(WEBPACK_ENV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config

