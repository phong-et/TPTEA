<template>
  <et-modal type="giftcard">
    <div class="row">
      <q-field class="q-mb-md col-11" label-width="3" icon="date_range" label="Expiry">
        <q-input v-model="expiry" type="number" suffix="days" color="secondary" :error="$v.expiry.$error" />
        <et-validator :dirty="$v.expiry.$dirty" :show="!$v.expiry.required" msg="expiry is required" />
        <et-validator :dirty="$v.expiry.$dirty" :show="!$v.expiry.integer" msg="expiry must have a interger" />
        <et-validator :dirty="$v.expiry.$dirty" :show="!$v.expiry.between" msg="expiry is greater than or equal to 1 and less than or equal to 1000 " />
      </q-field>
      <q-field class="q-mb-md col-11" label-width="3" icon="attach_money" label="Amout">
        <q-input v-model="amount" type="number" prefix="$" color="secondary" :error="$v.amount.$error" />
        <et-validator :dirty="$v.amount.$dirty" :show="!$v.amount.required" msg="amount is required" />
        <et-validator :dirty="$v.amount.$dirty" :show="!$v.amount.numeric" msg="amount must have a interger" />
        <et-validator :dirty="$v.amount.$dirty" :show="!$v.amount.between" msg="amount is greater than or equal to 1 and less than or equal to 1000" />
      </q-field>
    </div>
    <div class="row q-my-lg q-py-md gutter-x-sm justify-center" style="background:#fff">
      <q-btn @click="createGiftCardCode({expiry,amount})" class="q-mt-lg q-py-sm col-11 col-xs-11 col-sm-11 col-md-11" color="secondary" label="Save"></q-btn>
    </div>
  </et-modal>
</template>
<script>
import etModal from './EtModal'
import {mapActions} from 'vuex'
import etValidator from './Validator'
import {required, between, numeric, integer} from 'vuelidate/lib/validators'
export default {
  components: {
    etModal,
    etValidator,
  },
  data() {
    return {
      expiry: '0',
      amount: '0',
    }
  },
  validations: {
    expiry: {
      required,
      between: between(1, 1000),
      integer,
    },
    amount: {
      required,
      between: between(1, 1000),
      numeric,
    },
  },
  computed: {
    haveGenGiftCardCode() {
      return this.getCurrentGenGiftCardCode !== ''
    },
  },
  methods: {
    ...mapActions('giftcard', ['createGiftCard']),
    createGiftCardCode() {
      this.$v.$touch()
      if (this.$v.$error) return
      alert('okl')
      // this.createGiftCard()
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
