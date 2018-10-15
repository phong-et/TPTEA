import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import {getUserType} from '../util/common'
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function({store}) {
  const Router = new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })

  Router.beforeEach((to, _, next) => {
    let userType = getUserType()
    // user is CUSTOMER
    if (userType === 'c') {
      if (to.path === '/customer') {
        next()
        // prevent route to register, login, all admin relate page
      } else if (
        to.path === '/customer/register' ||
        to.path === '/customer/login' ||
        to.path.substr(0, 6) === '/admin'
      ) {
        next('/customer')
      } else {
        next()
      }
      // user is ADMIN
    } else if (userType === 'a') {
      // route to admin home page
      if (to.path === '/admin/login' || to.path.substr(0, 9) === '/customer') {
        next('/admin')
      } else {
        next()
      }
      // user is ANONYMOUS (no token)
    } else {
      // recognize page of user by path to route
      switch (to.path) {
        case '/customer':
        case '/customer/':
          next('/customer/login')
          break
      }
      // if (to.path === '/customer' || to.path === '/customer/') {
      //   // route to CUSTOMER login page
      //   next('/customer/login')
      // } else
      if (
        to.path === '/admin' ||
        to.path === '/admin/' ||
        (to.path.substr(0, 6) === '/admin' && to.path !== '/admin/login' && to.path.length > 8)
      ) {
        // route to ADMIN login page
        next('/admin/login')
      } else {
        next()
      }
    }
  })

  return Router
}
