/**
 * 三米工具类封装方法
 * 引用方式：layui.use([''sanmiTools],function(){  })
 * @author 于起宇
 */
layui.define(['layer'], function (exports) {
    /**
     * 方法集合
     * @type {{hello: hello}}
     */
    var methods = {
            /**
             * 获取请求参数数组对象
             * var params = tools.getRequestParams();
             * 获取数组内的参数，如：params[''xxId]
             */
            getRequestParams: function () {
                var url = location.search; //获取url中"?"符后的字串
                var theRequest = new Object();
                if (url.indexOf("?") != -1) {
                    var str = url.substr(1);
                    strs = str.split("&");
                    for (var i = 0; i < strs.length; i++) {
                        theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
                    }
                }
                return theRequest;
            },
            /**
             * 处理参数路径解码
             * @param value
             * @returns {string}
             */
            decode: function (value) {
                return value == undefined ? "" : decodeURI(value);
            },
            /**
             * 停用启用按钮还原
             * @param mgiSaleStatus 错误码
             * @param obj
             */
            updateButton: function (mgiSaleStatus, obj) {
                // 值未为ON,说明启用失败
                if (mgiSaleStatus == 0 || mgiSaleStatus == 'ON') {
                    // 启用失败,还原按钮
                    obj.othis.removeClass("layui-form-onswitch");
                    obj.othis.find("em").text("停用");
                    obj.elem.checked = false;
                } else {
                    // 停用失败,改为启用
                    obj.othis.addClass("layui-form-onswitch");
                    obj.othis.find("em").text("启用");
                    obj.elem.checked = true;
                }
            },
            stringText: function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            },
            // 生成UUID
            getUUID: function () {
                return (methods.stringText() + methods.stringText() + "-" + methods.stringText() + "-" + methods.stringText() + "-" + methods.stringText() + "-" + methods.stringText() + methods.stringText() + methods.stringText());
            }
        }
    ;

    //输出dialog接口
    exports('sanmiTools', methods);
});