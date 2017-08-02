'use strict';

require('./index.css')
require('page/common/nav/index.js');
require('page/common/header/index.js');
var _mm = require('util/mm.js');
var _product = require('service/product-service.js');
var templateIndex = require('./index.string');

var page = {
    data : {
      listParam : {
          keyword : _mm.getUrlParam('keyword') || '',
          categoryId : _mm.getUrlParam('categoryId') || '',
          orderBy : _mm.getUrlParam('orderBy') || 'default',
          pageNum : _mm.getUrlParam('pageNum') || 1,
          pageSize : _mm.getUrlParam('pageSize') || '20'
      }
    },
    init : function () {
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function () {
        this.loadList()
    },
    bindEvent : function () {

    },
    //加载list数据
    loadList : function () {
        var _this = this,
            listHtml = '',
            listParam = this.data.listParam;
        _product.getProductList(listParam,function (res) {
            listHtml = _mm.renderHtml(templateIndex,{
                list : res.list
            });
            $('.p-list-con').html(listHtml);
            _this.loadPagination(res.pageNum,res.pages);
        },function (errMsg) {
            _mm.errorTips(errMsg);
        })
    },
    //加载分页信息
    loadPagination : function (pageNum,pages) {

    }
};
$(function () {
    page.init();
})