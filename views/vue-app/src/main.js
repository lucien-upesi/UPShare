// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'

import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vuex)
Vue.use(Vuetify, {
  theme: {
    primary: '#12ED14', // #E53935
    accent: '#000000', // #FFCDD2
    secondary: '#FFFFFF' // #3F51B5
  }
})

Vue.config.productionTip = false

const store = new Vuex.Store({})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
