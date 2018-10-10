<template>
  <q-modal v-model="opened" class="max-width-center-vh">
    <q-modal-layout>
      <div>
        <q-btn class="modal-title" flat icon="close" @click="opened = false">
          <div class="q-ml-sm">{{item.title}}</div>
        </q-btn>
      </div>
      <q-carousel-slide :img-src="item.img" class="header-height" />
      <div class="news-detail-padding">
        <div class="q-display-1 q-mb-md news-detail-title-color">{{item.titleContent}}</div>
        <p class="news-detail-content-color">{{item.content}}</p>
        <q-btn to="/categories" color="secondary" text-color="white" rounded>
          <div>Order</div>
        </q-btn>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
export default {
  props: {
    item: [Object],
  },
  data() {
    return {
      opened: false,
    }
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

.header-height
  height 300px

.news-detail-padding
  padding 50px

.news-detail-title-color
  color $primary

.news-detail-content-color
  color $neutral

.modal-title
  text-transform initial
  color $primary
</style>
