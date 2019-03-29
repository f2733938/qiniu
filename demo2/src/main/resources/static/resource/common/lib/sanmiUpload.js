/**
 * 上传控件
 */
layui.define(['jquery',"upload","form"], function (exports) {

    var $ = layui.$,
        form = layui.form,
        upload = layui.upload;

    //head标签引入上传样式
    var head = $("head");
    var link = $("<link rel=\"stylesheet\" type=\"text/css\" href=\"/resource/css/upload.css\" />");
    $(head).append(link);

    form.verify({
        order: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("(^[1-9]\\d{0,3}$)|(^0$)","g").test(value)){
                return '顺序限制 0-9999';
            }
        }
    });

    var methos = {
        Class:function(e,c,p){
            this.config(e,c,p);
            this.create();
        },
        render:function(e,c,p){
            //初始化配置文件
            var obj = new this.Class(e,c,p);
            return obj;
        }
    };
    /**
     * 初始化配置
     * @param e
     * @param c
     * @param p
     */
    methos.Class.prototype.imgSize = function () {
        var that = this;
        return $(that.holderListHolder).find(".upload_img").length;
    };

    /**
     * 初始化数据
     * @param i
     */
    methos.Class.prototype.reload = function (i) {
        var that = this;
        $(that.holderListHolder).empty();
        //初始化数据
        if (Array.isArray(i)){
            for(n in i){
                if(i[n][that.urlName]===""){
                    continue;
                }
                var holder = $("<div class=\"upload_img\"></div>");
                let del = $("<i class='layui-icon myDelete'>ဆ</i>");
                var url = $("<input type=\"hidden\" data-flag='url' name=\""+that.objName+"["+n+"]."+that.urlName+"\" value=\""+i[n][that.urlName]+"\">")
                var img = $("<img src='"+i[n][that.urlName]+"' class=\"layui-upload-img\">");
                var order = $("<input type=\"text\" data-flag='order' name=\""+that.objName+"["+n+"]."+that.orderName+"\" value=\""+i[n][that.orderName]+"\" lay-verify=\"required|order\" placeholder=\"序号\" class=\"layui-input\">")
                var tmp = $("<div></div>");
                tmp.append(img);
                holder.append(tmp);
                if (that.showOrder){
                    holder.append(order);
                }
                holder.append(url);
                // holder.append(del);
                $(that.holderListHolder).append(holder);
                $(del).on('click',function(a) {
                    that.del(a);
                });
            }
        }
    };
    /**
     * 初始化配置
     * @param e
     * @param c
     * @param p
     */
    methos.Class.prototype.config = function (e,c,p) {
        var that = this;
        that.root = e;
        c = c || {};
        p = p || {};
        //参数对象名称
        that.objName = p.objName || "list";
        //图片url属性名
        that.urlName = p.urlName || "url";
        //顺序属性名
        that.orderName = p.orderName || "order";
        //隐藏变量
        that.hiddenParm = p.hiddenParm || [];

        //上传限制
        that.uploadLimit = c.uploadLimit || 500;
        //图片数量限制
        that.imgLimit = c.imgLimit || 3;
        //是否显示序号
        that.showOrder = c.showOrder || false;
        //图片标签名称
        that.labelName = c.labelName || "图片";
        //删除元素
        that.del=function (o) {
            let delE = o.target;
            let rootE = $(delE).parent().parent();
            $(delE).parent().remove();

            $(rootE.children()).each(function (index) {
                $(this).find("input[data-flag='url']").attr("name",that.objName+"["+index+"]."+that.urlName);
                $(this).find("input[data-flag='order']").attr("name",that.objName+"["+index+"]."+that.orderName);
            });
        }
    };

    /**
     * 渲染页面
     * @param i
     */
    methos.Class.prototype.create = function (i) {
        var that = this;

        var top = $("<div class=\"layui-inline\"></div>");
        var label = $("<label class=\"layui-form-label\">"+that.labelName+"</label>");
        //清除按钮
        var clear = $("<button class=\"layui-btn layui-btn-sm clear\"><i class=\"layui-icon\"></i></button>");
        $(clear).click(function () {
            var clearNode = $(this);
            var root = $(clearNode).parents(".layui-form-item");
            $(root).find(".upload_img").last().remove();
            return false;
        });
        //上传按钮
        var button = $("<input type=\"button\" class=\"layui-btn layui-btn-normal platUploadImg\" data-sort=\"0\" value=\"点击上传\">");
        //设定文件大小限制
        upload.render({
            elem: button,
            url: '/upload/',
            size: that.uploadLimit, //限制文件大小，单位 KB
            done: function(res){
                //如果上传失败
                if(res.code > 0){
                    return layer.msg('上传失败');
                }

                //判断图片最大数量
                var length = $(that.holderListHolder).find(".upload_img").length;
                if (length >= that.imgLimit) {
                    return layer.msg('超过图片上传数量限制');
                }

                var holder = $("<div class=\"upload_img\"></div>");
                let del = $("<i class='layui-icon myDelete'>ဆ</i>");
                var url = $("<input type=\"hidden\" data-flag='url' name=\""+that.objName+"["+length+"]."+that.urlName+"\" value=\""+res.info+"\">")
                var img = $("<img src='"+res.info+"' class=\"layui-upload-img\">");
                var order = $("<input type=\"text\" data-flag='order' name=\""+that.objName+"["+length+"]."+that.orderName+"\" lay-verify=\"required|order\" placeholder=\"序号\" class=\"layui-input\">")
                var tmp = $("<div></div>");
                tmp.append(img);
                holder.append(tmp);
                if (that.showOrder){
                    holder.append(order);
                }
                holder.append(url);
                // holder.append(del);
                that.holderListHolder.append(holder);
                $(del).on('click',function(a) {
                    that.del(a);
                });
            }
        });

        var topblock = $("<div class=\"layui-input-inline\"></div>");

        topblock.append(button);
        topblock.append(clear);

        top.append(label);
        top.append(topblock);

        var blockquote = $("<blockquote class=\"layui-elem-quote layui-quote-nm\"></blockquote>");
        var holderList = $("<div class=\"layui-upload-list\"></div>");

        that.holderListHolder = holderList;

        for (i in that.hiddenParm){
            var obj = that.hiddenParm[i];
            for (n in obj){
                var input = $("<input type=\"hidden\" name=\""+n+"\" value=\""+obj[n]+"\">")
                blockquote.append(input);
            }
        }

        blockquote.append(holderList);

        that.root.prepend(top);
        that.root.append(blockquote);
    };

    /**
     * 让layui支持ajax工具方法
     */
    exports("sanmiUpload", methos);
});