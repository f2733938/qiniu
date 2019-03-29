/**
 * 三米提示框封装方法
 * 引用方式：layui.use([''sanmiMsg],function(){  })
 * @author 于起宇
 */
layui.define(function(exports) {
    var methos = {
        /**
         * 弹出提示框
         * loading：是否为遮蔽层形式
         * @param content 提示内容
         * @param loading 是否加载中，默认false
         * @returns {*} 弹出框的index值
         */
        msg : function(content,loading) {
            /**  是否加载中*/
            var loading = loading ==undefined ? false : true;
            //返回的索引
            var index;
            /**
             * 弹出加载中的提示框
             */
            if(loading == true) {
                index = layer.msg(content,{icon: 16,time:false,shade:0.8});
            }
            /**
             * 弹出普通提示框
             */
            else {
                layer.msg(content);
                index = 0;
            }
            //返回提示框索引
            return index;
        },
        /**
         * 关闭指定索引值的提示框
         * 等待500毫秒后关闭
         * @param index
         */
        closeMsg : function(index)
        {
            setTimeout(function(){ layer.close(index); },500);
        },
        /**
         * 全部全部提示框
         */
        closeAllMsg : function(){
            layer.closeAll();
        }
    }
    exports("sanmiMsg",methos);
})