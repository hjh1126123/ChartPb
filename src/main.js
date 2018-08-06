//core
import Vue from 'vue'

//plugin
import axios from "axios";
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import animate from 'animate.css'

//serviceConfig
import './registerServiceWorker'

//mine
import router from './router'
import store from './store'
import global from './global'
import filters from './filter'

//view
import App from './App.vue'

//otherConfig
Vue.config.productionTip = true;

//pluginUse
Vue.use(vuetify);

//global
Vue.prototype.global = global;
axios
    .post('Home/GetUrl')
    .then(res => {
        Vue.prototype.apiUrl = res.data.url;
    })
    .catch(err => {
        console.log(err);
        Vue.prototype.apiUrl = 'http://192.168.0.36:1129/api';
    });
Vue.prototype.$http = axios;


//filter
Vue.filter('changeHouseName', filters.conversion.changeHouseName);
Vue.filter('changeTypeName', filters.conversion.changeTypeName);

//router guard
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    }
    else {
        if (to.meta.requiresAuth && !sessionStorage.getItem('accessToken')) {
            next({path: '/login'});
        }
        else {
            next();
        }
    }
});

new Vue({
    router,
    store,
    animate,
    render: h => h(App)
}).$mount('#app');
