<template>
  <q-card square class="center">
    <q-card-media>
    </q-card-media>
    <q-item class="q-pt-md q-pb-md">
      <q-item-side icon="attach_money" />
      <q-item-main label="Balance Amout" />
      <q-item-side right>
        <q-item-tile color="secondary">$ {{getCustomer.balance}}</q-item-tile>
      </q-item-side>
    </q-item>
    <div class="row justify-center">
      <q-input v-model="giftCardCode" placeholder="Type gift card code" class="q-ma-sm col-11" inverted color="tertiary" />
    </div>
    <div class="row justify-center">
      <div class="col-10 row items-center text-primary">
        <hr class="q-hr col-4">
        or
        <hr class="q-hr col-4">
      </div>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn color="secondary" label="Scan QR Code" icon="print" class="q-ma-sm col-6" @click="openScanner()"></q-btn>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn :disable="!haveGiftCode()" color="secondary" label="Apply" icon="save_alt" class="q-ma-sm col-4" @click="applyGiftCard()"></q-btn>
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
  </q-card>
</template>
<script>
import QRCodeScanner from '../components/qrcode/QRCodeScanner'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'PageTopup',
  components: {QRCodeScanner},
  data() {
    return {
      giftCardCode: '',
      openedScanner: false,
      currentQRCodeScanner: null,
    }
  },
  computed: {
    ...mapGetters('customer', ['getCustomer']),
  },
  methods: {
    ...mapActions('giftcard', ['updateGiftCard']),
    receiveScannerCode(code) {
      this.giftCardCode = code
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
    applyGiftCard() {
      if (this.haveGiftCode()) {
        this.updateGiftCard(this.giftCardCode)
        alert('apply')
      }
    },
    haveGiftCode() {
      return this.giftCardCode !== ''
    },
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

.q-card
  width $qcardWidth
  height 100%

.q-card-media
  background url('~assets/login_banner.png') no-repeat center center
  background-size cover
  height 150px
  padding 40px 0

.center
  margin auto
  display block

@media (max-width: $breakpoint-xs)
  .et-login
    width 100%

@media (min-width: $breakpoint-xs)
  .q-card-actions
    height 240px !important

.q-collapsible
  margin-top 30px
  padding 0
</style>
