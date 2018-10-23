<template>
  <div>
    <h6>Demo Scanner QRCode</h6>
    <q-card-actions>
      <q-input v-model="codeQR" class="col-11" float-label="QR Code" color="sencondary" placeholder="Please move camera focus to qr code image" /><br />
      <q-btn color="secondary" label="Load Scanner" class="text-secondary q-ma-sm col-3" @click="loadScanner()"></q-btn>
      <q-btn color="secondary" label="Detroy Scanner" class="text-secondary q-ma-sm col-3" @click="detroyScanner()"></q-btn>
    </q-card-actions>
    <div>
      <component ref="scanner" v-bind:is="currentQRCodeScanner"></component>
    </div>
  </div>
</template>
<script>
import QRCodeInitHandler from '../../mixins/QRCodeInitHandler'
import QRCodeScanner from '../../components/admin/qrcode/QRCodeScanner'
export default {
  components: {QRCodeScanner},
  mixins: [QRCodeInitHandler],
  data() {
    return {
      codeQR: '',
      currentQRCodeScanner: null,
    }
  },
  methods: {
    onDecode(content) {
      this.codeQR = content
    },
    detroyScanner() {
      // this.$refs.scanner.$destroy()
      this.currentQRCodeScanner = null
      console.log(this.$refs.scanner)
    },
    loadScanner() {
      this.currentQRCodeScanner = QRCodeScanner
      console.log(this.$refs.scanner)
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
