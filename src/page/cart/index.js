'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _cart = require('service/cart-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {

    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        this.loadCart()
    },
    bindEvent : function () {
        var _this = this;
        //商品的全选 / 取消全选
        $(document).on('click','.cart-select-all',function () {
            var $this = $(this)
            //全选
            if($this.is(':checked')){
                _cart.selectAllProduct(function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError()
                });
            }
            //取消全选
            else{
                _cart.unselectAllProduct(function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError()
                });
            }
        });

        //商品的选择 / 取消选择
        $(document).on('click','.cart-select',function () {
            var $this = $(this),
                productId = $this.parent('.cart-table').data('product-id');
            //选中
            if($this.is(':checked')){
                _cart.selectProduct(productId,function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError()
                });
            }
            //取消选中
            else{
                _cart.unselectProduct(productId,function (res) {
                    _this.renderCart(res);
                },function (errMsg) {
                    _this.showCartError()
                });
            }
        });
    },
    //加载购物车信息
    loadCart : function () {
        var _this = this;
        // 获取购物车列表
        _cart.getCartList(function (res) {
            _this.renderCart(res);
        },function (errMsg) {
            _this.showCartError()
        })
    },
    //渲染购物车
    renderCart : function (data) {
        this.filter(data);
        //缓存购物车信息
        this.data.cartInfo = data;
        //生成html
        var cartHtml = _mm.renderHtml(templateIndex,data);
        $('.page-wrap').html(cartHtml);
    },
    //数据匹配
    filter : function (data) {
        data.notEmpty = !!data.cartProductVoList.length;
    },
    //显示错误信息
    showCartError : function () {
        $('.page-wrap').html('<p class="err-tip">哪里不对了,刷新下试试吧</p>')
    }
};
$(function () {
    page.init();
})