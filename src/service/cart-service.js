
'use strict';

var _mm = require('util/mm.js');
var _cart = {
    //获取购物车数量
    getCartCount : function(resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/get_cart_product_count.do'),
            success : resolve,
            error : reject
        })
    },
    //添加到购物车
    addToCart : function (productInfo, resolve, reject) {
        _mm.request({
            url:_mm.getServerUrl('/cart/add.do'),
            data:productInfo,
            success : resolve,
            error : reject
        })
    },
    //获取购物车列表
    getCartList : function(resolve,reject){
        _mm.request({
            url:_mm.getServerUrl('/cart/list.do'),
            success : resolve,
            error : reject
        })
    },
}

module.exports = _cart;