<template>
    <v-app
            id="inspire"
            :dark="dark"
    >
        <v-navigation-drawer
                v-model="drawerRight"
                fixed
                right
                clipped
                app
                width="200"
        >
            <v-list dense>
                <v-subheader class="mt-3 grey--text text--darken-1">当前路由导航</v-subheader>
                <v-list-tile v-if="itemsRight.length > 0" v-for="(item,i) in itemsRight" :key="i">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="itemsRight.length <= 0">
                    <v-list-tile-action>
                        <v-icon>sentiment_satisfied_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>暂无导航数据</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-subheader class="mt-3 grey--text text--darken-1">当前路由系统功能</v-subheader>
                <v-list-tile v-if="itemsRightSystem.length > 0" v-for="(item,i) in itemsRightSystem" :key="i">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="itemsRightSystem.length <= 0">
                    <v-list-tile-action>
                        <v-icon>sentiment_satisfied_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>暂无系统功能</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar
                fixed
                app
                clipped-right
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>海带宝数据监控系统</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click.stop="drawerRight = !drawerRight"></v-toolbar-side-icon>
        </v-toolbar>
        <v-navigation-drawer
                v-model="drawer"
                fixed
                app
                width="200"
        >
            <v-list dense>
                <v-list-tile>
                    <v-list-tile-title class="title text-sm-center" v-if="userName">
                        {{userName}}
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-subheader class="mt-3 grey--text text--darken-1">全局路由导航</v-subheader>
            <v-list dense>
                <v-list-tile v-for="(item,i) in items" :key="i" @click.stop="goRoute(item.url)">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{item.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
            <v-subheader class="mt-3 grey--text text--darken-1">系统功能</v-subheader>
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
                        <v-list-tile-title>暂无系统功能</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-content>
            <transition name="bounce" mode="out-in" enter-active-class="animated lightSpeedIn"
                        leave-active-class="animated hinge">
                <router-view></router-view>
            </transition>
        </v-content>
    </v-app>
</template>
<script>
    import "../../plugins/admin.css";

    export default {
        name: "App",
        data() {
            return {
                drawer: true,
                left: true,
                drawerRight: true,
                fab: false,
                dark: true,
                items: [
                    {icon: 'warning', text: '异常包裹', url: '/exception'},
                    {icon: 'money', text: '财务', url: '/income'},
                    {icon: 'shopping_cart', text:'件量', url: '/quantity'}
                ],
                itemsSystem: [
                    {
                        icon: 'color_lens',
                        text: '主题颜色转换',
                        action: () => {
                            this.dark = !this.dark;
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
                itemsRight: [],
                itemsRightSystem: [],
                menuItems: [
                    {
                        text: '退出登录',
                        clickFn: click => {
                            this.logout();
                        }
                    }
                ],
                timeString: "*年*月*日",
                minHeight: 0,
                transitionName: 'slide-left'
            };
        },
        mounted() {

        },
        watch: {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        created() {

        },
        methods: {
            //系统
            goRoute(route) {
                this.$router.push(route);
            },
            logout() {
                sessionStorage.setItem('accessToken', '');
                this.$router.push('/login');
            },
            //子组件调用
            setRightNav(items) {
                if (this.itemsRight.length > 0)
                    this.itemsRight.clear();
                for (let item of items) {
                    this.itemsRight.push(item);
                }
            }
        },
        activated() {

        },
        computed: {
            userName() {
                return sessionStorage.getItem('userName');
            }
        },
        components: {
            "sidebar-js": {
                render(createElement) {
                    return createElement("script", {
                        attrs: {
                            type: "text/javascript",
                            src: this.src
                        }
                    });
                },
                props: {
                    src: {
                        type: String,
                        required: true
                    }
                }
            }
        }
    };
</script>
<style lang="stylus">

</style>

