<template>
    <v-container text-xs-center fluid>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-card :color="$store.state.color.CardColor" class="elevation-5 pa-0 ma-0">
                    <v-card-text class="text-xs-center childTitle">
                        <h3>人工充值</h3>
                    </v-card-text>
                    <v-card-text>
                        <chart
                                height="450"
                                v-bind:echartData="SystemRechargeBarData"
                                :delay="500"
                                carousel
                                :carouselRun="SystemRechargeBarGo">
                        </chart>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import echarts from "echarts";
    import chart from '../../../children/chart';

    export default {
        name: "other",
        data() {
            return {
                urlSystemRecharge: `${this.apiUrl}/Finance/SystemRecharge`,

                SystemRechargeBarData: null,
                SystemRechargeBarGo: true
            }
        },
        methods: {
            SystemRechargeAxios: function () {
                return this.$http.get(this.urlSystemRecharge)
            },
            BarDataBind: function (data, dataProp, title, childTitle, unit, xListProp, yListProp) {
                let tmpData = dataProp ?
                    this.global.$function.chart.normalBarBindChild(data, dataProp, title, childTitle, unit, xListProp, yListProp) :
                    this.global.$function.chart.normalBarBind(data, title, childTitle, unit, xListProp, yListProp);

                return this.global.$variable.echartStyles.normalBar(tmpData, echarts);
            }
        },
        props: {},
        components: {
            echarts,
            chart
        },
        mounted() {
            let $ = this;
            $.$nextTick(() => {
                let tmpPosts = [
                    $.SystemRechargeAxios()
                ];
                $.$http.all(tmpPosts).then(this.$http.spread((SRA) => {
                    $.SystemRechargeBarData =  $.BarDataBind(SRA.data, null, '系统充值', '金额', '元', 'Dates', 'TotalCharge');
                    this.$emit('closeLoad');
                }));
            });
        },
        beforeDestroy() {
        },
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        destroyed() {
        }
    }
</script>

<style lang="stylus">

</style>