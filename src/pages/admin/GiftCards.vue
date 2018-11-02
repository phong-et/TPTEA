<template>
  <div>
    <et-grid type="giftcard" />
    <modal-create-gift-card />
    <modal-q-r-code :qrcode="getCurrentGenGiftCardCode" />
  </div>
</template>
<script>
import modalCreateGiftCard from '../../components/CreateGiftCardModal'
import modalQRCode from '../../components/QRCodeModal'
import etGrid from '../../components/EtGrid'
import {mapGetters} from 'vuex'
export default {
  components: {
    etGrid,
    modalQRCode,
    modalCreateGiftCard,
  },
  computed: {
    ...mapGetters('giftcard', ['getCurrentGenGiftCardCode']),
  },
}
</script>
<style lang="stylus" scoped>
</style>
