import loDefault from 'layouts/Default'
import loAdminDefault from 'layouts/admin/Default'
import loCustomer from 'layouts/Customer'
import loOrder from 'layouts/Order'
import pgLogin from 'pages/Login'
import pgAdminLogin from 'pages/admin/Login'
import pgHome from 'pages/Home'
import pgAdminHome from 'pages/admin/Home'
import pgAdminGiftCards from 'pages/admin/GiftCards'
import pgAdminOrders from 'pages/admin/Orders'
import pgAdminModifiers from 'pages/admin/Modifiers'
import pgCategories from 'pages/Categories'
import pgMainCategories from 'pages/MainCategories'
import pgStores from 'pages/Stores'
import pgMenus from 'pages/Menus'
import pgCustomer from 'pages/Customer'
import pgRegister from 'pages/Register'
import pgMenuDetail from 'pages/MenuDetail'
import pgError404 from 'pages/Error404'
import pgAdminCustomers from 'pages/admin/Customers'
import pgTopup from 'pages/Topup'
import pgMakePayment from 'pages/MakePayment'
import pgAdminReceivePayment from 'pages/admin/ReceivePayment'
import pgAdminPushMessage from 'pages/admin/PushMessage'
import pgOrderDetails from 'pages/OrderDetails'
import pgOrderHistory from 'pages/OrderHistory'
import pgHistoryOrderDetail from 'pages/HistoryOrderDetail'
import pgAdminCategories from 'pages/admin/Categories'
import pgAdminMenus from 'pages/admin/Menus'
const routes = [
  {
    path: '/',
    component: loDefault,
    children: [
      {
        path: '',
        component: pgHome,
      },
      {
        path: 'main-categories',
        component: pgMainCategories,
      },
      {
        path: 'stores',
        component: pgStores,
      },
      {
        path: 'customer',
        component: loCustomer,
        children: [
          {
            path: '',
            component: pgCustomer,
          },
          {
            path: 'login',
            component: pgLogin,
          },
          {
            path: 'register',
            component: pgRegister,
          },
          {
            path: 'topup',
            component: pgTopup,
          },
          {
            path: 'makepayment',
            component: pgMakePayment,
          },
        ],
      },
    ],
  },
  {
    path: '/admin',
    component: loAdminDefault,
    children: [
      {
        path: '',
        component: pgAdminHome,
      },
      {
        path: 'orders',
        component: pgAdminOrders,
      },
      {
        path: 'modifiers',
        component: pgAdminModifiers,
      },
      {
        path: 'giftcards',
        component: pgAdminGiftCards,
      },
      {
        path: 'customers',
        component: pgAdminCustomers,
      },
      {
        path: 'receivepayment',
        component: pgAdminReceivePayment,
      },
      {
        path: 'pushmessage',
        component: pgAdminPushMessage,
      },
      {
        path: 'categories',
        component: pgAdminCategories,
      },
      {
        path: 'menus',
        component: pgAdminMenus,
      },
    ],
  },
  {
    path: '/admin/login',
    component: pgAdminLogin,
  },
  {
    path: '/order',
    component: loOrder,
    children: [
      {
        path: 'categories/:mainCatId',
        component: pgCategories,
      },
      {
        path: 'menus/:catId',
        component: pgMenus,
      },
      {
        path: 'menu-detail/:menuId',
        component: pgMenuDetail,
      },
      {
        path: 'order-details',
        component: pgOrderDetails,
      },
      {
        path: 'order-history',
        component: pgOrderHistory,
      },
      {
        path: 'history-order-detail/:orderId',
        component: pgHistoryOrderDetail,
      },
    ],
  },
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: pgError404,
  })
}

export default routes
