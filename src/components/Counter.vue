<template>
  <div class="row justify-center q-mt-md q-mb-md">
    <q-btn-group rounded>
      <q-btn icon="remove" text-color="secondary" :disable="getCounter===0" @click="changeCount(false)" />
      <q-btn text-color="primary" :label="getCounter.toString()" />
      <q-btn icon="add" text-color="secondary" @click="changeCount(true)" />
    </q-btn-group>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapGetters('menu', ['getCounter']),
  },
  methods: {
    ...mapMutations('menu', ['setCounter']),
    changeCount(type) {
      var counter = this.getCounter
      type ? counter++ : counter--
      this.setCounter(counter)
    },
  },
}
</script>
<style scoped>
</style>
