<template>
  <q-btn class="absolute-top-left" color="primary" flat round dense icon="reply" @click="close()"></q-btn>
</template>
<script>
export default {
  methods: {
    close() {
      this.$router.go(-1)
    },
  },
}
</script>
<style scoped lang="stylus">
</style>
