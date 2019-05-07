<template>
    <v-container text-xs-center fluid>
        <v-layout row wrap>
            <v-flex xs12 sm6>
                <v-card :color="$store.state.color.CardColor" class="elevation-0 pa-0 ma-0">
                    <v-card-text class="text-xs-center childTitle">
                        <h3>总收入/月</h3>
                    </v-card-text>
                    <v-card-text v-on:mouseenter="MonthlyIncomeChartRun = false"
                                 v-on:mouseleave="MonthlyIncomeChartRun = true">
                        <chart ref="MonthlyIncomeChart"
                               height="250"
                               :echartData="MonthlyIncomeChartData"
                               :carouselRun="MonthlyIncomeChartRun"
                               :delay="500"
                               carousel>
                        </chart>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card :color="$store.state.color.CardColor" class="elevation-0">
                    <v-card-text class="text-xs-center childTitle">
                        <h3>总收入占比</h3>
                    </v-card-text>
                    <v-card-text>
                        <chart ref="TransferGenerationBuyProportionChart"
                               height="250"
                               :delay="1000"
                               :echartData="TransferGenerationBuyProportionChartData">
                        </chart>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card :color="$store.state.color.CardColor" class="elevation-0">
                    <v-container grid-list-md text-xs-center text-sm-center class="pt-0">
                        <v-layout row wrap>
                            <v-flex xs12 sm12 class="childTitle">
                                <h3>[{{tabTransferList[TransferMonthlyChartIndex]}}]转运收入/月</h3>
                            </v-flex>
                            <v-flex xs12 sm7>
                                <v-card v-on:mouseenter="TransferMonthlyChartRun = false"
                                        v-on:mouseleave="TransferMonthlyChartRun = true"
                                        :color="$store.state.color.CardColor"
                                        class="elevation-0">
                                    <v-card-text class="text-xs-center pa-0">
                                        <v-tabs grow v-model="TransferMonthlyChartIndex"
                                                v-if="tabTransferList.length > 0"
                                                :color="$store.state.color.tabColor">
                                            <v-tab v-for="(item,index) in tabTransferList" :key="index"
                                                   v-on:click="jumpByIndex(TransferMonthlySwiper,index)">
                                                {{item}}
                                            </v-tab>
                                        </v-tabs>
                                    </v-card-text>
                                    <v-card-text class="ma-0">
                                        <swiper :options="TransferMonthlySwiperOption" ref="TransferMonthlySwiper"
                                                v-if="tabTransferList.length > 0">
                                            <swiper-slide v-for="(item,index) in tabTransferList" :key="index">
                                                <chart height="470"
                                                       v-if="TransferMonthlyChartData.length >= index - 1"
                                                       v-bind:echartData="TransferMonthlyChartData[index]"
                                                       :delay="1500 * (1 + (index * 0.2))"
                                                       carousel
                                                       :carouselRun="TransferMonthlyChartRun"
                                                       :nowPage="TransferMonthlyChartIndex"
                                                       :pageIndex="index"
                                                       :swiper="TransferMonthlySwiper"
                                                       @jumpFunction="jumpByIndex">
                                                </chart>
                                            </swiper-slide>
                                            <div class="swiper-button-prev" slot="button-prev"></div>
                                            <div class="swiper-button-next" slot="button-next"></div>
                                        </swiper>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-card class="elevation-0 hidden-lg-and-down"
                                        v-on:mouseenter="TransferCountryChartRun = false"
                                        v-on:mouseleave="TransferCountryChartRun = true"
                                        :color="$store.state.color.CardColor">
                                    <chart ref="TransferCountryChart"
                                           height="150"
                                           :delay="2000"
                                           :echartData="TransferCountryChartData"
                                           :carouselRun="TransferCountryChartRun"
                                           carousel_circle></chart>
                                </v-card>
                                <v-card class="elevation-0 hidden-xl-only caption"
                                        v-on:mouseenter="TransferCountryChartRun = false"
                                        v-on:mouseleave="TransferCountryChartRun = true"
                                        :color="$store.state.color.CardColor">
                                    <chart ref="TransferCountryChart"
                                           height="130"
                                           :delay="2000"
                                           :echartData="TransferCountryChartData"
                                           :carouselRun="TransferCountryChartRun"
                                           carousel_circle></chart>
                                </v-card>
                                <table class="table hidden-lg-and-down" v-show="TransferCountryTableData.length > 0"
                                       style="height: 350px;">
                                    <tr>
                                        <th class="text-sm-center">国家名称</th>
                                        <th class="text-sm-center">数量</th>
                                        <th class="text-sm-center">占比</th>
                                    </tr>
                                    <tr v-for="(item,index) in TransferCountryTableData" :key="index">
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.name}}</td>
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.value }}
                                        </td>
                                        <td :style="$store.state.tableTdColor" class="text-sm-center">
                                            {{item.percentage}}%
                                        </td>
                                    </tr>
                                </table>
                                <table class="table hidden-xl-only caption" v-show="TransferCountryTableData.length > 0"
                                       style="height: 300px;">
                                    <tr>
                                        <th class="text-sm-center">国家名称</th>
                                        <th class="text-sm-center">数量</th>
                                        <th class="text-sm-center">占比</th>
                                    </tr>
                                    <tr v-for="(item,index) in TransferCountryTableData" :key="index">
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.name}}</td>
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.value }}
                                        </td>
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">
                                            {{item.percentage}}%
                                        </td>
                                    </tr>
                                </table>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card :color="$store.state.color.CardColor" class="elevation-0">
                    <v-container grid-list-md text-xs-center class="pt-0">
                        <v-layout row wrap>
                            <v-flex xs12 sm12 class="childTitle">
                                <h3>[{{tabGenerationBuyList[GenerationBuyMonthlyChartIndex]}}]代买收入/月</h3>
                            </v-flex>
                            <v-flex xs12 sm7>
                                <v-card v-on:mouseenter="GenerationBuyMonthlyChartRun = false"
                                        v-on:mouseleave="GenerationBuyMonthlyChartRun = true"
                                        :color="$store.state.color.CardColor"
                                        class="elevation-0">
                                    <v-card-text class="text-xs-center pa-0">
                                        <v-tabs grow v-model="GenerationBuyMonthlyChartIndex"
                                                v-if="tabGenerationBuyList.length > 0"
                                                :color="$store.state.color.tabColor">
                                            <v-tab v-for="(item,index) in tabGenerationBuyList" :key="index"
                                                   v-on:click="jumpByIndex(GenerationBuyMonthlySwiper,index)">
                                                {{item}}
                                            </v-tab>
                                        </v-tabs>
                                    </v-card-text>
                                    <v-card-text class="ma-0">
                                        <swiper :options="GenerationBuyMonthlySwiperOption"
                                                ref="GenerationBuyMonthlySwiper"
                                                v-if="tabGenerationBuyList.length > 0">
                                            <swiper-slide v-for="(item,index) in tabGenerationBuyList" :key="index">
                                                <chart height="470"
                                                       v-if="GenerationBuyMonthlyChartData.length >= index - 1"
                                                       v-bind:echartData="GenerationBuyMonthlyChartData[index]"
                                                       :delay="2500 * (1 + (index * 0.2))"
                                                       carousel
                                                       :carouselRun="GenerationBuyMonthlyChartRun"
                                                       :nowPage="GenerationBuyMonthlyChartIndex"
                                                       :pageIndex="index"
                                                       :swiper="GenerationBuyMonthlySwiper"
                                                       @jumpFunction="jumpByIndex">
                                                </chart>
                                            </swiper-slide>
                                            <div class="swiper-button-prev" slot="button-prev"></div>
                                            <div class="swiper-button-next" slot="button-next"></div>
                                        </swiper>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-card class="elevation-0 hidden-lg-and-down"
                                        :color="$store.state.color.CardColor"
                                        v-on:mouseenter="GenerationBuyCurrencyRun = false"
                                        v-on:mouseleave="GenerationBuyCurrencyRun = true">
                                    <chart ref="TransferCountryChart"
                                           height="150"
                                           :delay="3000"
                                           :echartData="GenerationBuyCurrencyChartData"
                                           :carouselRun="GenerationBuyCurrencyRun"
                                           carousel_circle>
                                    </chart>
                                </v-card>
                                <v-card class="elevation-0 hidden-xl-only caption"
                                        :color="$store.state.color.CardColor"
                                        v-on:mouseenter="GenerationBuyCurrencyRun = false"
                                        v-on:mouseleave="GenerationBuyCurrencyRun = true">
                                    <chart ref="TransferCountryChart"
                                           height="120"
                                           :delay="3000"
                                           :echartData="GenerationBuyCurrencyChartData"
                                           :carouselRun="GenerationBuyCurrencyRun"
                                           carousel_circle>
                                    </chart>
                                </v-card>
                                <table class="table hidden-lg-and-down" v-show="GenerationBuyCurrencyTableData.length > 0"
                                       style="height: 350px;">
                                    <tr>
                                        <th class="text-sm-center">货币种类</th>
                                        <th class="text-sm-center">金额（人民币）</th>
                                        <th class="text-sm-center">占比</th>
                                    </tr>
                                    <tr v-for="(item,index) in GenerationBuyCurrencyTableData" :key="index">
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.name}}</td>
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.value}}元
                                        </td>
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">
                                            {{item.percentage}}%
                                        </td>
                                    </tr>
                                </table>
                                <table class="table hidden-xl-only caption" v-show="GenerationBuyCurrencyTableData.length > 0"
                                       style="height: 300px;">
                                    <tr>
                                        <th class="text-sm-center">货币种类</th>
                                        <th class="text-sm-center">金额(元)</th>
                                        <th class="text-sm-center">占比</th>
                                    </tr>
                                    <tr v-for="(item,index) in GenerationBuyCurrencyTableData" :key="index">
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.name}}</td>
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">{{item.value}}
                                        </td>
                                        <td :style="$store.state.color.tableTdColor" class="text-sm-center">
                                            {{item.percentage}}%
                                        </td>
                                    </tr>
                                </table>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>

    import "swiper/dist/css/swiper.css";
    import {swiper, swiperSlide} from "vue-awesome-swiper";

    import echarts from "echarts";
    import chart from '../../../children/chart';

    export default {
        data() {
            return {
                urlMonthlyIncome: this.apiUrl + '/Finance/MonthlyIncome',
                urlTransferGenerationBuyProportion: this.apiUrl + '/Finance/TransferGenerationBuyProportion',
                urlTransferCountry: this.apiUrl + '/Finance/TransferCountry',
                urlGenerationBuyCurrency: this.apiUrl + '/Finance/GenerationBuyCurrency',
                urlTransferMonthly: this.apiUrl + '/Finance/TransferMonthly?centerCode=',
                urlGenerationBuyMonthly: this.apiUrl + '/Finance/GenerationBuyMonthly?currency=',

                tabTransferList: ['总数', '美国', '日本', '澳洲', '德国', '英国'],
                tabGenerationBuyList: ['总数', '美元', '日元', '澳元', '欧元', '英镑', '代采'],

                MonthlyIncomeChartData: null,
                MonthlyIncomeChartRun: true,

                TransferGenerationBuyProportionChartData: null,

                TransferCountryTableData: [],
                TransferCountryChartData: null,
                TransferCountryChartRun: true,

                GenerationBuyCurrencyTableData: [],
                GenerationBuyCurrencyChartData: null,
                GenerationBuyCurrencyRun: true,

                TransferMonthlyChartData: [],
                TransferMonthlyChartRun: true,
                TransferMonthlyChartIndex: 0,
                TransferMonthlySwiper: null,
                TransferMonthlySwiperOption: {
                    notNextTick: true,
                    autoplay: false,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            this.TransferMonthlyChartIndex = this.TransferMonthlySwiper.activeIndex;
                        }
                    },
                    observer: true,
                    observeParents: false,
                    slidesPerGroup: 1
                },

                GenerationBuyMonthlyChartData: [],
                GenerationBuyMonthlyChartRun: true,
                GenerationBuyMonthlyChartIndex: 0,
                GenerationBuyMonthlySwiper: null,
                GenerationBuyMonthlySwiperOption: {
                    notNextTick: true,
                    autoplay: false,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            this.GenerationBuyMonthlyChartIndex = this.GenerationBuyMonthlySwiper.activeIndex;
                        }
                    },
                    observer: true,
                    observeParents: false
                }
            };
        },
        mounted: function () {
            this.TransferMonthlySwiper = this.$refs.TransferMonthlySwiper.swiper;
            this.GenerationBuyMonthlySwiper = this.$refs.GenerationBuyMonthlySwiper.swiper;

            let tmpPosts = [
                this.MonthlyIncomeAxios(),
                this.TransferGenerationBuyProportionAxios(),
                this.TransferCountryAxios(),
                this.GenerationBuyCurrencyAxios(),
            ];

            this.$http.all(tmpPosts).then(this.$http.spread(
                (MI, TGBF, GBC, TC) => {
                    this.MonthlyIncomeChartData = this.BarDataBind(MI.data, '总收入', '金额', '元', 'PayDate', 'TotalCharge');
                    this.TransferGenerationBuyProportionChartData = this.normalCircleDataBind(TGBF.data, .84, '总收入', '总收入占比图', ['转运', '代买'], ['TotalCharge', 'TotalPurchaseCharge']);
                    this.TransferCountryChartData = this.simpleCircleDataBind(GBC.data, '', '', 'Country', 'TotalCharge');
                    this.GenerationBuyCurrencyChartData = this.simpleCircleDataBind(TC.data, '', '', 'Currency', 'TotalPurchaseCharge');

                    this.TableDataBind(this, this.TransferCountryTableData, GBC.data, 'Country', 'TotalCharge');
                    this.TableDataBind(this, this.GenerationBuyCurrencyTableData, TC.data, 'Currency', 'TotalPurchaseCharge');
                    for(let index = 0;index < this.tabTransferList.length; index++){
                        this.TransferMonthlyAxios(this.tabTransferList[index]).then(res => {
                            this.TransferMonthlyChartData.splice(index, 0, this.BarDataBind(res.data, '转运收入', '金额', '元', 'PayDate', 'TotalCharge'));
                        });
                    }
                    for(let index = 0;index < this.tabGenerationBuyList.length; index++){
                        this.GenerationBuyMonthly(this.tabGenerationBuyList[index]).then(res => {
                            this.GenerationBuyMonthlyChartData.splice(index, 0, this.BarDataBind(res.data, '代买收入', '金额', '元', 'Dates', 'TotalPurchaseCharge'));
                        });
                    }
                    tmpPosts = null;
                    this.$emit('closeLoad');
                }
            ))
        },
        beforeDestroy() {
            if(this.TransferMonthlySwiper){
                this.TransferMonthlySwiper.destroy();
            }

            if(this.GenerationBuyMonthlySwiper){
                this.GenerationBuyMonthlySwiper.destroy();
            }

            this.TransferMonthlySwiper = null;
            this.GenerationBuyMonthlySwiper = null;
            this.TransferMonthlySwiperOption = null;
            this.GenerationBuyMonthlySwiperOption = null;

            this.TransferCountryTableData = null;
            this.GenerationBuyCurrencyTableData = null;
            this.TransferMonthlyChartData = null;
            this.GenerationBuyMonthlyChartData = null;

            this.TransferCountryChartData = null;
            this.GenerationBuyCurrencyChartData = null;

        },
        methods: {
            //异步接口
            MonthlyIncomeAxios: function () {
                return this.$http.get(this.urlMonthlyIncome)
            },
            TransferGenerationBuyProportionAxios: function () {
                return this.$http.get(this.urlTransferGenerationBuyProportion);
            },
            TransferMonthlyAxios: function (createCenterCode) {
                return this.$http.get(this.urlTransferMonthly + createCenterCode);
            },
            TransferCountryAxios: function () {
                return this.$http.get(this.urlTransferCountry);
            },
            GenerationBuyMonthly: function (currency) {
                return this.$http.get(this.urlGenerationBuyMonthly + currency);
            },
            GenerationBuyCurrencyAxios: function () {
                return this.$http.get(this.urlGenerationBuyCurrency);
            },

            //图表数据绑定
            BarDataBind(data, title, childTitle, unit, xListProp, yListProp) {
                let tmpData = this.global.$function.chart.normalBarBind(data, title, childTitle, unit, xListProp, yListProp);
                return this.global.$variable.echartStyles.normalBar(tmpData, echarts);
            },
            normalCircleDataBind(data, scale, title, childName, names, valueProps) {
                let tmpData = this.global.$function.chart.normalCircleBind(data, scale, title, childName, names, valueProps);
                return this.global.$variable.echartStyles.normalCircle(tmpData);
            },
            simpleCircleDataBind(data, title, subText, names, valueProps) {
                let tmpData = this.global.$function.chart.simpleCircleBind(data, title, subText, names, valueProps);
                return this.global.$variable.echartStyles.simpleCircle(tmpData);
            },

            //表格数据绑定
            TableDataBind($, handleData, data, nameProp, valueProp) {
                let total = 0;

                data.forEach(function (item) {
                    total += Number(item[valueProp]);
                });
                data.forEach(function (item) {
                    let tmpData = {
                        name: '',
                        value: 0,
                        percentage: ''
                    };

                    tmpData.name = item[nameProp];
                    tmpData.value = Number(item[valueProp]);
                    tmpData.percentage = $.global.$function.calculator.ToFixed(((tmpData.value) / total) * 100, 2);
                    handleData.push(tmpData);

                    tmpData = null;
                });

                total = null;
            },

            //Swiper到下一页
            jumpByIndex(swiper, index) {
                swiper.slideTo(index);
            }
        },
        components: {
            echarts,
            chart,
            swiper,
            swiperSlide
        }
    };
</script>
