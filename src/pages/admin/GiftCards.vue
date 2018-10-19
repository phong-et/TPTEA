<template>
  <div>
    <h4 class="q-ma-xl">Welcome to Gift Cards page</h4>
    <q-card-main class="q-mb-md">
      <q-input clearable v-model="codeQR" float-label="QR Code" color="sencondary" />
      <q-btn color="amber-3" label="Scan QR Code" class="text-brown-6 q-ma-sm col-10" @click="scanQRCode()"></q-btn>
    </q-card-main>
    <q-modal v-model="opened" maximized>
      <q-modal-layout>
        <div>
          <q-btn class="modal-title" flat icon="close" @click="opened = false"></q-btn>
        </div>
        <div>
          <QrcodeReader @decode="onDecode" @init="onInit">
            <div class="decoded-content">{{ codeQR }}</div>
            <LoadingIndicator v-show="loading" />
          </QrcodeReader>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import InitHandler from '../../mixins/InitHandler'
export default {
  components: {QrcodeReader},

  mixins: [InitHandler],
  data() {
    return {
      opened: false,
      codeQR: '',
    }
  },
  methods: {
    scanQRCode() {
      this.opened = true
    },
    onDecode(content) {
      this.codeQR = content
      this.opened = false
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
