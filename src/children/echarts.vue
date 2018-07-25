<!--
   柱状图表，轮询组件：轮询每一个柱数据，当到最后一个后自动翻页
   title:图表title
   chartListXY:图表xy轴的数据
   currentIndex:图表中当前轮询的柱子所在的index; 从0开始
   name:当前数据系列所在的名字
   height:图表的高度
   width:图表的宽度
-->
<template>
  <div class="echarts-container" ref="big">
    <div :class="className" :id="id" :style="{height:height,width:width}" ref="myCharts">
    </div>
    <div class="" style="display:none">{{changes}}</div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import mtableVue from "./mtable.vue";

  export default {
    props: {
      className: {
        type: String,
        default: "myClass"
      },
      id: {
        type: String,
        default: "yourID"
      },
      width: {
        type: String,
        default: "100%"
      },
      height: {
        type: String,
        default: "500px"
      },
      type: {
        type: String,
        default: "bar"
      },
      name: {
        type: String,
        default: "异常数量"
      },
      title: {
        type: String,
        default: "付款未处理"
      },
      chartListXY: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        chart: null,
        childTitle: '',
        xList: [], //x轴数据
        yList: [], //y轴数据
        mTime: 0,
        timeAndChart: [],
        index: 0, //当前bar的index
        charts: [],
        xDataLength: [] //x轴的长度，用于判断当前x轴是否是最后一个值
      };
    },
    created() {
      this.getDataXY();
    },
    mounted() {
      let that = this;
      that.initChart();
    },
    activated() {
    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChart() {
        let that = this;
        that.chart = echarts.init(that.$refs.myCharts);
        that.$store.state.xDataLength.push(that.xList.length);
        // this.chart = echarts.init(this.$refs.myCharts);
        // 把配置和数据放这里
        let opt = {
          childTitle : that.name,
          xList: that.xList,
          yList: that.yList,
          Title: that.title,
          left: '0%'
        };
        this.chart.setOption(that.GLOBAL.echartStyles.normalBar(opt));
        let option = {
          grid:{
            left : '15%'
          },
          legend: {
            show: true
          }
        };
        this.chart.setOption(option);
        window.addEventListener("resize", function () {
          that.chart.resize();
        });
        that.index = 0; //播放所在下标
        if (this.$store.state.isFirst) {
          this.$store.state.isFirst = false;
          this.$nextTick(() => {
            let chart = that.chart;
            let index = 0;
            that.mTime = setInterval(function () {
              if (chart) {
                chart.dispatchAction({
                  type: "showTip",
                  seriesIndex: 0,
                  dataIndex: index
                });
              }
              index++;
              if (
                index >
                that.$store.state.xDataLength[that.currentIndex]
              ) {
                that.toNext();
                index = 0;
              }
            }, 1000);
          });
        }
        that.$store.state.charts.push(this.chart);
        this.chart.on("mouseover", function (a) {
          that.mTime && clearInterval(that.mTime);
          that.clear();
        });
        this.chart.on("touchstart", function (a) {
          that.mTime && clearInterval(that.mTime);
          that.clear();
        });
        this.chart.on("mouseout", function (a) {
          that.clear();
          that.mTime && clearInterval(that.mTime);
          that.$nextTick(() => {
            that.mTime = setInterval(function () {
              if (that.chart) {
                that.chart.dispatchAction({
                  type: "showTip",
                  seriesIndex: 0,
                  dataIndex: that.index
                });
              }
              that.index++;
              if (
                that.index >
                that.$store.state.xDataLength[that.currentIndex]
              ) {
                that.index = 0;
                that.toNext();
              }
            }, 1000);
          });
        });
      },
      getDataXY() {
        this.chartListXY.forEach(element => {
          this.xList.push(element.ModifyTime);
          this.yList.push(element.Total);
        });
      },
      toNext() {
        this.$emit("toNext");
      },
      clear() {
        this.$store.state.mTimeArr.forEach(ele => {
          clearInterval(ele);
        });
        this.$store.state.mTimeArr = [];
      }
    },
    computed: {
      changes() {
        let that = this;
        this.$nextTick(() => {
          that.chart.resize();
        });
        return this.$store.state.isChangeW;
      }
    },
    watch: {
      currentIndex() {
        let that = this;
        if (that.chart) {
          that.chart.dispatchAction({
            type: "showTip",
            seriesIndex: 0,
            dataIndex: 0
          });
        }
        that.mTime && clearInterval(that.mTime);
        that.clear();
        that.index = 0;
        that.$nextTick(() => {
          that.mTime = setInterval(function () {
            if (that.chart) {
              that.chart.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: that.index
              });
            }
            that.index++;
            if (
              that.index >
              that.$store.state.xDataLength[that.currentIndex]
            ) {
              that.index = 0;
              that.toNext();
            }
          }, 1000);
          that.$store.state.mTimeArr.push(that.mTime);
        });
      }
    }
  };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .echarts-container {
    .myClass {
    }
  }
</style>

