//core
import Vue from 'vue'

//plugin
import axios from "axios";
import vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import crypto from 'crypto-js'


//serviceConfig
import './registerServiceWorker'

//mine
import router from './router'

import global from './global'
import filters from './filter'
import extend from './extend'
import store from './store'

//view
import App from './App.vue'

//otherConfig
Vue.config.productionTip = true;

//pluginUse
Vue.use(vuetify, {
    theme: {
        primary: "#5acaed",
        secondary: "#f0a672",
        accent: "#dbcb8a",
        error: "#ae5e5e",
        warning: "#dbbe1b",
        info: "#b39ddb",
        success: "#537550"
    }
});

//pluginConfig
axios.interceptors.request.use(function (config) {
    console.log(config);
    if(store.state.app.this_year){
        config.headers['year'] = store.state.app.this_year;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});



//extend
Vue.prototype.$http = axios;
Vue.prototype.global = global;
Vue.prototype.extend = extend;
Vue.prototype.crypto = crypto;

//filter
Vue.filter('changeHouseName', filters.conversion.changeHouseName);
Vue.filter('changeTypeName', filters.conversion.changeTypeName);

axios
    .post('Home/GetUrl')
    .then(res => {
        Vue.prototype.apiUrl = res.data.url;
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    })
    .catch(err => {
        // Vue.prototype.apiUrl = 'http://120.76.125.152:8012/api';
        Vue.prototype.apiUrl = 'http://192.168.0.36:1129/api';
        new Vue({
            router,
            store,
            render: h => h(App)
        }).$mount('#app');
    });




