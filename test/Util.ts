// Test case Login Admin Manual
import {Role, Selector, ClientFunction} from 'testcafe'
const adminUser = Role('http://localhost:8080/#/admin', async t => {
  await t.setTestSpeed(0.4)
  const txtUsername = Selector('div')
    .withText('Username')
    .nth(5)
    .find('.col.q-input-target.q-no-input-spinner.ellipsis')
  const txtPassword = Selector('div')
    .withText('Password')
    .nth(5)
    .find('.col.q-input-target.q-no-input-spinner.ellipsis')
  const btLogin = Selector('button').withText('SIGN IN')
  await t
    .typeText(txtUsername, 'lol')
    .typeText(txtPassword, 'lol')
    .click(btLogin)
})
var testRouteAdmin = function(navTo, navExpect) {
  return async function(t) {
    await t.useRole(adminUser)
    const getLocation = ClientFunction(() => document.location.href)
    await t.navigateTo(navTo)
    await t.expect(getLocation()).contains(navExpect)
  }
}
fixture`Login-Admin-Manual`.page`http://localhost:8080/#/home`
test(`Check Admin Login Process`, testRouteAdmin('#/admin', '#/admin'))

// Unit test
const setLocalStorageItem = ClientFunction((prop, value) => {
  window['ResizeObserver'] = undefined
  localStorage.setItem(prop, value)
})
const ADMIN_TOKEN = 'a'
const URL_PREFIX = 'http://localhost:8080/#/'
fixture`Login-Admin-By-Set-Token`.page`http://localhost:8080/#/`
test(``, async t => {
  await t.setTestSpeed(0.4)
  const getLocation = ClientFunction(() => document.location.href)
  await setLocalStorageItem('auth-token', ADMIN_TOKEN)
  await t.navigateTo('#/customer')
  await t.expect(getLocation()).eql(URL_PREFIX + 'customer')
})
