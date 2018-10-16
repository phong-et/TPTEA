import {ClientFunction} from 'testcafe'

const setLocalStorageItem = ClientFunction((prop, value) => {
  localStorage.setItem(prop, value)
})
const getLocalStorageItem = ClientFunction(prop => {
  return localStorage.getItem(prop)
})
const CUSTOMER_TOKEN = 'c'
const ADMIN_TOKEN = 'a'
const URL_PREFIX = 'http://localhost:8080/#/'
var log = console.log

var testRoute = function(navTo, navExpect) {
  return async function(t) {
    const getLocation = ClientFunction(() => document.location.href)
    await t.navigateTo(navTo)
    await t.expect(getLocation()).contains(navExpect)
  }
}
var testRouteToken = function(navTo, navExpect, token) {
  return async function(t) {
    await t.setTestSpeed(0.4)
    const getLocation = ClientFunction(() => document.location.href)
    await setLocalStorageItem('auth-token', token)
    await t.navigateTo(navTo)
    await t.expect(getLocation()).eql(URL_PREFIX + navExpect)
  }
}

async function testCase(nav, navIndex) {
  test(`[${navIndex}] Check if ${nav.navTo} -> ${nav.navExpect}`, testRoute(nav.navTo, nav.navExpect))
}
async function testCaseToken(nav, navIndex, token) {
  test(`[${navIndex}] Check if ${nav.navTo} -> ${nav.navExpect}`, testRouteToken(nav.navTo, nav.navExpect, token))
}
const TEST_CASES = {
  noToken: {
    customerRouting: [
      {navTo: '#/', navExpect: '/'},
      {navTo: '#//', navExpect: '/'},
      {navTo: '#//s`2qgfh', navExpect: '/'},
      {navTo: '#/customer', navExpect: 'customer/login'},
      {navTo: '#/customer/', navExpect: 'customer/login'},
      {navTo: '#/customer/admin', navExpect: 'customer/login'},
      {navTo: '#/customer/login', navExpect: 'customer/login'},
      {navTo: '#/customer/login/', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/register/', navExpect: 'customer/register'},
      {navTo: '#/categories', navExpect: '/categories'},
    ],
    adminRouting: [
      {navTo: '#/admin', navExpect: 'admin/login'},
      {navTo: '#/admin/', navExpect: 'admin/login'},
      {navTo: '#/admin/login', navExpect: 'admin/login'},
      {navTo: '#/admin/customers', navExpect: 'admin/login'},
      {navTo: '#/admin/settings', navExpect: 'admin/login'},
      {navTo: '#/admin/register', navExpect: 'admin/login'},
      {navTo: '#/admin/categories', navExpect: 'admin/login'},
    ],
  },
  customerToken: {
    customerRouting: [
      {navTo: '#/', navExpect: ''},
      {navTo: '#/admin', navExpect: 'customer'},
      {navTo: '#/customer', navExpect: 'customer'},
      {navTo: '#/customer/', navExpect: 'customer/'},
      {navTo: '#/customer/login', navExpect: 'customer'},
      {navTo: '#/customer/settings', navExpect: 'customer/settings'},
      {navTo: '#/customer/register', navExpect: 'customer'},
      {navTo: '#/categories', navExpect: 'categories'},
    ],
    adminRouting: [
      {navTo: '#/admin', navExpect: 'admin/login'},
      {navTo: '#/admin/', navExpect: 'admin/login'},
      {navTo: '#/admin/%^&&w', navExpect: 'admin/login'},
      {navTo: '#/admin/%^&&w/', navExpect: 'admin/login'},
      {navTo: '#/admin/login', navExpect: 'admin/login'},
      {navTo: '#/admin/settings', navExpect: 'admin/login'},
      {navTo: '#/admin/customers', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/categories', navExpect: 'customer/categories'},
    ],
  },
  adminToken: {
    customerRouting: [
      {navTo: '#/', navExpect: '/a'},
      {navTo: '#/customer', navExpect: 'customer/login1'},
      {navTo: '#/customer/', navExpect: 'customer/login'},
      {navTo: '#/customer/admin', navExpect: 'customer/login'},
      {navTo: '#/customer/login', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/categories', navExpect: 'customer/categories'},
    ],
    adminRouting: [
      {navTo: '#/', navExpect: '/'},
      {navTo: '#/customer', navExpect: 'customer/login'},
      {navTo: '#/customer/', navExpect: 'customer/login'},
      {navTo: '#/customer/admin', navExpect: 'customer/login'},
      {navTo: '#/customer/login', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/categories', navExpect: 'customer/categories'},
    ],
  },
}
// ================== TEST_CASES.noToken ==================== //
// fixture`Routing No-Token-Customer-Path`.page`http://localhost:8080/#/`
// TEST_CASES.noToken.customerRouting.forEach((nav, index) => {
//   testCase(nav, index)
// })
// fixture`Routing No-Token-Admin-Path`.page`http://localhost:8080/#/`
// TEST_CASES.noToken.adminRouting.forEach((nav, index) => {
//   testCase(nav, index)
// })

// ================== TEST_CASE.customerToken =============== //
fixture`Routing Token-Customer-Path`.page`http://localhost:8080/#/`
TEST_CASES.customerToken.customerRouting.forEach((nav, index) => {
  testCaseToken(nav, index, CUSTOMER_TOKEN)
})

// test(`Set Token Customer`, async t => {
//   await setLocalStorageItem('auth-token', CUSTOMER_TOKEN)
//   await t.expect(getLocalStorageItem('auth-token')).eql(CUSTOMER_TOKEN)
//   //await t.wait(20000000)
// })
// test(
//   'Login',
//   testRouteCustomer(
//     TEST_CASES.customerToken.customerNav[1].navTo,
//     TEST_CASES.customerToken.customerNav[1].navExpect
//   )
// )
// test('Login', async t => {
//   t.setTestSpeed(0.4)
//   const txtUsername = Selector('div')
//   .withText('Username')
//   .nth(7)
//   .find('.col.q-input-target.q-no-input-spinner.ellipsis')
//   const txtPassword = Selector('div')
//     .withText('Password')
//     .nth(7)
//     .find('.col.q-input-target.q-no-input-spinner.ellipsis')
//   const btLogin = Selector('button')
//     .withText('SIGN IN')
//     .nth(0)
//   await t
//     .typeText(txtUsername, 'lol')
//     .typeText(txtPassword, 'lol')
//     .click(btLogin)
// })

// fixture`Routing Cutomer-Token-Customer-Path`.page`http://localhost:8080/#/`
// TEST_CASES.customerToken.customerNav.forEach((nav, index) => {
//   testCase(nav, index)
// })
