<template>
    <v-container grid-list-md text-xs-center class="pt-1">
        <v-layout row wrap v-show="tabList.length > 0">
            <v-flex v-for="(item,index) in tabList" :key="index" xs12 sm3>
                <div @click="clickTab(item,index)"
                     v-bind:style="{ 'background-color': item.backgroundColor }"
                     class="elevation-5">
                    <v-card class="elevation-0 cardBtn" :color="$store.state.color.CardColor">
                        <v-container grid-list-md text-xs-left text-sm-left class="pa-0">
                            <v-layout row wrap>
                                <v-flex xs1 sm1>
                                    <v-icon :style="$store.state.color.iconColor">bar_chart</v-icon>
                                </v-flex>
                                <v-flex xs11 sm11>
                                    <div>{{item.STName}}</div>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-divider></v-divider>
                        <v-card-text>
                            <v-container grid-list-md text-xs-center class="pa-0">
                                <v-layout row wrap>
                                    <v-flex xs6 sm6>
                                        {{item.Total}}件
                                    </v-flex>
                                    <v-flex xs6 sm6>
                                        <v-icon color="deep-orange accent-3"
                                                v-if="item.Rise === 'rise'">trending_up
                                        </v-icon>
                                        <v-icon color="light-green darken-2"
                                                v-if="item.Rise === 'decline'">trending_down
                                        </v-icon>
                                        <v-icon color="cyan accent-3"
                                                v-if="item.Rise === 'nochange'">trending_flat
                                        </v-icon>
                                        <v-subheader class="caption" style="display: inline">差值{{item.Dif}}件
                                        </v-subheader>
                                    </v-flex>
                                    <v-flex xs12 sm12>
                                        <v-progress-linear
                                                height="15"
                                                :value="item.Percentage">
                                        </v-progress-linear>
                                        <span class="proText">{{item.Percentage}}%</span>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                    </v-card>
                </div>
            </v-flex>
        </v-layout>
        <load :loading="loading" :size="170" :width="10" :fontSize=".8" text="图表数据载入中"></load>
        <router-view :chartData="chartData" ref="chart"></router-view>
    </v-container>
</template>
<script>
    import load from '../../children/loading'

    export default {
        data() {
            return {
                isActive: false,
                createCenterCode: '',
                exType: '1',
                exTypeName: '',
                chartData: null,
                tabList: [],
                loading: false
            };
        },
        beforeDestroy() {
            this.createCenterCode = null;
            this.exType = null;
            this.exTypeName = null;
            this.chartData = null;
            this.tabList = null;
        },
        mounted() {
            this.init(this);
        },
        watch: {
            '$route'(t, f) {
                this.exType = '1';
                this.init(this);
            },
        },
        methods: {
            //init
            init($) {
                $.createCenterCode = $.$router.history.current.params.createCenterCode;
                $.tabList.splice(0, $.tabList.length);
                $.getTabs($);
            },

            //post
            //上半部
            tabPost($) {
                let url = $.apiUrl;
                let tmpCreateCenterCode = $.createCenterCode;
                if (tmpCreateCenterCode === 'JPDB,JPSFDB')
                    tmpCreateCenterCode = 'JPDB';
                switch ($.createCenterCode) {
                    case 'USDB,JPDB,JPSFDB,AUDB,DEDB,UKDB':
                        url += '/Ex/GetExPackageCount_Today';
                        break;

                    default:
                        url += '/Ex/GetExPackageCount_TodayWithAWayhouse?CreateCenterCode=' + tmpCreateCenterCode;
                        break;
                }
                let post = $.$http.get(url);
                url = null;
                return post;
            },
            //下半部
            chartPost($) {
                $.$refs.chart.clear();

                let url = $.apiUrl + '/Ex/GetExPackageCount_twentyDay?';

                let lastDate = $.global.$function.dateGet.getBeforeDate(20);
                let nowDate = $.global.$function.dateGet.getNextDate(1);

                url += 'timeStart=' + lastDate
                    + '&timeEnd=' + nowDate
                    + '&createCenterCode=' + $.createCenterCode
                    + '&ExType=' + $.exType;

                let post = $.$http.get(url);

                url = null;
                lastDate = null;
                nowDate = null;

                return post;
            },

            //事件
            //点击上半部异常
            clickTab(item, index) {
                this.tabEvent(this, item, index);
            },
            tabEvent($, item, index) {
                let number = index + 1;

                item.backgroundColor = $.$store.state.color.divBtnClickColor;
                $.tabList.forEach(function (itemT) {
                    if (itemT !== item) {
                        itemT.backgroundColor = $.$store.state.color.divBtnColor
                    }
                });
                $.exType = number + '';
                $.exTypeName = item.STName;

                $.loading = true;

                $.chartPost($).then(res => {
                    $.chartData = res.data;
                    $.loading = false;
                });
            },

            //事件
            //获取tab数据
            getTabs($) {
                $.$http.all([$.tabPost($), $.chartPost($)])
                    .then($.$http.spread(function (tabRes, chartRes) {
                        tabRes.data.forEach((item, index) => {
                            let active = {
                                backgroundColor: {}
                            };
                            if (index === 0) {
                                active.backgroundColor = $.$store.state.color.divBtnClickColor;
                            } else {
                                active.backgroundColor = $.$store.state.color.divBtnColor;
                            }
                            let tmpItem = Object.assign(item, active);
                            $.tabList.push(tmpItem);
                        });

                        $.exTypeName = $.tabList[Number($.exType) - 1].STName;
                        $.chartData = chartRes.data;

                        $.$emit('closeLoad');
                    }));
            }
        },
        directives: {
            goto: {}
        },
        components: {
            load
        }
    };
</script>
<style lang="stylus">
    .proText
        position absolute
        bottom 28px
        left 0
        right 0
        margin auto

    .cardBtn
        cursor pointer

</style>
