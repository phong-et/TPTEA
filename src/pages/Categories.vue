<template>
  <q-page class="row gutter-xs category">
    <q-layout-header class="max-width-center-h">
      <q-toolbar class="q-pt-none q-pb-none" color="secondary">
        <q-btn color="white" flat round dense icon="reply" @click="backToMainCategory()"/>
        <q-toolbar-title>Hot</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <et-category v-for="(cat,index) in getRecs" :key="index" :cat="cat"></et-category>
    <footer-order/>
  </q-page>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import etCategory from 'components/Category'
import footerOrder from 'components/FooterOrder'
export default {
  name: 'Categories',
  components: {
    etCategory,
    footerOrder,
  },
  computed: {
    ...mapGetters('category', ['getRecs']),
  },
  methods: {
    ...mapActions('category', ['fetchRecs']),
    backToMainCategory() {
      this.$router.go(-1)
    },
  },
  mounted() {
    this.fetchRecs(parseInt(this.$route.params.mainCatId))
  },
}
</script>
<style lang="stylus" scoped>
.category
  padding 12px 8px 8px 12px !important
</style>
