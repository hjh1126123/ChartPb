<!--
   表格组件：四个title,用于显示当前所在的目录
   centerCode:城市编码
   showList:当前要展示的数据列表
   STName:异常类型名
   Total:异常总数
   ...
   changeHouseName:filter文件中封装的过滤器，将城市编码转意为中文
   swiper插件:使用vue-awesome-swiper
   swiper变量：插件对象
-->
<template>
    <div class="table-container">
        <div class="table-header">
            <div class="title">{{centerCode | changeHouseName}}今日异常详情</div>
            <div class="header-list">
                <div class="row">
                    <div class="col-md-5 col-sm-5 col-xs-5">异常类型</div>
                    <div class="col-md-1 col-sm-1 col-xs-1">总数</div>
                    <div class="col-md-1 col-sm-1 col-xs-1">趋势</div>
                    <div class="col-md-4 col-sm-4 col-xs-4">差值</div>
                </div>
            </div>
        </div>
        <div class="table-body">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide class="swiper-no-swiping" v-for="(item,index) in showList" :key="index">
                    <div class="row">
                        <div class="left col-md-5 col-sm-5 col-xs-5">{{item.STName}}</div>
                        <!-- <div class="col-md-4 col-sm-4 col-xs-4 time hidden-xs" :alt="item.ModifyTime">{{item.ModifyTime}}</div>
                        <div class="col-md-4 col-sm-4 col-xs-4 time hidden-lg hidden-md hidden-sm" :alt="item.ModifyTime">{{item.ModifyTime}}</div> -->
                        <!-- <div class="right col-md-7 col-sm-7 col-xs-7">
                            </div> -->
                        <!-- <div class="row total"> -->
                        <i class="col-md-1 col-sm-1 col-xs-1">{{item.Total}}</i>
                        <img class="col-md-1 col-sm-1 col-xs-1" src="../assets/img/arrows/up.png" v-if="item.Rise=='rise'" alt="" height="30px" width="30px">
                        <img class="col-md-1 col-sm-1 col-xs-1" src="../assets/img/arrows/down.png" v-if="item.Rise=='decline'" alt="" height="30px" width="30px">
                        <img class="col-md-1 col-sm-1 col-xs-1" src="../assets/img/arrows/noChange.png" v-if="item.Rise=='nochange'" alt="" height="30px" width="30px">
                        <i class="col-md-4 col-sm-4 col-xs-4" style="font-size:12px;">差值 : {{item.Dif}}(比昨日)</i>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { url, urlapi } from "../api/config.js";
import axios from "axios";
export default {
    data() {
        return {
            autoplay: false, //是否可以自动轮播
            swiperOption: {
                direction: "vertical",
                autoplay: {
                    stopOnLastSlide: false,
                    disableOnInteraction: true
                },
                autoplay: false
                // pagination: {
                //     el: ".swiper-pagination"
                // },
            },
            showList: []
        };
    },
    props: {
        title: {
            type: String,
            default: ""
        },
        //数据展示详情
        dataList: {
            type: Array
        },
        index: {
            type: Number,
            default: 0
        },
        isPlay: {
            type: Boolean,
            default: false
        },
        centerCode: {
            type: String,
            default: ""
        }
    },
    created() {},
    mounted() {
        this.getShowData();
    },
    activated() {},
    methods: {
        isAutoPlay() {},
        getShowData() {
            axios
                .post(urlapi + "/Ex/GetExPackageCount_TodayWithAWayhouse?CreateCenterCode=" + this.centerCode)
                .then(res => {
                    // this.showList =JSON.parse(res.data);
                    this.showList = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    beforeDestroy() {
        // let that = this;
        // (function() {
        //     if (!that.swiper) {
        //         return;
        //     }
        //     that.swiper.destroy();
        //     that.swiper = null;
        // })(this.swiper);
    },
    computed: {
        swiper: {
            get: function() {
                return this.$refs.mySwiper.swiper;
            },
            set: function() {}
        }
    },
    components: {
        swiperSlide,
        swiper
    }
};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.table-container {
    height: 500px;
    padding: 0;

    .table-header {
        color: white;
        text-align: center;

        .title {
            line-height: 60px;
            height: 60px;
            font-size: 18px;
            border-bottom: 1px dashed #8f9ea8;
        }

        .header-list {
            font-size: 12px;
            line-height: 40px;
            height: 40px;
            border-bottom: 1px dashed #8f9ea8;

            div {
                padding: 0;
            }
        }
    }

    .table-body {
        height: 440px !important;
        overflow: hidden;

        .swiper-container {
            height: 40px !important;
            overflow: visible;
        }

        .swiper-slide {
            line-height: 40px;
            height: 40px !important;
            color: white;
            border-bottom: 1px dashed #8f9ea8;
            margin: 0 !important;
            text-align: center;
        }

        .row {
            i, img, div {
                padding: 0;
            }
        }

        .left {
            text-align: left;
            padding-left: 16px !important;
        }

        .time {
            white-space: nowrap;
            overflow: hidden;
        }

        .hidden-lg {
            font-size: 12px;
        }
    }
}
</style>
