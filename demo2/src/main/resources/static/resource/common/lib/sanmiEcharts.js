/**
 *
 */
layui.define(function (exports) {
    var methos = {
        /**
         *  * 简单图标初始化
         *
         * @param title 主标题文本，支持使用 \n 换行
         * @param legendName  图例名称
         * @param type 图表类型,如 bar:柱状图
         */
        echartsInit: function (title, legendName, type) {
            MY_CHART = echarts.init(document.getElementById('main'));
            // 显示标题，图例和空的坐标轴
            MY_CHART.setOption({
                title: {
                    text: title
                },
                // 是否显示提示框组件,默认:item
                tooltip: {},
                legend: {
                    data: [legendName]
                },
                xAxis: {
                    data: []
                },
                yAxis: {},
                series: [{
                    name: legendName,
                    type: type,
                    data: []
                }]
            });
        },

        /**
         * 对简单图表数据加载
         * @param result 异步查询的数据集合
         * @param xKey 需要显示的x轴的字段名称
         * @param yKey 需要显示的y轴的字段名称
         */
        echartsData: function (result, xKey, yKey) {
            var data = {};
            data.categories = [], data.data = [];
            // 数据转换
            for (var i = 0; i < result.length; i++) {
                if(result[i] != null){
                    data.categories.push(result[i][xKey]);
                }
                if(result[i] !=null){
                    data.data.push(result[i][yKey])
                }
            }
            // 填入数据
            MY_CHART.setOption({
                xAxis: {
                    // ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
                    data: data.categories
                },
                series: [{
                    // 根据名字对应到相应的系列
                    name: '金额',
                    // [5, 20, 36, 10, 10, 20]
                    data: data.data
                }]
            });
        }
    }

    /**
     * 让layui支持该方法
     */
    exports("sanmiEcharts", methos);

})




