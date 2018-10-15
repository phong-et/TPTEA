import {ClientFunction} from 'testcafe'
// import {Role} from 'testcafe'

var log = console.log
var testRoute = function(navTo, navExpect) {
  return async function(t) {
    const getLocation = ClientFunction(() => document.location.href)
    // log(getLocation())
    // log('navTo:%s', navTo)
    // log('navExpect:%s', navExpect)
    await t.navigateTo(navTo)
    await t.expect(getLocation()).contains(navExpect)
  }
}
async function testCase(nav, navIndex) {
  test(`[${navIndex}] Check if ${nav.navTo} -> ${nav.navExpect}`, testRoute(nav.navTo, nav.navExpect))
}
const TEST_CASES = {
  noToken: {
    routeCustomer: [
      {navTo: '#/', navExpect: '/'},
      {navTo: '#//', navExpect: '/'},
      {navTo: '#//s`2q\gfh', navExpect: '/'},
      {navTo: '#/customer', navExpect: 'customer/login'},
      {navTo: '#/customer/', navExpect: 'customer/login'},
      {navTo: '#/customer/admin', navExpect: 'customer/login'},
      {navTo: '#/customer/login', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/categories', navExpect: 'customer/categories'},
    ],
    routeAdmin: [
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
  customerToken: {
    routeCustomer: [
      {navTo: '#/', navExpect: '/a'},
      {navTo: '#/customer', navExpect: 'customer/login1'},
      {navTo: '#/customer/', navExpect: 'customer/login'},
      {navTo: '#/customer/admin', navExpect: 'customer/login'},
      {navTo: '#/customer/login', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/categories', navExpect: 'customer/categories'},
    ],
    routeAdmin: [
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
  adminToken: {
    routeCustomer: [
      {navTo: '#/', navExpect: '/a'},
      {navTo: '#/customer', navExpect: 'customer/login1'},
      {navTo: '#/customer/', navExpect: 'customer/login'},
      {navTo: '#/customer/admin', navExpect: 'customer/login'},
      {navTo: '#/customer/login', navExpect: 'customer/login'},
      {navTo: '#/customer/settings', navExpect: 'customer/login'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/customer/categories', navExpect: 'customer/categories'},
    ],
    routeAdmin: [
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
fixture`Routing No-Login`.page`http://localhost:8080/#/`
TEST_CASES.noToken.routeCustomer.forEach((nav,index) => {
  testCase(nav, index)
})
// TEST_CASES.noToken.routeAdmin.forEach(nav => {
//   testCase(nav)
// })
// test(
//   `Check if ${TEST_CASES.noToken.routeCustomer[0].navTo} -> ${TEST_CASES.noToken.routeCustomer[0].navExpect}`,
//   testRoute(TEST_CASES.noToken.routeCustomer[0].navTo, TEST_CASES.noToken.routeCustomer[0].navExpect)
// )
