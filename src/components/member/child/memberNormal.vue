<template>
    <v-container grid-list-md>
        <v-layout row wrap style="min-height: 400px;">
            <v-flex sm6 xs12>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <v-flex xs12 sm12 class="text-sm-center childTitle">
                            <h4>件量区间走货人数</h4>
                        </v-flex>
                        <v-flex xs12 sm12>
                            <v-tabs fixed-tabs v-model="crosswiseBarIndex" v-if="crosswiseBarTab.length > 0"
                                    :color="$store.state.color.tabColor">
                                <v-tab v-for="(item,index) in crosswiseBarTab" :key="index"
                                       v-on:click="jumpByIndex(crosswiseBarSwiper,index)">
                                    {{item}}
                                </v-tab>
                            </v-tabs>
                        </v-flex>
                        <v-flex xs12 sm12
                                v-on:mouseenter="crosswiseBarRun = false"
                                v-on:mouseleave="crosswiseBarRun = true">
                            <swiper :options="crosswiseBarSwiperOption" ref="crosswiseBarSwiper"
                                    v-if="crosswiseBarTab.length > 0">
                                <swiper-slide v-for="(item,index) in crosswiseBarTab" :key="index">
                                    <chart height="400"
                                           carousel_crosswise
                                           :delay="500"
                                           :pageIndex="index"
                                           :carouselRun="crosswiseBarRun"
                                           :nowPage="crosswiseBarIndex"
                                           :swiper="crosswiseBarSwiper"
                                           :echartData="crosswiseBarData[index]"
                                           @jumpFunction="jumpByIndex">
                                    </chart>
                                </swiper-slide>
                                <div class="swiper-button-prev" slot="button-prev"></div>
                                <div class="swiper-button-next" slot="button-next"></div>
                            </swiper>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex sm6 xs12>
                <v-container grid-list-md>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs12 sm12 class="text-sm-center childTitle">
                            <h4>会员类型及件量分布</h4>
                        </v-flex>
                        <v-flex xs12 sm12>
                            <chart height="400"
                                   :delay="1000"
                                   :echartData="doubleCircleData">
                            </chart>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-card class="bottomRight primary elevation-5">
                                <v-card-text>
                                    会员总数:{{memberTypeCount}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                        <v-flex xs12 sm6>
                            <v-card class="bottomRight primary elevation-5">
                                <v-card-text>
                                    会员总件量:{{memberQuantityCount}}
                                </v-card-text>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex sm6 xs12>
                <v-container grid-list-md>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs12 sm12 class="text-sm-center childTitle">
                            <h4>年会员增长趋势</h4>
                        </v-flex>
                        <v-flex xs12 sm12
                                v-on:mouseenter="MonthlyMemberRun = false"
                                v-on:mouseleave="MonthlyMemberRun = true">
                            <chart
                                    height="330"
                                    carousel
                                    :delay="1500"
                                    :echartData="MonthlyMemberData"
                                    :carouselRun="MonthlyMemberRun">
                            </chart>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex sm6 xs12>
                <v-container grid-list-md>
                    <v-layout row wrap text-xs-center>
                        <v-flex xs12 sm12 class="text-sm-center childTitle">
                            <h4>月会员活跃度</h4>
                        </v-flex>
                        <v-flex xs12 sm12
                                v-on:mouseenter="MemberActivityRun = false"
                                v-on:mouseleave="MemberActivityRun = true">
                            <chart
                                    height="330"
                                    carousel
                                    :delay="2000"
                                    :echartData="MemberActivityData"
                                    :carouselRun="MemberActivityRun">
                            </chart>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapState} from 'vuex'

    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    import echarts from "echarts";
    import chart from '../../../children/chart';

    export default {
        name: "memberNormal",
        data() {
            return {
                crosswiseBarTab: ['美国', '日本', '澳洲', '德国'],
                crosswiseBarData: [],
                crosswiseBarIndex: 0,
                crosswiseBarRun: true,
                crosswiseBarSwiper: null,
                crosswiseBarSwiperOption: {
                    notNextTick: true,
                    autoplay: false,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            this.crosswiseBarIndex = this.crosswiseBarSwiper.activeIndex;
                        }
                    },
                    observer: true,
                    observeParents: false,
                    slidesPerGroup: 1
                },

                doubleCircleData: null,
                memberTypeCount: 0,
                memberQuantityCount: 0,

                bottomXList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                MonthlyMemberData: null,
                MonthlyMemberRun: true,
                MemberActivityData: null,
                MemberActivityRun: true,


                MemberActivity: `${this.apiUrl}/Member/MemberActivity`,
                MemberType: `${this.apiUrl}/Member/MemberType`,
                MemberQuantityType: `${this.apiUrl}/Member/MemberQuantityType`,
                MonthlyMember: `${this.apiUrl}/Member/MonthlyMember`,
                TicketMong: `${this.apiUrl}/Member/TicketMong?counties=`,
            }
        },
        computed: {
            ...mapState({
                this_year : (state) => state.app.this_year,
                last_year : (state) => state.app.last_year
            })
        },
        methods: {
            //Post
            MemberActivityApi() {
                return this.$http.get(this.MemberActivity)
            },
            MemberTypeApi() {
                return this.$http.get(this.MemberType)
            },
            MemberQuantityTypeApi() {
                return this.$http.get(this.MemberQuantityType)
            },
            MonthlyMemberApi() {
                return this.$http.get(this.MonthlyMember)
            },
            TicketMongApi(counties) {
                return this.$http.get(`${this.TicketMong}${counties}`)
            },

            //左上横向图表数据绑定
            setCrosswiseBar() {
                for (let countryCount = 0; countryCount < this.crosswiseBarTab.length; countryCount++) {
                    this.TicketMongApi(this.crosswiseBarTab[countryCount]).then(res => {
                        let data = res.data;
                        let tmpYList = [];
                        let appusage_data = [];
                        for (let tmpD of data) {
                            let tmpData = {
                                name: tmpD.Type,
                                value: tmpD.Total
                            };
                            tmpYList.push(tmpD.Type);
                            appusage_data.push(tmpData);
                        }
                        let chartData = {
                            unit: '个',
                            yList: tmpYList,
                            name: this.crosswiseBarTab[countryCount],
                            data: appusage_data
                        };
                        this.crosswiseBarData.splice(countryCount, 0, this.global.$variable.echartStyles.crosswiseBar(chartData, echarts));
                    });
                }
            },
            //右上内外层环形图数据绑定
            setDoubleCircle(MTData, MQData) {
                let chartData = {
                    outTitle: '件量',
                    outData: [],
                    inTitle: '人员',
                    inData: [],
                };
                for (let data of MTData) {
                    let tmpData = {name, value: ''};
                    tmpData.name = data.Name;
                    tmpData.value = data.Total;
                    chartData.inData.push(tmpData);
                    this.memberTypeCount += Number(data.Total);
                }
                for (let data of MQData) {
                    let tmpData = {name: {}, value: {}, value2: {}};
                    tmpData.name = data.UserType;
                    tmpData.value = data.InCount;
                    MTData.forEach((item) => {
                        if (item.Name === tmpData.name)
                            tmpData.value2 = item.Total;
                    });
                    chartData.outData.push(tmpData);
                    this.memberQuantityCount += Number(data.InCount);
                }
                return this.global.$variable.echartStyles.doubelCircle(chartData);
            },
            //左下双柱状图数据绑定
            doubleBarBind: function (title, childTitle, unit, data, xList, yListField, yListGroup, yListGroupCondition) {
                let tmpData = this.global.$function.chart.doubleBarBindMoreRow(title, childTitle, unit, data, xList, yListField, yListGroup, yListGroupCondition);
                return this.global.$variable.echartStyles.doubleBar(tmpData, echarts);
            },

            //右下数据绑定
            BarDataBind: function (data, title, childTitle, unit, xList, xListProp, yListProp) {
                let tmpData = this.global.$function.chart.normalBarBindFixedXList(data, title, childTitle, unit, xList, xListProp, yListProp);
                return this.global.$variable.echartStyles.normalBar(tmpData, echarts);
            },

            //Swiper到下一页
            jumpByIndex(swiper, index) {
                swiper.slideTo(index);
            }
        },
        props: {},
        components: {
            swiper,
            swiperSlide,
            echarts,
            chart
        },
        mounted() {
            this.$nextTick(() => {
                this.crosswiseBarSwiper = this.$refs.crosswiseBarSwiper.swiper;
                let tmpPosts = [
                    this.MemberActivityApi(),
                    this.MemberTypeApi(),
                    this.MemberQuantityTypeApi(),
                    this.MonthlyMemberApi(),
                ];
                this.$http.all(tmpPosts).then(this.$http.spread(
                    (MA, MT, MQ, MM) => {
                        this.doubleCircleData = this.setDoubleCircle(MT.data, MQ.data);
                        this.setCrosswiseBar();
                        this.MonthlyMemberData = this.doubleBarBind('会员增长趋势',
                            [`${this.last_year}年会员数量`, `${this.this_year}年会员数量`],
                            '个',
                            MM.data,
                            this.bottomXList,
                            ['Month', 'CreateCount'],
                            'Year',
                            [`${this.last_year}年`, `${this.this_year}年`]);
                        this.MemberActivityData = this.BarDataBind(MA.data, '会员活跃度', '活跃会员', '个', this.bottomXList, 'CreateDate', 'Total');
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