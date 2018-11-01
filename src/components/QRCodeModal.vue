 <template>
  <div>
    <q-modal maximized>
      <q-modal-layout>
        <div>
          <q-btn class="modal-title" flat icon="close" @click="closeScanner()"></q-btn>
        </div>
        <div>
          <component @scanned="receiveScannerCode" ref="scanner" v-bind:is="theScanner"></component>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import etGrid from '/.EtGrid'
export default {
  components: {
    etGrid,
    createGiftCardModal,
  },
}
</script>
<style lang="stylus" scoped>
</style>

 
 