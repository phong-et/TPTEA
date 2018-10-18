<template>
  <div class="drag-and-drop-demo">
    <QrcodeReader @detect="onDetect" :camera="false">
      <div class="drop-area">

        <div class="drop-area__info" v-if="content === null">
          DROP IMAGES SHOWING QR CODES
        </div>

        <div class="drop-area__result" v-else>
          {{ content }}
        </div>

      </div>
    </QrcodeReader>
  </div>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'

export default {
  components: {QrcodeReader},

  data() {
    return {
      content: null,
    }
  },

  methods: {
    async onDetect(promise) {
      try {
        const {source, content} = await promise

        if (source === 'file' || source === 'url') {
          this.content = content
        }
      } catch (error) {
        if (error.name === 'DropImageFetchError') {
          this.$emit('error', error.message)
        } else if (error.name === 'DropImageDecodeError') {
          this.$emit('error', error.message)
        } else {
          this.$emit('error', 'UNKNOWN ERROR: ' + error.message)
        }
      }
    },
  },
}
</script>

<style>
.drag-and-drop-demo .qrcode-reader__inner-wrapper {
  width: 100%;
  height: 300px;
}

.drop-area {
  height: 100%;
  color: #fff;
  text-align: center;
  font-weight: bold;
  padding: 10px;

  background-color: rgba(0, 0, 0, 0.5);
}
</style>
