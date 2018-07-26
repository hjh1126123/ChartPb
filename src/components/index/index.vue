<template>
    <v-app
            id="inspire"
            dark
    >
        <v-navigation-drawer
                v-model="drawer"
                :mini-variant="mini"
                absolute
                dark
                temporary
        >
            <v-list class="pa-1">
                <v-list-tile v-if="mini" @click.stop="mini = !mini">
                    <v-list-tile-action>
                        <v-icon>chevron_right</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
                <v-list-tile avatar tag="div">
                    <v-list-tile-avatar>

                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>HJH</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon @click.stop="mini = !mini">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
            </v-list>
            <v-list class="pt-0" dense>
                <v-divider light></v-divider>
                <v-list-tile
                        v-for="(item,index) in items"
                        :key="index"
                        @click="goRoute(item.url)"
                >
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar
                dark
                dense
                fixed
                clipped-left
                app
        >
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="mr-5 align-center">
                <span class="title">海带宝数据监测系统</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-menu
                        bottom
                        origin="center center"
                        transition="scale-transition"
                >
                    <v-btn
                            slot="activator"
                            dark
                    >
                        更多
                    </v-btn>

                    <v-list>
                        <v-list-tile
                                v-for="(item, i) in menuItems"
                                :key="i"
                                @click="item.clickFn"
                        >
                            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </v-toolbar-items>
        </v-toolbar>
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
                drawer: null,
                mini: false,
                items: [
                    {icon: 'trending_up', text: '异常包裹', url: '/exception'},
                    {icon: 'trending_up', text: '财务', url: '/income'}
                ],
                menuItems:[
                    {
                        text : '退出登录',
                        clickFn : click => {
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
            this.getTime();
        },
        watch: {
            '$route'(to, from) {
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        created() {
            this.$nextTick(() => {

            });
        },
        methods: {
            goRoute(route) {
                this.$router.push(route);
            },
            getTime() {
                const date = new Date();
                this.timeString =
                    date.getFullYear() +
                    "/" +
                    (date.getMonth() + 1) +
                    "/" +
                    date.getDate();
            },
            logout() {
                sessionStorage.setItem('accessToken', '');
                this.$router.push('/login');
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

