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
        <v-subheader class="mt-3 grey--text text--darken-1">SUBSCRIPTIONS</v-subheader>
        <v-list>
          <v-list-tile v-for="item in items2" :key="item.text" avatar @click="">
            <v-list-tile-avatar>
              <img :src="`https://randomuser.me/api/portraits/men/${item.picture}.jpg`" alt="">
            </v-list-tile-avatar>
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list-tile class="mt-3" @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">add_circle_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Browse Channels</v-list-tile-title>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon color="grey darken-1">settings</v-icon>
          </v-list-tile-action>
          <v-list-tile-title class="grey--text text--darken-1">Manage Subscriptions</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
            color="red"
            dense
            fixed
            clipped-left
            app
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-icon class="mx-3">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-5 align-center">
        <span class="title">Youtube</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-layout row align-center style="max-width: 650px">
        <v-text-field
                :append-icon-cb="() => {}"
                placeholder="Search..."
                single-line
                append-icon="search"
                color="white"
                hide-details
        ></v-text-field>
      </v-layout>
    </v-toolbar>
    <v-content>
      <v-container fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-tooltip right>
              <v-btn
                      slot="activator"
                      :href="source"
                      icon
                      large
                      target="_blank"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/YeRKwQ" target="_blank">
                <v-icon large>mdi-codepen</v-icon>
              </v-btn>
              <span>Codepen</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>

export default {
    name: "App",
    data() {
        return {
            drawer: true,
            items: [
                { icon: 'trending_up', text: 'Most Popular' },
                { icon: 'subscriptions', text: 'Subscriptions' },
                { icon: 'history', text: 'History' },
                { icon: 'featured_play_list', text: 'Playlists' },
                { icon: 'watch_later', text: 'Watch Later' }
            ],
            items2: [
                { picture: 28, text: 'Joseph' },
                { picture: 38, text: 'Apple' },
                { picture: 48, text: 'Xbox Ahoy' },
                { picture: 58, text: 'Nokia' },
                { picture: 78, text: 'MKBHD' }
            ],
            timeString: "*年*月*日", //时间
            minHeight: 0 //contentwraper的最小高度;
        };
    },
    mounted() {
        this.getTime();
    },
    created() {
        this.$nextTick(() => {
            //  document.body.clientH
            $('[data-toggle="push-menu"]').pushMenu();
            var $pushMenu = $('[data-toggle="push-menu"]').data("lte.pushmenu");
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
        }
    },
    activated() {},
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

.navbar-nav>li>.dropdown-menu {
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

.skin-blue .sidebar-menu>li.header {
  color: #4b646f;
  background: #1a2226;
}

.sidebar-form, .sidebar-menu>li.header {
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
