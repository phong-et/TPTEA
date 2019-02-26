<template>
  <q-page>
    <q-layout-header class="max-width-center-h">
      <q-toolbar class="q-pt-none q-pb-none" color="secondary">
        <q-btn color="white" flat round dense icon="reply" @click="back()"/>
        <q-toolbar-title>Order History</q-toolbar-title>
        <q-btn round dense flat icon="shopping_cart">
          <q-chip floating color="primary">{{quantity}}</q-chip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <history-place-ordder-method :rawData="getCustomerOrderDetail.placeOrderMethod"/>
    <order-menu-detail remove v-for="orderDetail in getCustomerOrderDetail.customerOrder" :rawData="orderDetail" :key="orderDetail.id"/>
    <q-layout-footer class="max-width-center-h">
      <q-toolbar color="secondary" class="row inline justify-between">
        <div class="col-4">
          <span>
            <i class="q-body-2">{{this.customerOrder.orderStatus}}</i>
          </span>
        </div>
        <div class="col-5">
          <q-btn
            :disable="customerOrder.orderStatus !== 'Processing'"
            :loading="getIsLoading"
            icon="money_off"
            color="secondary"
            label="Pay now"
            class="q-ml-xs"
            @click="pay()"
          >
            <q-spinner-pie slot="loading" size="20px"/>
          </q-btn>
        </div>
        <div class="col-3 text-right">
          <span class="text-weight-bold">{{'Total: $'+calculateOrderPrice}}</span>
        </div>
      </q-toolbar>
    </q-layout-footer>
  </q-page>
</template>
<script>
import _d from 'lodash'
import {mapGetters, mapActions} from 'vuex'
import orderMenuDetail from '../components/OrderMenuDetail'
import historyPlaceOrdderMethod from '../components/HistoryPlaceOrderMethod'
import {Dialog} from 'quasar'
export default {
  data() {
    return {
      customerOrder: {},
    }
  },
  components: {
    orderMenuDetail,
    historyPlaceOrdderMethod,
  },
  computed: {
    ...mapGetters('customerorder', ['getCustomerOrderDetail', 'getCustomerOrders', 'getIsLoading']),
    calculateOrderPrice() {
      return _d.sumBy(this.getCustomerOrderDetail.customerOrder, 'price')
    },
    quantity() {
      return _d.sumBy(this.getCustomerOrderDetail.customerOrder, 'quantity')
    },
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    ...mapActions('customerorder', ['fetchCustomerOrderDetail', 'payNow']),
    pay() {
      Dialog.create({
        title: 'Confirm',
        message: 'Do you want pay now?',
        ok: 'Now',
        cancel: 'Later',
      }).then(() => {
        this.payNow(this.$route.params.orderId).then(data => {
          if (data.payNow) this.customerOrder.orderStatus = 'Paid'
        })
      })
    },
  },
  mounted() {
    let orderId = parseInt(this.$route.params.orderId)
    this.customerOrder = this.getCustomerOrders.find(customerOrder => {
      return customerOrder.id === orderId
    })
    this.fetchCustomerOrderDetail(orderId)
  },
}
</script>
<style lang="stylus" scoped>
</style>
