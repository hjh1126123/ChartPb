<template>
    <v-app
            id="inspire"
            dark
    >
        <v-navigation-drawer
                v-model="drawer"
                fixed
                clipped
                app
        >
            <v-list dense>
                <v-list-tile v-for="item in items" :key="item.text" @click="">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>
                            {{ item.text }}
                        </v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-subheader class="mt-3 grey--text text--darken-1">相关配置</v-subheader>
                <v-list-tile @click="">
                    <v-list-tile-action>
                        <v-icon color="grey darken-1">settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title class="grey--text text--darken-1">报表主题</v-list-tile-title>
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
        </v-toolbar>
        <v-content>
            <router-view></router-view>
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
                items: [
                    { icon: 'trending_up', text: '异常包裹' },
                    { icon: 'trending_up', text: '财务' }
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
                //    console.log('现在路由:',to.path.split('/')[1],'来自路由:',from.path.split('/')[1],'现在的动画:',this.transitionName)
                const toDepth = to.path.split('/').length;
                const fromDepth = from.path.split('/').length;
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
        created() {
            this.$nextTick(() => {
                //  document.body.clientH
                // $('[data-toggle="push-menu"]').pushMenu();
                // var $pushMenu = $('[data-toggle="push-menu"]').data("lte.pushmenu");
            });
        },
        methods: {
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
            },
            changeW() {
                this.$store.state.isChangeW = !this.$store.state.isChangeW
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
<style scoped lang="stylus" rel="stylesheet/stylus">
    .main-header {
        position: relative;
        max-height: 100px;
        z-index: 1030;
    }

    .main-header .logo {
        -webkit-transition: width 0.3s ease-in-out;
        -o-transition: width 0.3s ease-in-out;
        transition: width 0.3s ease-in-out;
        display: block;
        float: left;
        height: 50px;
        font-size: 20px;
        line-height: 50px;
        text-align: center;
        width: 230px;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        padding: 0 15px;
        font-weight: 300;
        overflow: hidden;
    }

    .main-header .navbar {
        -webkit-transition: margin-left 0.3s ease-in-out;
        -o-transition: margin-left 0.3s ease-in-out;
        transition: margin-left 0.3s ease-in-out;
        margin-bottom: 0;
        margin-left: 230px;
        border: none;
        min-height: 50px;
        border-radius: 0;
    }

    .main-header .logo .logo-lg {
        display: block;
    }

    @media (max-width: 767px) {
        .main-header .logo, .main-header .navbar {
            width: 100%;
            float: none;
        }
    }

    @media (max-width: 767px) {
        .main-header .navbar {
            margin: 0;
        }
    }

    .navbar-nav > li > .dropdown-menu {
        width: auto;
    }

    .main-header .sidebar-toggle {
        float: left;
        background-color: transparent;
        background-image: none;
        padding: 15px 15px;
        font-family: fontAwesome;
    }

    .main-header .sidebar-toggle:before {
        content: '\f0c9';
    }

    .skin-blue .wrapper, .skin-blue .main-sidebar, .skin-blue .left-side {
        background-color: #222d32;
    }

    .wrapper {
        height: 100%;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .main-sidebar {
        position: absolute;
        top: 0;
        left: 0;
        padding-top: 50px;
        min-height: 100%;
        width: 230px;
        z-index: 810;
        -webkit-transition: -webkit-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        -moz-transition: -moz-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        -o-transition: -o-transform 0.3s ease-in-out, width 0.3s ease-in-out;
        transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
    }

    .skin-blue .sidebar-menu > li.header {
        color: #4b646f;
        background: #1a2226;
    }

    .sidebar-form, .sidebar-menu > li.header {
        overflow: hidden;
        text-overflow: clip;
        white-space: nowrap;
    }

    .sidebar-menu li.header {
        padding: 10px 25px 10px 15px;
        font-size: 12px;
    }

    .sidebar {
        padding-bottom: 10px;
    }

    .sidebar-menu {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    .router-link-active {
        color: white;
    }

    .content-wrapper {
        background-color: #42475d;
    }
</style>

