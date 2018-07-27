<template>
    <v-container grid-list-md text-xs-center class="pt-1">
        <v-layout row wrap>
            <v-flex v-for="(item,index) in tabList" :key="index" xs12 sm3>
                <v-card>
                        <v-container grid-list-md text-xs-center text-sm-center class="pa-2">
                            <v-layout row wrap>
                                <v-flex xs6 sm6>
                                    <div>{{item.STName}}</div>
                                </v-flex>
                                <v-flex xs6 sm6>
                                    <div>{{item.Total}}件</div>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-container grid-list-md text-xs-center class="pa-2">
                            <v-layout row wrap>
                                <v-flex xs12 sm6>
                                    <v-btn block>
                                        <v-icon left>assessment</v-icon>
                                        {{item.Dif}}件
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12 sm6>
                                    <v-btn block>
                                        <v-icon left color="light-green accent-3"
                                                v-if="item.Rise === 'rise'">trending_up
                                        </v-icon>
                                        <v-icon left color="deep-orange darken-2"
                                                v-if="item.Rise === 'decline'">trending_down
                                        </v-icon>
                                        <v-icon left color="cyan accent-3"
                                                v-if="item.Rise === 'nochange'">trending_flat
                                        </v-icon>
                                        {{item.Percentage}}%
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12 sm12>
                                    <v-progress-linear
                                            height="5"
                                            :value="item.Percentage"
                                    ></v-progress-linear>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <!--<v-container grid-list-md>-->
                            <!--<v-layout justify-center align-center>-->
                                <!--<v-flex xs12 sm12>-->
                                    <!--<v-btn>-->
                                        <!--<v-icon left>assessment</v-icon>-->
                                        <!--{{item.Dif}}件-->
                                    <!--</v-btn>-->
                                    <!--<v-btn>-->
                                        <!--<v-icon left color="light-green accent-3"-->
                                                <!--v-if="item.Rise === 'rise'">trending_up-->
                                        <!--</v-icon>-->
                                        <!--<v-icon left color="deep-orange darken-2"-->
                                                <!--v-if="item.Rise === 'decline'">trending_down-->
                                        <!--</v-icon>-->
                                        <!--<v-icon left color="cyan accent-3"-->
                                                <!--v-if="item.Rise === 'nochange'">trending_flat-->
                                        <!--</v-icon>-->
                                        <!--{{item.Percentage}}%-->
                                    <!--</v-btn>-->
                                <!--</v-flex>-->
                                <!--<v-flex xs12 sm12>-->
                                    <!--<v-progress-linear-->
                                            <!--color="secondary"-->
                                            <!--height="2"-->
                                            <!--value="50"-->
                                    <!--&gt;</v-progress-linear>-->
                                <!--</v-flex>-->
                            <!--</v-layout>-->
                        <!--</v-container>-->
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <index :exType="tabIndex"></index>
    </v-container>
</template>
<script>
    import index from './child/index'

    import axios from "axios";
    import {url, urlapi} from "../../api/config.js";

    export default {
        data() {
            return {
                width: 0,
                tabIndex: 1,
                tabList: [], //tabButton列表
                totalTab: {} //总异常显示
            };
        },
        created() {
            this.getTabs();
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
            index
        }
    };
</script>
<style lang="stylus">

</style>
