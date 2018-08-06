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
                <v-subheader class="mt-3 grey--text text--darken-1 web-font">当前路由导航</v-subheader>
                <v-list-tile v-if="itemsRight.length > 0" v-for="(item,i) in itemsRight" :key="i"
                             @click.stop="item.action">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="web-font">{{item.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-if="itemsRight.length <= 0">
                    <v-list-tile-action>
                        <v-icon>sentiment_satisfied_alt</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="web-font">暂无导航数据</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-subheader class="mt-3 grey--text text--darken-1 web-font">当前路由系统功能</v-subheader>
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
                        <v-list-tile-title class="web-font">暂无系统功能</v-list-tile-title>
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
            <v-toolbar-title class="web-font">海带宝数据监控系统</v-toolbar-title>
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
                    <v-list-tile-title class="title text-sm-center web-font" v-if="userName">
                        {{userName}}
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>
            <v-subheader class="mt-3 grey--text text--darken-1 web-font">全局路由导航</v-subheader>
            <v-list dense>
                <v-list-tile v-for="(item,i) in items" :key="i" @click.stop="goRoute(item.url)">
                    <v-list-tile-action>
                        <v-icon>{{item.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="web-font">{{item.text}}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
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
            <transition name="bounce" mode="out-in" enter-active-class="animated fadeInLeft"
                        leave-active-class="animated fadeOutRight">
                <router-view @setRightNav="setRightNav"></router-view>
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
                drawer: false,
                left: true,
                drawerRight: false,
                fab: false,
                dark : true,
                items: [
                    {icon: 'warning', text: '异常包裹', url: '/exception'},
                    {icon: 'money', text: '财务', url: '/income'},
                    {icon: 'shopping_cart', text: '件量', url: '/quantity'}
                ],
                itemsSystem: [
                    // {
                    //     icon: 'color_lens',
                    //     text: '主题颜色转换',
                    //     action: () => {
                    //         this.dark = !this.dark;
                    //     }
                    // },
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
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
            }
        },
        created() {

        },
        methods: {
            goRoute(route) {
                this.$router.push(route);
            },
            logout() {
                sessionStorage.setItem('accessToken', '');
                this.$router.push('/login');
            },
            setRightNav(items) {
                if (this.itemsRight.length > 0)
                    this.itemsRight = [];
                for (let item of items) {
                    this.itemsRight.push(item);
                }
            }
        },
        watch : {
            $route(to,from){
                this.itemsRight = [];
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
    $font-face {font-family: 'webfont';
        src: url('webfont.eot'); /* IE9*/
        src: url('webfont.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
                url('webfont.woff') format('woff'), /* chrome、firefox */
                url('webfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+*/
                url('webfont.svg#webfont') format('svg'); /* iOS 4.1- */
    }

    .web-font{
        font-family:"webfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    }
</style>

