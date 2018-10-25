<template>
  <QrcodeReader ref="scanner" @decode="onDecode" @init="onInit">
    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>
<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import QRCodeInitHandler from '../../mixins/QRCodeInitHandler'
export default {
  components: {QrcodeReader},
  mixins: [QRCodeInitHandler],
  methods: {
    onDecode(content) {
      this.pause = true
      this.$emit('scanned', content)
    },
  },
}
</script>
<style scoped lang="stylus">
</style>
