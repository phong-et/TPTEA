<template>
  <div>
    <div class="title bg-primary">place order methods</div>
    <div class="row q-ma-md text-primary text-weight-bold">
      <q-radio v-model="placeOrderMethod.isStorePickUp" class="col-12 q-mb-sm" :val="false" label="COD Delivery"/>
      <div class="q-ml-lg text-weight-regular">
        <q-field icon="home">
          <q-input
            :disable="placeOrderMethod.isStorePickUp"
            v-model="placeOrderMethod.deliveryAddress"
            type="textarea"
            class="max-width"
            placeholder="Delivery Address"
            @focus="$event.srcElement.select()"
            hide-underline
          />
        </q-field>
        <q-field icon="contact_phone">
          <q-input
            :disable="placeOrderMethod.isStorePickUp"
            v-model="placeOrderMethod.deliveryContact"
            type="textarea"
            class="max-width"
            placeholder="Contact Name - Phone"
            @focus="$event.srcElement.select()"
            hide-underline
          />
        </q-field>
        <q-field icon="access_time">
          <q-datetime modal :disable="placeOrderMethod.isStorePickUp" v-model="placeOrderMethod.receivingTime" type="time" hide-underline/>
        </q-field>
      </div>
    </div>
    <div class="row q-ma-md text-primary text-weight-bold">
      <q-radio v-model="placeOrderMethod.isStorePickUp" class="col-12 q-mb-sm" :val="true" label="Store Pick-up"/>
      <div class="q-ml-lg text-weight-regular">
        <q-field icon="store">
          <q-select
            v-model="placeOrderMethod.storeId"
            :disable="!placeOrderMethod.isStorePickUp"
            placeholder="Please select store"
            :options="getRecs.map(opt=>({label:opt.name,value:opt.id}))"
            hide-underline
            class="max-width"
          />
        </q-field>
        <q-field icon="access_time">
          <q-datetime modal :disable="!placeOrderMethod.isStorePickUp" v-model="placeOrderMethod.receivingTime" type="time" hide-underline/>
        </q-field>
      </div>
    </div>
  </div>
</template>
<script>
import _d from 'lodash'
import {mapActions, mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    rawData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      placeOrderMethod: {},
    }
  },
  computed: {
    ...mapGetters('store', ['getRecs']),
    ...mapGetters('customerorder', ['getPlaceOrderMethod']),
  },
  methods: {
    ...mapActions('store', ['fetchRecs']),
    ...mapMutations('customerorder', ['setPlaceOrderMethod']),
  },
  mounted() {
    this.placeOrderMethod = _d.cloneDeep({...this.getPlaceOrderMethod, ...this.rawData})
    this.fetchRecs().then(() => {
      this.placeOrderMethod.storeId = this.getRecs.length > 0 ? this.getRecs[0].id : null
    })
  },
  watch: {
    placeOrderMethod: {
      handler: function() {
        this.setPlaceOrderMethod(this.placeOrderMethod)
      },
      deep: true,
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

.max-width
  min-width 200px
  max-width calc(100vw - 100px)
</style>
