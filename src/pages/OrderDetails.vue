<template>
  <q-page>
    <q-layout-header class="max-width-center-h">
      <q-toolbar class="q-pt-none q-pb-none" color="secondary">
        <q-btn color="white" flat round dense icon="reply" @click="back()"/>
        <q-toolbar-title>Current Cart</q-toolbar-title>
        <q-btn round dense flat icon="shopping_cart">
          <q-chip floating color="primary">{{quantity}}</q-chip>
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <place-order-methods
      :rawData="{
      deliveryAddress: this.getCustomer.address,
      deliveryContact: formatContactInfo(this.getCustomer.name,this.getCustomer.phone),
    }"
    />
    <order-menu-detail v-for="menu in getRecs.orderDetails" :rawData="menu" :key="menu.menuId+menu.modifierIds.toString()"/>
    <label v-show="quantity===0" class="q-title text-weight-thin text-secondary absolute-center">Your cart is empty</label>
    <q-layout-footer class="max-width-center-h">
      <q-toolbar color="secondary" class="row inline items-center">
        <q-btn
          :loading="getIsLoading"
          :disabled="quantity===0"
          label="Place Order"
          color="primary"
          icon="payment"
          class="q-ml-sm"
          @click="placeOrder()"
        >
          <span slot="loading">
            <q-spinner-pie size="25px" class="q-mr-md"/>Place Order
          </span>
        </q-btn>
        <q-toolbar-title class="text-right">{{'$'+calculateOrderPrice}}</q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>
  </q-page>
</template>
<script>
import _d from 'lodash'
import orderMenuDetail from '../components/OrderMenuDetail'
import placeOrderMethods from '../components/PlaceOrderMethods'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  components: {
    orderMenuDetail,
    placeOrderMethods,
  },
  computed: {
    ...mapGetters('customerorder', ['getRecs', 'getIsLoading', 'getPlaceOrderMethod']),
    ...mapGetters('customer', ['getCustomer']),
    calculateOrderPrice() {
      return _d.sumBy(this.getRecs.orderDetails, 'price')
    },
    quantity() {
      return _d.sumBy(this.getRecs.orderDetails, 'quantity')
    },
  },
  methods: {
    ...mapActions('customerorder', ['placeOrder']),
    ...mapMutations('customerorder', ['setPlaceOrderMethod']),
    back() {
      this.$router.go(-1)
    },
    formatContactInfo(name, phone) {
      return _d.includes([name, phone], undefined) ? '' : name + '- ' + phone
    },
  },
  watch: {
    getRecs(newValue) {
      if (_d.isEmpty(newValue)) this.$router.push('/main-categories')
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
