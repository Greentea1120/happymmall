'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var _address = require('service/address-service.js');
var templateAddress = require('./address-list.string');
var templateProduct = require('./product-list.string');

var page = {
    data : {
        selectedAddressId : null
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        this.loadAddressList();
        this.loadProductList();
    },
    bindEvent : function () {
        var _this = this;
        //地址的选择
        $(document).on('click','.address-item',function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectedAddressId = $(this).data('id');
        });
        //订单的提交
        $(document).on('click','order-submit',function () {
            var shippingId = _this.data.selectedAddressId;
            if(shippingId){
                _order.createOrder({
                    shippingId : shippingId
                },function (res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                },function (errMsg) {
                    _mm.errorTips(errMsg);
                })
            }else{
                _mm.errorTips('请选择地址后再提交');
            }
        });

    },
    //加载地址列表
    loadAddressList : function () {
        var _this = this;
        // 获取地址列表
        _address.getAddressList(function (res) {
            var addressListHtml = _mm.renderHtml(templateAddress,res);
            $('.address-con').html(addressListHtml);
        },function (errMsg) {
            $('.address-con').html('<p class="err-tip">地址加载失败,请刷新后重试</p>')
        })
    },
    //加载商品清单
    loadProductList : function () {
        var _this = this;
        // 获取地址列表
        _order.getProductList(function (res) {
            var productListHtml = _mm.renderHtml(templateProduct,res);
            $('.product-con').html(productListHtml);
        },function (errMsg) {
            $('.product-con').html('<p class="err-tip">商品信息加载失败,请刷新后重试</p>')
        })
    },
    //删除指定商品,支持批量,productId用逗号分隔
    deleteCartProduct : function () {
        var _this = this;
        _cart.deleteProduct(productIds,function (res) {
            _this.renderCart(res);
        },function (errMsg) {
            _this.showCartError()
        })
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
