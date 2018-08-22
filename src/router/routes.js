import pgOrder from 'pages/order'
import pgStore from 'pages/store'
import pgMember from 'pages/member'
import pgHome from 'pages/home'
import pgRegister from 'pages/register'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: 'home',
        component: pgHome,
      },
      {
        path: 'orders',
        component: pgOrder,
      },
      {
        path: 'stores',
        component: pgStore,
      },
      {
        path: 'members',
        component: pgMember,
      },
      {
        path: 'register',
        component: pgRegister,
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  })
}

export default routes
