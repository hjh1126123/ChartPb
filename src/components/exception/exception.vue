<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex v-for="(item,index) in tabList" :key="index" xs12 sm3 v-on:click="tabIndex = index">
                <v-card color="#495060" class="white--text">
                        <v-container grid-list-md text-xs-left text-sm-left>
                            <v-layout row wrap justify-center>
                                <v-flex xs6 sm6>
                                    <div>{{item.STName}}</div>
                                </v-flex>
                                <v-flex xs6 sm6>
                                    <div>{{item.Total}}件</div>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-divider light></v-divider>
                        <v-card-actions>
                            <v-layout row wrap>
                                <v-flex xs12 sm4>
                                    <v-btn block outline>
                                        <v-progress-linear  height="8" background-color="black" color="white" :value="Number(item.Percentage)"></v-progress-linear>
                                    </v-btn>
                                </v-flex>
                                <v-flex xs12 sm8>
                                    <v-layout row wrap>
                                        <v-flex d-flex>
                                            <v-layout row>
                                                <v-flex xs12>
                                                    <v-btn>
                                                        <v-icon left>assessment</v-icon>
                                                        {{item.Dif}}件
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex xs12>
                                                    <v-btn>
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
                                            </v-layout>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                <v-btn block color="secondary" dark>显示此数据</v-btn>
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
