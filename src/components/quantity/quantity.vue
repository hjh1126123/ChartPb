<template>
    <v-container grid-list-md text-xs-center text-sm-center class="pt-0">
        <v-layout row wrap>
            <v-flex xs12 sm12>
                <v-card>
                    <v-card-text>
                        <div style="height: 50px;">
                            <h1>件量监控</h1>
                        </div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm8>
                <v-card>
                    <v-card-text>
                        <h4>年总件量月同比详情</h4>
                    </v-card-text>
                    <v-card-text>
                        <div style="height: 350px;" ref="topBar"></div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm4>
                <v-card>
                    <v-card-text>
                        <h4>总件量详情</h4>
                    </v-card-text>
                    <v-card-text class="px-0">
                        <div style="height: 350px;" ref="topCircle"></div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-text>
                        <h4>各仓总件量月同比详情</h4>
                    </v-card-text>
                    <v-card-text>
                        <div style="height: 275px;"></div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-text>
                        <h4>线下件量月详情</h4>
                    </v-card-text>
                    <v-card-text>
                        <div style="height: 275px;"></div>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    import axios from "axios";
    import echarts from "echarts";

    import {url, urlapi} from "../../api/config.js";

    export default {
        name: "quantity",
        data: () => {
            return{
                xList : ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                tabListOnline : ['美国','日本','澳洲','德国','英国'],
                tabListOffline : ['美国','日本']
            }
        },
        mounted: () => {

        }
    }
</script>

<style scoped lang="stylus">

</style>