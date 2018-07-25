<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex v-for="(item,index) in tabList" :key="index" xs3>
                <v-card color="#495060" class="white--text">
                    <v-layout row wrap>
                        <v-flex xs6>
                            <v-card-title primary-title>
                                <div class="title">{{item.STName}}</div>
                            </v-card-title>
                        </v-flex>
                        <v-flex xs6>
                            <v-card-title primary-title>
                                <div class="title">10000件</div>
                            </v-card-title>
                        </v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-card-actions class="pa-3">
                        <v-layout row wrap>
                            <v-flex xs4>
                                <v-btn dark outline>
                                    <v-progress-linear height="8" background-color="black" color="white"
                                                       :value="Number(item.Percentage)"></v-progress-linear>
                                </v-btn>
                            </v-flex>
                            <v-flex xs8>
                                <v-layout row wrap>
                                    <v-flex d-flex>
                                        <v-layout row>
                                            <v-flex>
                                                <v-btn dark>
                                                    <v-icon dark left>assessment</v-icon>{{item.Dif}}件
                                                </v-btn>
                                            </v-flex>
                                            <v-flex>
                                                <v-btn dark>
                                                    <v-icon dark left color="light-green accent-3" v-if="item.Rise === 'rise'">trending_up</v-icon>
                                                    <v-icon dark left color="deep-orange darken-2" v-if="item.Rise === 'decline'">trending_down</v-icon>
                                                    <v-icon dark left color="cyan accent-3" v-if="item.Rise === 'nochange'">trending_flat</v-icon>
                                                    {{item.Percentage}}%
                                                </v-btn>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <router-view></router-view>
    </v-container>
    <!--<div class="exception">-->
    <!--<section class="content">-->
    <!--<div class="row header">-->
    <!--<div class="ss col-md-3 col-sm-6 col-xs-12" @click="goAnchor('#anchor')" v-for="(item,index) in tabList" :key="index">-->
    <!--<router-link :to="item.STType | changeRouterName">-->
    <!--<div class="box-head">-->
    <!--<img src="../../assets/img/icon/bar.png" alt="" height="50px" width="50px">-->
    <!--<span>{{item.STName}}</span>-->
    <!--</div>-->
    <!--<div class="box-body">-->
    <!--<span class="total-person">-->
    <!--<i>{{item.Total}}</i>件-->
    <!--</span>-->
    <!--<span class="up-down">-->
    <!--<img src="../../assets/img/arrows/up.png" v-if="item.Rise=='rise'" alt="" height="30px" width="30px">-->
    <!--<img src="../../assets/img/arrows/down.png" v-if="item.Rise=='decline'" alt="" height="30px" width="30px">-->
    <!--<img src="../../assets/img/arrows/noChange.png" v-if="item.Rise=='nochange'" alt="" height="30px" width="30px">-->
    <!--<i>{{item.Dif}}</i>-->
    <!--差值(比昨日)-->
    <!--</span>-->
    <!--</div>-->
    <!--<div class="">-->
    <!--<div class="progress">-->
    <!--<div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="min-width: 2em;" :style="'width:'+item.Percentage+'%'">-->
    <!--{{item.Percentage}}%-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</router-link>-->
    <!--</div>-->
    <!--</div>-->
    <!--<div class="bottom" id="anchor">-->
    <!--<router-view></router-view>-->
    <!--</div>-->
    <!--</section>-->
    <!--</div>-->
</template>
<script>
    import ShowDetailexc from "./child/show-detailexc";
    import axios from "axios";
    import {url, urlapi} from "../../api/config.js";

    export default {
        data() {
            return {
                width: 0,
                tabList: [], //tabButton列表
                totalTab: {} //总异常显示
            };
        },
        created() {
            this.getTabs();
        },
        filters: {
            changeRouterName(index) {
                let str = "/exception/totalExc";
                switch (parseInt(index)) {
                    case 1:
                        str = "/exception/totalExc";
                        break;
                    case 2:
                        str = "/exception/payUntreated";
                        break;
                    case 3:
                        str = "/exception/warehouseUndb";
                        break;
                    case 4:
                        str = "/exception/warehouseUnconnect";
                        break;
                    case 5:
                        str = "/exception/connectUnship";
                        break;
                    case 6:
                        str = "/exception/shipUnland";
                        break;
                    case 7:
                        str = "/exception/landUnclear";
                        break;
                    case 8:
                        str = "/exception/sevenUnroute";
                        break;
                }
                return str;
            }
        },
        methods: {
            getTabs() {
                axios
                    .post(urlapi + "/Ex/GetExPackageCount_Today")
                    .then(res => {
                        let data = res.data;
                        if (data.length > 0) {
                            this.tabList = data;
                        }

                        console.log(this.tabList);
                    });
            },
            goAnchor(selector) {
                if (
                    navigator.userAgent.match(
                        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                    )
                ) {
                    let anchor = this.$el.querySelector(selector);
                    $("html").scrollTop(anchor.offsetTop);
                }
            }
        },
        directives: {
            goto: {}
        },
        components: {
            // MaskDetail
        }
    };
</script>
<style lang="stylus">

</style>
