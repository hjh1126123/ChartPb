<template>
    <v-container text-xs-center fluid class="pt-0 mt-0">
        <v-layout row wrap>
            <v-flex xs12>
                <v-layout row wrap>
                    <v-flex v-for="(item,i) in buttons" :key="i" xs2 class="pa-1">
                        <v-btn block @click="onClick(i)" :color="item">{{GetDate(i)}}</v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs12 class="mt-3">
                <v-card>
                    <v-card-text class="pa-0">
                        <table class="borderTable secondary">
                            <tr>
                                <th class="text-sm-center" style="width: 60px;"></th>
                                <th class="text-sm-center" style="color: #481c1d;">用户</th>
                                <th class="text-sm-center" style="color: #481c1d;">错误环节</th>
                                <th class="text-sm-center" style="color: #481c1d;">错误描述</th>
                            </tr>
                        </table>
                    </v-card-text>
                    <v-card-text class="pa-0" style="max-height: 75vh;overflow-y: auto;" v-if="ExItems.length > 0">
                        <table class="hoverTable">
                            <tr v-for="(item,index) in ExItems" :key="index" :class="item.State()">
                                <template v-if="item.onlyshowDates">
                                    <td style="width: 60px;"></td>
                                    <td v-if="item.Dates !== ''" class="text-xs-center" :colspan="datePicker === 11 ? 4 : 3">
                                        {{item.Dates}}
                                    </td>
                                    <td v-if="item.UserCode !== ''" class="text-xs-center" :colspan="datePicker === 11 ? 4 : 3">
                                        {{item.UserCode}}
                                    </td>
                                </template>
                                <template v-if="!item.onlyshowDates">
                                    <td style="width: 60px;">
                                        <v-icon>{{item.icon}}</v-icon>
                                    </td>
                                    <td v-if="datePicker === 11" :style="$store.state.color.tableTdColor" class="text-xs-center">
                                        {{item.Date}}
                                    </td>
                                    <td :style="$store.state.color.tableTdColor" class="text-xs-center">
                                        {{item.UserCode}}
                                    </td>
                                    <td :style="$store.state.color.tableTdColor" class="text-xs-center">
                                        {{item.Name}}
                                    </td>
                                    <td :style="$store.state.color.tableTdColor" class="text-xs-center">
                                        {{item.Describe}}
                                    </td>
                                </template>
                            </tr>
                        </table>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        name: "Ex",
        data() {
            return {
                urlUserReconciliationEx: this.apiUrl + '/Finance/UserReconciliationEx',

                urlSimpleReconciliationEx: this.apiUrl + '/Finance/SimpleReconciliationEx',
                urlUserSimpleReconciliationEx: this.apiUrl + '/Finance/UserSimpleReconciliationEx',

                lastBtn: 0,
                buttons: [],
                datePicker: 0,
                ExItems: [],
                datesItems: [],

                toggle_one: 0
            }
        },
        methods: {
            urlSimpleReconciliationExAxios(dateS, dateE) {
                return this.$http.get(`${this.urlSimpleReconciliationEx}?dateStar=${dateS}&dateEnd=${dateE}`);
            },
            urlUserSimpleReconciliationExAxios(dateS, dateE) {
                return this.$http.get(`${this.urlUserSimpleReconciliationEx}?dateStar=${dateS}&dateEnd=${dateE}`);
            },
            onClick(i) {
                this.buttons[this.lastBtn] = 'error';
                this.buttons[i] = 'primary';
                this.datePicker = i;
                this.lastBtn = i;
            },
            /**
             * @return {string}
             */
            GetDate(i) {
                switch (i) {
                    case 0:
                        return '昨天';
                    case 1:
                        return '前天';
                    case 11:
                        return '全部';

                    default:
                        return this.global.$function.dateGet.getBeforeMonth(i + 1);
                }
            },

            FormatUnit(item) {
                let tmpData = {};
                tmpData.Describe = item.Describe;
                tmpData.Name = item.Name;
                tmpData.UserCode = item.UserCode;
                tmpData.Date = item.Dates;
                /**
                 * @return {boolean}
                 */
                tmpData.State = function () {
                    if (tmpData.Describe === '今日无异常') {
                        return 'success';
                    } else {
                        return 'error';
                    }
                };
                if (tmpData.UserCode === '总表') {
                    tmpData.icon = 'ballot';
                } else {
                    tmpData.icon = 'person';
                }
                return tmpData;
            },
            FormatNext(date, userCode) {
                return {
                    Describe: '',
                    Name: name ? name : '',
                    UserCode: userCode ? userCode : '',
                    Dates: date ? date : '',
                    icon: '',
                    onlyshowDates: true,
                    /**
                     * @return {string}
                     */
                    State: function () {
                        return 'transparent';
                    }
                };
            },

            GetData(val) {
                val++;
                let $ = this;
                $.ExItems = [];
                if (val === 12) {
                    let tmpAxios = [
                        $.urlSimpleReconciliationExAxios(11, 1),
                        $.urlUserSimpleReconciliationExAxios(11, 1)
                    ];

                    $.$http.all(tmpAxios).then($.$http.spread((SR, SUR) => {
                        if (SR.data) {
                            $.ExItems.push($.FormatNext(null, '总表'));
                            SR.data.forEach((item) => {
                                $.ExItems.push($.FormatUnit(item));
                            });
                        }
                        if (SUR.data) {
                            $.ExItems.push($.FormatNext(null, '用户表'));
                            SUR.data.forEach((itemUser) => {
                                $.ExItems.push($.FormatUnit(itemUser));
                            });
                        }
                    }));
                } else {
                    let tmpAxios = [
                        $.urlSimpleReconciliationExAxios(val, val),
                        $.urlUserSimpleReconciliationExAxios(val, val)
                    ];

                    $.$http.all(tmpAxios).then($.$http.spread((SR, SUR) => {
                        $.ExItems = [];
                        $.ExItems.push($.FormatNext(this.global.$function.dateGet.getBeforeDate(val)));
                        if (SR.data) {
                            $.ExItems.push($.FormatNext(null, '总表'));
                            SR.data.forEach((item) => {
                                $.ExItems.push($.FormatUnit(item));
                            });
                        }
                        if (SUR.data) {
                            $.ExItems.push($.FormatNext(null, '用户表'));
                            SUR.data.forEach((itemUser) => {
                                $.ExItems.push($.FormatUnit(itemUser));
                            });
                        }
                        $.$emit('closeLoad');
                    }));
                }
            }
        },
        props: {},
        components: {},
        mounted: function () {
            this.$nextTick(() => {
                this.GetData(this.datePicker);
                for (let i = 0; i < 12; i++) {
                    if (i === 0)
                        this.buttons.push('primary');
                    else
                        this.buttons.push('error');
                }
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
        watch: {
            datePicker(val) {
                this.GetData(val);
            }
        },
        destroyed() {
        }
    }
</script>

<style lang="stylus">
</style>