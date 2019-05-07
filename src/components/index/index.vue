<template>
    <v-app
            id="inspire"
            style="background-color: #42495c"
            dark>
        <v-toolbar
                :color="$store.state.color.ToolBarColor"
                class="elevation-0"
                height="40"
                fixed
                app
                clipped-right>
            <v-btn icon @click.stop="drawer = !drawer">
                <v-icon :style="$store.state.color.iconColor">menu</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <timeSpan text="最后一次数据更新时间为 {date} 8:30"></timeSpan>
        </v-toolbar>
        <v-navigation-drawer
                v-model="drawer"
                :style="$store.state.color.navigationLeftBg"
                width="200"
                fixed
                app>
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-title :class="$store.state.color.fontTitle" v-if="userName">
                        <span :style="$store.state.color.navigationLeftTitle">海带宝监控系统</span>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-subheader class="mt-3 grey--text text--darken-1 web-font">路由导航</v-subheader>
            <v-list>
                <v-list-group
                        v-for="item in routes"
                        v-model="item.active"
                        :key="item.title"
                        :prepend-icon="item.action"
                        no-action>
                    <v-list-tile slot="activator">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile
                            v-for="subItem in item.singleRouting"
                            :key="subItem.title"
                            :value="subItem.click"
                            @click="goRoute(subItem)">
                        <v-list-tile-content>
                            <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                        </v-list-tile-content>
                    </v-list-tile>
                    <v-list-group
                            v-for="subItem in item.multilevelRouting"
                            v-model="subItem.active"
                            :key="subItem.title"
                            sub-group
                            no-action>
                        <v-list-tile slot="activator">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile
                                v-for="subRoute in subItem.routes"
                                :key="subRoute.title"
                                @click="goRoute(subRoute)">
                            <v-list-tile-content>
                                <v-list-tile-title>{{ subRoute.title }}</v-list-tile-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list-group>
                </v-list-group>
            </v-list>
            <v-subheader class="mt-3 grey--text text--darken-1 web-font">系统功能</v-subheader>
            <v-list dense>
                <v-list-tile v-if="itemsSystem.length > 0" v-for="(item,i) in itemsSystem" :key="i"
                             @click.stop="item.action">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="itemsSystem.length <= 0">
                    <v-list-tile-action>
                        <v-icon>sentiment_satisfied_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="web-font">暂无系统功能</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <router-view @showLoad="showLoading" @closeLoad="closeLoading"></router-view>
            <load :loading="loading"></load>
        </v-content>
    </v-app>
</template>

<script>
    import timeSpan from '../../children/timeSpan'
    import load from '../../children/loading'

    export default {
        name: "App",
        data() {
            return {
                drawer: false,
                routes: [
                    {
                        action: 'error_outline',
                        title: '包裹',
                        singleRouting: [
                            {
                                title: '异常总览',
                                action: 'error_outline',
                                click: false,
                                to: {
                                    name: 'childException',
                                    params: {
                                        createCenterCode: 'USDB,JPDB,JPSFDB,AUDB,DEDB,UKDB'
                                    }
                                }
                            },
                            {
                                title: '美国',
                                click: false,
                                to: {
                                    name: 'childException',
                                    params: {
                                        createCenterCode: 'USDB'
                                    }
                                }
                            },
                            {
                                title: '日本',
                                click: false,
                                to: {
                                    name: 'childException',
                                    params: {
                                        createCenterCode: 'JPDB,JPSFDB'
                                    }
                                }
                            },
                            {
                                title: '澳洲',
                                click: false,
                                to: {
                                    name: 'childException',
                                    params: {
                                        createCenterCode: 'AUDB'
                                    }
                                }
                            },
                            {
                                title: '德国',
                                click: false,
                                to: {
                                    name: 'childException',
                                    params: {
                                        createCenterCode: 'DEDB'
                                    }
                                }
                            },
                            {
                                title: '英国',
                                click: false,
                                to: {
                                    name: 'childException',
                                    params: {
                                        createCenterCode: 'UKDB'
                                    }
                                }
                            }
                        ]
                    },
                    {
                        action: 'monetization_on',
                        title: '财务',
                        singleRouting: [
                            {
                                title: '财务总览',
                                click: false,
                                to: {
                                    name: 'F_Income'
                                }
                            },
                            {
                                title: '财务监控',
                                click: false,
                                to: {
                                    name: 'F_Monitoring'
                                }
                            },
                            {
                                title: '财务对账',
                                click: false,
                                to: {
                                    name: 'F_Checking'
                                }
                            },
                            {
                                title: '充值监控',
                                click: false,
                                to: {
                                    name: 'F_Other'
                                }
                            }
                        ]
                    },
                    {
                        action: 'airplanemode_active',
                        title: '件量',
                        singleRouting: [
                            {
                                title: '件量总览',
                                click: false,
                                to: {
                                    name: 'quantity'
                                }
                            }
                        ]
                    },
                    {
                        action: 'accessibility',
                        title: '会员',
                        singleRouting: [
                            {
                                title: '会员总览',
                                click: false,
                                to: {
                                    name: 'M_Normal'
                                }
                            },
                            {
                                title: '会员监控',
                                click: false,
                                to: {
                                    name: 'M_Monitoring'
                                }
                            },
                            {
                                title: '用户点击热区',
                                click: false,
                                to: {
                                    name: 'M_hits'
                                }
                            }
                        ]
                    }
                ],
                itemsSystem: [
                    {
                        icon: 'settings',
                        text: '设置',
                        action: () => {
                            this.goRoute({to: {name: 'set'}});
                        }
                    },
                    {
                        icon: 'exit_to_app',
                        text: '退出登录',
                        action: () => {
                            this.logout();
                        }
                    }
                ],
                loading: false,

                lastItem: {}
            };
        },
        components: {
            load,
            timeSpan
        },
        watch: {
            $route(value) {
                this.showLoading();
            }
        },
        mounted() {
            this.$nextTick(() => {
                let routeSplit = this.$route.path.split('/');
                for (let sItem of routeSplit) {
                    if (sItem) {
                        for (let rItem of this.routes) {
                            for (let rsrItem of rItem.singleRouting) {
                                if (rsrItem.to.params) {
                                    for (let p in rsrItem.to.params) {
                                        if (sItem === rsrItem.to.params[p]) {
                                            rsrItem.click = true;
                                            return;
                                        }
                                    }
                                }
                                else {
                                    if (sItem === rsrItem.to.name) {
                                        rsrItem.click = true;
                                        return;
                                    }
                                }
                            }
                        }
                    }
                }
            });
        },
        methods: {
            showLoading() {
                this.loading = true;
            },
            closeLoading() {
                this.loading = false;
            },
            goRoute(item) {
                if (!this.loading) {
                    this.clearItemClick();
                    this.$set(item, 'click', true);
                    this.$router.push(item.to);
                }
            },
            clearItemClick() {
                this.routes.forEach((rItem) => {
                    rItem.singleRouting.forEach((item) => {
                        this.$set(item, 'click', false);
                    });
                });
            },
            logout() {
                sessionStorage.setItem('accessToken', '');
                localStorage.removeItem("key");
                this.$router.push('/login');
            }
        },
        computed: {
            userName() {
                return sessionStorage.getItem('userName');
            }
        }
    };
</script>
<style lang="stylus">

    .loadingContent {
        position: absolute
        margin: auto;
        left 0;
        right 0;
        top 0;
        bottom 0;
        z-index 2;
        background-color: rgba(0, 0, 0, 0.51)
        .loading {
            position: absolute;
            margin: auto;
            left 0;
            right 0;
            top 0;
            bottom 0;
        }
    }

    .childTitle {
        border-bottom: solid white 1px;
        border-top: solid white 1px;
    }

    .simpleTable {
        width 100%;
        table-layout fixed;
    }

    .borderTable {
        @extends .simpleTable
        tr {
            th, td {

            }
        }
    }

    .hoverTable {
        @extends .simpleTable
        tr {
            height 50px;
            font-size 1.2em;
        }
        tr:hover {
            background-color #63afa0 !important;
            opacity 1;
        }
    }

    .table {
        @extends .simpleTable
        tr {
            th, td {
                border-bottom white dashed .5px;
            }
        }
    }

    .tbPt-0 {
        tr {
            th, td {
                padding-top 0;
            }
        }
    }

    .tbPt-1 {
        tr {
            th, td {
                padding-top 5px;
            }
        }
    }

    .tbPt-2 {
        tr {
            td {
                padding-top 10px;
            }
        }
    }

    .tbPt-3 {
        tr {
            td {
                padding-top 15px;
            }
        }
    }

    @font-face
        font-family: 'webfont';
        src: url('//at.alicdn.com/t/webfont_50h9f2n4exy.eot'); /* IE9*/
        src: url('//at.alicdn.com/t/webfont_50h9f2n4exy.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */ url('//at.alicdn.com/t/webfont_50h9f2n4exy.woff') format('woff'), /* chrome、firefox */ url('//at.alicdn.com/t/webfont_50h9f2n4exy.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/ url('//at.alicdn.com/t/webfont_50h9f2n4exy.svg#思源黑体-粗') format('svg');

    .web-font {
        font-family: "webfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
</style>

