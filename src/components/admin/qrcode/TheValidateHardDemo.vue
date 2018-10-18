<template>
  <QrcodeReader :camera="camera" @decode="onDecode" @init="onInitFirst">
    <div v-show="cameraForzen" class="validation-layer">
      <div class="decode-result">
        <u>Decoded</u>: {{ content }}
      </div>

      <div class="validation-notice" v-if="validating">
        Long validation in progress...
      </div>

      <div class="validation-result" v-if="!validating">
        <div v-if="isValid" class="text-success">
          This is a URL
        </div>

        <div v-else class="text-danger">
          This is NOT a URL!
        </div>
      </div>
    </div>

    <LoadingIndicator v-show="loading && firstLoad" />
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
      isValid: false,
      validating: false,
      camera: {},
      content: null,
      firstLoad: true,
    }
  },

  computed: {
    cameraForzen() {
      return this.camera === false || (this.loading && !this.firstLoad)
    },
  },

  methods: {
    async onDecode(content) {
      this.content = content

      this.stopCamera()

      this.validating = true
      this.isValid = await this.validate(content)
      this.validating = false

      window.setTimeout(() => {
        this.startCamera()
      }, 2000)
    },

    stopCamera() {
      this.camera = false
    },

    startCamera() {
      // use default settings
      this.camera = null
    },

    validate(content) {
      return new Promise(resolve => {
        window.setTimeout(() => {
          // pretend it's taking really long
          if (content.startsWith('http')) {
            resolve(true)
          } else {
            resolve(false)
          }
        }, 3000)
      })
    },

    async onInitFirst(promise) {
      await this.onInit(promise)
      this.firstLoad = false
    },
  },
}
</script>

<style scoped>
.validation-layer {
  position: absolute;
  width: 100%;
  height: 100%;

  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
}

.validation-notice,
.validation-result {
  font-weight: bold;
  font-size: 1.4rem;
}

.decode-result {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-style: italic;
}
</style>
