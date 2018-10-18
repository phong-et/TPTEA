<template>
  <div id="app">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3">Vue QR code reader</h1>
        <p class="lead">
          A Vue.js 2 component which detects and decodes QR codes from a camera stream. No need for native apps.
        </p>
        <hr />
        <p class="lead">
          <a class="btn btn-primary btn-lg" href="https://github.com/gruhn/vue-qrcode-reader" role="button">
            <i class="fa fa-github"></i> View on GitHub
          </a>
        </p>
      </div>
    </div>

    <div class="container">

      <div class="form-row align-items-center">
        <label for="demo-select" class="col-form-label">Choose demo:</label>

        <div class="col">
          <select v-model="selectedDemo" class="form-control" id="demo-select">
            <option :key="index" v-for="(demo,index) in demos" :value="demo.component">
              {{ demo.title }}
            </option>
          </select>
        </div>

        <div class="col-auto">
          <a href="https://github.com/gruhn/vue-qrcode-reader/tree/gh-pages/dev/src/components/demos" class="btn btn-outline-primary">
            Sources
          </a>
        </div>
      </div>
      <hr />
      <div :key="index" v-for="(error,index) in errors" class="alert alert-danger" role="alert">
        {{ error }}

        <button type="button" class="close" aria-label="Close" @click="closeError(error)">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <Component :is="selectedDemo" @error="openError" @success="clearErrors" />
    </div>
  </div>
</template>

<script>
import TheCustomTrackingDemo from '../../components/admin/qrcode/TheCustomTrackingDemo'
import TheDecodeAllDemo from '../../components/admin/qrcode/TheDecodeAllDemo'
import TheFirstResultDemo from '../../components/admin/qrcode/TheFirstResultDemo'
import TheValidateHardDemo from '../../components/admin/qrcode/TheValidateHardDemo'
import TheValidateSoftDemo from '../../components/admin/qrcode/TheValidateSoftDemo'
import TheSwitchCameraDemo from '../../components/admin/qrcode/TheSwitchCameraDemo'
import TheNoTrackingDemo from '../../components/admin/qrcode/TheNoTrackingDemo'
import TheDragDropDemo from '../../components/admin/qrcode/TheDragDropDemo'

export default {
  name: 'app',

  data() {
    const demos = [
      {
        title: 'decode all',
        component: 'TheDecodeAllDemo',
      },
      {
        title: 'no location tracking',
        component: 'TheNoTrackingDemo',
      },
      {
        title: 'custom location tracking',
        component: 'TheCustomTrackingDemo',
      },
      {
        title: 'first result only',
        component: 'TheFirstResultDemo',
      },
      {
        title: 'validation (soft)',
        component: 'TheValidateSoftDemo',
      },
      {
        title: 'validation (hard)',
        component: 'TheValidateHardDemo',
      },
      {
        title: 'switch camera',
        component: 'TheSwitchCameraDemo',
      },
      {
        title: 'drap and drop',
        component: 'TheDragDropDemo',
      },
    ]

    return {
      selectedDemo: demos[0].component,
      demos,
      errors: [],
    }
  },

  components: {
    TheCustomTrackingDemo,
    TheDecodeAllDemo,
    TheFirstResultDemo,
    TheValidateHardDemo,
    TheValidateSoftDemo,
    TheSwitchCameraDemo,
    TheNoTrackingDemo,
    TheDragDropDemo,
  },

  watch: {
    selectedDemo: 'clearErrors',
  },

  methods: {
    openError(error) {
      if (error.name === 'NotAllowedError') {
        this.errors.push('To detect and decode QR codes this page needs access to your camera')
      } else if (error.name === 'NotFoundError') {
        this.errors.push('Seems like you have no suitable camera on your device.')
      } else if (error.name === 'NotSupportedError') {
        this.errors.push("Seems like this page is served in non-secure context. Your browser doesn't support that")
      } else if (error.name === 'NotReadableError') {
        this.errors.push("Couldn't access your camera. Is it already in use?")
      } else if (error.name === 'OverconstrainedError') {
        this.errors.push(
          "Constraints don't match any installed camera. Did you asked for the front camera although there is none?"
        )
      } else {
        this.errors.push('UNKNOWN ERROR: ' + error.message)

        console.error(error)
      }
    },

    closeError(error) {
      const index = this.errors.indexOf(error)

      this.errors.splice(index, 1)
    },

    clearErrors() {
      this.errors = []
    },
  },
}
</script>

<style lang="stylus">
#app
  padding-bottom 15px
</style>
