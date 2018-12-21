<template>
  <q-list no-border inset-separator multiline>
    <q-item link class="q-pt-sm q-pb-sm" v-for="(menu,index) in menus" :key="index" @click.native="openMenuDetail(menu.id)">
      <q-item-side>
        <img class="img-menu" :src="'statics/'+menu.img">
      </q-item-side>
      <q-item-main>
        <q-item-tile label class="text-weight-bold">{{menu.name}}</q-item-tile>
        <q-item-tile sublabel class="padding-sublabel">{{menu.desc}}</q-item-tile>
        <q-item-tile label class="text-weight-bold">{{'$'+menu.price}}</q-item-tile>
      </q-item-main>
      <q-item-side right class="plus-btn">
        <q-btn size="11px" round dense outline color="secondary" icon="add" class="q-mr-sm" @click="openMenuDetail(menu.id)"/>
      </q-item-side>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    menus: [Array],
  },
  methods: {
    openMenuDetail(menuId) {
      this.$router.push('/order/menu-detail/' + menuId)
    },
  },
}
</script>
<style lang="stylus" scoped>
.img-menu
  height 90px
  width 90px

.padding-sublabel
  margin 2px 0

.q-item-division + .q-item-division:after, .q-item-division + .q-item-inset-separator:after
  left 20px
  right 20px

.q-item
  padding 8px 12px 4px 20px

.plus-btn
  display flex
  height 92px
  align-items center
</style>
