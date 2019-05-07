<template>
    <div ref="chart" :style="chartStyle"></div>
</template>

<script>
    import echarts from "echarts";

    export default {
        data() {
            return {
                chartStyle: '',
                tmpChart: null,
                tmpDelay: 0,
                dataLength: null,
                initDelay: null,
                interval: null,
                carouselIndex: 0,
                loading: false
            }
        },
        mounted() {
            if (this.height)
                this.chartStyle += 'height: ' + this.height + 'px;';
            this.$nextTick(function () {
                this.tmpChart = echarts.init(this.$refs.chart);
            });
        },
        beforeDestroy() {
            if (this.interval)
                window.clearTimeout(this.interval);

            if (this.initDelay)
                window.clearTimeout(this.initDelay);

            if (this.tmpChart)
                this.tmpChart.dispose();

            this.chartStyle = null;
            this.tmpChart = null;
            this.dataLength = null;
            this.initDelay = null;
            this.interval = null;
            this.carouselIndex = 0;
            this.loading = false;

            this.interval = null;
            this.initDelay = null;
        },
        methods: {
            //主方法层
            //初始化图表
            chartInit($, value) {
                $.initDelay = setTimeout(() => {
                    if ($ && !$._isDestroyed) {
                        if ($.tmpChart)
                            $.tmpChart.setOption(value, true);

                        if($.carousel){
                            $.dataLength = $.tmpChart.getOption().xAxis[0].data.length;
                        }else if($.carousel_circle){
                            $.dataLength = $.tmpChart.getOption().series[0].data.length;
                        }else if($.carousel_crosswise){
                            $.dataLength = $.tmpChart.getOption().yAxis[0].data.length;
                        }
                    }
                }, $.delay)
            },
            //动画播放
            foreachGo($) {
                setTimeout(()=>{
                    if ($.carousel) {
                        if ($.pageIndex === $.nowPage)
                            $.updateHandle($, $.hightLightNext);
                    }
                    else if ($.carousel_circle) {
                        if ($.pageIndex === $.nowPage) {
                            $.updateHandle($, $.hightLightNext_circle);
                        }
                    }
                    else if ($.carousel_crosswise){
                        if ($.pageIndex === $.nowPage) {
                            $.updateHandle($, $.hightLightNext_crosswise);
                        }
                    }
                },$.delay);
            },
            openLoad($) {
                if (!$.loading && $.tmpChart) {
                    $.chartShowLoading($.tmpChart);
                    $.loading = true;
                }
            },
            closeLoad($) {
                if ($.loading && $.tmpChart) {
                    $.tmpChart.hideLoading();
                    $.loading = false;
                }
            },
            //页跳转
            jumpPage(index) {
                this.$emit('jumpFunction', this.swiper, index)
            },
            //不变层
            //定制图表载入画面
            chartShowLoading(chart) {
                chart.showLoading({
                    text: '图表载入中',
                    color: '#218ccc',
                    textColor: '#fbfff8',
                    maskColor: 'rgba(128, 128, 128, 0)',
                    zlevel: 0
                });
            },
            //循环事件
            updateHandle($, callBack) {
                if ($.interval) {
                    window.clearTimeout($.interval);
                }
                if ($.pageIndex === $.nowPage) {
                    $.interval = setTimeout(function () {
                        if (($.dataLength) && $.carouselRun) {
                            if (callBack) {
                                callBack($);
                            }
                            $.carouselIndex++;
                            if ($.carouselIndex > $.dataLength) {
                                $.carouselIndex = 0;
                                if ($.swiper) {
                                    if ($.nowPage >= $.swiper.slides.length - 1) {
                                        $.jumpPage(0);
                                    } else {
                                        $.jumpPage($.nowPage + 1);
                                    }
                                }
                            }
                        }
                        $.updateHandle($, callBack);
                    }, $.carouselInterval);
                } else {
                    if ($.interval)
                        clearTimeout($.interval);
                }
            },
            //清零循环步数
            clearCount() {
                this.carouselIndex = 0;
            },
            //扩展层
            hightLightNext($) {
                if ($.tmpChart) {
                    $.tmpChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: $.carouselIndex
                    });
                }
            },
            hightLightNext_circle($) {
                if ($.tmpChart) {
                    $.tmpChart.dispatchAction({
                        type: 'downplay',
                        seriesIndex: 0,
                        dataIndex: $.carouselIndex - 1 < 0 ? $.dataLength - 1 : $.carouselIndex - 1
                    });
                    $.tmpChart.dispatchAction({
                        type: 'pieUnSelect',
                        seriesIndex: 0,
                        dataIndex: $.carouselIndex - 1 < 0 ? $.dataLength - 1 : $.carouselIndex - 1
                    });
                    $.tmpChart.dispatchAction({
                        type: 'pieToggleSelect',
                        seriesIndex: 0,
                        dataIndex: $.carouselIndex
                    });
                    $.tmpChart.dispatchAction({
                        type: 'highlight',
                        seriesIndex: 0,
                        dataIndex: $.carouselIndex
                    });
                }
            },
            hightLightNext_crosswise($) {
                if ($.tmpChart) {
                    $.tmpChart.dispatchAction({
                        type: 'showTip',
                        seriesIndex: 0,
                        dataIndex: ($.dataLength -1 ) - $.carouselIndex
                    });
                }
            },
            //子组件接口
            //清理图表
            clearChart() {
                if (this.tmpChart) {
                    this.tmpChart.clear();
                }
            }
        },
        watch: {
            'echartData'(value) {
                this.$nextTick(() => {
                        this.carouselIndex = 0;
                        this.clearChart();
                        this.chartInit(this, value);
                        this.foreachGo(this);
                    }
                );
            },
            'nowPage'(value) {
                this.$nextTick(() => {
                    this.carouselIndex = 0;
                    if (value === this.pageIndex) {
                        this.foreachGo(this);
                    } else {
                        if (this.tmpChart) {
                            this.tmpChart.dispatchAction({
                                type: 'hideTip'
                            });
                        }
                    }
                });
            },
            'carouselRun'(value) {
                if (!value) {
                    this.$nextTick(() => {
                        if (this.tmpChart) {
                            this.tmpChart.dispatchAction({
                                type: 'downplay'
                            });
                            this.tmpChart.dispatchAction({
                                type: 'pieUnSelect'
                            });
                        }
                    });
                }
            }
        },
        props: {
            height: {
                type: String,
                default: '400'
            },
            echartData: {
                type: Object,
                default: null
            },
            delay: {
                type: Number,
                default: 1000
            },
            carousel: {
                type: Boolean,
                default: false
            },
            carousel_crosswise: {
                type: Boolean,
                default: false
            },
            carousel_circle: {
                type: Boolean,
                default: false
            },
            carouselRun: {
                type: Boolean,
                default: true
            },
            carouselInterval: {
                type: Number,
                default: 2000
            },
            swiper: {
                type: Object,
                default: null
            },
            pageIndex: {
                type: Number,
                default: 0
            },
            nowPage: {
                type: Number,
                default: 0
            },
            chartName: {
                type: String,
                default: ''
            }
        },
        components: {
            echarts
        }
    }
</script>

<style scoped>

</style>