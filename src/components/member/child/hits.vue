<template>
    <v-container grid-list-md class="pa-0">
        <v-layout row wrap>
            <v-flex sm6 xs12>
                <v-flex xs12 class="text-sm-center childTitle">
                    <h3>首页总功能点击量</h3>
                </v-flex>
                <chart height="850"
                       carousel_crosswise
                       :delay="500"
                       :carouselRun="leftChartRun"
                       :echartData="leftChart">
                </chart>
            </v-flex>
            <v-flex sm6 xs12>
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-flex xs12 class="text-sm-center childTitle">
                            <h3>首页广告点击量</h3>
                        </v-flex>
                        <chart height="400"
                               carousel_crosswise
                               :delay="500"
                               :carouselRun="rightTopChartRun"
                               :echartData="rightTopChart">
                        </chart>
                    </v-flex>
                    <v-flex xs12>
                        <v-flex xs12 class="text-sm-center childTitle">
                            <h3>首页底部专题栏点击量</h3>
                        </v-flex>
                        <chart height="400"
                               carousel_crosswise
                               :delay="500"
                               :carouselRun="rightBottomChartRun"
                               :echartData="rightBottomChart">
                        </chart>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import echarts from "echarts";
    import chart from '../../../children/chart';

    export default {
        name: "hits",
        data() {
            return {
                leftChart: {},
                leftChartRun: true,

                rightTopChart: {},
                rightTopChartRun: true,

                rightBottomChart: {},
                rightBottomChartRun: true,

                HicksAll: `${this.apiUrl}/Member/MemberHicksAll`,
                HicksHome: `${this.apiUrl}/Member/MemberHicksHome`,
                HicksFooter: `${this.apiUrl}/Member/MemberHicksFooter`
            }
        },
        methods: {
            HicksAllApi() {
                return this.$http.get(this.HicksAll)
            },
            HicksHomeApi() {
                return this.$http.get(this.HicksHome)
            },
            HicksFooterApi(){
                return this.$http.get(this.HicksFooter)
            },
            setCrosswiseBar(data,name) {
                let tmpYList = [];
                let appusage_data = [];
                if(data && data.length > 0)
                {
                    for (let tmpD of data) {
                        let tmpData = {
                            name: tmpD.Describe,
                            value: tmpD.Total
                        };
                        tmpYList.push(tmpD.Describe);
                        appusage_data.push(tmpData);
                    }
                }
                let chartData = {
                    unit: '次',
                    yList: tmpYList,
                    name: name,
                    data: appusage_data
                };
                return this.global.$variable.echartStyles.crosswiseBar(chartData, echarts);
            }
        },
        props: {},
        components: {
            chart
        },
        computed: {},
        mounted() {
            this.$nextTick(()=>{
                let tmpPosts = [
                    this.HicksAllApi(),
                    this.HicksHomeApi(),
                    this.HicksFooterApi()
                ];
                this.$http.all(tmpPosts).then(this.$http.spread(
                    (HA, HH, HF) => {
                        console.log(HA,HH,HF);


                        this.leftChart = this.setCrosswiseBar(HA.data,'所有点击');
                        this.rightTopChart = this.setCrosswiseBar(HH.data,'主页广告');
                        this.rightBottomChart = this.setCrosswiseBar(HF.data,'底部广告');

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