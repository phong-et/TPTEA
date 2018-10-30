<template>
  <div>
    <et-grid type="giftcard" />
    <create-gift-card-modal type="giftcard"></create-gift-card-modal>
  </div>
</template>
<script>
import createGiftCardModal from '../../components/CreateGiftCardModal'
import etGrid from '../../components/EtGrid'
export default {
  components: {
    etGrid,
    createGiftCardModal,
  },
}
</script>
<style lang="stylus" scoped>
</style>
