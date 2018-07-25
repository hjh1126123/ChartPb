<!--
    异常页面中，底部数据的封装
    swiper插件：vue-awesome-swiper
    自己封装自组件：echarts,mtable,
    swiper参数：
-->
<template>
    <div>
        <v-tabs fixed-tabs v-model="active">
            <v-tab v-for="(item,index) in tabList" :key="index">
                {{item | changeHouseName}}
            </v-tab>
        </v-tabs>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item,index) in chartList" :key="index">
                D
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>




    <!--<div class="common" id="#anchor">-->
    <!--<div class="row bottom">-->
    <!--<div class="col-md-12">-->
    <!--<div class="box">-->
    <!--<div class="box-header with-border">-->
    <!--<div class="row">-->
    <!--<div class="col-md-1 col-sm-4 col-xs-6 tablist" :class="{'active-index':index==swiper.activeIndex}"-->
    <!--v-for="(item,index) in tabList" :key="index" @click="jumpByIndex(index)">{{item}}{{item |-->
    <!--changeHouseName}}-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="box-body">-->
    <!--<div class="row">-->
    <!--<div class="col-md-12">-->
    <!--<swiper :options="swiperOption" ref="mySwiper">-->
    <!--<swiper-slide v-for="(item,index) in chartList" :key="index" class="stop-swiping">-->
    <!--<echarts v-show="item.HDBChartValues.length>0" class="col-md-8 col-sm-12 col-xs-12"-->
    <!--:currentIndex="swiper.activeIndex" :title="item.CreateCenterCode | changeHouseName"-->
    <!--:name="item.STName" :chartListXY="item.HDBChartValues" @toNext="goNext" :myCharts="index"-->
    <!--:id="'charts'+index"></echarts>-->
    <!--<div class="no-data col-md-8 col-sm-12 col-xs-12" v-show="item.HDBChartValues.length==0">-->
    <!--<i class="fa fa-line-chart"></i>-->
    <!--暂无数据-->
    <!--</div>-->
    <!--<mtable v-if="chartList.length" class="col-md-3 col-md-offset-1 col-sm-12 col-xs-12 "-->
    <!--:centerCode="item.CreateCenterCode" :dataList="chartList"></mtable>-->
    <!--</swiper-slide>-->
    <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
    <!--<div class="swiper-button-next" slot="button-next"></div>-->
    <!--</swiper>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
</template>
<script>
    import echarts from "../../../children/echarts";
    import axios from "axios";
    import {url, urlapi} from "../../../api/config.js";
    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";
    // import mtable from "../../../children/mtable";

    export default {
        data() {
            return {
                swiperOption: {
                    noSwipingClass: "stop-swiping",
                    noSwiping: true,
                    observer: true,
                    observeParents: true,
                    prevButton: ".swiper-button-prev",
                    nextButton: ".swiper-button-next"
                },
                active : 0,
                time: {}, //定时器
                chart: null, //echarts实例
                payUntreatedList: [], //未支付数据列表
                chartList: [], //数据的数组对象
                showList: [],
                // payXList: [], //x轴时间
                // payYList: [], //y轴数据
                // payMiddleNumList: [], //中位数
                tabList: [], //tab名字列表,
                activeIndex: 0
            };
        },
        props: {
            type: {
                type: String,
                default: 2
            }
        },
        mounted() {
            this.getDataList();
        },
        created() {
            // if (this.$store.state.xDataLength.length != 0) {
            //   this.$store.state.xDataLength.length = [];
            // }
            // if (!this.$store.state.isFirst) {
            //   this.$store.state.isFirst = true;
            // }
        },
        methods: {
            getDataList() {
                axios
                    .post(urlapi + "/Ex/GetExPackageCount_twentyDay?ExType=" + this.type)
                    .then(res => {
                        if (res.status == 200) {
                            this.chartList = res.data;
                            console.log(this.chartList);
                            this.chartList.forEach(element => {
                                this.tabList.push(element.CreateCenterCode);
                                this.activeIndex = this.tabList[this.s];
                            });
                        }
                    });
            },
            goNext() {
                // if (this.swiper.activeIndex == this.chartList.length - 1) {
                //   this.swiper.slideTo(0);
                //   return;
                // }
                //
                // this.swiper.slideNext();
            },
            // stopAutoplay() {
            //     this.swiper.stopAutoplay();
            // },
            // startAutoplay() {
            //     this.swiper.startAutoplay();
            // },
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
            swiperSlide
        }
    };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
    .bottom {
        background-color: #42475d;

        .box {
            background-color: #42475d;

            .box-header {
                .swiper-pagination {
                    display: block !important;
                    width: 100%;
                    position: relative;

                    span.big {
                        display: block !important;
                        line-height: 40px;
                        color: white;
                        width: 30px;
                        height: 40px;
                    }
                }

                .tablist {
                    cursor: pointer;
                    color: #8f9ea8;
                    line-height: 30px;
                    text-align: center;
                }

                .active-index {
                    color: white;
                }
            }
        }

        .swiper-slide {
            width: 100% !important;
        }

        .no-data {
            font-size: 30px;
            height: 100%;
            line-height: 500px;
            color: white;
            text-align: center;
        }
    }
</style>
