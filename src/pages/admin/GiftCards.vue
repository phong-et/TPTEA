<template>
  <div>
    <h4 class="q-ma-xl">Welcome to Gift Cards page</h4>
    <q-card-main class="q-mb-md">
      <q-input clearable v-model="codeQR" float-label="QR Code" color="sencondary" />
      <q-btn color="amber-3" label="Scan QR Code" class="text-brown-6 q-ma-sm col-10" @click="openSanner()"></q-btn>
    </q-card-main>
    <q-modal v-model="opened" maximized @show="loadScanner()">
      <q-modal-layout>
        <div>
          <q-btn class="modal-title" flat icon="close" @click="closeModal()"></q-btn>
        </div>
        <component v-bind:is="scanner"></component>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import InitHandler from '../../mixins/InitHandler'
import ScannerQRCode from '../../components/admin/qrcode/TheDecodeAllDemo'
export default {
  components: {QrcodeReader, ScannerQRCode},
  mixins: [InitHandler],
  data() {
    return {
      opened: false,
      codeQR: '',
      scanner: null,
    }
  },
  methods: {
    loadScanner() {
      this.scanner = this.ScannerQRCode
    },
    openSanner() {
      this.opened = true
    },
    onDecode(content) {
      this.codeQR = content
      this.opened = false
    },
    closeModal() {
      this.opened = false
      this.scanner = null
    },
  },
}
</script>
<style scoped lang="stylus">
.decoded-content
  position absolute
  bottom 0
  left 0
  right 0
  max-width 100%
  color #fff
  font-weight bold
  padding 10px
  background-color rgba(0, 0, 0, 0.5)
</style>
