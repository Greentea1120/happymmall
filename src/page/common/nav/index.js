"use strict";
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//导航

var nav = {
    init : function () {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this
    },
    bindEvent : function () {
        //登录点击事件
        $('.js-user-login').click(function () {
            _mm.doLogin();
        })
        //注册点击事件
        $('.js-register').click(function () {
            window.location.href = './register.html';
        })
        //退出点击事件
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            },function (errMsg) {
                _mm.errorTips(errMsg)
            })
        })
    },
    //加载用户信息
    loadUserInfo : function () {
        _user.checkLogin(function (res) {
            $('.user.not-user-login').hide().siblings('.user.user-login').show().find('.username').text(res.username);
        },function (errMsg) {
            _mm.errorTips(errMsg)
        })
    },
    //加载购物车数量
    loadCartCount : function () {
        _cart.getCartCount(function (res) {
            $('.nav .cart-cont').text(res || 0);
        },function (errMsg) {
            $('.nav .cart-cont').text(0);
        })
    } 
}

module.exports = nav.init();