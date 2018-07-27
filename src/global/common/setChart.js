const calculator = {
    setBar: (chart, res, args, commonOpts, privateOpts, style) => {
        let data = {};
        data.xList = [];
        data.yList = [];
        if (res.data.length > 0) {
            res.data.forEach(function (item) {
                data.xList.push(item[args[0]]);
                data.yList.push(item[args[1]]);
            });
            chart.hideLoading();
            if (commonOpts) {
                let tmpD = data;
                data = Object.assign(tmpD, commonOpts);
                if (privateOpts) {
                    data = Object.assign(data, privateOpts);
                }
            }
            if (data.echarts) {
                chart.setOption(style(data, echarts), false);
            }
            else {
                chart.setOption(style(data), false);
            }

            window.addEventListener("resize", function () {
                chart.resize();
            });
        }
    },
    chartShowLoading: (chart) => {
        chart.showLoading({
            text: '图表载入中',
            color: '#ba38cc',
            textColor: '#d6921e',
            maskColor: 'rgba(128, 128, 128, 0)',
            zlevel: 0
        });
    }
};

export default calculator;