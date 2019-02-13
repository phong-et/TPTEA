<template>
  <q-modal v-model="isModalOpened" maximized>
    <q-modal-layout>
      <q-toolbar color="tertiary">
        <q-btn flat icon="keyboard_backspace" @click="discardEditingRec"></q-btn>
        <span class="modal-title">
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
          class="cmb-order-status"
          stack-label="Status"
          inverted
          color="secondary"
          v-model="getEditingRec.orderStatusId"
          :options="statuses"
          @input="changeOrderStatus"
        />
        <q-btn
          :disable="getIsLoading"
          :loading="getIsLoading"
          icon="save"
          color="secondary"
          label="Update Status"
          class="btn-update-status"
          @click="updateOrderStatus()"
        >
          <q-spinner-pie slot="loading" size="20px"/>
        </q-btn>
        <q-toolbar-title class="text-right">{{'Total $'+getEditingRec.totalAmount}}</q-toolbar-title>
      </q-toolbar>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import historyPlaceOrderMethod from './HistoryPlaceOrderMethod'
import orderMenuDetail from './OrderMenuDetail'
export default {
  components: {
    historyPlaceOrderMethod,
    orderMenuDetail,
  },
  data() {
    return {
      statuses: [],
    }
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
    ...mapMutations('order', ['discardEditingRec']),
    changeOrderStatus(newStatusId) {
      let statusName = this.statuses.find(status => status.value === newStatusId).label
      this.getEditingRec.orderStatusId = newStatusId
      this.getEditingRec.orderStatusName = statusName
      this.getEditingRec.OrderStatus.id = newStatusId
      this.getEditingRec.OrderStatus.name = statusName
    },
  },
  mounted() {
    this.fetchRecs().then(() => {
      this.statuses = this.getRecs.length > 0 ? this.getRecs.map(status => ({label: status.name, value: status.id})) : []
    })
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
  width 200px

.modal-title
  padding-left 8px

.cmb-order-status
  width 165px
</style>
