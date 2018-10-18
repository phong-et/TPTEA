<template>
  <QrcodeReader :camera="camera" @init="onInit">
    <button class="btn btn-secondary btn-lg switch-button" @click="switchCamera">
      <i class="fa fa-camera"></i> Switch
    </button>

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
      useRearCamera: true,
    }
  },

  computed: {
    camera() {
      if (this.useRearCamera) {
        return {
          facingMode: {ideal: 'environment'},
        }
      } else {
        return {
          facingMode: {exact: 'user'},
        }
      }
    },
  },

  methods: {
    switchCamera() {
      this.useRearCamera = !this.useRearCamera
    },
  },
}
</script>

<style scoped>
.switch-button {
  position: absolute;
  left: 10px;
  top: 10px;
}
</style>
