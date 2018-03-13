import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Register from '@/components/user/Register'
import Account from '@/components/user/Account'
import Login from '@/components/user/Login'
import ResetPwd from '@/components/user/ResetPwd'
import Files from '@/components/main/Files'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/resetPassword/:token',
      name: 'ResetPwd',
      component: ResetPwd,
      props: true
    },
    {
      path: '/files',
      name: 'Files',
      component: Files
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    }
  ]
})
