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
    updateToken (state, token) {
      document.cookie = `token=${token.jwt}; expires=${token.expire}; path=/;`
      state.token = token.jwt
    },
    getUser (state, token) {
      axios.get('/user/byJWT/' + token).then(response => {
        state.user = response.data
        axios.defaults.headers = {'jwt-token': token}
      })
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
      this.$store.state.token = JSONCookie.token
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
