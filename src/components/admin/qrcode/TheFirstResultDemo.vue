<template>
  <QrcodeReader :paused="paused" @decode="onDecode" @init="onInit">
    <div v-if="content" class="decoded-content">{{ content }}</div>

    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import InitHandler from '../../../mixins/InitHandler'

export default {
  components: {QrcodeReader},

  mixins: [InitHandler],

  data() {
    return {
      paused: false,
      content: null,
    }
  },

  methods: {
    onDecode(content) {
      this.content = content
      this.paused = true
    },
  },
}
</script>

<style scoped>
.decoded-content {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 100%;

  color: #fff;
  font-weight: bold;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
