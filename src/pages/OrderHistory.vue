<template>
  <q-page class="q-pt-md">
    <q-layout-header class="max-width-center-h">
      <q-toolbar class="q-pt-none q-pb-none" color="secondary">
        <q-btn color="white" flat round dense icon="reply" @click="back()"/>
        <q-toolbar-title>Order History</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <order-history-item v-for="(item,index) in getCustomerOrders" :rawData="item" :key="index"/>
  </q-page>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import orderHistoryItem from '../components/OrderHistoryItem'
export default {
  components: {
    orderHistoryItem,
  },
  computed: {
    ...mapGetters('customerorder', ['getCustomerOrders']),
  },
  methods: {
    ...mapActions('customerorder', ['fetchCustomerOrders']),
    back() {
      this.$router.go(-1)
    },
  },
  mounted() {
    this.fetchCustomerOrders()
  },
}
</script>
<style lang="stylus" scoped>
</style>
