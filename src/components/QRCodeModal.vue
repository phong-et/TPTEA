 <template>
  <q-modal v-model="isModalQRCodeOpened" minimized>
    <q-modal-layout>
      <q-toolbar color="primary">
        <q-btn class="modal-title" flat icon="close" @click="isModalQRCodeOpened = false"></q-btn>
      </q-toolbar>
      <div class="q-pa-lg row">
        <gen-q-r-code :qrcode="qrcode" />
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import genQRCode from './GenQRCode'
// import {mapGetters, mapMutations} from 'vuex'
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
    // ...mapGetters('giftcard', ['getIsModalQRCodeOpened']),
    isModalQRCodeOpened: {
      get() {
        return this.$store.getters['giftcard/getIsModalQRCodeOpened']
      },
      set(val) {
        this.$store.commit('giftcard/setIsModalQRCodeOpened', val)
      },
    },
  },
  methods: {
    //  ...mapMutations('giftcard', ['setIsModalQRCodeOpened']),
  },
}
</script>
<style lang="stylus" scoped>
</style>
