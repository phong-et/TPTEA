<template>
  <et-modal type="giftcard">
    <div class="row">
      <q-field class="q-mb-md col-11" label-width="3" icon="date_range" label="Expiry">
        <q-input v-model="expiry" type="number" suffix="days" color="secondary" />
      </q-field>
      <q-field class="q-mb-md col-11" label-width="3" icon="attach_money" label="Amout">
        <q-input v-model="amount" type="number" prefix="$" color="secondary" />
      </q-field>
    </div>
    <div class="row q-my-lg q-py-md gutter-x-sm justify-center" style="background:#fff">
      <q-btn @click="createGiftCard({expiry,amount})" class="q-mt-lg q-py-sm col-11 col-xs-11 col-sm-11 col-md-11" color="secondary" label="Save" icon="brush"></q-btn>
    </div>
  </et-modal>
</template>
<script>
import etModal from './EtModal'
import {mapActions} from 'vuex'
export default {
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
    haveGenGiftCardCode() {
      return this.getCurrentGenGiftCardCode !== ''
    },
  },
  methods: {
    ...mapActions('giftcard', ['createGiftCard']),
  },
}
</script>
<style lang="stylus" scoped>
</style>
