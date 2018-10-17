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
      // route to customer home page
      if (to.path === '/customer' || to.path === '/customer/') {
        next()
        // prevent route to register, login, and all pages relate admin
      } else if (
        to.path === '/' ||
        to.path === '/customer/login' ||
        to.path === '/customer/register' ||
        to.path.substr(0, 6) === '/admin'
      ) {
        next('/customer')
      } else {
        next()
      }
      // user is ADMIN
    } else if (userType === 'a') {
      // route to admin home page
      if (to.path === '/admin' || to.path === '/admin/') {
        next()
        // prevent route to customer, login, categories and all pages relate customer
      } else if (
        to.path === '/' ||
        to.path === '/admin/login' ||
        to.path === '/categories' ||
        to.path.substr(0, 9) === '/customer'
      ) {
        next('/admin')
      } else {
        next()
      }
    } else {
      // recognize route of custmer user
      if (to.path.substr(0, 9) === '/customer') {
        switch (to.path) {
          case '/customer/register':
          case '/customer/register/':
          case '/customer/login':
          case '/categories':
            next()
            break
          default:
            next('/customer/login')
            break
        }
        // recognize route of admin user
      } else if (to.path.substr(0, 6) === '/admin') {
        switch (to.path) {
          case '/admin':
          case '/admin/':
            next('/admin/login')
            break
          case '/admin/login':
          case '/admin/login/':
            next()
            break
          default:
            next('/admin/login')
            break
        }
      } else {
        // route to common page(ex: home, categories...etc)
        next()
      }
    }
  })

  return Router
}
