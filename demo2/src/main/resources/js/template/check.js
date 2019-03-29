/**
 * 检查登录状态相关js
 */
layui.use(['layer', 'sanmiAjax'], function() {
        var layer = layui.layer,
        ajax = layui.sanmiAjax;
    /**
     * 执行ajax请求
     */
    var url = window.location.pathname;
    /**
     * 排除静态页面
     */
    if(url == "/login.html")
    {
        return;
    }
    ajax.sanmiAjax({
        url : "/system/login/isLogin/",
        success:function(data) {
            /**
             * 未登录
             * 跳转首页
             * @type {string}
             */
            if(!data.result) {
                location.href = "/login.html";
            }
        }
    });
});