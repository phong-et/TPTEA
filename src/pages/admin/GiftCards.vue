<template>
  <div>
    <et-grid type="giftcard" :disableEditting="true" :expandedCol="expandedCol" />
    <modal-create-gift-card />
    <modal-q-r-code :qrcode="getCurrentGenGiftCardCode" />
  </div>
</template>
<script>
import modalCreateGiftCard from '../../components/CreateGiftCardModal'
import modalQRCode from '../../components/QRCodeModal'
import etGrid from '../../components/EtGrid'
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    etGrid,
    modalQRCode,
    modalCreateGiftCard,
  },
  computed: {
    ...mapGetters('giftcard', ['getCurrentGenGiftCardCode', 'getIsModalQRCodeOpened']),
  },
  methods: {
    ...mapMutations('giftcard', ['setIsModalQRCodeOpened']),
  },
  mounted() {
    console.log(this.getIsModalQRCodeOpened)
  },
  data() {
    let me = this
    return {
      expandedCol: {
        fieldName: 'qrcode',
        hidden: false,
        icon: 'crop_free',
        action: function() {
          me.setIsModalQRCodeOpened(true)
        },
      },
    }
  },
}
</script>
<style lang="stylus" scoped>
</style>
