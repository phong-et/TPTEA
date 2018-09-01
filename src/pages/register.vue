<template>
  <q-card square class="et-login center">
    <q-card-media>
      <svg class="center" id="logo" viewBox="0 0 483 483" width="128px" height="128px" v-html="getLoginLogo">
      </svg>
    </q-card-media>
    <q-card-title class="text-brown-6">
      TP@Tea HongKong
      <div slot="right" class="row items-center">
        <q-icon name="card_membership" class="q-mr-sm" @click="alert()" />Memberships
      </div>
    </q-card-title>
    <q-card-main class="q-mb-md">
      <q-input clearable v-model.trim="$v.username.$model" float-label="Username" color="light-green-9" :error="$v.username.$error" />
      <q-validators :dirty="$v.username.$dirty" :validators="$v.messages.username" :messages="$v.messages.username" />
      <!-- <q-validator :dirty="$v.username.$dirty" :show="!$v.username.required" msg="Username is required" />
      <q-validator :dirty="$v.username.$dirty" :show="!$v.username.minLength" msg="Username must have at least 3 letters" />
      <q-validator :dirty="$v.username.$dirty" :show="!$v.username.alphaNum" msg="Username must be Alphanumeric only" /> -->

      <q-input v-model="$v.password.$model" float-label="Password" color="light-green-9" type="password" :error="$v.password.$error" />
      <q-validator :dirty="$v.password.$dirty" :show="!$v.password.required" msg="Password is required" />
      <q-validator :dirty="$v.password.$dirty" :show="!$v.password.minLength" msg="Password must have at least 3 letters" />
      <q-validator :dirty="$v.password.$dirty" :show="!$v.password.noSpace" msg="Password must be not space" />

      <q-input v-model.trim="$v.passwordConfirm.$model" float-label="Confirm Password" color="light-green-9" type="password" :error="$v.passwordConfirm.$error" />
      <q-validator :dirty="$v.passwordConfirm.$dirty" :show="!$v.passwordConfirm.sameAsPassword" msg="Passwords must be identical" />

      <q-collapsible icon="people" class="text-brown-6" label="Optional info" style="margin-top:30px; padding: 0" left>
        <q-input clearable v-model="fullName" float-label="Full name" class="q-mb-lg" color="light-green-9" />
        <q-input clearable v-model="phone" float-label="Phone" class="q-mb-lg" color="light-green-9" />
        <q-input clearable v-model="address" float-label="Address" class="q-mb-lg" color="light-green-9" />
      </q-collapsible>
    </q-card-main>
    <q-card-actions>
      <div class="row justify-center" style="height:30px;width:100%;">
        <q-btn :loading="getIsLoading" color="amber-2" label="Register" class="text-brown-6 q-ma-sm col-10" @click="registerCustomer({username,password})">
          <q-spinner-pie slot="loading" size="25px" />
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>
<script>
import logoData from '../assets/logoData'
import {mapGetters} from 'vuex'
import qValidator from '../components/qValidator'
import qValidators from '../components/qValidators'
import {required, minLength, sameAs, alphaNum} from 'vuelidate/lib/validators'
export default {
  components: {
    qValidator,
    qValidators,
  },
  data() {
    return {
      logo: 'Digitalizer',
      username: '',
      password: '',
      passwordConfirm: '',
      fullName: '',
      phone: '',
      address: '',
    }
  },
  // validations: {
  //   username: {
  //     required,
  //     minLength: minLength(3),
  //     alphaNum,
  //     // isUnique: async function(value) {
  //     //   if (value === '') return true
  //     //   const response = await fetch(`/api/unique/${value}`)
  //     //   return Boolean(await response.json())
  //     // },
  //   },
  //   password: {
  //     required,
  //     minLength: minLength(3),
  //     noSpace: function(value) {
  //       var hasWSpace = value.indexOf(' ') >= 0
  //       return !hasWSpace
  //     },
  //   },
  //   passwordConfirm: {
  //     required,
  //     sameAsPassword: sameAs('password'),
  //   },
  // },
  validations: {
    messages: {
      username: {
        required: 'Username is required',
        minLength: 'Username must have at least 3 letters',
        alphaNum: 'Username must be Alphanumeric only',
      },
    },
    username: {
      required,
      minLength: minLength(3),
      alphaNum,
      // validators: [
      //   {
      //     key: 'required',
      //     required,
      //     message: 'Username is required',
      //   },
      //   {
      //     key: 'minLength',
      //     minLength: minLength(3),
      //     message: 'Username must have at least 3 letters',
      //   },
      //   {
      //     key: 'alphaNum',
      //     alphaNum,
      //     message: 'Username must be Alphanumeric only',
      //   },
      // ],
    },
    password: {
      required,
      minLength: minLength(3),
      noSpace: function(value) {
        var hasWSpace = value.indexOf(' ') >= 0
        return !hasWSpace
      },
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
  },
  computed: {
    getLoginLogo() {
      return logoData[this.logo]
    },
    ...mapGetters('customer', ['getIsLoading']),
  },
  methods: {
    registerCustomer() {
      this.$v.$touch()
      if (this.$v.$error) {
        this.$q.notify('Please review fields again.')
        return 0
      }
    },
  },
  created() {
    // console.log($v.username)
  },
}
</script>
<style>
.error {
  padding: 10px;
  font-size: 12px;
  font-style: italic;
  color: red;
}
</style>
