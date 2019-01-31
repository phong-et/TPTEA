<template>
  <q-modal v-model="isModalOpened">
    <q-modal-layout>
      <q-toolbar color="primary">
        <q-btn flat icon="close" @click="isModalOpened = false"></q-btn>
      </q-toolbar>
      <div class="q-pa-lg">
        <label class="col-12 q-mb-sm text-weight-bold">Order Infomation</label>
        <q-field icon="person" class="col-12 q-ml-md">
          <span>{{rawData.customerName}}</span>
        </q-field>
        <q-field icon="access_time" class="col-12 q-ml-md">
          <span>{{rawData.createAt|formatOrderDate}}</span>
        </q-field>
        <!-- <q-select
          inverted
          color="secondary"
          v-model="comboFilter.selectedValue"
          :options="comboFilter.options"
          @input="fetchRecsByComboFilter(comboFilter.selectedValue)"
        /> -->
        <history-place-order-method/>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import {upperFirst} from 'lodash'
import {mapState, mapActions, mapGetters} from 'vuex'
import historyPlaceOrderMethod from './HistoryPlaceOrderMethod'
import orderMenuDetail from './OrderMenuDetail'
import {date} from 'quasar'
export default {
  components: {
    historyPlaceOrderMethod,
    orderMenuDetail,
  },
  data() {
    return {}
  },
  props: {
    rawData: {
      type: Object,
      default: () => ({
        customerName: 'Phillip Nguyen',
        createAt: new Date(),
      }),
    },
  },
  filters: {
    formatOrderDate(val) {
      return date.formatDate(val, 'HH:mm D/MM/YYYY')
    },
  },
  computed: {
    ...mapState({
      getIsLoading(state, getters) {
        return getters[this.type + '/getIsLoading']
      },
      getFields(state, getters) {
        return getters[this.type + '/getFields']
      },
      getEditingRec(state, getters) {
        return getters[this.type + '/getEditingRec']
      },
    }),
    ...mapGetters('store', ['getRecs']),
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
    ...mapActions({
      updateRec(dispatch, payload) {
        return dispatch(`${this.type}/update${upperFirst(this.type)}`, payload)
      },
    }),
  },
}
</script>
<style lang="stylus" scoped>
.style-modal
  min-width 60vw !important
  min-height 70vh !important
</style>
