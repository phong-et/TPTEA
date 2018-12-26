<template>
  <q-page class="row">
    <main-category v-for="mainCat in getRecs" :key="mainCat.id" :name="mainCat.name" :id="mainCat.id"/>
  </q-page>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import mainCategory from 'components/MainCategory'
export default {
  name: 'MainCategories',
  components: {mainCategory},
  computed: {
    ...mapGetters('maincategory', ['getRecs']),
  },
  methods: {
    ...mapActions('maincategory', ['fetchRecs']),
  },
  mounted() {
    this.fetchRecs()
  },
}
</script>
<style lang="stylus" scoped>
.q-card-media
  width 100%
  height 100%
  background-size cover
  background-position center
  font-size 70px
  font-weight bold
  color #fff

.q-card-media div
  height 100%

.cold
  background-image url('/statics/main-category-cold.jpg')

.hot
  background-image url('/statics/main-category-hot.jpg')
</style>
