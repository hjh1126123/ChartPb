<!--
 父组件：当日收入  如果要echarts轮播，可以直接使用封装好的echarts.vue组件;
 bottomBarSwiper:swiper底部左边实例
 bottomBar2Swiper:swiper底部右边边实例
 tabList:轮播的banner["日本"，"美国"]
-->
<template>
  <div class="income">
    <section class="content">
      <div class="row header">
        <div class="header-content">
          <div class="row">
            <div class="row title">
              <p class="h4 text-aqua">财政监控</p>
            </div>
          </div>
          <div class="row">
            <div class="left-contain col-md-6 col-sm-12 col-xs-12">
              <div class="row Childtitle">
                <p class="h4 text-aqua" style="">总收入月详情</p>
              </div>
              <div class="row">
                <div class="bar" style="width: 100%;height: 300px;" ref="topBar"></div>
              </div>
            </div>
            <div class="right-contain col-md-6 col-sm-12 col-xs-12">
              <div class="row Childtitle">
                <p class="h4 text-aqua" style="">总收入占比</p>
              </div>
              <div class="circle" style="width: 100%;" ref="topPie"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom-contain">
        <div class="bottom-left col-md-6 col-sm-12 col-xs-12">
          <div class="row title">
            <p class="h4 text-aqua">转运月收入详情</p>
          </div>
          <div class="row">
            <div class="left-contain col-md-8 col-sm-12 col-xs-12">
              <div class="row">
                <div class="bottom-nav">
                  <div class="col-md-2 col-sm-4 col-xs-6 tablist"
                       :class="{'active-index':swiperA.activeIndex==index}"
                       v-for="(item,index) in tabTransferList"
                       :key="index" @click="jumpByIndex(swiperA,index)">{{item}}
                  </div>
                </div>
              </div>
              <div class="row">
                <swiper :options="swiperOptionA" ref="bottomBarSwiper">
                  <swiper-slide v-for="(item,index) in tabTransferList" :key="index">
                    <div class="bar" style="width: 95%" ref='bottomBar' v-on:mouseenter="intervalBAGo = false"
                         v-on:mouseleave="intervalBAGo = true"></div>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                  <div class="swiper-scrollbar" slot="scrollbar"></div>
                </swiper>
              </div>
            </div>
            <div class="right-contain col-md-4 col-sm-12 col-xs-12 col-md-offset-0 col-sm-offset-0 col-xs-offset-0">
              <div class="row">
                <div class="circle" style="width:100%;height: 180px;" ref="bottomPie"
                     v-on:mouseenter="intervalPAGo = false;CircleStop(bottomCircleA,indexPA,TransferCountry.length)"
                     v-on:mouseleave="intervalPAGo = true"></div>
              </div>
              <div class="row">
                <div class="tableMain">
                  <table class="animated fadeInDown" v-for="(item,index) in TransferCountry" :key="index">
                    <tr class="tbTitle" v-if="index <= 0">
                      <th>{{item.name}}</th>
                      <th>{{item.value}}</th>
                      <th>{{item.percentage}}</th>
                    </tr>
                    <tr class="tbContext" v-if="index > 0">
                      <td>{{item.name}}</td>
                      <td>{{item.value}}</td>
                      <td>{{item.percentage}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottom-right col-md-6 col-sm-12 col-xs-12 ">
          <div class="row title">
            <p class="h4 text-aqua" style="">代买月收入详情</p>
          </div>
          <div class="row">
            <div class="left-contain col-md-8 col-sm-12 col-xs-12">
              <div class="row">
                <div class="bottom-nav">
                  <div class="row">
                    <div class="col-md-2 col-sm-4 col-xs-6 tablist"
                         :class="{'active-index':swiperB.activeIndex==index}"
                         v-for="(item,index) in tabGenerationBuyList"
                         :key="index" @click="jumpByIndex(swiperB,index)">{{item}}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <swiper :options="swiperOptionB" ref="bottomBar2Swiper">
                  <swiper-slide v-for="(item,index) in tabGenerationBuyList" :key="index">
                    <div class="bar" style="width: 95%" ref='bottomBar2' v-on:mouseenter="intervalBBGo = false"
                         v-on:mouseleave="intervalBBGo = true"></div>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
                  <div class="swiper-button-prev" slot="button-prev"></div>
                  <div class="swiper-button-next" slot="button-next"></div>
                  <div class="swiper-scrollbar" slot="scrollbar"></div>
                </swiper>
              </div>
            </div>
            <div class="right-contain col-md-4 col-sm-12 col-xs-12 col-md-offset-0 col-sm-offset-0 col-xs-offset-0">
              <div class="row">
                <div class="circle" style="width:100%;height: 180px;" ref="bottomPie2"
                     v-on:mouseenter="intervalPBGo=false;CircleStop(bottomCircleB,indexPB,GenerationBuyCurrency.length)"
                     v-on:mouseleave="intervalPBGo = true"></div>
              </div>
              <div class="row">
                <div class="tableMain">
                  <table class="animated fadeInDown" v-for="(item,index) in GenerationBuyCurrency" :key="index">
                    <tr class="tbTitle" v-if="index <= 0">
                      <th>{{item.name}}</th>
                      <th>{{item.value}}</th>
                      <th>{{item.percentage}}</th>
                    </tr>
                    <tr class="tbContext" v-if="index > 0">
                      <td>{{item.name}}</td>
                      <td>{{item.value}}</td>
                      <td>{{item.percentage}}</td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import style from './income.styl'
  import "swiper/dist/css/swiper.css";

  import axios from "axios";
  import {swiper, swiperSlide} from "vue-awesome-swiper";
  import echarts from "echarts";

  import {url, urlapi} from "../../api/config.js";

  export default {
    data() {
      return {
        swiperOptionA: {
          notNextTick: true,
          autoplay: false,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          observer: true,
          observeParents: false,
          slidesPerGroup: 1
        },
        swiperOptionB: {
          notNextTick: true,
          autoplay: false,
          prevButton: '.swiper-button-prev',
          nextButton: '.swiper-button-next',
          observer: true,
          observeParents: false
        },

        xList: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        urlMonthlyIncome: urlapi + '/Finance/MonthlyIncome',
        urlTransferGenerationBuyProportion: urlapi + '/Finance/TransferGenerationBuyProportion',
        urlTransferCountry: urlapi + '/Finance/TransferCountry',
        urlGenerationBuyCurrency: urlapi + '/Finance/GenerationBuyCurrency',
        urlTransferMonthly: urlapi + '/Finance/TransferMonthly?centerCode=',
        urlGenerationBuyMonthly: urlapi + '/Finance/GenerationBuyMonthly?currency=',
        tabTransferList: ['总数', '美国', '日本', '澳洲', '德国', '英国'],
        tabGenerationBuyList: ['总数', '美元', '日元', '澳元', '欧元', '英镑'],
        TransferCountry: [],
        GenerationBuyCurrency: [],

        swiperA: {},
        swiperB: {},

        intervalBA: null,
        intervalBAGo: true,
        intervalBB: null,
        intervalBBGo: true,
        intervalPA: null,
        intervalPAGo: true,
        indexPA: 0,
        intervalPB: null,
        intervalPBGo: true,
        indexPB: 0,

        bottomCircleA: null,
        bottomCircleB: null
      };
    },
    created() {

    },
    mounted: function () {
      let $ = this;
      setTimeout(() => {

        axios.all([this.TransferCountryAxios(), this.GenerationBuyCurrencyAxios()]).then(axios.spread(function (transferCountry, GenerationBuyCurrency) {
          setTimeout(() => {
            $.bottomCircleA = echarts.init($.$refs.bottomPie);
            $.setBottomCircle($.bottomCircleA, transferCountry.data, $.TransferCountry, 'Country', 'TotalCharge', {
              name: '国家',
              value: '金钱',
              percentage: '占比'
            });
            $.bottomCircleB = echarts.init($.$refs.bottomPie2);
            $.setBottomCircle($.bottomCircleB, GenerationBuyCurrency.data, $.GenerationBuyCurrency, 'Currency', 'TotalPurchaseCharge', {
              name: '币种',
              value: '金钱',
              percentage: '占比'
            });

            setTimeout(() => {
              $.intervalPA = setInterval(() => {
                if ($.intervalPAGo) {
                  if ($.indexPA > $.TransferCountry.length - 3)
                    $.indexPA = 0;
                  $.CircleGo($.bottomCircleA, $.indexPA, $.TransferCountry.length);
                  $.indexPA++;
                }
              }, 2000);

              $.intervalPB = setInterval(() => {
                if ($.intervalPBGo) {
                  if ($.indexPB > $.GenerationBuyCurrency.length - 3)
                    $.indexPB = 0;
                  $.CircleGo($.bottomCircleB, $.indexPB, $.GenerationBuyCurrency.length);
                  $.indexPB++;
                }
              }, 2000);

            }, 500);
          }, 2500);


          $.$nextTick(function () {

            $.topBar = echarts.init($.$refs.topBar);
            setTimeout(() => {
              axios.post($.urlMonthlyIncome)
                .then(res => {
                  let args = ['PayDate', 'TotalCharge'];
                  let opts = {
                    childTitle: '总收入',
                    xList: $.xList,
                    unit: '元人民币'
                  };
                  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                    $.setBar($.topBar, res, args, opts, {x: '15%'});
                  } else {
                    $.setBar($.topBar, res, args, opts, {x: '8%'});
                  }
                });
            }, 500);

            $.topCircle = echarts.init($.$refs.topPie);
            setTimeout(() => {
              $.setTopCircle($.topCircle, $.urlTransferGenerationBuyProportion);
            }, 1500);

            setTimeout(() => {
              $.tabTransferList.forEach(function (item, index) {
                setTimeout(() => {
                  let bottomBar = echarts.init($.$refs.bottomBar[index]);
                  axios.post($.urlTransferMonthly + item)
                    .then(res => {
                      let args = ['PayDate', 'TotalCharge'];
                      let opts = {
                        childTitle: '转运收入',
                        xList: $.xList,
                        unit: '元人民币'
                      };
                      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                        $.setBar(bottomBar, res, args, opts, {x: '15%'});
                      } else {
                        $.setBar(bottomBar, res, args, opts, {x: '8%'});
                      }
                    });
                }, 2000 * index);
              });

              $.tabGenerationBuyList.forEach(function (item, index) {
                setTimeout(() => {
                  let bottomBar = echarts.init($.$refs.bottomBar2[index]);
                  axios.post($.urlGenerationBuyMonthly + item)
                    .then(res => {
                      let args = ['Dates', 'TotalPurchaseCharge'];
                      let opts = {
                        childTitle: '代买收入',
                        xList: $.xList,
                        unit: '元人民币'
                      };
                      if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
                        $.setBar(bottomBar, res, args, opts, {x: '15%'});
                      } else {
                        $.setBar(bottomBar, res, args, opts, {x: '8%'});
                      }
                    });
                }, 2000 * index);
              });

              $.swiperA = $.$refs.bottomBarSwiper.swiper;
              $.swiperB = $.$refs.bottomBar2Swiper.swiper;

              $.intervalBA = setInterval(() => {
                if ($.intervalBAGo) {
                  if ($.swiperA.activeIndex < $.tabTransferList.length - 1) {
                    $.jumpByIndex($.swiperA, ($.swiperA.activeIndex + 1));
                  } else {
                    $.jumpByIndex($.swiperA, 0);
                  }
                }
              }, 5000);
              $.intervalBB = setInterval(() => {
                if ($.intervalBBGo) {
                  if ($.swiperB.activeIndex < $.tabGenerationBuyList.length - 1) {
                    $.jumpByIndex($.swiperB, ($.swiperB.activeIndex + 1));
                  } else {
                    $.jumpByIndex($.swiperB, 0);
                  }
                }
              }, 5000);

            }, 2000);
          });
        }));
      }, 0);
    },
    beforeDestroy() {
      if (this.intervalBA)
        clearInterval(this.intervalBA);
      if (this.intervalBB)
        clearInterval(this.intervalBB);
      if (this.intervalPA)
        clearInterval(this.intervalPA);
      if (this.intervalPB)
        clearInterval(this.intervalPB);
      if (swiper) {
        if (swiper.destroy && swiper.initialized === true) {
          swiper.destroy();
        }
      }
    },
    methods: {
      //异步数据
      TransferCountryAxios: function () {
        return axios.post(this.urlTransferCountry);
      },
      GenerationBuyCurrencyAxios: function () {
        return axios.post(this.urlGenerationBuyCurrency);
      },

      //图表构建
      setBar(chart, res, args, opts, otherOpts) {
        this.chartShowLoading(chart);
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
          chart.setOption(this.GLOBAL.echartStyles.normalBar(data), false);
          window.addEventListener("resize", function () {
            chart.resize();
          });
        }
      },
      setTopCircle(chart, url) {
        this.chartShowLoading(chart);
        axios.post(url)
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
              chart.setOption(this.GLOBAL.echartStyles.normalCircle(data), false);
              window.addEventListener("resize", function () {
                chart.resize();
              });
            }
          });
      },
      setBottomCircle(chart, data, dataList, dataListName, dataListValue, dataListTitle) {
        let tmpDataList = this.CircleFormat(data, dataListName, dataListValue);
        for (let tmpData of tmpDataList) {
          dataList.push(tmpData);
        }
        chart.setOption(this.GLOBAL.echartStyles.simpleCircle({
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
          value: this.common.calculator.ToFixed(total, 2),
          percentage: '100%'
        };
        dataList.unshift(sum);
        dataList.unshift(dataListTitle);
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
      PercentageB(arr, name, value) {
        let total = 0;
        let tmpArr = [];
        for (let a of arr) {
          let tmpObj = {};
          tmpObj.name = name !== null ? a[name] : '未知';
          tmpObj.value = value !== null ? Number(a[value]) : 0;
          tmpArr.push(tmpObj);
          total += Number(a[value]);
        }
        if (total === 0)
          total++;
        for (let a of tmpArr) {
          a.value = (a.value / total) * 100;
        }
        return tmpArr;
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
          a.percentage = this.common.calculator.ToFixed((a.value / total * 100), 2) + '%';
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
        chart.dispatchAction({type: 'downplay'});
        chart.dispatchAction({type: 'pieUnSelect', dataIndex: index - 1 < 0 ? max - 2 : index - 1});
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
