<template>
  <q-page>
    <q-layout-header class="max-width-center-h">
      <q-toolbar class="q-pt-none q-pb-none" color="secondary">
        <q-btn color="white" flat round dense icon="reply" @click="backToCategories()"/>
        <q-toolbar-title>{{cat.name}}</q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="q-pt-none" color="secondary">
        <q-search class="full-width" v-model="search" inverted color="none"/>
      </q-toolbar>
    </q-layout-header>
    <et-menu :menus="filterMenu"></et-menu>
    <footer-order/>
  </q-page>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import etMenu from 'components/Menu'
import footerOrder from 'components/FooterOrder'
export default {
  data() {
    return {
      opened: true,
      search: '',
      cat: {},
    }
  },
  components: {
    etMenu,
    footerOrder,
  },
  computed: {
    ...mapGetters({
      getRecsCategory: 'category/getRecs',
    }),
    ...mapGetters({
      getRecsMenu: 'menu/getRecs',
    }),
    filterMenu() {
      if (this.getRecsMenu != null) {
        return this.getRecsMenu.filter(({name}) => name.match(new RegExp(this.search, 'gi')))
      }
    },
  },
  methods: {
    ...mapActions('menu', ['fetchRecs']),
    ...mapMutations('menu', ['setRecs']),
    backToCategories() {
      this.setRecs([])
      this.$router.go(-1)
    },
  },
  mounted() {
    this.cat = this.getRecsCategory.find(item => item.id === parseInt(this.$route.params.catId))
    this.fetchRecs(this.cat)
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

.text-white:hover
  background-color $secondary
</style>
