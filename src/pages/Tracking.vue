<template>
  <div id="tracking">
    <googlemaps-map ref="map" class="map" :center.sync="centerPosition" :zoom.sync="zoom">
      <googlemaps-marker
        v-for="(position, index) in positions"
        :key="index"
        title="current position"
        :position="position"
        icon="statics/icons/tptea-marker-icon.png"
      />
    </googlemaps-map>
  </div>
</template>
<script>
import Vue from 'vue'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'
Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyCKIINrCNvoT6ZXqNvAWBwgtynSlidkic0',
    libraries: ['places'],
    useBetaRenderer: false,
  },
})
export default {
  components: {
    VueGoogleMaps,
  },
  methods: {
    getCurrentPosition() {
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          this.currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          this.centerPosition = this.currentPosition
        })
      } else {
        // Browser doesn't support Geolocation
        alert(`Browser doesn't support Geolocation`)
      }
    },
    trackPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(this.successPosition, this.failurePosition, {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        })
      } else {
        alert(`Browser doesn't support Geolocation`)
      }
    },
    successPosition: function(position) {
      this.positions.push({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
      this.centerPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
    },
    failurePosition: function(err) {
      alert('Error Code: ' + err.code + ' Error Message: ' + err.message)
    },
  },
  computed: {},
  data: () => ({
    centerPosition: {
      lat: 10.762622,
      lng: 106.660172,
    },
    zoom: 16,
    currentPosition: {
      lat: 31.2056323,
      lng: 121.46787489999997,
    },
    positions: [
      {
        lat: 10.790504,
        lng: 106.683569,
      },
      {
        lat: 10.787407,
        lng: 106.686479,
      },
    ],
  }),
  mounted() {
    // this.getCurrentPosition()
    this.trackPosition()
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

#tracking
  height 100%

.map
  flex 100% 1 1
  width 100%
  height 100%
</style>
