<template>
  <q-page class="row">
    <q-card class="col-12">
      <q-card-media class="cold">
        <div class="row justify-center items-center">
          <q-item to="/maincategories/1" link>COLD</q-item>
        </div>
      </q-card-media>
    </q-card>
    <q-card class="col-12">
      <q-card-media class="hot">
        <div class="row justify-center items-center">
          <q-item to="/maincategories/2" link>HOT</q-item>
        </div>
      </q-card-media>
    </q-card>
  </q-page>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'Categories Main',
  components: {},
  computed: {
    ...mapGetters('category', ['getRecs']),
  },
  methods: {
    ...mapActions('category', ['fetchRecs']),
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

.q-card-media a
  font-size 70px
  font-weight bold
  color #fff

.q-card-media div
  height 100%

/* will be extend type main categories in the future */
.cold
  background-image url('/statics/main-category-cold.jpg')

.hot
  background-image url('/statics/main-category-hot.jpg')
</style>
