import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Register from '@/components/user/Register'
import Account from '@/components/user/Account'
import Login from '@/components/user/Login'
import ResetPwd from '@/components/user/ResetPwd'
import Document from '@/components/main/Document'
import Help from '@/components/main/Help'
import About from '@/components/main/About'
Vue.use(Router)

export default new Router({
  mode: 'history',
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
      component: Document
    },
    {
      path: '/groups',
      name: 'Groups',
      component: Document
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    },
    {
      path: '/help',
      name: 'Help',
      component: Help
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
