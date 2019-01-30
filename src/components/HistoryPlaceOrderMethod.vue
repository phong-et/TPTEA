<template>
  <div>
    <div class="title bg-primary">chosen place order method</div>
    <div class="row q-ma-md text-primary">
      <label class="col-12 q-mb-sm text-weight-bold">{{rawData.isStorePickUp?'Store Pick-up':'COD Delivery'}}</label>
      <q-field :icon="rawData.isStorePickUp?'store':'home'" class="col-12 q-ml-md">
        <span>{{rawData.address}}</span>
      </q-field>
      <q-field icon="contact_phone" class="col-12 q-ml-md" :class="{'hidden':rawData.isStorePickUp}">
        <span>{{rawData.deliveryContact}}</span>
      </q-field>
      <q-field icon="access_time" class="col-12 q-ml-md">
        <span>{{rawData.receivingTime|formatOrderDate}}</span>
      </q-field>
    </div>
  </div>
</template>
<script>
import {date} from 'quasar'
export default {
  props: {
    rawData: {
      type: Object,
      default: () => ({
        address: '',
        receivingTime: '',
        deliveryContact: '',
        isStorePickUp: false,
      }),
    },
  },
  filters: {
    formatOrderDate(val) {
      return date.formatDate(val, 'HH:mm D/MM/YYYY')
    },
  },
}
</script>
<style lang="stylus" scoped>
.title
  height 40px
  color #fff
  text-transform capitalize
  justify-content center
  display flex
  align-items center
</style>
