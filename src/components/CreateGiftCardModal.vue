<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss v-model="isModalOpened">
    <q-modal-layout class="style-modal">
      <q-toolbar slot="header" color="secondary">
        <q-btn @click="discardEditingRec" icon="keyboard_arrow_left" class="q-mr-md" :disabled="getIsLoading" wait-for-ripple color="primary" />
        <q-btn :loading="getIsLoading" :color="getEditingRec.id?'primary':'secondary'" @click="upSertRec">
          <q-icon name="add" size="25px" />
          <q-spinner-pie slot="loading" size="25px" />
        </q-btn>
        <q-toolbar-title>
          {{getEditingRec.name}}
        </q-toolbar-title>
      </q-toolbar>
      <div class="layout-padding">
        <!-- <q-field class="q-mb-md" :key="field.name" v-for="field in getFields" v-if="!field.hidden" :label-width="3" :icon="field.icon" :label="field.label" :helper="field.desc" error-label="Some error">
          <q-input v-model="getEditingRec[field.name]" :type="field.type" color="secondary" />
        </q-field> -->
         <div class="row justify-center">
          <q-field class="q-mb-md col-11" label-width="3" icon="cash" label="Amout" helper="fill amout giftcard">
            <q-input v-model="amount" type="number" color="teriary" />
          </q-field>
         </div>
        <div class="row justify-center">
          <q-btn color="secondary" label="Gen Code" icon="" class="q-ma-sm col-3" @click="openScanner()"></q-btn>
          <q-input  v-model="code" readonly inverted color="teriary" />
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  props: {
    type: {
      default: 'xxx',
      type: String,
    },
  },
  data() {
    return {
      code: '',
      expiry: '',
      amout: '',
    }
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
    isModalOpened: {
      get() {
        return this.$store.getters[this.type + '/getIsModalOpened']
      },
      set(val) {
        this.$store.commit(this.type + '/setIsModalOpened', val)
      },
    },
  },
  methods: {
    ...mapActions({
      createRec(dispatch, payload) {
        return dispatch(this.type + '/createRec', payload)
      },
    }),
    ...mapMutations({
      discardEditingRec(dispatch, payload) {
        return dispatch(this.type + '/discardEditingRec', payload)
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
