/**
 * 三米弹出框封装方法
 * 引用方式：layui.use([''sanmiDialog],function(){  })
 * @author 于起宇
 */
layui.define(['layer'], function (exports) {

    //弹出框模块引用
    var layer = layui.layer;
    var $ = layui.jquery;

    /**
     * 方法集合
     * @type {{hello: hello}}
     */
    var methods = {
        /**
         * 显示弹出框
         * title：标题
         * width：宽度
         * height：高度
         * url：页面初始化请求地址
         * data : 父页面传递到弹出框页面的参数json对象，子页面使用_dual_data(json)方法接收json对象
         * dataUrl：数据加载路径
         * success：初始化完成回调函数
         * cancel：取消按钮回调函数
         * full：是否全屏，默认：false
         * @param params
         */
        dialog: function (params) {
            var area = [];

            /** 标题 */
            var title = params.title == undefined ? " " : params.title;
            /** 弹出框宽度 */
            var width = params.width == undefined ? "50%" : params.width+'px';
            /** 弹出框高度 */
            var height = params.height == undefined ? "50%" : params.height+"px";
            /**  弹出框是否全屏*/
            var full = params.full == undefined ? false : params.full;
            var timestamp = new Date().getTime();
            /**  请求路径*/
            var url = params.url;

            area.push(width);
            area.push(height);

            try {
                //拼接时间戳
                url += "?t=" + timestamp;
                //存在参数拼接参数
                url = params.data == undefined ? url : url + "&" + $.param(params.data);
                //处理请求编码，解决中文乱码问题
                url = encodeURI(url);
            } catch (error) {
            }


            var index = layer.open({
                title: title,
                type: 2,//弹出iframe层
                area:  area,
                content: url,
                success: function (layero, index) {
                    // 重新调整高度
                    layer.iframeAuto(index);
                    /**
                     * 当全屏时弹出返回列表内容
                     */
                    if (full == true) {
                        setTimeout(function () {
                            layer.tips('点击此处返回上一个操作页面', '.layui-layer-setwin .layui-layer-close', {
                                tips: 4
                            });
                        }, 1000)
                    }
                    //为子页面添加滚动条
                    $(layero).find("iframe").contents().find("body").css('overflowY', 'auto');

                    if (params.success != undefined) {
                        params.success(index, layero);
                    }
                },
                /**
                 * 点击关闭按钮时
                 * @param index
                 * @param layero
                 */
                cancel: function (index, layero) {
                    if (params.cancel != undefined)
                        params.cancel(index, layero);
                },
                /**
                 * 层销毁后触发的回调
                 */
                end: function () {
                    if (params.end != undefined)
                        params.end();
                }
            });
            /**
             * 是否全屏
             */
            if (full == true)
                layer.full(index);
        },
        /**
         * 显示弹出上传框
         * @param params 参数
         */
        showUpload: function (params) {
            var url = "/index.html";
            if (params != undefined) {
                /**  上传页面初始化路径*/
                url = params.url == undefined ? url : params.url;
                var data = params.data == undefined ? {} : params.data;
            }
            /**
             * 弹出上传文件框
             */
            this.dialog({
                url: url,
                title: "上传文件",
                width: 1000,
                height: 700,
                //弹框时传递参数
                data: data
            });
        },
        /**
         *
         * 选择页面弹出框
         * @param url 页面
         * @param title 页面提示
         * @param type 自定义类型
         * @param width,可选,弹框宽度,默认1100
         * @param height 可选,弹框高度,默认680
         * @return 弹出的页面DOM
         */
        shouBusiness: function (url, title, type, width, height) {
            width = width ? width : 1100;
            height = height ? height : 680;
            layer.open({
                type: 2,
                title: title,
                area: [width + "px", height + "px"],
                shade: 0.3,
                fixed: false,
                content: url,
                btn: ['选择', '取消'],
                yes: function (index, layero) {
                    var resultData;
                    // 获取复选框行数据
                    if(window["layui-layer-iframe" + index].callbackdata){
                        resultData = window["layui-layer-iframe" + index].callbackdata();
                    }
                    // 获取单选的弹框DOM
                    var body = layer.getChildFrame('body', index);
                    // 回调上传成功方法,需要在弹框的父级页面声明(注意作用域为全局)
                    businessCallBack(resultData, body, type);
                    //如果设定了yes回调，需进行手工关闭
                    layer.close(index);
                }
            });
        }
    };

    //输出dialog接口
    exports('sanmiDialog', methods);
});