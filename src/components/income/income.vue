<template>
    <v-container grid-list-md text-xs-center text-sm-center class="pt-1">
        <v-layout row wrap>
            <v-flex xs12 sm12>
                <v-card>
                    <v-card-text class="text-xs-center">
                        <h1>财务监控</h1>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-text class="text-xs-center">
                        <h3>总收入/月</h3>
                    </v-card-text>
                    <v-card-text>
                        <div style="width: 100%;height: 250px;" ref="topBar"></div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-card-text class="text-xs-center">
                        <h3>总收入占比</h3>
                    </v-card-text>
                    <v-card-text>
                        <div style="width: 100%; height: 250px;" ref="topPie"></div>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-container grid-list-md text-xs-center text-sm-center class="pa-0">
                        <v-layout row wrap>
                            <v-flex xs12 sm7>
                                <v-card v-on:mouseenter="intervalTransferCountryBarGo = false"
                                        v-on:mouseleave="intervalTransferCountryBarGo = true">
                                    <v-card-text class="text-xs-center">
                                        <h3>[{{tabTransferList[tabIndexTransferCountry]}}]转运收入/月</h3>
                                        <v-tabs grow v-model="tabIndexTransferCountry"
                                                v-if="tabTransferList.length > 0">
                                            <v-tab v-for="(item,index) in tabTransferList" :key="index"
                                                   v-on:click="jumpByIndex(swiperTransferCountryMonthly,index)">
                                                {{item}}
                                            </v-tab>
                                        </v-tabs>
                                    </v-card-text>
                                    <v-card-text>
                                        <swiper :options="swiperOptionA" ref="bottomBarSwiper"
                                                v-if="tabTransferList.length > 0">
                                            <swiper-slide v-for="(item,index) in tabTransferList" :key="index">
                                                <div style="width: 95%; height: 330px;" ref='bottomBar'></div>
                                            </swiper-slide>
                                            <div class="swiper-button-prev" slot="button-prev"></div>
                                            <div class="swiper-button-next" slot="button-next"></div>
                                        </swiper>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-card class="elevation-8"
                                        v-on:mouseenter="intervalTransferCountryCircleGo = false;CircleStop(bottomCircleTransferCountry,indexTransferCountryCircle,TransferCountry.length)"
                                        v-on:mouseleave="intervalTransferCountryCircleGo = true">
                                    <div style="width:100%;height: 130px;" ref="bottomPie">
                                    </div>
                                </v-card>
                                <transition name="bounce" mode="out-in" enter-active-class="animated fadeIn"
                                            leave-active-class="animated hinge">
                                    <v-data-table
                                            :headers="headersTransferCountry"
                                            :items="TransferCountry"
                                            hide-actions
                                            class="elevation-1"
                                            no-data-text="数据为空"
                                            v-if="TransferCountry.length > 0"
                                    >
                                        <template slot="items" slot-scope="props">
                                            <td class="caption text-xs-left">{{ props.item.name }}</td>
                                            <td class="caption text-xs-left">{{ props.item.value }}</td>
                                            <td class="caption text-xs-left">{{ props.item.percentage }}</td>
                                        </template>
                                    </v-data-table>
                                </transition>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6>
                <v-card>
                    <v-container grid-list-md text-xs-center text-sm-center class="pa-0">
                        <v-layout row wrap>
                            <v-flex xs12 sm7>
                                <v-card v-on:mouseenter="intervalGenerationBuyBarGo = false"
                                        v-on:mouseleave="intervalGenerationBuyBarGo = true">
                                    <v-card-text class="text-xs-center">
                                        <h3>[{{tabGenerationBuyList[tabIndexGenerationBuyCurrency]}}]代买收入/月</h3>
                                        <v-tabs grow v-model="tabIndexGenerationBuyCurrency"
                                                v-if="tabGenerationBuyList.length > 0">
                                            <v-tab v-for="(item,index) in tabGenerationBuyList" :key="index"
                                                   v-on:click="jumpByIndex(swiperGenerationBuyMonthly,index)">
                                                {{item}}
                                            </v-tab>
                                        </v-tabs>
                                    </v-card-text>
                                    <v-card-text>
                                        <swiper :options="swiperOptionB" ref="bottomBar2Swiper"
                                                v-if="tabGenerationBuyList.length > 0">
                                            <swiper-slide v-for="(item,index) in tabGenerationBuyList" :key="index">
                                                <div style="width: 95%;height: 330px;" ref='bottomBar2'></div>
                                            </swiper-slide>
                                            <div class="swiper-button-prev" slot="button-prev"></div>
                                            <div class="swiper-button-next" slot="button-next"></div>
                                        </swiper>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                            <v-flex xs12 sm5>
                                <v-card class="elevation-8">
                                    <div style="width:100%;height: 130px;" ref="bottomPie2"
                                         v-on:mouseenter="intervalTransferCountryCircleGo = false;CircleStop(bottomCircleTransferCountry,indexTransferCountryCircle,TransferCountry.length)"
                                         v-on:mouseleave="intervalTransferCountryCircleGo = true">
                                    </div>
                                </v-card>
                                <transition name="bounce" mode="out-in" enter-active-class="animated fadeIn"
                                            leave-active-class="animated hinge">
                                    <v-data-table
                                            :headers="headersGenerationBuyCurrency"
                                            :items="GenerationBuyCurrency"
                                            hide-actions
                                            class="elevation-1"
                                            no-data-text="数据为空"
                                            v-if="GenerationBuyCurrency.length > 0"
                                    >
                                        <template slot="items" slot-scope="props">
                                            <td>{{ props.item.name }}</td>
                                            <td class="text-xs-left">{{ props.item.value }}</td>
                                            <td class="text-xs-left">{{ props.item.percentage }}</td>
                                        </template>
                                    </v-data-table>
                                </transition>
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

    export default {
        data() {
            return {
                swiperOptionA: {
                    notNextTick: true,
                    autoplay: false,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            let $ = this;
                            $.tabIndexTransferCountry = $.swiperTransferCountryMonthly.activeIndex;
                        }
                    },
                    observer: true,
                    observeParents: false,
                    slidesPerGroup: 1
                },
                swiperOptionB: {
                    notNextTick: true,
                    autoplay: false,
                    allowTouchMove: false,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    on: {
                        slideChangeTransitionStart: () => {
                            let $ = this;
                            $.tabIndexGenerationBuyCurrency = $.swiperGenerationBuyMonthly.activeIndex;
                        }
                    },
                    observer: true,
                    observeParents: false
                },

                headersTransferCountry: [
                    {
                        text: '国家',
                        align: 'center',
                        sortable: false,
                        value: 'STName'
                    },
                    {text: '金额', value: 'value'},
                    {text: '占比', value: 'percentage'}
                ],
                headersGenerationBuyCurrency: [
                    {
                        text: '币种',
                        align: 'center',
                        sortable: false,
                        value: 'name'
                    },
                    {text: '金额', value: 'value'},
                    {text: '占比', value: 'percentage'},
                ],

                urlMonthlyIncome: this.apiUrl + '/Finance/MonthlyIncome',
                urlTransferGenerationBuyProportion: this.apiUrl + '/Finance/TransferGenerationBuyProportion',
                urlTransferCountry: this.apiUrl + '/Finance/TransferCountry',
                urlGenerationBuyCurrency: this.apiUrl + '/Finance/GenerationBuyCurrency',
                urlTransferMonthly: this.apiUrl + '/Finance/TransferMonthly?centerCode=',
                urlGenerationBuyMonthly: this.apiUrl + '/Finance/GenerationBuyMonthly?currency=',

                xList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                TransferCountry: [],
                tabIndexTransferCountry: 0,
                tabTransferList: ['总数', '美国', '日本', '澳洲', '德国', '英国'],

                tabGenerationBuyList: ['总数', '美元', '日元', '澳元', '欧元', '英镑'],
                GenerationBuyCurrency: [],
                tabIndexGenerationBuyCurrency: 0,

                swiperTransferCountryMonthly: {},
                bottomCircleTransferCountry: null,

                swiperGenerationBuyMonthly: {},
                bottomCircleGenerationBuy: null,

                intervalTransferCountryBar: null,
                intervalTransferCountryBarGo: true,

                intervalGenerationBuyBar: null,
                intervalGenerationBuyBarGo: true,

                intervalTransferCountryCircle: null,
                intervalTransferCountryCircleGo: true,
                indexTransferCountryCircle: 0,

                intervalGenerationBuyCircle: null,
                intervalGenerationBuyCircleGo: true,
                indexGenerationBuyCircle: 0,

                setTimeOutInThisPage: []
            };
        },
        created() {

        },
        mounted: function () {
            let $ = this;
            $.setTimeOutInThisPage.push(setTimeout(() => {
                $.$store.state.requests.push(
                    $.$http.all([this.TransferCountryAxios(), this.GenerationBuyCurrencyAxios()]).then(
                        $.$http.spread(
                            function (transferCountry, GenerationBuyCurrency) {
                                $.setTimeOutInThisPage.push(setTimeout(() => {
                                    $.bottomCircleTransferCountry = echarts.init($.$refs.bottomPie);
                                    $.setBottomCircle($.bottomCircleTransferCountry, transferCountry.data, $.TransferCountry, 'Country', 'TotalCharge');
                                    $.bottomCircleGenerationBuy = echarts.init($.$refs.bottomPie2);
                                    $.setBottomCircle($.bottomCircleGenerationBuy, GenerationBuyCurrency.data, $.GenerationBuyCurrency, 'Currency', 'TotalPurchaseCharge');

                                    $.setTimeOutInThisPage.push(setTimeout(() => {
                                        $.intervalTransferCountryCircle = setInterval(() => {
                                            if ($.intervalTransferCountryCircle === 0)
                                                return;

                                            if ($.intervalTransferCountryCircleGo) {
                                                if ($.indexTransferCountryCircle > $.TransferCountry.length - 3)
                                                    $.indexTransferCountryCircle = 0;
                                                $.CircleGo($.bottomCircleTransferCountry, $.indexTransferCountryCircle, $.TransferCountry.length);
                                                $.indexTransferCountryCircle++;
                                            }
                                        }, 2000);

                                        $.intervalGenerationBuyCircle = setInterval(() => {
                                            if ($.intervalGenerationBuyCircle === 0)
                                                return;

                                            if ($.intervalGenerationBuyCircleGo) {
                                                if ($.indexGenerationBuyCircle > $.GenerationBuyCurrency.length - 3)
                                                    $.indexGenerationBuyCircle = 0;
                                                $.CircleGo($.bottomCircleGenerationBuy, $.indexGenerationBuyCircle, $.GenerationBuyCurrency.length);
                                                $.indexGenerationBuyCircle++;
                                            }
                                        }, 2000);
                                    }, 500));
                                }, 2500));
                                $.$nextTick(function () {
                                    $.topBar = echarts.init($.$refs.topBar);
                                    $.setTimeOutInThisPage.push(setTimeout(() => {
                                        $.$store.state.requests.push(
                                            $.$http.post($.urlMonthlyIncome)
                                                .then(res => {
                                                    let args = ['PayDate', 'TotalCharge'];
                                                    let opts = {
                                                        childTitle: '总收入',
                                                        xList: $.xList,
                                                        unit: '元人民币'
                                                    };
                                                    if ($.global.judge.global.isMobile()) {
                                                        $.setBarData($.topBar, res, args, opts, {x: '15%'});
                                                    } else {
                                                        $.setBarData($.topBar, res, args, opts, {x: '8%'});
                                                    }
                                                }));
                                    }, 500));

                                    $.topCircle = echarts.init($.$refs.topPie);
                                    $.setTimeOutInThisPage.push(setTimeout(() => {
                                        $.setTopCircle($.topCircle, $.urlTransferGenerationBuyProportion);
                                    }, 1500));

                                    $.setTimeOutInThisPage.push(setTimeout(() => {
                                        $.tabTransferList.forEach(function (item, index) {
                                            $.setTimeOutInThisPage.push(setTimeout(() => {
                                                let bottomBar = echarts.init($.$refs.bottomBar[index]);
                                                $.$store.state.requests.push(
                                                    $.$http.post($.urlTransferMonthly + item)
                                                        .then(res => {
                                                            let args = ['PayDate', 'TotalCharge'];
                                                            let opts = {
                                                                title: item,
                                                                childTitle: '转运收入',
                                                                xList: $.xList,
                                                                unit: '元人民币'
                                                            };
                                                            $.setBarData(bottomBar, res, args, opts, {x: '15%'});
                                                        }));
                                            }, 2000 * index));
                                        });
                                        $.tabGenerationBuyList.forEach(function (item, index) {
                                            $.setTimeOutInThisPage.push(setTimeout(() => {
                                                let bottomBar = echarts.init($.$refs.bottomBar2[index]);
                                                $.$store.state.requests.push(
                                                    $.$http.post($.urlGenerationBuyMonthly + item)
                                                        .then(res => {
                                                            let args = ['Dates', 'TotalPurchaseCharge'];
                                                            let opts = {
                                                                title: item,
                                                                childTitle: '代买收入',
                                                                xList: $.xList,
                                                                unit: '元人民币'
                                                            };
                                                            $.setBarData(bottomBar, res, args, opts, {x: '15%'});
                                                        }));
                                            }, 2000 * index));
                                        });

                                        $.swiperTransferCountryMonthly = $.$refs.bottomBarSwiper.swiper;
                                        $.swiperGenerationBuyMonthly = $.$refs.bottomBar2Swiper.swiper;

                                        $.intervalTransferCountryBar = setInterval(() => {
                                            if ($.intervalTransferCountryBar === 0)
                                                return;
                                            if ($.intervalTransferCountryBarGo) {
                                                if ($.swiperTransferCountryMonthly.activeIndex < $.tabTransferList.length - 1) {
                                                    $.jumpByIndex($.swiperTransferCountryMonthly, ($.swiperTransferCountryMonthly.activeIndex + 1));
                                                } else {
                                                    $.jumpByIndex($.swiperTransferCountryMonthly, 0);
                                                }
                                            }
                                        }, 5000);
                                        $.intervalGenerationBuyBar = setInterval(() => {
                                            if ($.intervalGenerationBuyBar === 0)
                                                return;
                                            if ($.intervalGenerationBuyBarGo) {
                                                if ($.swiperGenerationBuyMonthly.activeIndex < $.tabGenerationBuyList.length - 1) {
                                                    $.jumpByIndex($.swiperGenerationBuyMonthly, ($.swiperGenerationBuyMonthly.activeIndex + 1));
                                                } else {
                                                    $.jumpByIndex($.swiperGenerationBuyMonthly, 0);
                                                }
                                            }
                                        }, 5000);
                                    }, 2000));
                                });
                            })));
            }, 0));
        },
        beforeDestroy() {
            this.setTimeOutInThisPage.forEach(function (item, index) {
                clearTimeout(item);
            });

            this.intervalTransferCountryBarGo = false;
            this.intervalGenerationBuyBarGo = false;
            this.intervalTransferCountryCircleGo = false;
            this.intervalGenerationBuyCircleGo = false;
            if (this.intervalTransferCountryBar) {
                clearInterval(this.intervalTransferCountryBar);
                this.intervalTransferCountryBar = 0;
            }
            if (this.intervalGenerationBuyBar) {
                clearInterval(this.intervalGenerationBuyBar);
                this.intervalGenerationBuyBar = 0;
            }
            if (this.intervalTransferCountryCircle) {
                clearInterval(this.intervalTransferCountryCircle);
                this.intervalTransferCountryCircle = 0;
            }
            if (this.intervalGenerationBuyCircle) {
                clearInterval(this.intervalGenerationBuyCircle);
                this.intervalGenerationBuyCircle = 0;
            }
            if (swiper) {
                if (swiper.destroy && swiper.initialized === true) {
                    swiper.destroy();
                }
            }
        },
        methods: {
            TransferCountryAxios: function () {
                return this.$http.post(this.urlTransferCountry);
            },
            GenerationBuyCurrencyAxios: function () {
                return this.$http.post(this.urlGenerationBuyCurrency);
            },
            //图表构建
            setBarData(chart, res, args, opts, otherOpts) {
                let data = {};
                data.xList = [];
                data.yList = [];
                if (res.data.length > 0) {
                    res.data.forEach(function (item) {
                        data.xList.push(item[args[0]]);
                        data.yList.push(item[args[1]]);
                    });
                    chart.hideLoading();
                    if (opts) {
                        let tmpD = data;
                        data = Object.assign(tmpD, opts);
                        if (otherOpts) {
                            data = Object.assign(data, otherOpts);
                        }
                    }
                    chart.setOption(this.global.variable.echartStyles.normalBar(data, echarts), false);
                    window.addEventListener("resize", function () {
                        chart.resize();
                    });
                }
            },
            setTopCircle(chart, url) {
                this.chartShowLoading(chart);
                this.$store.state.requests.push(
                    this.$http.post(url)
                        .then(res => {
                            if (res.data.length > 0) {
                                let arr = this.PercentageA(res.data, ['转运', '代买'], ['TotalCharge', 'TotalPurchaseCharge']);
                                let data = {
                                    chart: chart,
                                    data: arr,
                                    title: '总收入',
                                    childName: '总收入'
                                };
                                chart.hideLoading();
                                chart.setOption(this.global.variable.echartStyles.normalCircle(data), false);
                                window.addEventListener("resize", function () {
                                    chart.resize();
                                });
                            }
                        }));
            },
            setBottomCircle(chart, data, dataList, dataListName, dataListValue, dataListTitle) {
                let tmpDataList = this.CircleFormat(data, dataListName, dataListValue);
                for (let tmpData of tmpDataList) {
                    dataList.push(tmpData);
                }
                chart.setOption(this.global.variable.echartStyles.simpleCircle({
                    data: dataList
                }));
                window.addEventListener("resize", function () {
                    chart.resize();
                });
                let total = 0;
                dataList.forEach(function (item) {
                    total += Number(item.value);
                });
                let sum = {
                    name: '总数',
                    value: this.global.common.calculator.ToFixed(total, 2),
                    percentage: '100%'
                };
                dataList.unshift(sum);
                if (dataListTitle) {
                    dataList.unshift(dataListTitle);
                }
            },
            //数据处理
            PercentageA(arr, names, args) {
                let tempArr = [];
                if (Array.isArray(names)
                    && Array.isArray(args)
                    && names.length === args.length) {
                    for (let i = 0; i < arr.length; i++) {
                        let total = 0;
                        for (let j = 0; j < args.length; j++) {
                            total += Number(arr[i][args[j]]);
                        }
                        for (let j = 0; j < names.length; j++) {
                            let temp = {};
                            temp.name = names[j];
                            let tmpValue = Number(arr[i][args[j]]);
                            temp.value = tmpValue;
                            tempArr.push(temp);
                        }
                    }
                }
                return tempArr;
            },
            CircleFormat(arr, name, value) {
                let total = 0;
                let tmpArr = [];
                for (let a of arr) {
                    let tmpObj = {};
                    tmpObj.name = name !== null ? a[name] : '未知';
                    tmpObj.value = value !== null ? Number(a[value]) : 0;
                    tmpObj.percentage = '';
                    tmpArr.push(tmpObj);
                    total += Number(a[value]);
                }
                if (total === 0)
                    total++;
                for (let a of tmpArr) {
                    a.percentage = this.global.common.calculator.ToFixed((a.value / total * 100), 2) + '%';
                }
                return tmpArr;
            },
            //Swiper到下一页
            jumpByIndex(swiper, index) {
                swiper.slideTo(index);
            },
            //circle轮播
            CircleGo(chart, index, dataLength) {
                chart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: index - 1 < 0 ? dataLength - 3 : index - 1
                });
                chart.dispatchAction({
                    type: 'pieToggleSelect',
                    seriesIndex: 0,
                    dataIndex: index
                });
                chart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: index
                });
            },
            CircleStop(chart, index, max) {
                if (chart) {
                    chart.dispatchAction({type: 'downplay'});
                    chart.dispatchAction({type: 'pieUnSelect', dataIndex: index - 1 < 0 ? max - 2 : index - 1});
                }
            },
            //ehcarts扩展
            chartShowLoading(chart) {
                chart.showLoading({
                    text: '图表载入中',
                    color: '#ba38cc',
                    textColor: '#d6921e',
                    maskColor: 'rgba(128, 128, 128, 0)',
                    zlevel: 0
                });
            }
        },
        components: {
            echarts,
            swiper,
            swiperSlide
        }
    };
</script>
