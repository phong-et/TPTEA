<template>
  <q-page class="menu-details">
    <q-page-sticky position="top-left" class="z-max absolute">
      <q-btn round color="secondary" class="q-ml-sm q-mt-sm" icon="reply" @click="backToMenu()"/>
    </q-page-sticky>
    <q-card>
      <q-card-media>
        <img :src="'statics/'+menu.img">
        <q-card-title slot="overlay">
          <span style="font-size:22px">{{menu.name}}</span>
          <span style="font-size:19px" slot="subtitle">{{menu.desc}}</span>
        </q-card-title>
      </q-card-media>
    </q-card>
    <q-list separator class="q-pa-none">
      <q-item v-for="(modifier,index) in getRecsModifier" :key="index">
        <q-item-main class="text-secondary">
          <q-radio v-if="modifier.type==='size'" v-model="sizes" :val="modifier" :label="modifier.name" color="primary" @input="onChangeModifier()"/>
          <q-checkbox v-else v-model="modifiers" :label="modifier.name" :val="modifier" color="primary" @input="onChangeModifier()"/>
        </q-item-main>
        <q-item-side right class="text-secondary">{{modifier.price|price}}</q-item-side>
      </q-item>
    </q-list>
    <et-counter></et-counter>
    <q-layout-footer class="max-width-center-h">
      <q-toolbar color="secondary row">
        <q-btn icon="add_shopping_cart" flat label="Add To Cart"/>
        <q-toolbar-title class="text-right">{{'$'+addToCartPrice.toFixed(2)}}</q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>
  </q-page>
</template>
<script>
import _ from 'lodash'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import etCounter from 'components/Counter'
export default {
  data() {
    return {
      opened: true,
      sizes: {},
      addToCartPrice: 0,
      modifiers: [],
      menu: {},
    }
  },
  components: {
    etCounter,
  },
  computed: {
    ...mapGetters('menu', ['getRecs', 'getCounter']),
    ...mapGetters('modifier', {getRecsModifier: 'getRecs'}),
  },
  filters: {
    price(val) {
      var price = ''
      if (val.includes('-')) {
        price = '-$' + val.replace('-', '')
      } else if (val === '0') {
        price = ''
      } else {
        price = '+$' + val
      }
      return price
    },
  },
  methods: {
    ...mapActions('modifier', ['fetchModifiers']),
    ...mapMutations('menu', ['setCounter']),
    backToMenu() {
      this.$router.go(-1)
      this.setCounter(1)
    },
    calculatePrice() {
      var modifierPrice = _.sumBy(this.modifiers, ({price}) => {
        return parseFloat(price)
      })
      return (modifierPrice + parseFloat(this.menu.price) + parseFloat(this.sizes.price || 0)) * this.getCounter
    },
    onChangeModifier() {
      this.addToCartPrice = this.calculatePrice()
    },
  },
  watch: {
    getRecsModifier(data) {
      var modify = _.find(data, menu => {
        return menu.type === 'size' && menu.price === '0'
      })
      this.sizes = modify !== undefined ? modify : {}
    },
    getCounter(val) {
      this.addToCartPrice = this.calculatePrice()
    },
  },
  mounted() {
    this.menu = this.getRecs.find(item => item.id === parseFloat(this.$route.params.menuId))
    this.addToCartPrice = this.calculatePrice()
    this.fetchModifiers(this.menu)
  },
}
</script>
<style scoped lang="stylus">
.menu-details
  min-height calc(100vh - 70px) !important
</style>
