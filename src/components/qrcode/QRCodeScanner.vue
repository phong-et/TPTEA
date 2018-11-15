<template>
  <div>
    <component @decode="onDecode" @init="onInit" v-bind:is="theQRCodeReader">
      <LoadingIndicator v-show="loading" />
    </component>
  </div>
</template>
<script>
import {QrcodeStream, QrcodeCapture} from 'vue-qrcode-reader'
import QRCodeInitHandler from '../../mixins/QRCodeInitHandler'
export default {
  components: {
    QrcodeStream,
    QrcodeCapture,
  },
  mixins: [QRCodeInitHandler],
  methods: {
    onDecode(content) {
      this.pause = true
      this.$emit('scanned', content)
    },
  },
  data() {
    return {
      theQRCodeReader: null,
    }
  },
  computed: {
    isIosPwa() {
      // Detects if device is on iOS
      const isIos = () => {
        const userAgent = window.navigator.userAgent.toLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
      }
      // Detects if device is in standalone mode
      const isInStandaloneMode = () => 'standalone' in window.navigator && window.navigator.standalone
      // Checks if should display install popup notification:
      return isIos() && isInStandaloneMode()
    },
  },
  mounted() {
    this.theQRCodeReader = this.isIosPwa ? QrcodeCapture : QrcodeStream
  },
}
</script>
<style scoped lang="stylus">
</style>
