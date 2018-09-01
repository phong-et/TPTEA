<template>
  <div v-if="dirty" :validators="validators" :messages="messages">
    <div v-for="(key) in messages" :key="key" class="error" v-if="!validators[key]">{{messages[key]}}</div>{{validators[key]}}
  </div>
</template>
<script>
export default {
  name: 'qValidators',
  props: {
    validators: {
      default: function() {
        return {}
      },
      type: Object,
    },
    messages: {
      default: function() {
        return {}
      },
      type: Object,
    },
    dirty: {
      default: false,
      type: Boolean,
    },
  },
}
</script>
<style>
.error {
  padding: 10px;
  font-size: 12px;
  font-style: italic;
  color: red;
}
</style>
