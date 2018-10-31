<template>
  <div>
    <et-modal :type="type">
      <div class="row">
        <q-field class="q-mb-md col-11" label-width="3" icon="date_range" label="Expiry">
          <q-input v-model="expiry" type="number" suffix="days" color="secondary" />
        </q-field>
        <q-field class="q-mb-md col-11" label-width="3" icon="attach_money" label="Amout">
          <q-input v-model="amount" type="number" prefix="$" color="secondary" />
        </q-field>
      </div>
      <div class="row q-my-lg q-py-md gutter-x-sm justify-center" style="background:#fff">
        <q-input class="q-mt-lg q-mx-lg col-xs-11 col-sm-11 col-md-8" placeholder="code" v-model="currentGenGiftCardCode" readonly inverted color="tertiary" />
        <q-btn @click="genGiftCardCode({expiry,amount})" class="q-mt-lg q-py-sm col-11 col-xs-11 col-sm-11 col-md-3" color="secondary" label="Gen Code" icon="brush"></q-btn>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-12 q-mt-lg q-mt-lg q-py-sm">
        <q-card-media class="justify-center">
          <img class="qr-code" src="statics/qr-code-sample.png">
        </q-card-media>
      </div>
    </et-modal>
  </div>
</template>
<script>
import etModal from './EtModal'
import {mapActions, mapState} from 'vuex'
export default {
  props: {
    type: {
      default: 'xxx',
      type: String,
    },
  },
  components: {
    etModal,
  },
  data() {
    return {
      expiry: '0',
      amount: '0',
    }
  },
  computed: {
    ...mapState('giftcard', ['getCurrentGenGiftCardCode']),
    // ...mapState({
    //   getIsLoading(state, getters) {
    //     console.log(state)
    //     return getters[this.type + '/getCurrentGenGiftCardCode']
    //   },
    // }),
    currentGenGiftCardCode: {
      get() {
        return this.$store.getters[this.type + '/getcurrentGenGiftCardCode']
      },
      set(val) {
        this.$store.commit(this.type + '/setcurrentGenGiftCardCode', val)
      },
    },
  },
  methods: {
    ...mapActions('giftcard', ['genGiftCard']),
    genGiftCardCode(payload) {
      this.genGiftCard(payload)
    },
  },
}
</script>
<style lang="stylus" scoped>
.qr-code
  width 256px
  height 256px
  margin 0 auto
</style>
