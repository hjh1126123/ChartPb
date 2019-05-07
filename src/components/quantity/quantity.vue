<template>
    <v-container grid-list-md text-xs-center text-sm-center>
        <v-layout row wrap>
            <v-flex xs12 sm9 lg9>
                <v-card :color="$store.state.color.CardColor"
                        class="elevation-0">
                    <v-card-text class="text-xs-center childTitle">
                        <h3>总件量同比详情</h3>
                    </v-card-text>
                    <v-card-text class="pa-0"
                                 v-on:mouseenter="topBarCarouselRun = false"
                                 v-on:mouseleave="topBarCarouselRun = true">
                        <chart
                                height="450"
                                v-bind:echartData="topBarData"
                                :delay="500"
                                carousel
                                :carouselRun="topBarCarouselRun">
                        </chart>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm3 lg3>
                <v-card :color="$store.state.color.CardColor"
                        class="elevation-0">
                    <v-card-text class="text-xs-center childTitle">
                        <h3>各仓件量占比图</h3>
                    </v-card-text>
                    <v-card-text>
                        <table class="table">
                            <tr>
                                <td v-for="(item,index) in circleDataName" :key="index">
                                    {{item}}
                                </td>
                            </tr>
                            <tr>
                                <td v-for="(item,index) in circleDataValue" :key="index">
                                    {{item}}
                                </td>
                            </tr>
                            <tr>
                                <td v-for="(item,index) in circleDataValueP" :key="index">
                                    {{item}}
                                </td>
                            </tr>
                        </table>
                    </v-card-text>
                    <v-card-text class="pa-0">
                        <v-card-text class="pa-0">
                            <chart
                                    height="348"
                                    v-bind:echartData="topCircleData"
                                    :delay="1000"
                                    carousel_circle
                                    :carouselRun="topCircleCarouselRun"
                                    chartName="2017年件量">
                            </chart>
                            <div class="FixedTable"></div>
                        </v-card-text>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 lg6>
                <v-card :color="$store.state.color.CardColor"
                        class="elevation-0">
                    <v-card-text>
                        <h4 class="childTitle">各仓总件量月同比详情</h4>
                        <v-tabs fixed-tabs v-model="activeOnline" v-if="tabListOnline.length > 0"
                                class="animated fadeIn"
                                :color="$store.state.color.tabColor">
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
                                       :carouselRun="onlineCarouselRun"
                                       :nowPage="activeOnline"
                                       :pageIndex="index"
                                       :swiper="swiperOnline"
                                       @jumpFunction="jumpByIndex">
                                </chart>
                            </swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 lg6>
                <v-card :color="$store.state.color.CardColor"
                        class="elevation-0">
                    <v-card-text>
                        <h4 class="childTitle">线下件量月详情</h4>
                        <v-tabs fixed-tabs v-model="activeOffline" v-if="tabListOffline.length > 0"
                                class="animated fadeIn"
                                :color="$store.state.color.tabColor">
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
                                        :carouselRun="offLineCarouselRun"
                                        :nowPage="activeOffline"
                                        :pageIndex="index"
                                        :swiper="swiperOffline"
                                        @jumpFunction="jumpByIndex"
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
    import {mapState} from 'vuex'

    import echarts from "echarts";

    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";


    import chart from '../../children/chart'

    export default {
        name: "quantity",
        components: {
            chart,
            swiper,
            swiperSlide
        },
        data() {
            return {
                xList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                tabListOnline: ['美国', '日本', '澳洲', '德国', '英国'],
                tabListOffline: ['美国', '日本', '韩国', '澳洲'],

                circleDataName: [],
                circleDataValue: [],
                circleDataValueP: [],

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

                topBarCarouselRun: true,
                topCircleCarouselRun: true,
                onlineCarouselRun: true,
                offLineCarouselRun: true,

                axiosComplete: {
                    QPOk: false,
                    MQOk: false,
                    OQOk: false
                }
            }
        },
        mounted() {
            this.swiperOnline = this.$refs.OnlineBarSwiper.swiper;
            this.swiperOffline = this.$refs.OfflineBarSwiper.swiper;
            this.$nextTick(function () {
                this.topBarBind(this);
                this.topCircleBind(this);
                this.onlineBarBind(this);
                this.offLineBarBind(this);
                this.$emit('closeLoad');
            });
        },
        beforeDestroy() {
            if (this.swiperOnline)
                this.swiperOnline.destroy();
            if (this.swiperOffline)
                this.swiperOffline.destroy();

            this.xList = null;
            this.tabListOnline = null;
            this.tabListOffline = null;
            this.circleDataName = null;
            this.circleDataValue = null;
            this.circleDataValueP = null;
            this.topBarData = null;
            this.topCircleData = null;
            this.onlineBarData = null;
            this.offlineBarData = null;
            this.swiperOnline = null;
            this.swiperOptionOnline = null;
            this.swiperOffline = null;
            this.swiperOptionOffline = null;
            this.topBarCarouselRun = null;
            this.topCircleCarouselRun = null;
            this.onlineCarouselRun = null;
            this.offLineCarouselRun = null;
            this.axiosComplete = null;
        },
        computed: {
            ...mapState({
                this_year: (state) => state.app.this_year,
                last_year: (state) => state.app.last_year
            })
        },
        methods: {
            topBarBind($) {
                $.$http
                    .get($.apiUrl + "/Quantity/QuantityProportion")
                    .then(res => {
                        let data = res.data;
                        let chartData = {
                            title: '总件数',
                            xList: $.xList,
                            yList: [],
                            yList2: [],
                            childTitle: `${$.last_year}年`,
                            childTitle2: `${$.this_year}年`,
                            unit: '件'
                        };
                        data.forEach((item, index) => {
                            let data1 = [];
                            let data2 = [];
                            data1.push(item.InMonth);
                            data1.push(item.Elyq);
                            data2.push(item.InMonth);
                            if (item.Elyb)
                                data2.push(item.Elyb);
                            else
                                data2.push(0);
                            chartData.yList.push(data1);
                            chartData.yList2.push(data2);
                        });
                        $.topBarData = $.global.$variable.echartStyles.doubleBar(chartData, echarts);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            topCircleBind($) {
                $.$http
                    .get($.apiUrl + "/Quantity/MonthlyQuantity")
                    .then(res => {
                        let data = res.data;
                        let chartData = {
                            data: []
                        };
                        let total = 0;
                        data.forEach((item) => {
                            total += Number(item.InCountThisYear);
                        });
                        data.forEach((item) => {
                            $.circleDataName.push(item.CenterName);
                            $.circleDataValue.push(item.InCountThisYear);
                            $.circleDataValueP.push($.global.$function.calculator.ToFixed(((item.InCountThisYear) / total) * 100, 2) + '%');

                            let tmpD = {
                                name: {},
                                value: {}
                            };
                            tmpD.name = item.CenterName;
                            tmpD.value = Number(item.InCountThisYear);

                            chartData.data.push(tmpD);
                        });
                        $.topCircleData = $.global.$variable.echartStyles.simpleCircle(chartData);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            onlineBarBind($) {
                $.tabListOnline.forEach(function (item, index) {
                    $.$http
                        .get($.apiUrl + '/Quantity/MonthlyWarehouseVolume?centerCode=' + item)
                        .then(res => {
                            let data = res.data;
                            let chartData = {
                                title: item + '总件量',
                                xList: $.xList,
                                yList: [],
                                yList2: [],
                                childTitle: `${$.last_year}年`,
                                childTitle2: `${$.this_year}年`,
                                unit: '件'
                            };
                            data.forEach((item, index) => {
                                let data1 = [];
                                let data2 = [];
                                data1.push(item.InMonth);
                                data1.push(item.Elyq);
                                data2.push(item.InMonth);
                                if (item.Elyb)
                                    data2.push(item.Elyb);
                                else
                                    data2.push(0);
                                chartData.yList.push(data1);
                                chartData.yList2.push(data2);
                            });

                            $.onlineBarData.splice(index, 0, $.global.$variable.echartStyles.doubleBar(chartData, echarts));
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });
            },
            offLineBarBind($) {
                $.$http
                    .get($.apiUrl + '/Quantity/OfflineAQuantity')
                    .then(res => {
                        let data = res.data;

                        let xList = $.xList;
                        let data1 = [];
                        let data2 = [];
                        let data3 = [];
                        let data4 = [];
                        let dataArray = [];
                        xList.forEach(function (itemX, index) {
                            let hasValue = false;
                            if (data) {
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

                                        let tmpData3 = [];
                                        tmpData3.push(itemD.InDate);
                                        tmpData3.push(itemD.Hgxx);
                                        data3.push(tmpData3);

                                        let tmpData4 = [];
                                        tmpData4.push(itemD.InDate);
                                        tmpData4.push(itemD.Auxx);
                                        data4.push(tmpData4);

                                        hasValue = true;
                                    }
                                });
                            }

                            if (!hasValue) {
                                let tmpData = [];
                                tmpData.push(itemX);
                                tmpData.push(0);

                                data1.push(tmpData);
                                data2.push(tmpData);
                                data3.push(tmpData);
                                data4.push(tmpData);

                                hasValue = true;
                            }
                        });
                        dataArray.push(data1);
                        dataArray.push(data2);
                        dataArray.push(data3);
                        dataArray.push(data4);

                        $.tabListOffline.forEach(function (item, index) {
                            let tmpChartData = {
                                title: item + '线下件量',
                                childTitle: '件量',
                                xList: xList,
                                yList: dataArray[index],
                                isArrary: true
                            };
                            $.offlineBarData.push($.global.$variable.echartStyles.normalBar(tmpChartData, echarts))
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
            jumpByIndex(swiper, index) {
                swiper.slideTo(index);
            }
        }
    }
</script>

<style scoped lang="stylus">

</style>