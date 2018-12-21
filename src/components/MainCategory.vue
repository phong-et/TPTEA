<template>
  <q-card class="col-12">
    <q-card-media :class="name">
      <div class="row justify-center items-center">
        <q-item :to="route" link>{{name}}</q-item>
      </div>
    </q-card-media>
  </q-card>
</template>
<script>
export default {
  name: 'MainCategory',
  props: {
    name: {
      default: 'cold',
      type: String,
    },
    id: {
      default: 1,
      type: Number,
    },
  },
  computed: {
    route() {
      return 'order/categories/' + this.id
    },
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
  text-transform uppercase

.q-card-media div
  height 100%

/* will be extend type main categories in the future */
.cold
  background-image url('/statics/main-category-cold.jpg')

.hot
  background-image url('/statics/main-category-hot.jpg')
</style>
