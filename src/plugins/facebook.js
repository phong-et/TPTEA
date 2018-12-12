export default ({store, Vue}) => {
  function getFbToken() {
    return localStorage.getItem('access_token')
  }
  async function getUserFbInfo() {
    let popup,
      token = getFbToken()
    if (token) {
      return new Promise(resolve => {
        getUserFbInfoByToken(token, resolve)
      })
    } else {
      popup = window.open(
        'https://www.facebook.com/v3.2/dialog/oauth?client_id=253998778647702&response_type=token&scope=email,public_profile&redirect_uri=' +
          window.location.origin +
          '/fb-login-receiver.html',
        'Facebook Login',
        'width=500px,height=500px'
      )

      let checkPopupClose = () => {
        if (popup.closed) {
          if (store.getters['customer/getIsLoadingFB']) store.commit('customer/setIsLoadingFB', false)
          clearInterval(timer)
        }
      }
      let timer = setInterval(checkPopupClose, 500)

      return new Promise(resolve => {
        window.addEventListener(
          'message',
          ({data}) => {
            getUserFbInfoByToken(data, resolve)
          },
          {once: true}
        )
      })
    }
  }
  async function getUserFbInfoByToken(token, resolve) {
    Vue.$axios
      .get('https://graph.facebook.com/me', {
        params: {
          fields: 'id,name,email',
          access_token: token,
        },
      })
      .then(({data}) => {
        resolve(data)
      })
  }
}
