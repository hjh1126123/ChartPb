const EChartStyle = {
  normalBar: function (chartData,echarts) {
    let mList = [];
    if (chartData.yList) {
      for (let data of chartData.yList) {
        mList.push(data / 2);
      }
    }
    return {
      title: {
        show: false,
        text: chartData.title,
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
          return '时间：' + params[0].axisValueLabel + '</br>' + params[0].seriesName + ':' + params[0].data + (chartData.unit ? chartData.unit : '件');
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
            color: ["rgba(225,225,225,1)"]
          },
          axisLabel: {
            interval: 1,
            textStyle: {
              fontSize: 15
            }
          },
          axisLine: {
            lineStyle: {
              color: ["rgba(225,225,225,1)"]
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
              color: ["rgba(225,225,225,1)"]
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
  normalCircle: function (chartData) {
    let scale = 0;
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
      scale = (chartData.chart.getWidth() * 0.6) / (chartData.chart.getWidth());
    } else {
      scale = (chartData.chart.getWidth() * 0.8) / (chartData.chart.getWidth());
    }
    let rich = {
      value: {
        color: "#59c4e6",
        fontSize: 20 * scale,
        padding: [5, 4],
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
        padding: [11, 0]
      },
      percentage: {
        color: '#cbb0e3',
        fontSize: 15 * scale,
        align: 'center'
      },
      hr: {
        borderColor: '#0dccea',
        width: '100%',
        borderWidth: 2,
        height: 0,
      }
    };
    return {
      backgroundColor: "transparent",
      title: {
        text: chartData.title,
        left: 'center',
        top: '53%',
        padding: [24, 0],
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
          shadowBlur: 20,
          shadowOffsetX: 3
        },
        data: chartData.data
      }]
    }
  },
  faultCircle: function (chartData,echarts) {
    let scaleData = chartData.data;
    let rich = {
      white: {
        color: '#ddd',
        align: 'center',
        padding: [5, 0]
      }
    };
    let placeHolderStyle = {
      normal: {
        label: {
          show: false
        },
        labelLine: {
          show: false
        },
        color: 'rgba(0, 0, 0, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        borderWidth: 0
      }
    };
    let data = [];
    for (let i = 0; i < scaleData.length; i++) {
      data.push({
        value: scaleData[i].value,
        name: scaleData[i].name,
        itemStyle: {
          normal: {
            borderWidth: 5,
            shadowBlur: 30,
            borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
              offset: 0,
              color: '#7777eb'
            }, {
              offset: 1,
              color: '#70ffac'
            }]),
            shadowColor: 'rgba(142, 152, 241, 0.6)'
          }
        }
      }, {
        value: 4,
        name: '',
        itemStyle: placeHolderStyle
      });
    }
    let seriesObj = [{
      name: '',
      type: 'pie',
      clockWise: false,
      radius: ['80%', '85%'],
      hoverAnimation: false,
      itemStyle: {
        normal: {
          label: {
            show: false,
            position: 'outside',
            color: '#ddd',
            formatter: function (params) {
              let percent = 0;
              let total = 0;
              for (let i = 0; i < scaleData.length; i++) {
                total += scaleData[i].value;
              }
              percent = ((params.value / total) * 100).toFixed(0);
              if (params.name !== '') {
                return params.name + '\n{white|' + '占比' + percent + '%}';
              } else {
                return '';
              }
            },
            rich: rich
          },
          labelLine: {
            show: false
          }
        }
      },
      data: data
    }];
    let option = {
      backgroundColor: 'transparent',
      tooltip: {
        show: false
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false
      },
      series: seriesObj
    };

    return option;
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
        top: 20,
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
  }
};

export default EChartStyle;
