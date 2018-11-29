<template>
  <modal-page @close="closePayment">
    <div class="q-title row justify-center q-mt-sm text-grey">{{getCustomer.name}}</div>
    <div class="row justify-center q-mt-sm">Give this code to the cashier for payment</div>
    <div class="q-pa-lg">
      <et-gen-q-r-code :dark="dark" :qrcode="getQRCodePaymentId" class="row justify-center"/>
    </div>
    <div id="countdown" class="row justify-center">Generating payment code ...</div>
    <div class="row justify-center q-mt-xl">
      <q-btn :loading="getIsLoading" :disabled="disabled" color="secondary" @click="genCustomerPaymentId" label="Get New Code">
        <q-spinner-pie slot="loading" size="25px"/>
      </q-btn>
    </div>
  </modal-page>
</template>
<script>
import etGenQRCode from '../components/GenQRCode'
import ModalPage from '../components/EtModalPage'
import {mapGetters, mapActions, mapMutations} from 'vuex'
const VALID_COLOR = '#00F'
const EXPIRED_COLOR = '#F00'
const EXPIRED_SECONDS = 31
export default {
  data() {
    return {
      dark: EXPIRED_COLOR,
      disabled: true,
      isOpenedPayment: true,
      countDownHandler: null,
    }
  },
  components: {
    etGenQRCode,
    ModalPage,
  },
  computed: {
    ...mapGetters('customer', ['getCustomer', 'getQRCodePaymentId', 'getIsLoading']),
  },
  methods: {
    ...mapActions('customer', ['genCustomerPaymentId']),
    ...mapMutations('customer', ['setQRCodePaymentId']),
    closePayment() {
      this.$router.go(-1)
      clearInterval(this.countDownHandler)
    },
    setMsg(second) {
      document.getElementById('countdown').textContent = 'This code will be expired after   ' + second + ' seconds'
    },
  },
  mounted() {
    this.genCustomerPaymentId()
  },
  watch: {
    getQRCodePaymentId(newQRCode, oldQRCode) {
      this.dark = VALID_COLOR
      this.disabled = true
      this.setQRCodePaymentId(newQRCode)
      var timeleft = EXPIRED_SECONDS
      clearInterval(this.countDownHandler)
      this.setMsg(--timeleft)
      this.countDownHandler = setInterval(() => {
        --timeleft
        this.setMsg(timeleft)
        if (timeleft <= 0) {
          this.disabled = false
          document.getElementById('countdown').textContent = 'This code is expired. Please get a new one!'
          this.dark = EXPIRED_COLOR
          clearInterval(this.countDownHandler)
        }
      }, 1000)
    },
  },
}
</script>
<style lang="stylus" scoped>
div#countdown
  height 20px
</style>
