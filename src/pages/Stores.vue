<template>
  <div>
    <googlemaps-map ref="map" class="map" :center.sync="center" :zoom.sync="zoom"></googlemaps-map>
    <q-tree :nodes="stores" color="primary" node-key="label" :expanded.sync="propsExpanded">
      <!-- <div slot="header-root" slot-scope="prop" class="row items-center">
        <img src="statics/icons/location_icon.png" class="avatar q-mr-sm">
        <div>
          {{ prop.node.label }} <q-chip color="orange" small>New!</q-chip>
        </div>
      </div> -->
    </q-tree>
  </div>
</template>
<script>
import Vue from 'vue'
import 'vue-googlemaps/dist/vue-googlemaps.css'
import VueGoogleMaps from 'vue-googlemaps'
Vue.use(VueGoogleMaps, {
  load: {
    // Google API key
    apiKey: 'AIzaSyCKIINrCNvoT6ZXqNvAWBwgtynSlidkic0',
    // Enable more Google Maps libraries here
    libraries: ['places'],
    // Use new renderer
    useBetaRenderer: false,
  },
})
export default {
  components: {
    VueGoogleMaps,
  },
  data: () => ({
    center: {
      lat: 48.853,
      lng: 2.298,
    },
    userPosition: null,
    zoom: 12,
    propsExpanded: ['Stores List', 'Taiwan', 'Hong Kong'],
    stores: [
      {
        label: 'Stores List',
        avatar: 'statics/icons/location_icon.png',
        children: [
          {
            label: 'Taiwan',
            children: [
              {
                label: 'Taichung City',
                children: [
                  {
                    label: 'Taichung Dajhih Store',
                    children: [
                      {
                        label: '<a href="tel:04-22077317">04-22077317</a>',
                      },
                      {
                        label: 'No.161, Syueshih Rd., North Dist., Taichung City 40454, Taiwan (R.O.C.)',
                      },
                    ],
                  },
                  {
                    label: 'Syueshih Store',
                    children: [
                      {
                        label: '04-22232332 ',
                      },
                      {label: 'No.5, Dajhih Rd., East Dist., Taichung City 40150, Taiwan (R.O.C.)'},
                    ],
                  },
                ],
              },
              {
                label: 'Pleasant surroundings',
                children: [{label: 'Happy atmosphere'}, {label: 'Good table presentation'}, {label: 'Pleasing decor'}],
              },
            ],
          },
          {
            label: 'Hong Kong',
            children: [
              {
                label: 'Hong Kong City',
                children: [{label: 'Syueshih Store'}, {label: 'Good recipe'}],
              },
              {
                label: 'Pleasant surroundings 2',
                children: [{label: 'Happy atmosphere'}, {label: 'Good table presentation'}],
              },
            ],
          },
        ],
      },
    ],
  }),
}
</script>
<style scoped lang="stylus">
.map
  flex 100% 1 1
  width 100%
  height 350px
</style>
