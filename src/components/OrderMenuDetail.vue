<template>
  <div>
    <q-toolbar color="primary" class="q-pr-md q-pt-none q-pb-none q-pl-none">
      <q-btn
        :class="{'hidden':remove}"
        icon="remove_circle_outline"
        size="15px"
        flat
        round
        @click="removeOrderMenu({menuId:rawData.menuId,modifierIds:rawData.modifierIds})"
      />
      <div class="quantity" :class="{'q-ml-md':remove}">{{rawData.quantity}}</div>
      <q-toolbar-title class="text-weight-regular q-subheading">{{menu.name}}</q-toolbar-title>
      <label class="text-weight-bold">{{'$'+menu.price}}</label>
    </q-toolbar>
    <q-list no-border class="q-ml-md" v-show="modifiers.length!==0">
      <q-item class="q-ml-xl text-italic text-secondary" v-for="(modifier,index) in modifiers" :key="index">
        <q-item-main :label="modifier.name" label-lines="1"/>
        <q-item-side right class="text-secondary">{{'$'+modifier.price}}</q-item-side>
      </q-item>
    </q-list>
    <div class="total-price text-secondary bg-brown-1">
      <label>Price:</label>
      <label>{{`${this.rawData.quantity} x $${calculateMenuPrice}`}}</label>
    </div>
  </div>
</template>
<script>
import _d from 'lodash'
import {mapGetters, mapMutations} from 'vuex'
export default {
  props: {
    rawData: {
      type: Object,
      default: () => {},
    },
    remove: Boolean,
  },
  data() {
    return {
      modifiers: [],
      menu: {},
    }
  },
  computed: {
    ...mapGetters('menu', ['getMenu']),
    ...mapGetters('modifier', ['getModifiers']),
    calculateMenuPrice() {
      let modifiersPrice = _d.sumBy(this.modifiers, ({price}) => {
        return parseFloat(price)
      })
      return modifiersPrice + parseFloat(this.menu.price)
    },
  },
  methods: {
    ...mapMutations('customerorder', ['removeOrderMenu']),
  },
  mounted() {
    this.menu = this.getMenu(this.rawData.menuId)
    this.modifiers = this.getModifiers(this.rawData.modifierIds)
  },
}
</script>
<style lang="stylus" scoped>
.q-toolbar
  min-height 45px !important

.quantity
  width 20px
  height 20px
  border 1px solid #fff
  font-size 14px
  display flex
  align-items center
  justify-content center

.total-price
  display flex
  padding 5px 16px
  align-items center
  font-weight bold
  justify-content flex-end
  font-style italic

  label:last-child
    min-width 75px
    text-align right
</style>
