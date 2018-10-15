import {ClientFunction} from 'testcafe'
var log = console.log
var testRoute = function(navTo, navExpect) {
  return async function(t) {
    const getLocation = ClientFunction(() => document.location.href)
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
    routeAdmin: [
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
fixture`Routing No-Token-Customer-Path`.page`http://localhost:8080/#/`
TEST_CASES.noToken.routeCustomer.forEach((nav, index) => {
  testCase(nav, index)
})
fixture`Routing No-Token-Admin-Path`.page`http://localhost:8080/#/`
TEST_CASES.noToken.routeAdmin.forEach((nav, index) => {
  testCase(nav, index)
})
