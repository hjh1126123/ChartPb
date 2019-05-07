import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import app from './modules/app';
import user from './modules/user';
import color from './modules/color';


export default new Vuex.Store({
    modules:{
        app,
        user,
        color
    }
})
