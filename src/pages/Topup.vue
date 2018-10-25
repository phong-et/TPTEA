<template>
  <q-card square class="et-login center">
    <q-card-media>
      <svg class="center" id="logo" viewBox="0 0 483 483" width="128px" height="128px" v-html="getLoginLogo">
      </svg>
    </q-card-media>
    <div class="row justify-center q-mt-lg">
      <q-input clearable v-model="giftCardCode" float-label="Gift card code" color="secondary" />
    </div>
    <div class="row justify-center q-mt-md">
      <div class="col-10 row items-center text-primary">
        <hr class="q-hr col-4">
        or
        <hr class="q-hr col-4">
      </div>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn color="secondary" label="Scan QR Code" class="text-secondary q-ma-sm col-3" @click="openScanner()"></q-btn>
    </div>
    <q-modal v-model="openedScanner" maximized>
      <q-modal-layout>
        <div>
          <q-btn class="modal-title" flat icon="close" @click="closeScanner()"></q-btn>
        </div>
        <div>
          <component @scanned="receiveScannerCode" ref="scanner" v-bind:is="currentQRCodeScanner"></component>
        </div>
      </q-modal-layout>
    </q-modal>
    <q-card-main class="q-mb-md q-pt-none">

    </q-card-main>
  </q-card>
</template>
<script>
import Vivus from 'vivus'
import QRCodeScanner from '../../components/qrcode/QRCodeScanner'
export default {
  components: {QRCodeScanner},
  data() {
    return {
      codeQR: '',
      openedScanner: false,
      currentQRCodeScanner: null,
    }
  },
  methods: {
    receiveScannerCode(code) {
      this.codeQR = code
      this.closeScanner()
    },
    closeScanner() {
      this.openedScanner = false
      this.currentQRCodeScanner = null
    },
    openScanner() {
      this.openedScanner = true
      this.currentQRCodeScanner = QRCodeScanner
    },
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

.q-card
  width $qcardWidth

.q-card-media
  background url('~assets/login_banner.png') no-repeat center center
  background-size cover
  height 230px
  padding 40px 0

.center
  margin auto
  display block

@media (max-width: $breakpoint-xs)
  .et-login
    width 100%

  .q-card-actions
    height calc(100vh - 527px) !important

@media (min-width: $breakpoint-xs)
  .q-card-actions
    height 240px !important

.q-collapsible
  margin-top 30px
  padding 0
</style>
