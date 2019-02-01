<template>
  <q-modal v-model="isModalOpened" maximized>
    <q-modal-layout>
      <q-toolbar color="tertiary">
        <q-btn flat icon="close" @click="isModalOpened = false"></q-btn>
        <span>
          <b>Customer :</b>
          {{getEditingRec.Customer.name}} --☆--
          <b>Order Time :</b>
          {{getEditingRec.createdAt}}
        </span>
      </q-toolbar>
      <history-place-order-method :rawData="getEditingRec.placeOrderMethod"/>
      <order-menu-detail remove v-for="orderDetail in getEditingRec.OrderDetails" :rawData="orderDetail" :key="orderDetail.id"/>
      <q-toolbar class="row inline items-center">
        <q-select
          stack-label="Status"
          inverted
          color="secondary"
          v-model="getEditingRec.OrderStatus.id"
          :options="this.getRecs.map(opt => ({label: opt.name, value: opt.id}))"
        />
        <q-btn :disabled="getIsLoading" :loading="getIsLoading" class="btn-update-status" color="secondary" icon="save" label="Update Status" @click="updateOrderStatus()"/>
        <q-toolbar-title class="text-right">{{'Total $'+getEditingRec.totalAmount}}</q-toolbar-title>
      </q-toolbar>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import historyPlaceOrderMethod from './HistoryPlaceOrderMethod'
import orderMenuDetail from './OrderMenuDetail'
export default {
  components: {
    historyPlaceOrderMethod,
    orderMenuDetail,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('order', ['getEditingRec', 'getIsLoading']),
    ...mapGetters('orderstatus', ['getRecs']),
    isModalOpened: {
      get() {
        return this.$store.getters['order/getIsModalOpened']
      },
      set(val) {
        this.$store.commit('order/setIsModalOpened', val)
      },
    },
  },
  methods: {
    ...mapActions('orderstatus', ['fetchRecs']),
    ...mapActions('order', ['updateOrderStatus']),
  },
  mounted() {
    this.fetchRecs()
  },
}
</script>
<style lang="stylus" scoped>
.style-modal
  min-width 60vw !important
  min-height 70vh !important

.btn-update-status
  margin-left 5px
  padding 18px
</style>
