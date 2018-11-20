<template>
  <q-btn class="absolute-top-left" color="primary" flat round dense icon="reply" @click="close()"></q-btn>
</template>
<script>
export default {
  methods: {
    close() {
      // call separator handler
      if (this.$listeners && this.$listeners.click) this.$emit('click')
      // call default handler
      else this.$router.go(-1)
    },
  },
}
</script>
<style scoped lang="stylus">
</style>
