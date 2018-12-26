<template>
  <q-card class="col-12">
    <q-card-media :style="bgImg">
      <router-link tag="div" :to="route">
        <div class="row justify-center items-center">
          <span>{{name}}</span>
        </div>
      </router-link>
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
    img: {
      default: '',
      type: String,
    },
  },
  computed: {
    route() {
      return 'order/categories/' + this.id
    },
    bgImg() {
      return "background-image:url('/statics/" + this.img + "')"
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

.q-card-media span
  font-size 70px
  font-weight bold
  color #fff
  text-transform uppercase

.q-card-media div
  height 100%
</style>
