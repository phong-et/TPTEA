<template>
  <q-page>
    <q-modal v-model="opened" maximized>
      <q-btn class="absolute-top-left" color="primary" flat round dense icon="reply" @click="close"></q-btn>
      <slot></slot>
    </q-modal>
  </q-page>
</template>
<script>
export default {
  data() {
    return {
      opened: true,
    }
  },
  methods: {
    close() {
      // call separator handler
      if (this.$listeners && this.$listeners.close) this.$emit('close')
      // call default handler
      else this.$router.go(-1)
    },
  },
}
</script>
<style scoped lang="stylus">
.absolute-top-left
  z-index 999
</style>
