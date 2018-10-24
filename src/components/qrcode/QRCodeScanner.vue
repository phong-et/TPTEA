<template>
  <QrcodeReader ref="scanner" @decode="onDecode" @init="onInit">
    <div class="decoded-content">{{ content }}</div>
    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>
<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import QRCodeInitHandler from '../../mixins/QRCodeInitHandler'
export default {
  components: {QrcodeReader},
  mixins: [QRCodeInitHandler],
  data() {
    return {
      content: '',
    }
  },
  methods: {
    onDecode(content) {
      this.content = content
      this.pause = true
      this.$emit('scanned', content)
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
  color #000
  font-weight bold
  padding 10px
</style>
