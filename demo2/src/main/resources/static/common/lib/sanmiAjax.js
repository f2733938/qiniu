/**
 * 三米ajax请求封装方法
 * 引用方式：layui.use([''sanmiAjax],function(){  })
 * @author 于起宇
 */
layui.define(['sanmiMsg', 'jquery'], function (exports) {

    var msg = layui.sanmiMsg;
    var $ = layui.$;

    var methos = {
        /**
         * 封装ajax方法请求方法
         * url：请求路径
         * data：请求参数列表
         * method：请求方式，默认POST
         * dataType：返回数据类型，默认json
         * jsonData：true【新增json字符串作为参数】
         * openLoad：false【开启加载，默认false不开启】
         * loadingText：加载中提示内容【beforeSend时提示】
         * loadedText：加载完成提示内容【success时提示】
         * loadFaildText：加载失败提示内容【error时提示】
         * logicErrorCallBack：业务异常回调方法
         * @desc 为方便后期扩展ajax请求处理添加该方法
         * 使用如jquery ajax差不多，如：$.sanmiAjax({  url:"",data:{},success:function(data){}});
         * @param params 参数列表
         */
        sanmiAjax: function (params) {

            /**  参数列表*/
            var data = params.data == undefined ? {} : params.data;

            /** 请求方式：默认采用post */
            var method = params.method == undefined ? "POST" : params.method;
            /**  返回数据类型 */
            var dataType = params.dataType == undefined ? "json" : params.dataType;
            /**  是否开启提示弹出框 */
            var openLoad = params.openLoad == undefined ? false : params.openLoad;
            // 异步请求
            var async = params.async == undefined ? true : false;
            // 是否为json请求数据
            var jsonData = params.jsonData == undefined ? "application/x-www-form-urlencoded; charset=UTF-8" : "application/json; charset=utf-8";
            /** 遮蔽层索引 */
            var loadMsgIndex;
            $.ajax({
                url: params.url,
                data: data,
                method: method,
                dataType: dataType,
                contentType: jsonData,
                async: async,
                /**
                 * 执行请求之前
                 * 根据openLoad判断是否需要开启弹框
                 */
                beforeSend: function () {
                    if (openLoad == true) {
                        /** 加载提示内容 */
                        var loadingText = params.loadingText == undefined ? "正在处理数据，请稍等." : params.loadingText;
                        loadMsgIndex = msg.msg(loadingText, true);
                    }
                },
                /**
                 * 执行成功后返回的方法，回调params.success方法
                 * @param data
                 */
                success: function (data) {
                    /** 关闭遮蔽层 */
                    msg.closeMsg(loadMsgIndex);
                    /**
                     * 需要登录，跳转界面
                     */
                    if (data.result == "NEED_LOGIN") {
                        location.href = "/login.html";
                        return;
                    }

                    /**
                     * 存在错误信息
                     */
                    if (data.status == "0") {
                        /**  执行成功后的提示内容 */
                        var loadFaildText = params.loadFaildText == undefined ? data.msg : params.loadedText;
                        /** 提示执行失败内容 */
                        msg.msg(loadFaildText);

                        /**回调业务逻辑异常*/
                        if(params.logicErrorCallBack !=undefined) {
                            params.logicErrorCallBack(loadFaildText);
                        }
                    }
                    /**
                     * 执行成功后
                     */
                    else {
                        /**  执行成功后的提示内容 */
                        var loadedText = params.loadedText == undefined ? "" : params.loadedText;
                        if (loadedText != "") {
                            /** 提示执行成功内容 */
                            msg.msg(loadedText);
                        }
                        if (params.success != undefined) {
                            params.success(data);
                        }
                    }
                },
                /**
                 * 执行失败后的返回方法，回调params.error方法
                 * @param XMLHttpRequest
                 * @param textStatus
                 * @param errorThrown
                 */
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    /** 关闭遮蔽层 */
                    msg.closeMsg(loadMsgIndex);
                    /**  执行成功后的提示内容 */
                    var loadFaildText = params.loadFaildText == undefined ? "请求失败，请检查." : params.loadFaildText;
                    if (loadFaildText != "") {
                        /** 提示执行成功内容 */
                        msg.msg(loadFaildText);
                    }
                    if (params.error != undefined)
                        params.error(XMLHttpRequest, textStatus, errorThrown);
                },
                /**
                 * 执行完成后的返回方法，回调params.complete方法
                 * @param XMLHttpRequest
                 * @param textStatus
                 */
                complete: function (XMLHttpRequest, textStatus) {
                    if (params.complete != undefined)
                        params.complete(XMLHttpRequest, textStatus, errorThrown);
                }
            });
        }
    }

    /**
     * 让layui支持ajax工具方法
     */
    exports("sanmiAjax", methos);
});