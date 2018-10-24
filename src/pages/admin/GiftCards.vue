<template>
  <div>
    <q-card-actions>
      <h5>Demo Scanner QRCode</h5>
      <q-input v-model="codeQR" class="col-11" float-label="QR Code" color="sencondary" /><br />
      <q-btn color="secondary" label="Load Scanner" class="text-secondary q-ma-sm col-3" @click="loadScanner()"></q-btn>
      <q-btn color="secondary" label="Detroy Scanner" class="text-secondary q-ma-sm col-3" @click="detroyScanner()"></q-btn>
    </q-card-actions>
    <div ref="scannerContainer">
      <!-- <component ref="scanner" v-bind:is="currentQRCodeScanner"></component> -->
    </div>
  </div>
</template>
<script>
import QRCodeScanner from '../../components/admin/qrcode/QRCodeScanner'
import Vue from 'vue'
export default {
  components: {QRCodeScanner},
  data() {
    return {
      codeQR: '',
      currentQRCodeScanner: null,
    }
  },
  methods: {
    detroyScanner() {
      this.$refs.scanner.$destroy()
      // this.currentQRCodeScanner = null
      console.log(this.$refs.scanner)
    },
    loadScanner() {
      // this.currentQRCodeScanner = QRCodeScanner
      var ComponentClass = Vue.extend(QRCodeScanner)
      var instance = new ComponentClass()
      instance.$mount()
      this.$refs.scannerContainer.appendChild(instance.$el)
      console.log(this.$refs.scanner)
    },
  },
}
</script>
<style scoped lang="stylus">
</style>
