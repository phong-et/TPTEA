<template>
  <div class="order-item">
    <q-item link :to="`/order/history-order-detail/${rawData.id}`">
      <q-item-side :icon="rawData.isStorePickUp?'store':'local_shipping'"/>
      <q-item-main>
        <q-item-tile label class="text-weight-bold" text-color="primary">{{rawData.address}}</q-item-tile>
        <q-item-tile :class="genOrderStatusClass(rawData.orderStatus)" sublabel>{{rawData.orderStatus}}</q-item-tile>
        <q-item-tile sublabel text-color="secondary">{{rawData.orderDate|formatOrderDate}}</q-item-tile>
      </q-item-main>
      <q-item-side class="text-weight-bold">{{'$'+rawData.totalAmount}}</q-item-side>
    </q-item>
  </div>
</template>
<script>
import {date} from 'quasar'
export default {
  props: {
    rawData: {
      type: Object,
      default: () => ({
        id: null,
        address: '',
        orderDate: '',
        orderStatus: '',
        totalAmount: 0,
        isStorePickUp: false,
      }),
    },
  },
  filters: {
    formatOrderDate(val) {
      return date.formatDate(val, 'HH:mm D/MM/YYYY')
    },
  },
  methods: {
    genOrderStatusClass(statusName) {
      return (
        'order-status ' +
        statusName
          .toLowerCase()
          .split(' & ')
          .join('-')
      )
    },
  },
}
</script>
<style lang="stylus" scoped>
.order-item
  border-radius 10px
  margin 0px 20px 20px 20px
  box-shadow 2px 3px 4px 1px #ccc

.order-status
  font-weight bold
  font-style italic

.processing
  color orange

.paid
  color blue

.cancelled
  color red

.paid-delivered
  color green
</style>
