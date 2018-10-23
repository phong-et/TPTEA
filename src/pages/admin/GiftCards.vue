<template>
  <div>
    <label>Demo Scanner QRCode</label>
    <q-input clearable v-model="codeQR" float-label="QR Code" color="sencondary" placeholder="Please move camera focus to qr code image" />
    <QrcodeReader @decode="onDecode" @init="onInit">
      <div class="decoded-content">{{ content }}</div>
      <LoadingIndicator v-show="loading" />
    </QrcodeReader>
  </div>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import QRCodeInitHandler from '../../mixins/QRCodeInitHandler'
export default {
  components: {QrcodeReader},
  mixins: [QRCodeInitHandler],
  data() {
    return {
      codeQR: '',
    }
  },
  methods: {
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
