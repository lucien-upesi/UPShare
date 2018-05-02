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
// --- STORE CONFIG ---
const store = new Vuex.Store({
  state: {
    token: false,
    user: null
  },
  mutations: {
    getUser (state, token) {
      axios.get('/users/byJWT/' + token).then(response => {
        if (!response.data.error) {
          state.user = response.data
          state.token = token
          axios.defaults.headers = {'jwt-token': token}
        } else {
          state.token = false
        }
      })
    },
    logout (state) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      state.token = false
      state.user = null
    },
    login (state, data) {
      document.cookie = `token=${data.jwt}; expires=${data.expire}; path=/;`
      state.token = data.jwt
      state.user = data.user
      axios.defaults.headers = {'jwt-token': data.jwt}
    }
  }
})

// --- ROUTER CONFIG ---
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user === null) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    const JSONCookie = cookiesToJSON(document.cookie)
    if (JSONCookie.hasOwnProperty('token')) {
      this.$store.commit('getUser', JSONCookie.token)
    }
  }
})

// cookie-parser
function cookiesToJSON (str) {
  str = str.split(', ')
  const result = {}
  for (let i = 0; i < str.length; i++) {
    const a = str[i].split('=')
    result[a[0]] = a[1]
  }
  return result
}
