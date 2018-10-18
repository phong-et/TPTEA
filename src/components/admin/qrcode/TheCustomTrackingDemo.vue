<template>
  <QrcodeReader :track="repaintLocation" @init="onInit">
    <LoadingIndicator v-show="loading" />
  </QrcodeReader>
</template>

<script>
import {QrcodeReader} from 'vue-qrcode-reader'
import InitHandler from '../../../mixins/InitHandler'

export default {
  components: {QrcodeReader},

  mixins: [InitHandler],

  methods: {
    repaintLocation(location, ctx) {
      if (location !== null) {
        const {topLeftFinderPattern, topRightFinderPattern, bottomLeftFinderPattern} = location

        const pointArray = [topLeftFinderPattern, topRightFinderPattern, bottomLeftFinderPattern]

        ctx.fillStyle = '#007bff'

        pointArray.forEach(({x, y}) => {
          ctx.fillRect(x - 5, y - 5, 10, 10)
        })
      }
    },
  },
}
</script>
