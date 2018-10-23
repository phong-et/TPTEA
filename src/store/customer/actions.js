import {_procError, _ax, _post, _alert, _get, _procAlert} from '../../util/common'
import _ from 'lodash'
export function loginCustomer({commit}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: LoginInput) {
      login(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // Login successfully
        localStorage.setItem('auth-token', data.login)
        commit('setToken', data.login)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.login
        _alert(`Logged In Successfully!`, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export function regCustomer({commit}, payload) {
  commit('setIsLoading', true)
  _post(
    payload,
    `mutation ($input: RegisterInput) {
      register(input: $input)
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // register successfully
        localStorage.setItem('auth-token', data.register)
        commit('setToken', data.register)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.register
        _alert(`Regitered Successfully!`, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export async function loginFb({commit}, payload) {
  var user = await getUserFbInfo()
  _post(
    {
      username: user.email,
      password: '',
      type: 'facebook',
    },
    `mutation ($input: LoginInput) {
      loginFb(input: $input)
    }`
  )
    .then(({data}) => {
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // Login successfully
        localStorage.setItem('auth-token', data.loginFb)
        commit('setToken', data.loginFb)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.loginFb
        _alert(`Logged In Successfully!`, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
    })
}
export async function registerFb({commit}) {
  var user = await getUserFbInfo()
  _post(
    {
      username: user.email,
      password: '',
      passwordConfirm: '',
      name: user.name,
      phone: '',
      address: '',
      type: 'facebook',
    },
    `mutation ($input: RegisterInput) {
      registerFb(input: $input) {
        token
        msg
      }
    }`
  )
    .then(({data}) => {
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else {
        // register successfully
        localStorage.setItem('auth-token', data.registerFb.token)
        commit('setToken', data.regFB)
        _ax.defaults.headers.common['Authorization'] = 'Bearer ' + data.registerFb.token
        _alert(data.registerFb.msg, 'positive')
        this.$router.push('/customer')
      }
    })
    .catch(err => {
      _procError(err)
    })
}
async function getUserFbInfo() {
  return new Promise(resolve => {
    window.FB.login(
      res => {
        if (res.status === 'connected') {
          window.FB.api('/me?fields=name,email', person => {
            resolve(person)
          })
        }
      },
      {scope: 'public_profile,email'}
    )
  })
}
export const fetchCustomer = ({commit}) => {
  _get(`{
    getCustomer {
      name
      balance
      points
    }
  }`)
    .then(({data}) => {
      if (data.errors) _alert(data.errors[0].message, 'warning')
      else commit('setCustomer', data.getCustomer)
    })
    .catch(err => {
      _procError(err)
    })
}

export const fetchCustomers = ({commit}) => {
  commit('setIsLoading', true)
  _get(`{
    fetchCustomers {
      id
      name
      username
      password
      address
      phone
      balance
      points
    }
  }`)
    .then(({data}) => {
      _procAlert(data)
      commit('setRecs', data.fetchCustomers)
      commit('setIsLoading', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export const delCustomers = ({commit, getters}) => {
  commit('setIsLoading', true)
  let ids = Array.from(getters.getSelected, customer => customer.id)
  _post(
    ids,
    `mutation ($input: [Int]) {
      deleteCustomers(input: $input)
    }`
  ).then(({data}) => {
    _procAlert(data)
    commit('setIsLoading', false)
    _.remove(getters.getRecs, rec => {
      return ids.includes(rec.id)
    })
    // clear selection
    commit('setSelected', [])
    // reactive the grid with new recs
    commit('setRecs', _.clone(getters.getRecs))
  })
}

export const updateCustomer = ({commit, getters}) => {
  commit('setIsLoading', true)
  _post(
    _.omit(getters.getEditingRec, ['__index']),
    `mutation ($input: CustomerInput) {
      updateCustomer(input: $input) {
        id
        username
        password
        name
        address
        phone
        balance
        points
      }
    }`
  )
    .then(({data}) => {
      _procAlert(data)
      commit('setIsLoading', false)
      commit('setIsModalOpened', false)
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}

export function createCustomer({commit, getters}) {
  commit('setIsLoading', true)
  _post(
    getters.getEditingRec,
    `mutation ($input: CustomerInput) {
      createCustomer(input: $input) {
        id
        username
        password
        name
        address
        phone
        balance
        points
      }
    }`
  )
    .then(({data}) => {
      commit('setIsLoading', false)
      _procAlert(data)
      commit('setIsModalOpened', false)
      getters.getRecs.push(data.createCustomer)
      commit('setRecs', _.clone(getters.getRecs))
    })
    .catch(err => {
      _procError(err)
      commit('setIsLoading', false)
    })
}
