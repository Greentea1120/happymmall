var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var htmlWebpackPlugin = require('html-webpack-plugin');     //1.引入

//获取html-webpack-plugin获取参数的方法
var getHtmlConfig = function(name,title){
    return {
        template:'./src/view/' + name +'.html',
        filename:'view/' + name + '.html',
        title:title,
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
        'common'                : ['./src/page/common/index.js'],
        'index'                 : ['./src/page/index/index.js'],
        'list'                  : ['./src/page/list/index.js'],
        'user-login'            : ['./src/page/user-login/index.js'],
        'user-register'         : ['./src/page/user-register/index.js'],
        'user-pass-reset'       : ['./src/page/user-pass-reset/index.js'],
        'user-center'           : ['./src/page/user-center/index.js'],
        'user-center-update'    : ['./src/page/user-center-update/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js'],
        'result'                : ['./src/page/result/index.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js',
        publicPath:'/dist/'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
      loaders:[
          {test:/\.css$/,loader:ExtractTextPlugin.extract("style-loader","css-loader")},
          {test:/\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,loader:'url-loader?limit=1000&name=resource/[name].[ext]'},
          {test:/\.string$/,loader:'html-loader'}

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
        new htmlWebpackPlugin(getHtmlConfig('index','首页')),
        new htmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
        new htmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),
        new htmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
        new htmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
        new htmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
        new htmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
        new htmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),
        new htmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
};

//做判断
if(WEBPACK_ENV === 'dev'){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}
module.exports = config

