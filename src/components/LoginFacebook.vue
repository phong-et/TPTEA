<template>
  <iframe @load="getTokenRedirect($event.path[0].contentWindow.location)" :src="urlFacebook" frameborder="0" />
</template>
<script>
// import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  data() {
    return {
      opened: true,
      urlFacebook:
        'https://www.facebook.com/v3.2/dialog/oauth?client_id=253998778647702&response_type=token&redirect_uri=' +
        window.location.origin +
        '/fb-login-receiver.html',
    }
  },
  methods: {
    getTokenRedirect(location) {
      let urlParams = new URLSearchParams(location.hash.split('#')[1])
      let token = urlParams.get('access_token')
      console.log(token)
      this.$emit('loggedIn', token)
    },
    // ...mapActions('customer', ['genCustomerPaymentId']),
    // ...mapMutations('customer', ['setQRCodePaymentId']),
  },
}
</script>
<style lang="stylus" scoped>
iframe
  width 100%
  height 100%
</style>
