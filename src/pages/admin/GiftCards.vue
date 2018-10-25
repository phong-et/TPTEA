<template>
  <div>
    <q-card-actions>
      <h5>Demo Scanner QRCode</h5>
      <q-input v-model="codeQR" class="col-11" float-label="QR Code" color="sencondary" /><br />
      <q-btn color="secondary" label="Open Scanner" class="text-secondary q-ma-sm col-3" @click="openScanner()"></q-btn>
    </q-card-actions>
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
  </div>
</template>
<script>
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
</style>
