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
                xData: null,
                carouselIndex: 0,
                interval: null
            }
        },
        mounted() {
            let $ = this;
            if ($.height)
                $.chartStyle += 'height: ' + $.height + 'px;';
        },
        beforeDestroy() {
            let $ = this;

            if ($.interval)
                clearTimeout($.interval);
        },
        methods: {
            chartInit(value) {
                let $ = this;
                let chart = $.$refs.chart;
                $.tmpChart = echarts.init(chart);
                $.chartShowLoading($.tmpChart);
                setTimeout(() => {
                    $.tmpChart.setOption(value);
                    $.tmpChart.hideLoading();
                    window.addEventListener("resize", function () {
                        $.tmpChart.resize();
                    });
                    if ($.tmpChart.getOption().xAxis) {
                        $.xData = $.tmpChart.getOption().xAxis[0].data;
                    }
                }, $.delay)
            },
            chartShowLoading(chart) {
                chart.showLoading({
                    text: '图表载入中',
                    color: '#ba38cc',
                    textColor: '#d6921e',
                    maskColor: 'rgba(128, 128, 128, 0)',
                    zlevel: 0
                });
            },
            hightLightNext() {
                let $ = this;
                if ($.interval)
                    clearTimeout($.interval);
                if ($.pageIndex === $.nowPage) {
                    $.interval = setTimeout(function () {
                        if ($.xData && $.carouselRun) {
                            $.tmpChart.dispatchAction({
                                type: 'showTip',
                                seriesIndex: 0,
                                dataIndex: $.carouselIndex
                            });
                            $.carouselIndex++;
                            if ($.carouselIndex > $.xData.length) {
                                $.carouselIndex = 0;
                                if($.swiper)
                                {
                                    if ($.nowPage >= $.swiper.slides.length - 1) {
                                        $.jumpPage(0);
                                    } else {
                                        $.jumpPage($.nowPage + 1);
                                    }
                                }
                            }
                        }
                        $.hightLightNext();
                    }, $.carouselInterval);
                } else {
                    if ($.interval)
                        clearTimeout($.interval);
                }
            },
            jumpPage(index) {
                let $ = this;
                this.$emit('jumpFunction', $.swiper, index)
            }
        },
        watch: {
            'echartData'(value) {
                let $ = this;
                $.chartInit(value);
                if ($.carousel) {
                    if ($.pageIndex === $.nowPage)
                        $.hightLightNext();
                }
                if($.toolTip){
                    if($.tmpChart){
                        console.log('展示toolTip');
                        $.tmpChart.dispatchAction({
                            type: 'showTip',
                            name:  $.chartName
                        });
                        console.log($.chartName);
                    }
                }
            },
            'nowPage'(value) {
                let $ = this;
                $.carouselIndex = 0;
                if (value === $.pageIndex) {
                    $.hightLightNext();
                }else{
                    if($.tmpChart)
                    {
                        $.tmpChart.dispatchAction({
                            type: 'hideTip'
                        });
                    }
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
                default: 0
            },
            carousel: {
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
            chartName : {
                type: String,
                default : ''
            },
            toolTip: {
                type: Boolean,
                default : false
            }
        },
        components: {
            echarts
        }
    }
</script>

<style scoped>

</style>