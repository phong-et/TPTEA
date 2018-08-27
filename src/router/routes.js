import pgOrder from 'pages/order'
import pgStore from 'pages/store'
import pgHome from 'pages/home'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
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
        component: () => import('layouts/member.vue'),
        children: [
          {
            path: '',
            component: () => import('pages/member.vue'),
          },
          {
            path: 'login',
            component: () => import('pages/login.vue'),
          },
          {
            path: 'register',
            component: () => import('pages/register.vue'),
          },
        ],
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
