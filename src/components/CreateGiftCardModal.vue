<template>
  <q-modal v-model="isModalOpened" no-backdrop-dismiss no-esc-dismiss>
    <q-modal-layout>
       <q-toolbar class="" slot="header" color="primary">
        <q-btn class="modal-title" flat color="white" icon="close" @click="isModalOpened=false"></q-btn>
       </q-toolbar>
      <div class="q-pa-lg">
        <div class="row">
          <q-field class="q-mb-md col-11" label-width="3" icon="date_range" label="Expiry">
            <q-input v-model="expiry" type="number" suffix="days" color="secondary" :error="$v.expiry.$error" />
            <et-validator :dirty="$v.expiry.$dirty" :show="!$v.expiry.required" msg="expiry is required" />
            <et-validator :dirty="$v.expiry.$dirty" :show="!$v.expiry.integer" msg="expiry must have a interger" />
            <et-validator :dirty="$v.expiry.$dirty" :show="!$v.expiry.between" msg="expiry is <=1 and <= 100 " />
          </q-field>
          <q-field color="secondary" class="q-mb-md col-11" label-width="3" icon="attach_money" label="Amout">
            <q-input v-model="amount" type="number" prefix="$" color="secondary" :error="$v.amount.$error" />
            <et-validator :dirty="$v.amount.$dirty" :show="!$v.amount.required" msg="amount is required" />
            <et-validator :dirty="$v.amount.$dirty" :show="!$v.amount.numeric" msg="amount must have a numeric" />
            <et-validator :dirty="$v.amount.$dirty" :show="!$v.amount.between" msg="amount is is <=1 and <= 100" />
          </q-field>
        </div>
        <div class="row q-py-md gutter-x-sm justify-center" style="background:#fff">
          <q-btn @click="createGiftCardCode({expiry,amount})" class="q-mt-lg q-py-sm col-11" color="secondary" label="Save">
            <q-spinner-pie slot="loading" size="25px" />
          </q-btn>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
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
      expiry: '',
      amount: '',
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
    isModalOpened: {
      get() {
        return this.$store.getters['giftcard/getIsModalOpened']
      },
      set(val) {
        this.$store.commit('giftcard/setIsModalOpened', val)
      },
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
    closeModal() {
      this.$store.commit('giftcard/setIsModalOpened', false)
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
