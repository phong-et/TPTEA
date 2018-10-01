<template>
  <q-page>
    <q-modal v-model="opened" maximized class="max-width-center-h" no-backdrop-dismiss>
      <q-modal-layout>
        <q-page-sticky position="top-left" class="z-max absolute">
          <q-btn round color="brown-14" class="q-ml-sm q-mt-sm" icon="reply" @click="backToMenu()" />
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
            <q-item-main class="text-grey-14">
              <q-radio v-if="modifier.type==='size'" v-model="chosesize" :val="modifier" :label="modifier.name" color="brown-14" @input="onChangeExtra()" />
              <q-checkbox v-else v-model="extra" :label="modifier.name" :val="modifier" color="brown-14" @input="onChangeExtra()" />
            </q-item-main>
            <q-item-side right class="text-grey-14">
              {{modifier.price|price}}
            </q-item-side>
          </q-item>
        </q-list>
        <et-counter></et-counter>
        <q-toolbar slot="footer" color="brown-6 row">
          <q-btn icon="add_shopping_cart" flat label="Add To Cart" />
          <q-toolbar-title class="text-right">
            {{'$'+currentPrice.toFixed(2)}}
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
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
      chosesize: {},
      currentPrice: 0,
      extra: [],
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
      this.setCounter(0)
    },
    calculatePrice() {
      var price = this.menu.price * this.getCounter
      var extraprice =
        _.sumBy(this.extra, ({price}) => {
          return parseFloat(price)
        }) * this.getCounter
      var chosePrice = parseFloat(this.chosesize.price) * this.getCounter
      return extraprice + price + chosePrice
    },
    onChangeExtra() {
      this.currentPrice = this.calculatePrice()
    },
  },
  watch: {
    getRecsModifier(data) {
      var modify = _.find(data, menu => {
        return menu.type === 'size' && menu.price === '0'
      })
      this.chosesize = modify !== undefined ? modify : {}
    },
    getCounter(val) {
      this.currentPrice = this.calculatePrice()
    },
  },
  mounted() {
    this.menu = this.getRecs.find(item => item.id === parseFloat(this.$route.params.menuId))
    this.fetchModifiers(this.menu)
  },
}
</script>
<style>
</style>
