<template>
  <div>
    <et-grid type="adminmodifier" aliasType="AdminModifiers" />
    <et-modal type="adminmodifier" aliasType="AdminModifier" />
  </div>
</template>
<script>
import etGrid from '../../components/EtGrid'
import etModal from '../../components/EtModal'
export default {
  components: {
    etGrid,
    etModal,
  },
}
</script>
<style lang="stylus" scoped>
</style>
