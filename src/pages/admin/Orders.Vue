<template>
  <div>
    <et-grid type="order" :comboFilter="store" :pagingOptions="pagingOptions" hideAdd/>
    <component v-bind:is="modal"></component>
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
        selectedValue: 0,
        fetchRecsByFilterName: 'fetchOrdersByStoreId',
        filterPlaceHolder: 'Type store name...',
        options: [],
      },
      modal: null,
      pagingOptions: {
        sortBy: 'CreatedAt',
        descending: true,
      },
    }
  },
  computed: {
    ...mapGetters('store', ['getRecs']),
    ...mapGetters('order', ['getIsModalOpened']),
  },
  methods: {
    ...mapActions('store', ['fetchRecs']),
    ...mapActions('menu', ['fetchAllMenus']),
    ...mapActions('modifier', ['fetchAllModifiers']),
  },
  mounted() {
    this.fetchRecs().then(() => {
      this.store.options = this.getRecs.length > 0 ? this.getRecs.map(store => ({label: store.name, value: store.id})) : []
      this.store.options.unshift({label: 'All Stores', value: 0})
    })
    this.fetchAllMenus()
    this.fetchAllModifiers()
  },
  watch: {
    getIsModalOpened(newVal, oldVal) {
      if (this.modal == null) this.modal = modalOrderCustomer
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
