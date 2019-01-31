<template>
  <div>
    <et-grid type="order" :comboFilter="store"/>
    <modal-order-customer />
  </div>
</template>
<script>
import etGrid from '../../components/EtGrid'
import modalOrderCustomer from '../../components/OrderCustomerModal'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
    etGrid,
    modalOrderCustomer,
  },
  data() {
    return {
      store: {
        hidden: false,
        selectedValue: 1,
        fetchRecsName: 'fetchOrdersByStoreId',
        options: [],
      },
    }
  },
  computed: {
    ...mapGetters('store', ['getRecs']),
  },
  methods: {
    ...mapActions('store', ['fetchRecs']),
  },
  mounted() {
    this.fetchRecs().then(() => {
      this.store.options = this.getRecs.length > 0 ? this.getRecs.map(store => ({label: store.name, value: store.id})) : []
    })
  },
}
</script>
<style lang="stylus" scoped>
</style>
