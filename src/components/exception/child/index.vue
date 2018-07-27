<template>
    <div>
        <v-tabs fixed-tabs v-model="active" v-if="tabList.length > 0">
            <v-tab v-for="(item,index) in tabList" :key="index" v-on:click="jumpByIndex(index)">
                {{item | changeHouseName}}
            </v-tab>
        </v-tabs>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap align-center justify-center fill-height class="bar">
                <v-flex xs12 sm8>
                    <swiper :options="swiperOption" ref="mySwiper" v-if="chartList.length > 0">
                        <swiper-slide v-for="(item,index) in chartList" :key="index">
                            <div v-if="item.HDBChartValues > 0" ref='bottomBar'></div>
                            <v-alert
                                    v-if="item.HDBChartValues <= 0"
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
                                    <v-icon left color="light-green accent-3" v-if="props.item.Rise === 'rise'">
                                        trending_up
                                    </v-icon>
                                    <v-icon left color="deep-orange darken-2" v-if="props.item.Rise === 'decline'">
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

    import axios from "axios";
    import {url, urlapi} from "../../../api/config.js";

    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    export default {
        data() {
            return {
                swiperOption: {
                    effect: 'flip',
                    allowTouchMove: false,
                    loop: true,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            let $ = this;
                            $.active = $.swiper.activeIndex;
                            axios
                                .post(urlapi + "/Ex/GetExPackageCount_TodayWithAWayhouse?CreateCenterCode=" + $.tabList[$.active])
                                .then(res => {
                                    $.showList = res.data;
                                })
                                .catch(err => {
                                });
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
                tabList: []
            };
        },
        mounted() {
            let $ = this;
            $.$nextTick(() => {
                this.getDataList($);
            });
        },
        methods: {
            getDataList($) {
                axios
                    .post(urlapi + "/Ex/GetExPackageCount_twentyDay?ExType=" + $.exType)
                    .then(res => {
                        $.chartList = res.data;
                        $.chartList.forEach(function (item, index) {
                            $.tabList.push(item.CreateCenterCode);
                            setTimeout(() => {
                                if (item.HDBChartValues.length > 0) {
                                    let bottomBar = echarts.init($.$refs.bottomBar[index]);
                                    $.chartShowLoading(bottomBar);
                                    $.setBar(bottomBar, res.data[index]);
                                }
                            }, 2000 * index);
                        });
                        axios
                            .post(urlapi + "/Ex/GetExPackageCount_TodayWithAWayhouse?CreateCenterCode=" + $.tabList[$.active])
                            .then(res => {
                                $.showList = res.data;
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    });
            },
            setBar(chart, resData) {
                let data = {
                    xList: [],
                    yList: []
                };
                if (resData.HDBChartValues.length > 0) {
                    resData.HDBChartValues.forEach(item => {
                        data.xList.push(item.ModifyTime);
                        data.yList.push(item.Total);
                    });
                    chart.setOption(this.global.variable.echartStyles.normalBar(data, echarts), false);
                    window.addEventListener("resize", function () {
                        chart.resize();
                    });
                } else {

                }
                chart.hideLoading();
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
            jumpByIndex(index) {
                this.swiper.slideTo(index);
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.swiper;
            }
        },
        beforeDestroy() {
            if (swiper) {
                if (swiper.destroy && swiper.initialized === true) {
                    swiper.destroy();
                }
            }
        },
        components: {
            swiper,
            swiperSlide,
            echarts
        },
        props: {
            exType: {
                type: Number,
                default: 1
            }
        }
    };
</script>

<style lang="stylus">
    .bar
        min-height 400px;
        width 100%;
</style>
