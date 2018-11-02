 <template>
  <q-modal v-model="openedQRCodeModal" minimized>
    <q-modal-layout>
      <q-toolbar color="primary">
        <q-btn class="modal-title" flat icon="close" @click="openedQRCodeModal = false"></q-btn>
      </q-toolbar>
      <div class="q-pa-lg row">
        <gen-q-r-code :qrcode="qrcode"/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import genQRCode from './GenQRCode'
export default {
  props: {
    qrcode: {
      default: 'qrcode',
      type: String,
    },
  },
  components: {
    genQRCode,
  },
  data() {
    return {
      openedQRCodeModal: true,
    }
  },
}
</script>
<style lang="stylus" scoped>
</style>
