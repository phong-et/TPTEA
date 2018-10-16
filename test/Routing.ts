import {ClientFunction} from 'testcafe'

const setLocalStorageItem = ClientFunction((prop, value) => {
  localStorage.setItem(prop, value);
});
const getLocalStorageItem = ClientFunction(prop => {
  return localStorage.getItem(prop);
});

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
      {navTo: '#/', navExpect: '/'},
      {navTo: '#/customer', navExpect: 'customer/'},
      {navTo: '#/customer/', navExpect: 'customer/'},
      {navTo: '#/customer/admin', navExpect: 'customer/'},
      {navTo: '#/customer/login', navExpect: 'customer/'},
      {navTo: '#/customer/settings', navExpect: 'customer/settings'},
      {navTo: '#/customer/register', navExpect: 'customer/register'},
      {navTo: '#/categories', navExpect: '/categories'},
    ],
    routeAdmin: [
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
// fixture`Routing No-Token-Customer-Path`.page`http://localhost:8080/#/`
// TEST_CASES.noToken.routeCustomer.forEach((nav, index) => {
//   testCase(nav, index)
// })
// fixture`Routing No-Token-Admin-Path`.page`http://localhost:8080/#/`
// TEST_CASES.noToken.routeAdmin.forEach((nav, index) => {
//   testCase(nav, index)
// })
fixture`Login Customer`.page`http://localhost:8080/#/`
test(`Set Token Customer`, async t => {
  await setLocalStorageItem('auth-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsInVzZXJuYW1lIjoiYWFhIiwibmFtZSI6ImFhYSIsImFkZHJlc3MiOiJhYWEiLCJwaG9uZSI6ImFhYSIsImJhbGFuY2UiOjAsInBvaW50cyI6MCwiaWF0IjoxNTM5Mjc0MTM0LCJleHAiOjE1NzA4MzE3MzR9.DWnQAyF0M_SJvlL5M8zGTZQPnxJGv55rC-vEM_h3Ssc')
  await getLocalStorageItem('auth-token')
  log(getLocalStorageItem('auth-token'))
})
fixture`Routing Cutomer-Token-Customer-Path`.page`http://localhost:8080/#/`
TEST_CASES.customerToken.routeCustomer.forEach((nav, index) => {
  testCase(nav, index)
})
