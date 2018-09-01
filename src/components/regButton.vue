<template>
  <div>
    <q-btn rounded color="green" to="/member/register" label="Join now" class="reg-button animate-pop" />
  </div>
</template>
<script>
export default {
  name: 'RegButton',
  data() {
    return {}
  },
  methods: {},
}
</script>
<style>
.animate-pop {
  text-transform: none;
  font-size: 14px !important;
  padding: 13px 25px;
  display: block;
}
.reg-button {
  position: fixed;
  z-index: 999999;
  color: green
}
</style>
