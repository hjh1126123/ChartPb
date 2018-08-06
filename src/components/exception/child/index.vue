<template>
    <div>
        <v-tabs fixed-tabs v-model="active" v-if="tabList.length > 0" class="animated fadeIn">
            <v-tab v-for="(item,index) in tabList" :key="index" v-on:click="jumpByIndex(index)">
                {{item | changeHouseName}}
            </v-tab>
        </v-tabs>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap align-center justify-center fill-height>
                <v-flex xs12 sm8 v-on:mouseenter="barGo = false" v-on:mouseleave="barGo = true">
                    <swiper :options="swiperOption" ref="mySwiper" v-if="chartList.length > 0">
                        <swiper-slide v-for="(item,index) in chartList" :key="index">
                            <div v-if="item.HDBChartValues.length > 0" style="height: 450px;" ref='bottomBar'></div>
                            <v-alert
                                    v-else-if="item.HDBChartValues.length <= 0"
                                    :value="true"
                                    color="info"
                                    icon="info"
                                    style="width: 50%;"
                            >
                                暂无数据
                            </v-alert>
                        </swiper-slide>
                        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
                    </swiper>
                </v-flex>
                <v-flex xs12 sm4>
                    <v-card class="elevation-12">
                        <v-card-title v-if="tabList.length > 0">
                            {{tabList[active] | changeHouseName}}
                        </v-card-title>
                        <v-data-table
                                v-if="showList.length > 0"
                                :headers="headers"
                                :items="showList"
                                hide-actions
                                class="elevation-1"
                                no-data-text="数据为空"
                        >
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.STName }}</td>
                                <td class="text-xs-left">{{ props.item.Total }}</td>
                                <td class="text-xs-left">{{ props.item.Percentage }}%</td>
                                <td class="text-xs-left">
                                    <v-icon left color="deep-orange accent-3" v-if="props.item.Rise === 'rise'">
                                        trending_up
                                    </v-icon>
                                    <v-icon left color="light-green" v-if="props.item.Rise === 'decline'">
                                        trending_down
                                    </v-icon>
                                    <v-icon left color="cyan accent-3" v-if="props.item.Rise === 'nochange'">
                                        trending_flat
                                    </v-icon>
                                </td>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    import echarts from "echarts";

    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    export default {
        data() {
            return {
                swiperOption: {
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            let $ = this;
                            if ($.swiper) {
                                $.active = $.swiper.activeIndex;
                                this.$store.state.requests.push(
                                    $.$http
                                        .post($.apiUrl + "/Ex/GetExPackageCount_TodayWithAWayhouse?CreateCenterCode=" + $.tabList[$.active])
                                        .then(res => {
                                            $.showList = res.data;
                                        })
                                        .catch(err => {
                                        }));
                            }
                        }
                    }
                },
                headers: [
                    {
                        text: '异常类型',
                        align: 'center',
                        sortable: false,
                        value: 'STName'
                    },
                    {text: '数量(件)', value: 'Total', sortable: false},
                    {text: '同比增长', value: 'Percentage', sortable: false},
                    {text: '指数', sortable: false}
                ],
                active: 0,
                chartList: [],
                showList: [],
                tabList: [],
                bottomBars: [],

                barIndex: 0,
                swiperIndex: 0,
                barGo: true,

                setTimeOutThisPage: [],
                interValThisPage: []
            };
        },
        mounted() {
            this.bindData(1);
        },
        methods: {
            bindData(exType) {
                let $ = this;
                this.$store.state.requests.push($.$http
                    .post($.apiUrl + "/Ex/GetExPackageCount_twentyDay?ExType=" + exType)
                    .then(res => {
                        $.tabList = [];
                        $.bottomBars = [];
                        $.chartList = res.data;
                        $.$nextTick(() => {
                            $.chartList.forEach((item, index) => {
                                $.tabList.push(item.CreateCenterCode);
                                $.setTimeOutThisPage.push(setTimeout(() => {
                                    $.bindBar($, item, index);
                                }, 500 * index));
                            });
                            this.$store.state.requests.push($.$http
                                .post($.apiUrl + "/Ex/GetExPackageCount_TodayWithAWayhouse?CreateCenterCode=" + $.tabList[$.active])
                                .then(res => {
                                    $.showList = res.data;
                                })
                                .catch(err => {
                                    console.log(err);
                                }));
                            if ($.barInterVal) {
                                clearInterval($.barInterVal);
                                $.barInterVal = 0;
                            }
                            $.setTimeOutThisPage.push(setTimeout(() => {
                                $.interValThisPage.push(setInterval(() => {
                                    if ($.barInterVal === 0)
                                        return;
                                    if ($.barGo) {
                                        if ($.barIndex > $.chartList[$.active].HDBChartValues.length - 1) {
                                            if ($.swiper.activeIndex >= $.tabList.length - 1) {
                                                $.jumpByIndex(0);
                                            } else {
                                                $.jumpByIndex($.swiper.activeIndex + 1);
                                            }
                                            $.barIndex = 0;
                                        }
                                        $.bottomBars[$.swiper.activeIndex].dispatchAction({
                                            type: 'showTip',
                                            seriesIndex: 0,
                                            dataIndex: $.barIndex
                                        });
                                        $.barIndex++;
                                    }
                                }, 2000));
                            }, 1000));
                        });
                    }));
            },
            bindBar($, item, index) {
                if (item.HDBChartValues.length > 0) {
                    let bottomBar = echarts.init($.$refs.bottomBar[index]);
                    $.chartShowLoading(bottomBar);
                    setTimeout(() => {
                        if (item.HDBChartValues.length > 0) {
                            $.setBarData(bottomBar, item);
                        }
                    }, 1000 * index);
                    $.bottomBars.push(bottomBar);
                }
            },
            setBarData(chart, resData) {
                let tmpCreateCenterCode = this.$options.filters.changeHouseName(resData.CreateCenterCode);
                let data = {
                    xList: [],
                    yList: [],
                    title: tmpCreateCenterCode,
                    childTitle: resData.STName,
                    unit: '件'
                };
                if (resData.HDBChartValues.length > 0) {
                    resData.HDBChartValues.forEach(item => {
                        data.xList.push(item.ModifyTime);
                        data.yList.push(item.Total);
                    });
                    chart.setOption(this.global.variable.echartStyles.normalBar(data, echarts), true);
                    window.addEventListener("resize", function () {
                        chart.resize();
                    });
                }
                chart.hideLoading();
            },
            chartShowLoading(chart) {
                chart.showLoading({
                    text: '图表载入中',
                    color: '#58cfff',
                    textColor: '#ffffff',
                    maskColor: 'rgba(128, 128, 128, 0)',
                    zlevel: 0
                });
            },
            jumpByIndex(index) {
                this.swiper.slideTo(index);
            }
        }
        ,
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        }
        ,
        beforeDestroy() {
            this.setTimeOutThisPage.forEach(function (item, index) {
                clearTimeout(item);
            });

            this.interValThisPage.forEach(function (item, index) {
                clearInterval(item);
                item = 0;
            });


            if (swiper) {
                if (swiper.initialized === true) {
                    swiper.destroy();
                }
            }
        }
        ,
        components: {
            swiper,
            swiperSlide,
            echarts
        }
        ,
        props: {}
    }
    ;
</script>

<style lang="stylus">
    .bar
        width 100%;
</style>
