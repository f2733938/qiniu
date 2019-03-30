/**
 * 添加菜单js相关代码
 */
layui.use(['form', 'layer', 'jquery', 'layedit', 'sanmiMsg', 'laydate', 'sanmiDialog', 'sanmiAjax', 'sanmiTools', 'sanmiEditor', 'laytpl', 'formSelects'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : parent.layer,
        layedit = layui.layedit,
        dialog = layui.sanmiDialog,


        $ = layui.jquery;





    //上传视频封面，弹框
    $("#uploadImg").click(function () {
        dialog.showUpload({data: {"type": "videoImg", "size": 10240, "number": 1}});
    });




});

/**
 * 上传成功后的回调函数
 * @param data
 */
function uploadCallBack(data, urls) {
    if (data.type == "videoImg") {
        document.getElementById("videoImage").style.display = "block";
        document.getElementById("videoImage").src = urls[0];
        document.getElementById("videoImgUrl").value = urls[0];
    }
}

/**
 * 增加事件,默认为点击事件
 *
 * @param obj 必选,要添加事件的元素
 * @param name 可选,增加的事件名称,默认click
 */
function addEvent(obj, name) {
    // 判断是否传值
    name = name ? name : "click";
    // 先删除绑定的事件,防止加载多次事件
    obj.unbind(name);
    // 添加事件
    obj.on(name, function () {
        var dom = $(this);
        //询问框
        layer.confirm('确认删除该图片', {icon: 3, title: '提示'}, function (index) {
            dom.parent().remove();
            layer.close(index);
        });
    });
}

