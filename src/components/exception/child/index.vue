<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap align-center justify-center fill-height>
            <v-flex xs12 sm12 v-on:mouseenter="barRun = false" v-on:mouseleave="barRun = true">
                <chart ref="bar"
                       height="600"
                       v-bind:echartData="bar"
                       :carouselRun="barRun"
                       carousel>
                </chart>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import echarts from "echarts";
    import chart from '../../../children/chart';

    import filter from '../../../filter';

    export default {
        data() {
            return {
                thisApi: '/Ex/GetExPackageCount_twentyDay?',
                bar: null,
                barRun: true
            };
        },
        methods: {
            //外部接口
            clear(){
                let $ = this;
                $.$refs.bar.clearCount();
                $.$refs.bar.clearChart();
            },
            //绑定相关
            //绑定数据
            bindData($, data) {
                let chartData = {
                    title: '异常 : ' + data[0].STName,
                    childTitle: '地区 : ' + filter.conversion.changeHouseName(data[0].CreateCenterCode.replace(/\'/g, "")),
                    xList: [],
                    yList: [],
                    unit: '件'
                };
                for (let i = 0; i < 20; i++) {
                    chartData.xList.unshift($.global.$function.dateGet.getBeforeMonth(i));
                }
                $.bindBar($, data, chartData);
            },
            //绑定柱状图
            bindBar($, item, data) {
                data.xList.forEach((itemX) => {
                    let isPush = false;
                    item[0].ExChartValues.forEach((item, index) => {
                        if (item.ModifyTime === itemX) {
                            let tmpDate = [];
                            tmpDate.push(itemX);
                            tmpDate.push(item.Total);
                            data.yList.push(tmpDate);
                            isPush = true;
                        }
                    });
                    if (!isPush) {
                        let tmpDate = [];
                        tmpDate.push(itemX);
                        tmpDate.push(0);
                        data.yList.push(tmpDate);
                    }
                });
                $.bar = $.global.$variable.echartStyles.normalBar(data, echarts);
                $.complete = true;
            }
        },
        components: {
            chart,
            echarts
        },
        watch: {
            chartData(value) {
                let $ = this;
                $.bindData($, value)
            }
        },
        props: {
            chartData: {
                type: Array,
                default: ''
            }
        }
    }
</script>

<style lang="stylus">
    .bar {
        width 100%;
    }

    .alert {
        width 50%
        height 50px
        position absolute;
        margin auto
        left 0
        top 0
        right 0
        bottom 0
    }


</style>
