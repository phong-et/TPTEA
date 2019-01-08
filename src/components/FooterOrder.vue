<template>
  <q-layout-footer class="max-width-center-h">
    <q-toolbar color="secondary" class="row inline items-center">
      <q-btn label="View Carts" color="primary"/>
      <q-toolbar-title class="text-right">{{'$'+totalPrice}}</q-toolbar-title>
    </q-toolbar>
  </q-layout-footer>
</template>
<script>
import _d from 'lodash'
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('customerorder', ['getRecs']),
    totalPrice() {
      return _d.sumBy(this.getRecs.orderDetail, 'price')
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
