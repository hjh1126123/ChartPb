<template>
    <v-container grid-list-md text-xs-center text-sm-center class="pt-0">
        <v-layout row wrap>
            <v-flex xs12 sm9>
                <v-card>
                    <v-card-text>
                        <h4>年总件量月同比详情</h4>
                    </v-card-text>
                    <v-card-text class="pa-0">
                        <chart
                                height="450"
                                v-bind:echartData="topBarData"
                                :delay="500"
                                carousel
                        ></chart>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm3>
                <v-card>
                    <v-card-text class="pa-0">
                        <v-card-text>
                            <h4>年总件量占比详情</h4>
                        </v-card-text>
                        <v-card class="pa-0">
                            <chart
                                    height="450"
                                    v-bind:echartData="topCircleData"
                                    :delay="1000"
                                    toolTip
                                    chartName = "2017年件量"
                            ></chart>
                        </v-card>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-text>
                        <h4>各仓总件量月同比详情</h4>
                        <v-tabs fixed-tabs v-model="activeOnline" v-if="tabListOnline.length > 0"
                                class="animated fadeIn">
                            <v-tab v-for="(item,index) in tabListOnline" :key="index"
                                   v-on:click="jumpByIndex(swiperOnline,index)">
                                {{item}}
                            </v-tab>
                        </v-tabs>
                    </v-card-text>
                    <v-card-text v-on:mouseenter="onlineCarouselRun = false"
                                 v-on:mouseleave="onlineCarouselRun = true">
                        <swiper :options="swiperOptionOnline" ref="OnlineBarSwiper" v-if="tabListOnline.length > 0">
                            <swiper-slide v-for="(item,index) in tabListOnline" :key="index">
                                <chart height="250"
                                       v-if="onlineBarData.length >= index - 1"
                                       v-bind:echartData="onlineBarData[index]"
                                       :delay="(2000 * (index + 1))"
                                       carousel
                                       :carouselRun = "onlineCarouselRun"
                                       :nowPage = "activeOnline"
                                       :pageIndex = "index"
                                       :swiper = "swiperOnline"
                                       @jumpFunction = "jumpByIndex"
                                >
                                </chart>
                            </swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-text>
                        <h4>线下件量月详情</h4>
                        <v-tabs fixed-tabs v-model="activeOffline" v-if="tabListOffline.length > 0"
                                class="animated fadeIn">
                            <v-tab v-for="(item,index) in tabListOffline" :key="index"
                                   v-on:click="jumpByIndex(swiperOffline,index)">
                                {{item}}
                            </v-tab>
                        </v-tabs>
                    </v-card-text>
                    <v-card-text v-on:mouseenter="offLineCarouselRun = false"
                                 v-on:mouseleave="offLineCarouselRun = true">
                        <swiper :options="swiperOptionOffline" ref="OfflineBarSwiper" v-if="tabListOffline.length > 0">
                            <swiper-slide v-for="(item,index) in tabListOffline" :key="index">
                                <chart
                                        height="250"
                                        v-bind:echartData="offlineBarData[index]"
                                       :delay="(2500 * (index + 1))"
                                        carousel
                                        :carouselRun = "offLineCarouselRun"
                                        :nowPage = "activeOffline"
                                        :pageIndex = "index"
                                        :swiper = "swiperOffline"
                                        @jumpFunction = "jumpByIndex"
                                ></chart>
                            </swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import echarts from "echarts";

    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    import {url, urlapi} from "../../api/config.js";

    import chart from '../../children/chart'

    export default {
        name: "quantity",
        data() {
            return {
                xList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                tabListOnline: ['美国', '日本', '澳洲', '德国', '英国'],
                tabListOffline: ['美国', '日本'],

                activeOnline: 0,
                activeOffline: 0,

                topBarData: null,
                topCircleData: null,

                onlineBarData: [],
                offlineBarData: [],

                swiperOnline: null,
                swiperOptionOnline: {
                    notNextTick: true,
                    autoplay: false,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            let $ = this;
                            $.activeOnline = $.swiperOnline.activeIndex;
                        }
                    },
                    observer: true,
                    observeParents: false,
                    slidesPerGroup: 1
                },

                swiperOffline: null,
                swiperOptionOffline: {
                    notNextTick: true,
                    autoplay: false,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            let $ = this;
                            $.activeOffline = $.swiperOffline.activeIndex;
                        }
                    },
                    observer: true,
                    observeParents: false,
                    slidesPerGroup: 1
                },

                header: [
                    {
                        text: '国家',
                        align: 'center',
                        sortable: false,
                        value: 'name'
                    },
                    {
                        text: '数量(件)',
                        value: 'value',
                        align: 'center'
                    }
                ],
                items: [],

                onlineCarouselRun : true,
                offLineCarouselRun : true
            }
        },
        mounted() {
            let $ = this;
            $.swiperOnline = $.$refs.OnlineBarSwiper.swiper;
            $.swiperOffline = $.$refs.OfflineBarSwiper.swiper;
            $.$nextTick(function () {
                $.topBarBind($);
                $.topRadarBind($);
                $.onlineBarBind($);
                $.offLineBarBind($);
            });
        },
        components: {
            chart,
            swiper,
            swiperSlide
        },
        methods: {
            topBarBind($) {
                $.$store.state.requests.push(
                    $.$http
                        .post($.apiUrl + "/Quantity/QuantityProportion")
                        .then(res => {
                            let data = res.data;
                            let chartData = {
                                xList: [],
                                yList: [],
                                yList2: []
                            };
                            data.forEach((item, index) => {
                                chartData.xList.push(item.InMonth);
                                chartData.childTitle = '2017年总件量';
                                chartData.childTitle2 = '2018年总件量';
                                chartData.yList.push(item.Elyq);
                                chartData.yList2.push(item.Elyb);
                            });
                            $.topBarData = $.global.variable.echartStyles.doubleBar(chartData, echarts);
                        })
                        .catch(err => {
                            console.log(err);
                        }));
            },
            topRadarBind($) {
                $.$store.state.requests.push(
                    $.$http
                        .post($.apiUrl + "/Quantity/MonthlyQuantity")
                        .then(res => {
                            let data = res.data;
                            let indicator = [];
                            let seriesData1 = [];
                            let seriesName1 = '2017年件量';
                            let seriesData2 = [];
                            let seriesName2 = '2018年件量';

                            let Max = 0;
                            data.forEach((item, index) => {
                                if (Max < Number(item.InCountLastYear) || Max < Number(item.InCountThisYear)) {
                                    Max = Number(item.InCountLastYear) > Number(item.InCountThisYear) ? Number(item.InCountLastYear) : Number(item.InCountThisYear);
                                }
                            });
                            data.forEach((item, index) => {
                                let tmpIndicator = {
                                    name: item.CenterName,
                                    max: Max
                                };
                                indicator.push(tmpIndicator);

                                seriesData1.push(Number(item.InCountLastYear));
                                seriesData2.push(Number(item.InCountThisYear));
                            });
                            let circleData = {
                                legend: [seriesName1, seriesName2],
                                indicator: indicator,
                                data1: seriesData1,
                                data2: seriesData2,
                                name1: seriesName1,
                                name2: seriesName2
                            };
                            $.topCircleData = $.global.variable.echartStyles.normalRadar(circleData);
                        }));
            },
            onlineBarBind($) {
                $.tabListOnline.forEach(function (item, index) {
                    $.$store.state.requests.push(
                        $.$http
                            .post($.apiUrl + '/Quantity/MonthlyWarehouseVolume?centerCode=' + item)
                            .then(res => {
                                let data = res.data;
                                let chartData = {
                                    title: item,
                                    xList: [],
                                    yList: [],
                                    yList2: []
                                };
                                data.forEach((item, index) => {
                                    chartData.xList.push(item.InMonth);
                                    chartData.childTitle = '2017年总件量';
                                    chartData.childTitle2 = '2018年总件量';
                                    chartData.yList.push(item.Elyq);
                                    chartData.yList2.push(item.Elyb);
                                });
                                $.onlineBarData.splice(index, 0, $.global.variable.echartStyles.doubleBar(chartData, echarts));
                            })
                            .catch(err => {
                                console.log(err);
                            }));
                });
            },
            offLineBarBind($) {
                $.$store.state.requests.push(
                    $.$http
                        .post($.apiUrl + '/Quantity/OfflineAQuantity')
                        .then(res => {
                            let data = res.data;
                            let xList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
                            let data1 = [];
                            let data2 = [];
                            let dataArray = [];
                            xList.forEach(function (itemX, index) {
                                let hasValue = false;
                                data.forEach(function (itemD, index) {
                                    if (itemD.InDate === itemX) {
                                        let tmpData1 = [];
                                        tmpData1.push(itemD.InDate);
                                        tmpData1.push(itemD.Usxx);
                                        data1.push(tmpData1);

                                        let tmpData2 = [];
                                        tmpData2.push(itemD.InDate);
                                        tmpData2.push(itemD.Jpxx);
                                        data2.push(tmpData2);

                                        hasValue = true;
                                    }
                                });
                                if (!hasValue) {
                                    let tmpData1 = [];
                                    tmpData1.push(itemX);
                                    tmpData1.push(0);
                                    data1.push(tmpData1);

                                    let tmpData2 = [];
                                    tmpData2.push(itemX);
                                    tmpData2.push(0);
                                    data2.push(tmpData2);

                                    hasValue = true;
                                }
                            });
                            dataArray.push(data1);
                            dataArray.push(data2);

                            $.tabListOffline.forEach(function (item, index) {
                                let tmpChartData = {
                                    title: item,
                                    childTitle: '件量',
                                    xList: xList,
                                    yList: dataArray[index],
                                    isArrary: true
                                };

                                $.offlineBarData.push($.global.variable.echartStyles.normalBar(tmpChartData, echarts))
                            });
                        }));
            },
            jumpByIndex(swiper, index) {
                swiper.slideTo(index);
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>