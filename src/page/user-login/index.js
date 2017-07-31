'use strict';

require('./index.css')
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-servcie.js')
var page = {
    init : function () {
        this.bindEvent();
    },
    bindEvent : function () {
        var _this = this;
        //登录按钮的点击
        $('#submit').click(function () {
           _this.submit();
        })
        //如果按下回车,也进行提交
        $('.user-content').keyup(function (e) {
            //keycode == 13 表示回车键
            if(e.keyCode === 13){
                _this.submit();
            }
        })
    },
    //提交表单
    submit : function () {
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val()),
        },
        // 表单验证结果
        validateResult = this.formValidate(formData)
        //验证成功
        if (validateResult.status){
            //提交
            _user.login(formData,function (res) {

            },function (errMsg) {

            })
        }
        //验证失败
        else{

        }
    },
    //表单字段的验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg : ''
        };
        if(!_mm.validate(formData.username,'require')){
            reusult.msg = '用户名不能为空';
            return result;
        }
        if(_mm.validate(formData.username,'require')){
            reusult.msg = '密码不能为空';
            return result;
        }
        //通过验证,返回正确提示
        result.status = true;
        result.msg = '验证通过';
        return result;
    }
}
$(function () {
    page.init()
})