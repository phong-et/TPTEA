<template>
  <q-page class="row">
    <!-- <q-card class="col-12" @click.native="openCategory">
      <q-card-media class="cold">
        <div class="row justify-center items-center">COLD</div>
      </q-card-media>
    </q-card>
    <q-card class="col-12" @click.native="openCategory">
      <q-card-media class="hot">
        <div class="row justify-center items-center">HOT</div>
      </q-card-media>
    </q-card>-->
    <main-category v-for="mainCat in getRecs" :key="mainCat.id" :name="mainCat.name" :id="mainCat.id"/>
  </q-page>
</template>
<script>
import {mapGetters} from 'vuex'
import mainCategory from 'components/MainCategory'
export default {
  name: 'MainCategories',
  components: {mainCategory},
  computed: {
    ...mapGetters('maincategory', ['getRecs']),
  },
  methods: {
    // ...mapActions('maincategory', ['fetchRecs']),
  },
  mounted() {
    // this.fetchRecs()
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
