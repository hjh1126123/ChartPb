<template>
    <v-container grid-list-md class="pt-0">
        <v-layout row wrap style="min-height: 350px;">
            <v-flex sm3 xs12 v-for="(item,index) in monitoringItems" :key="index" class="pa-2">
                <monitoringPanel :mItem="item"></monitoringPanel>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="monchartContent">
            <v-flex sm4 xs12
                    v-on:mouseenter="DailyWithdrawRun = false"
                    v-on:mouseleave="DailyWithdrawRun = true">
                <v-card-text class="text-xs-center childTitle pa-1">
                    <h4>用户提现趋势</h4>
                </v-card-text>
                <chart height="230"
                       v-bind:echartData="DailyWithdrawChartData"
                       :carouselRun="DailyWithdrawRun"
                       :delay="500"
                       carousel>
                </chart>
            </v-flex>
            <v-flex sm4 xs12
                    v-on:mouseenter="TweentlyTapeCoinAddRun = false"
                    v-on:mouseleave="TweentlyTapeCoinAddRun = true">
                <v-card-text class="text-xs-center childTitle pa-1">
                    <h4>海带币获取</h4>
                </v-card-text>
                <chart height="230"
                       v-bind:echartData="TweentlyTapeCoinAdd"
                       :carouselRun="TweentlyTapeCoinAddRun"
                       :delay="1000"
                       carousel>
                </chart>
            </v-flex>
            <v-flex sm4 xs12
                    v-on:mouseenter="DiscountsTotalRun = false"
                    v-on:mouseleave="DiscountsTotalRun = true">
                <v-card-text class="text-xs-center childTitle pa-1">
                    <h4>优惠券获取</h4>
                </v-card-text>
                <chart height="230"
                       v-bind:echartData="DiscountsTotalChartData"
                       :carouselRun="DiscountsTotalRun"
                       :delay="1500"
                       carousel>
                </chart>
            </v-flex>
            <v-flex sm4 xs12
                    v-on:mouseenter="DailyWithGiveMoneyRun = false"
                    v-on:mouseleave="DailyWithGiveMoneyRun = true">
                <v-card-text class="text-xs-center childTitle pa-1">
                    <h4>财务打款趋势</h4>
                </v-card-text>
                <chart height="230"
                       v-bind:echartData="DailyWithGiveMoneyChartData"
                       :carouselRun="DailyWithGiveMoneyRun"
                       :delay="2000"
                       carousel>
                </chart>
            </v-flex>
            <v-flex sm4 xs12
                    v-on:mouseenter="TweentlyTapeCoinSubRun = false"
                    v-on:mouseleave="TweentlyTapeCoinSubRun = true">
                <v-card-text class="text-xs-center childTitle pa-1">
                    <h4>海带币使用</h4>
                </v-card-text>
                <chart height="230"
                       v-bind:echartData="TweentlyTapeCoinSub"
                       :carouselRun="TweentlyTapeCoinSubRun"
                       :delay="2500"
                       carousel>
                </chart>
            </v-flex>
            <v-flex sm4 xs12
                    v-on:mouseenter="DailySpendingDiscountsRun = false"
                    v-on:mouseleave="DailySpendingDiscountsRun = true">
                <v-card-text class="text-xs-center childTitle pa-1">
                    <h4>优惠券使用</h4>
                </v-card-text>
                <chart height="230"
                       v-bind:echartData="DailySpendingDiscountsChartData"
                       :carouselRun="DailySpendingDiscountsRun"
                       :delay="3000"
                       carousel>
                </chart>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import echarts from "echarts";
    import chart from '../../../children/chart';

    import monitoringPanel from '../../../children/monitoringPanel'

    export default {
        name: "monitoring",
        data() {
            return {
                RealTimeFinancialMonitoring: this.apiUrl + '/Finance/RealTimeFinancialMonitoring',
                RealTimeFinancialMonitoringNiHaoPay: this.apiUrl + '/Finance/RealTimeFinancialMonitoringNiHaoPay',
                BalanceMonitoring: this.apiUrl + '/Finance/BalanceMonitoring',
                TapeCoinMonitoring: this.apiUrl + '/Finance/TapeCoinMonitoring',
                TweentlyTapeCoin: this.apiUrl + '/Finance/TweentlyTapeCoin',
                DailySpendingDiscounts: this.apiUrl + '/Finance/DailySpendingDiscounts',
                DiscountsTotal: this.apiUrl + '/Finance/DiscountsTotal',
                DailyWithdraw: this.apiUrl + '/Finance/DailyWithdraw',
                DailyWithGiveMoney: this.apiUrl + '/Finance/DailyWithGiveMoney',

                normalXList: [''],

                DailyWithGiveMoneyChartData: null,
                DailyWithGiveMoneyRun: true,

                DailyWithdrawChartData: null,
                DailyWithdrawRun: true,

                TweentlyTapeCoinAdd: null,
                TweentlyTapeCoinAddRun: true,
                TweentlyTapeCoinSub: null,
                TweentlyTapeCoinSubRun: true,

                DailySpendingDiscountsChartData: null,
                DailySpendingDiscountsRun: true,
                DiscountsTotalChartData: null,
                DiscountsTotalRun: true,

                monitoringItems: []
            }
        },
        methods: {
            //异步接口
            RealTimeFinancialMonitoringPost: function () {
                return this.$http.get(this.RealTimeFinancialMonitoring)
            },
            RealTimeFinancialMonitoringNiHaoPayPost: function () {
                return this.$http.get(this.RealTimeFinancialMonitoringNiHaoPay);
            },
            BalanceMonitoringPost: function () {
                return this.$http.get(this.BalanceMonitoring);
            },
            TapeCoinMonitoringPost: function () {
                return this.$http.get(this.TapeCoinMonitoring);
            },
            TweentlyTapeCoinPost: function () {
                return this.$http.get(this.TweentlyTapeCoin);
            },
            DailySpendingDiscountsPost: function () {
                return this.$http.get(this.DailySpendingDiscounts);
            },
            DiscountsTotalPost: function () {
                return this.$http.get(this.DiscountsTotal);
            },
            DailyWithdrawPost: function () {
                return this.$http.get(this.DailyWithdraw);
            },
            DailyWithGiveMoneyPost: function () {
                return this.$http.get(this.DailyWithGiveMoney);
            },

            //图表数据绑定
            BarDataBind: function (data, dataProp, title, childTitle, unit, xListProp, yListProp) {
                let tmpData = dataProp ?
                    this.global.$function.chart.normalBarBindChild(data, dataProp, title, childTitle, unit, xListProp, yListProp) :
                    this.global.$function.chart.normalBarBind(data, title, childTitle, unit, xListProp, yListProp);

                return this.global.$variable.echartStyles.normalBar(tmpData, echarts);
            }
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
            this.$nextTick(() => {
                this.$http.get(this.DailyWithdraw).then(res => {
                    console.log(res);
                });
                let tmpPosts = [
                    this.RealTimeFinancialMonitoringPost(),
                    this.RealTimeFinancialMonitoringNiHaoPayPost(),
                    this.BalanceMonitoringPost(),
                    this.TapeCoinMonitoringPost(),
                    this.TweentlyTapeCoinPost(),
                    this.DailySpendingDiscountsPost(),
                    this.DiscountsTotalPost(),
                    this.DailyWithdrawPost(),
                    this.DailyWithGiveMoneyPost()
                ];
                this.$http.all(tmpPosts).then(this.$http.spread((RFMP, RFMNPP, BMP, TMP, TTCP, DSDP, DTP, DWP, DWGM) => {
                    if (!!RFMP.data && RFMP.data.length > 0) {
                        let RFMPData = RFMP.data[0].FinanceM;
                        let tmpMonRFMP = {
                            title: '转运财务实收监控',
                            success: RFMPData.Valid,
                            error: RFMPData.ExMsg,
                            child: [
                                {
                                    name: '支付宝',
                                    value: RFMPData.AliPay
                                },
                                {
                                    name: '微信公众平台',
                                    value: RFMPData.WexxOpen
                                },
                                {
                                    name: '微信开发平台',
                                    value: RFMPData.WexxDev
                                },
                                {
                                    name: '财务支付宝',
                                    value: RFMPData.FinAliPay
                                },
                                {
                                    name: '财务微信公众平台',
                                    value: RFMPData.FinwexxOpen
                                },
                                {
                                    name: '财务微信开发平台',
                                    value: RFMPData.FinwexxDev
                                }
                            ]
                        };
                        this.monitoringItems.push(tmpMonRFMP);
                    }
                    if (!!RFMNPP.data && RFMNPP.data.length > 0) {
                        let RFMNPPData = RFMNPP.data[0].FinanceM;
                        let tmpMonRFMNPP = {
                            title: '代买财务账户实收监控',
                            success: RFMNPPData.Valid,
                            error: RFMNPPData.ExMsg,
                            child: [
                                {
                                    name: 'NIhaopay',
                                    value: RFMNPPData.NihaoPay
                                },
                                {
                                    name: '财务NIhaopay',
                                    value: RFMNPPData.FinnihaoPay
                                }
                            ]
                        };
                        this.monitoringItems.push(tmpMonRFMNPP);
                    }
                    if (!!BMP.data && BMP.data.length > 0) {
                        let BMPData = BMP.data[0].FinanceM;
                        let tmpMonBMP = {
                            title: '余额监控',
                            success: BMPData.Valid,
                            error: BMPData.ExMsg,
                            child: [
                                {
                                    name: '用户总收入',
                                    value: BMPData.BalanceAdd
                                },
                                {
                                    name: '用户总支出',
                                    value: BMPData.BalanceSub
                                },
                                {
                                    name: '期初余额',
                                    value: BMPData.OpeningBalance
                                },
                                {
                                    name: '期末余额',
                                    value: BMPData.ActualBalance
                                },
                                {
                                    name: '理论期末余额',
                                    value: BMPData.TheoryBalance
                                }
                            ]
                        };
                        this.monitoringItems.push(tmpMonBMP);
                    }
                    if (!!TMP.data && TMP.data.length > 0) {
                        let TMPData = TMP.data[0].FinanceM;
                        let tmpMonTMP = {
                            title: '海带币监控',
                            success: TMPData.Valid,
                            error: TMPData.ExMsg,
                            child: [
                                {
                                    name: '用户总收入',
                                    value: TMPData.PointsAdd
                                },
                                {
                                    name: '用户总支出',
                                    value: TMPData.PointsSub
                                },
                                {
                                    name: '期初余额',
                                    value: TMPData.OpeningPoints
                                },
                                {
                                    name: '期末余额',
                                    value: TMPData.ActualPoints
                                },
                                {
                                    name: '理论期末余额',
                                    value: TMPData.TheoryPoints
                                }
                            ]
                        };
                        this.monitoringItems.push(tmpMonTMP);
                    }

                    let TTCPData = TTCP.data;
                    this.TweentlyTapeCoinAdd = this.BarDataBind(TTCPData, 'FinanceM', '海带币获取', '海带币', '元', 'DayReport', 'PointsAdd');
                    this.TweentlyTapeCoinSub = this.BarDataBind(TTCPData, 'FinanceM', '海带币使用', '海带币', '元', 'DayReport', 'PointsSub');

                    let DSDPData = DSDP.data;
                    this.DailySpendingDiscountsChartData = this.BarDataBind(DSDPData, null, '优惠券使用', '优惠券', '元', 'PayDate', 'TotalCharge');

                    let DTPData = DTP.data;
                    this.DiscountsTotalChartData = this.BarDataBind(DTPData, null, '优惠券获取', '优惠券', '元', 'Dates', 'TotalCharge');

                    let DWPData = DWP.data;
                    this.DailyWithdrawChartData = this.BarDataBind(DWPData, null, '每日提现', '金额', '元', 'Dates', 'TotalCharge');

                    let DailyWithGiveMoneyChartData = DWGM.data;
                    this.DailyWithGiveMoneyChartData = this.BarDataBind(DailyWithGiveMoneyChartData, null, '每日打款', '金额', '元', 'Dates', 'TotalCharge');

                    this.$emit('closeLoad');
                }));
            });
        },
        beforeUpdate() {
        },
        updated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        components: {
            monitoringPanel,
            echarts,
            chart
        }
    }
</script>

<style lang="stylus">

    .monchartContent {
        > div {
            border #797979 1px solid;
            min-height 240px;
        }
    }

    .symbol {
        /*position absolute;*/
        font-size: 10em;
        /*z-index 1;*/
    }

    .paper {
        position: relative;
        background: #fff;
        border: 2px solid #eee;
        float: left;
        margin: 10px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.27), 0 0 20px rgba(0, 0, 0, .1) inset;
    }

    .paper::after, .paper::before {
        content: '';
        position: absolute;
        bottom: 6px;
        width: 100px;
        height: 1px;
        z-index: -1;
        box-shadow: 0 2px 12px 5px rgba(0, 0, 0, .3);
    }

    .paper::after {
        left: 4px;
        transform: rotate(-6deg);
    }

    .paper::before {
        right: 4px;
        transform: rotate(6deg);
    }
</style>