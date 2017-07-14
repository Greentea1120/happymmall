var webpack = require('webpack');
var config = {
    entry: {
        'common':['./src/page/common/index.js'],
        'index':['./src/page/index/index.js'],
        'login':['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        filename: '/js/[name].js'
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
      loaders:[
          {text:/\.css$/,loader:"style-loader!css-loader"}   //从右往左,先执行css-loader再执行style-loader
      ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',     //这个common和entry的common对应,否则common会生成common.js而不是base.js
            filename:'js/base.js'
        })
    ]
};

module.exports = config