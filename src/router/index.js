import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import {isAuth} from '../util/common'
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
    let typeUser = isAuth().typeUser
    // user is CUSTOMER
    if (typeUser === 'c') {
      if (to.path === '/customer') {
        next()
        // prevent route to register page
      } else if (to.path === '/customer/register' || to.path === '/customer/login') {
        next('/customer')
      } else next()

    // user is ADMIN
    } else if (typeUser === 'a') {
      // route to admin home page
      if (to.path === '/admin') next()
      else next('/admin')

    // user is ANONYMOUS
    } else if (typeUser === false) {
      // recognize page of user by path to route
      if (to.path.indexOf('customer') > -1) {
        // route to CUSTOMER login page
        if (
          to.path === '/customer/register' ||
          to.path === '/customer/login' ||
          (to.path !== '/customer/login' && to.path !== '/customer') // prevent route to customer page
        ) {
          next()
        } else next('/customer/login')
      } else {
        // routing to ADMIN login page
        if (to.path === '/admin/login') next()
        else next('/admin/login')
      }
    }
  })

  return Router
}
