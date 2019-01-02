<template>
  <q-page class="menu-details">
    <q-page-sticky position="top-left" class="z-max absolute">
      <q-btn round color="secondary" class="q-ml-sm q-mt-sm" icon="reply" @click="backToMenu()"/>
    </q-page-sticky>
    <q-card>
      <q-card-media>
        <img :src="'statics/'+menu.img">
      </q-card-media>
    </q-card>
    <q-collapsible :label="menu.name" class="text-bold" header-style="font-size:18px">
      <div class="desc">{{menu.desc}}</div>
    </q-collapsible>
    <modifiers-group
      v-for="(group,index) in getRecsModifier"
      :data="group.data"
      :groupTitle="group.groupTitle"
      :groupType="group.groupType"
      :key="index"
    />
    <q-layout-footer class="max-width-center-h">
      <q-toolbar color="white">
        <q-btn round outline size="11px" color="secondary" icon="remove"/>
        <div class="text-black q-mr-md q-ml-md">2</div>
        <q-btn round size="11px" color="secondary" icon="add" class="q-mr-sm"/>
        <q-btn color="secondary absolute-right q-mt-sm q-mb-sm q-pl-lg q-pr-lg add-to-cart">{{'+ $9.00'}}</q-btn>
      </q-toolbar>
    </q-layout-footer>
  </q-page>
</template>
<script>
import _ from 'lodash'
import {mapGetters, mapActions, mapMutations} from 'vuex'
import etCounter from 'components/Counter'
import modifiersGroup from 'components/ModifiersGroup'
export default {
  data() {
    return {
      opened: true,
      menu: {},
    }
  },
  components: {
    etCounter,
    modifiersGroup,
  },
  computed: {
    ...mapGetters('menu', ['getRecs', 'getCounter']),
    ...mapGetters('modifier', {getRecsModifier: 'getRecs'}),
  },
  methods: {
    ...mapActions('modifier', ['fetchModifiers']),
    ...mapMutations('menu', ['setCounter']),
    ...mapMutations('modifier', ['setRecs']),
    backToMenu() {
      this.setRecs([])
      this.$router.go(-1)
      this.setCounter(1)
    },
  },
  watch: {
    getRecsModifier(data) {
      var modifier = _.find(data, menu => {
        return menu.type === 'size' && menu.price === '0'
      })
      this.sizes = modifier !== undefined ? modifier : {}
    },
    getCounter(val) {
      this.addToCartPrice = this.calculatePrice()
    },
  },
  mounted() {
    this.menu = this.getRecs.find(item => item.id === parseFloat(this.$route.params.menuId))
    this.fetchModifiers(this.menu)
  },
}
</script>
<style scoped lang="stylus">
.menu-details
  min-height calc(100vh - 70px) !important

.add-to-cart
  margin-right 14px

.desc
  font-weight normal
  font-size 14px
  color #757575
  padding-left 10px
  margin-top -5px

.q-card-media > img
  max-height 350px
</style>
