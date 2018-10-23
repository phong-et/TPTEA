<template>
  <QrcodeReader @decode="onDecode" @init="onInit">
    <div class="decoded-content">{{ content }}</div>
    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>
<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import QRCodeInitHandler from '../../../mixins/QRCodeInitHandler'
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
