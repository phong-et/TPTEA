 <template>
  <q-modal v-model="isModalQRCodeOpened" minimized>
    <q-modal-layout>
      <q-toolbar color="primary">
        <q-btn flat icon="close" @click="isModalQRCodeOpened = false"></q-btn>
      </q-toolbar>
      <div class="q-pa-lg">
        <gen-q-r-code :qrcode="qrcode" class="row justify-center" />
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
  computed: {
    isModalQRCodeOpened: {
      get() {
        return this.$store.getters['giftcard/getIsModalQRCodeOpened']
      },
      set(val) {
        this.$store.commit('giftcard/setIsModalQRCodeOpened', val)
      },
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
