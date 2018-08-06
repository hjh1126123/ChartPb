const EChartStyle = {
    normalBar: function (chartData, echarts) {
        let mList = [];
        if (chartData.yList) {
            for (let data of chartData.yList) {
                if(chartData.isArrary){
                    let tmpData = [];
                    tmpData.push(data[0]);
                    tmpData.push(data[1]);

                    mList.push(tmpData);
                }
                else{
                    mList.push(data / 2);
                }
            }
        }
        return {
            title: {
                show: false,
                text: chartData.title ? chartData.title : '',
                textStyle: {
                    color: ["rgba(225,225,225,1)"]
                }
            },
            legend: {
                show: chartData.legend ? chartData.legend : false,
                x: "right",
                y: "top",
                right: '5%',
                textStyle: {
                    color: ["rgba(225,225,225,1)"]
                }
            },
            grid: {
                x: chartData.x ? chartData.x : '10%',
                top: '10%',
                width: chartData.width ? chartData.width : '80%',
                height: '80%'
            },
            calculable: true,
            backgroundColor: "transparent",
            color: ["#42475d"],
            tooltip: {
                trigger: "axis",
                position: function (params) {
                    return ["6%", "10%"];
                },
                show: true,
                zindex: 30,
                axisPointer: {
                    type: "shadow"
                },
                formatter: function (params) {
                    return (chartData.title ? '【' + chartData.title + '】'
                        + '</br>' : '')
                        +  '时间：'
                        + params[0].axisValueLabel
                        + '</br>'
                        + params[0].seriesName
                        + ':'
                        + (chartData.isArrary ? params[0].data[1] : params[0].data)
                        + (chartData.unit ? chartData.unit : '件');
                },
                extraCssText:
                    "width:200px;height:auto;line-height:30px"
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true
                    },
                    textStyle: {
                        color: ["rgba(100,255,225,1)"]
                    },
                    axisLine: {
                        lineStyle: {
                            color: ["rgba(100,255,225,1)"]
                        }
                    },
                    data: chartData.xList
                }
            ],
            yAxis: [
                {
                    type: "value",
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        formatter: function (value, index) {
                            if (value >= 10000 && value < 10000000) {
                                value = value / 10000 + "万";
                            } else if (value >= 10000000) {
                                value = value / 10000000 + "千万";
                            }
                            return value;
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: ["rgba(200,225,225,1)"]
                        }
                    },
                    splitLine: {
                        show: false
                    }
                }
            ],
            series: [
                {
                    name: chartData.childTitle,
                    data: chartData.yList,
                    type: 'bar',
                    barWidth: "80%",
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: ["rgba(17, 168, 171, 1)"]
                                    },
                                    {
                                        offset: 1,
                                        color: ["rgba(17, 168, 171, 0.1)"]
                                    }
                                ]
                            ),
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 20
                        },
                        shadowBlur: 10
                    },

                },
                {
                    name: "走势",
                    type: "line",
                    symbolSize: 12,
                    symbol: "circle",
                    data: mList,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: ["rgba(30,255,171,1)"]
                                    }
                                ]
                            ),
                            shadowColor: "rgba(0,0,0,0.1)",
                            shadowBlur: 10
                        }
                    }
                }
            ]
        }
    },
    doubleBar: function (chartData, echarts) {
        let mList = [];
        if (chartData.yList2) {
            for (let data of chartData.yList2) {
                if(data <= 0)
                    continue;

                mList.push(data / 2);
            }
        }
        let blue = {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(17, 168,171, 1)'
            }, {
                offset: 1,
                color: 'rgba(17, 168,171, 0.1)'
            }]),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
        };
        let puplor = {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00b0ff'
            }, {
                offset: 0.8,
                color: '#768EE0'
            }], false)
        };
        let option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: "axis",
                position: function (params) {
                    return ["6%", "10%"];
                },
                show: true,
                zindex: 30,
                axisPointer: {
                    type: "shadow"
                },
                formatter: function (params) {
                    let text = "";
                    text += (chartData.title ? '【' + chartData.title + '】' + '</br>' : '');
                    text += '时间：' + params[0].axisValueLabel + '</br>';
                    text += params[0].seriesName + ':' + params[0].data + (chartData.unit ? chartData.unit : '件') + '</br>';
                    text += params[1].seriesName + ':' + params[1].data + (chartData.unit ? chartData.unit : '件') + '</br>';
                    return text;
                },
                extraCssText:
                    "width:200px;height:auto;line-height:30px"
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                x: chartData.x ? chartData : '0',
                containLabel: true
            },
            xAxis: [{
                type: "category",
                axisTick: {
                    alignWithLabel: true
                },
                textStyle: {
                    color: ["rgba(100,255,225,1)"]
                },
                axisLine: {
                    lineStyle: {
                        color: ["rgba(100,255,225,1)"]
                    }
                },
                axisLabel: {
                    color: 'rgba(100,255,225,1)',
                    fontSize: 14
                },
                data: chartData.xList,
            }],
            yAxis: [{
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    lineStyle: {
                        color: ["rgba(200,225,225,1)"]
                    }
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: 14,
                    formatter: function (value, index) {
                        if (value >= 10000 && value < 10000000) {
                            value = value / 10000 + "万";
                        } else if (value >= 10000000) {
                            value = value / 10000000 + "千万";
                        }
                        return value;
                    }
                },
                splitLine: {
                    show: false
                }
            }],
            series: [
                {
                    name: chartData.childTitle ? chartData.childTitle : '未知',
                    type: 'bar',
                    data: chartData.yList ? chartData.yList : [],
                    animationEasing: 'linear',
                    itemStyle: {
                        normal: blue
                    }
                },
                {
                    name: chartData.childTitle2 ? chartData.childTitle2 : '未知',
                    type: 'bar',
                    data: chartData.yList2  ? chartData.yList2 : [],
                    animationEasing: 'linear',
                    itemStyle: {
                        normal: puplor
                    }
                },
                {
                    name: "走势",
                    type: "line",
                    symbolSize: 12,
                    symbol: "circle",
                    animationEasing: 'linear',
                    data: mList,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: ["rgba(30,255,171,1)"]
                                    }
                                ]
                            ),
                            shadowColor: "rgba(0,0,0,0.1)",
                            shadowBlur: 10
                        }
                    }
                }
            ]
        };
        return option;
    },
    normalCircle: function (chartData) {
        let scale = 0;
        if(chartData.chart){
            if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                scale = (chartData.chart.getWidth() * 0.6) / (chartData.chart.getWidth());
            } else {
                scale = (chartData.chart.getWidth() * 0.8) / (chartData.chart.getWidth());
            }
        }else{
            scale = 0.5;
        }
        let rich = {
            value: {
                color: "#59c4e6",
                fontSize: 20 * scale,
                padding: [5 * scale, 4  * scale],
                align: 'center'
            },
            total: {
                color: "#edafda",
                fontSize: 30 * scale,
                align: 'center'
            },
            childTitle: {
                color: "#93b7e3",
                align: 'center',
                fontSize: 20 * scale,
                padding: [11 * scale, 0]
            },
            percentage: {
                color: '#cbb0e3',
                fontSize: 15 * scale,
                align: 'center'
            },
            hr: {
                borderColor: '#0dccea',
                width: '100%',
                borderWidth: 2 * scale,
                height: 0,
            }
        };
        return {
            backgroundColor: "transparent",
            title: {
                text: chartData.title,
                left: 'center',
                top: '53%',
                padding: [24 * scale, 0],
                textStyle: {
                    color: '#fff',
                    fontSize: 30 * scale,
                    align: 'center'
                }
            },
            legend: {
                selectedMode: false,
                formatter: function (name) {
                    let total = 0;
                    let averagePercent;
                    chartData.data.forEach(function (value, index, array) {
                        total += value.value;
                    });
                    return '{total|' + total.toFixed(2) + '}';
                },
                data: [chartData.data[0].name],
                left: 'center',
                top: 'center',
                icon: 'none',
                align: 'center',
                textStyle: {
                    color: "#fff",
                    fontSize: 16 * scale,
                    rich: rich
                },
            },
            series: [{
                name: chartData.childName,
                type: 'pie',
                radius: [(65 * (scale * 1.5)) + '%', (75 * (scale * 1.5)) + '%'],
                hoverAnimation: false,
                color: ['#59c4e6', '#edafda', '#93b7e3', '#034079', '#cbb0e3', '#0dccea'],
                label: {
                    normal: {
                        formatter: function (params, ticket, callback) {
                            let total = 0; //总数量
                            let percent = 0; //占比
                            chartData.data.forEach(function (value, index, array) {
                                total += value.value;
                            });
                            percent = ((params.value / total) * 100).toFixed(1);
                            return '{childTitle|' + params.name + '}\n{hr|}\n{value|' + params.value + '}\n{percentage|' + percent + '%}';
                        },
                        rich: rich
                    },
                },
                labelLine: {
                    normal: {
                        length: 20 * scale,
                        length2: 0,
                        lineStyle: {
                            color: '#0af7ff'
                        }
                    }
                },
                itemStyle: {
                    shadowColor: 'rgba(0, 0, 0, 0.6)',
                    shadowBlur: 20 * scale,
                    shadowOffsetX: 3 * scale
                },
                data: chartData.data
            }]
        }
    },
    simpleCircle: function (chartData) {
        let data = chartData.data;
        let option = {
            title: {
                text: chartData.Title,
                subtext: chartData.Total,
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#fff'
                }
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                left: 0,
                top: 10,
                itemHeight: 5,
                textStyle: {
                    color: '#fff'
                },
                show: true
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            series: [{
                type: 'pie',
                selectedMode: 'single',
                avoidLabelOverlap: false,
                radius: ['70%', '80%'],
                minAngle: '10',
                color: ['#ffa590', '#0af7ff', '#4cb4ff', '#05be75', '#fce4b3', '#53bdff'],
                center: ['60%', '50%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                        formatter: '{b}\n{d}%',
                        textStyle: {
                            color: '#00ed88',
                            fontWeight: 'bold',
                            fontSize: 14
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '15',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    shadowColor: 'rgba(0, 0, 0, 0.3)',
                    shadowBlur: 20,
                    shadowOffsetX: 3
                },
                data: data
            }
            ]
        };
        return option;
    },
    textureCircle: function (chartData) {
        let piePatternSrc = 'base64(image)';

        let piePatternImg = new Image();
        piePatternImg.src = piePatternSrc;

        let itemStyle = {
            normal: {
                opacity: 0.7,
                color: {
                    image: piePatternImg,
                    repeat: 'repeat'
                },
                borderWidth: 1,
                borderColor: '#000000'
            }
        };

        let option = {
            tooltip: {},
            series: [{
                name: 'pie',
                type: 'pie',
                selectedMode: 'single',
                selectedOffset: 5,
                clockwise: true,
                minAngle : 10,
                label: {
                    normal: {
                        formatter: '{b} {per|{d}%}',
                        textStyle: {
                            fontSize: 12,
                            color: '#ffffff'
                        },
                        rich: {
                            per: {
                                color: '#eed379'
                            }
                        }
                    }
                },
                labelLine: {
                    normal: {
                        lineStyle: {
                            color: 'rgba(255,255,255,0.7)'
                        }
                    }
                },
                data: chartData.data,
                itemStyle: itemStyle
            }]
        };

        return option;
    },
    normalRadar: function (chartData) {
        let option = {
            color : ['#e01f54','#ffaf51'],
            title: {
                text: chartData.title ? chartData.title : '',
                show: !!chartData.title
            },
            tooltip: {},
            legend: {
                data: chartData.legend,
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                }
            },
            radar: {
                indicator: chartData.indicator
            },
            series: [{
                name: chartData.name,
                type: 'radar',
                symbol: 'circle',
                symbolSize : 10,
                animationEasing: 'bounceIn',
                data : [
                    {
                        value : chartData.data1,
                        name : chartData.name1,
                        lineStyle: {
                            width : 3
                        }
                    },
                    {
                        value : chartData.data2,
                        name : chartData.name2,
                        lineStyle: {
                            width : 3
                        }
                    }
                ]
            }]
        };

        return option;
    }
};

export default EChartStyle;
