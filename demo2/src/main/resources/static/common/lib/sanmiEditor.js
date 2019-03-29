/**
 * 三米百度编辑器封装模块
 * 引用方式：layui.use(['sanmiEditor'],function(){  })
 * @author 于起宇
 * @date 2018-3-31
 */
layui.define(function (exports) {
    /**
     * 检查编辑器id是否存在值
     * @param editorDivId 编辑器id
     * @returns {boolean}true：存在，false：不存在
     */
    function checkId(editorDivId) {
        if (editorDivId == null || editorDivId == undefined) {
            return false;
        }
        return true;
    }

    var methods = {
        /**
         * 实例化编辑器
         * @param editorDivId 编辑器div的id属性
         */
        instance: function (editorDivId) {
            if (checkId(editorDivId)) {
                UE.getEditor(editorDivId);
            }
        },
        /**
         * 获取编辑器内容
         * @param editorDivId 编辑器div的id值
         */
        getContent: function (editorDivId) {
            return checkId(editorDivId) ? UE.getEditor(editorDivId).getContent() : "";
        },
        /**
         * 设置编辑器内容
         * @param editorDivId 编辑器div的id值
         * divId：编辑div的id属性值
         * content：编辑器需要设置的html内容
         * 使用如：setContent({divId:"",content:""});
         */
        setContent: function (params) {
            if (checkId(params.divId)) {
                UE.getEditor(params.divId).setContent(params.content);
            }
        },
        /**
         * 设置显示编辑器
         * @param editorDivId 编辑器div的id属性值
         */
        show: function (editorDivId) {
            if (checkId(params.divId)) {
                UE.getEditor(editorDivId).setShow();
            }
        },
        /**
         * 设置隐藏编辑器
         * @param editorDivId 编辑器div的id属性值
         */
        hide: function (editorDivId) {
            if (checkId(params.divId)) {
                UE.getEditor(editorDivId).setHide();
            }
        },
        /**
         * 启用编辑器
         * @param editorDivId 编辑器div的id属性值
         */
        enabled: function (editorDivId) {
            if (checkId(params.divId)) {
                UE.getEditor(editorDivId).setEnabled();
            }
        },
        /**
         * 禁用编辑器
         * @param editorDivId 编辑器div的id属性值
         */
        disabled: function (editorDivId) {
            if (checkId(params.divId)) {
                UE.getEditor(editorDivId).setDisabled();
            }
        },
        /**
         * 销毁编辑器
         * @param editorDivId 编辑器div的id属性值
         */
        destroy: function (editorDivId) {
            if (checkId(params.divId)) {
                UE.getEditor(editorDivId).destroy();
            }
        }
    };

    /**
     * 让layui支持编辑器方法
     */
    exports("sanmiEditor", methods);
});