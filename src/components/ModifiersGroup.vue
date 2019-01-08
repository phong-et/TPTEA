<template>
  <div>
    <div class="title-modify">{{groupTitle}}</div>
    <q-list inset-separator class="q-pa-none listing-modifier">
      <q-item v-for="(modifier,index) in data" :key="index">
        <q-item-main class="text-secondary">
          <q-radio class="fit" v-if="groupType==='radio'" v-model="defaultModifiers" :val="modifier" :label="modifier.name" color="primary"/>
          <q-checkbox class="fit" v-else v-model="defaultModifiers" :label="modifier.name" :val="modifier" color="primary"/>
        </q-item-main>
        <q-item-side right class="text-secondary">{{modifier.price|formatPrice}}</q-item-side>
      </q-item>
    </q-list>
  </div>
</template>
<script>
import _d from 'lodash'
import {mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    groupTitle: String,
    groupType: String,
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      defaultModifiers: [],
    }
  },
  computed: {
    ...mapGetters('modifier', ['getCurrentMenuModifiers']),
  },
  filters: {
    formatPrice(val) {
      var formatedPrice = ''
      if (val.includes('-')) {
        formatedPrice = '-$' + val.replace('-', '')
      } else if (val === '0') {
        formatedPrice = ''
      } else {
        formatedPrice = '+$' + val
      }
      return formatedPrice
    },
  },
  methods: {
    ...mapMutations('modifier', ['setCurrentMenuModifiers']),
    updateModifiers(newModifiers, oldModifiers) {
      let currentModifiers = this.getCurrentMenuModifiers
      if (oldModifiers) {
        let oldModifierIds = []
        if (_d.isArray(oldModifiers)) oldModifierIds = _d.map(oldModifiers, 'id')
        else oldModifierIds = [oldModifiers.id]
        _d.remove(currentModifiers, ({id}) => {
          return oldModifierIds.includes(id)
        })
      }
      this.setCurrentMenuModifiers(_d.concat(currentModifiers, newModifiers))
    },
  },
  mounted() {
    this.defaultModifiers =
      _d.find(this.data, modifier => {
        return modifier.isDefault
      }) || []
  },
  watch: {
    defaultModifiers: {
      immediate: true,
      handler: 'updateModifiers',
    },
  },
}
</script>
<style lang="stylus" scoped>
.title-modify
  background #f2f2f2
  padding 15px 0 5px 18px
  font-weight bold
  text-transform capitalize

.listing-modifier
  border-left none
  border-right none

.q-item-division + .q-item-division:after, .q-item-division + .q-item-inset-separator:after
  left 20px
  right 20px
</style>
