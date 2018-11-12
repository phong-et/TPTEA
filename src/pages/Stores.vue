<template>
  <div>
    <googlemaps-map ref="map" class="map" :center.sync="{lat: 31.2292, lng: 121.5186}" :zoom.sync="zoom">
      <!-- Marker -->
      <googlemaps-marker :title="currentStore.name" :position="currentStore.position" />
    </googlemaps-map>
    <q-tree :nodes="stores" color="primary" node-key="label" :expanded.sync="propsExpanded" :selected.sync="selected">
      <div slot="header-store" slot-scope="prop">
        <span @click="moveGmapPin(prop.node)">{{prop.node.label}}</span>
      </div>
      <div slot="header-addr" slot-scope="prop">
        Address: <a href="#" @click="moveGmapPin(prop.node)">{{prop.node.label}}</a>
      </div>
      <div slot="body-addr" slot-scope="prop">
        Phone: <a :href="'tel:' + prop.node.phone">{{prop.node.phone}}</a>
      </div>
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
  methods: {
    moveGmapPin(store) {
      this.currentStore = store
    },
  },
  computed: {
    selectedStorePosition() {
      if (this.selected !== null) {
        return this.getNodeByKey(this.selected).position
      }
      return {lat: 31.2292, lng: 121.5186}
    },
  },
  data: () => ({
    center: {
      lat: 31.2292,
      lng: 121.5186,
    },
    userPosition: null,
    zoom: 12,
    currentStore: {
      name: '',
      position: {lat: 31.2292, lng: 121.5186},
    },
    propsExpanded: ['Taiwan', 'Hong Kong', 'China'],
    selected: null,
    stores: [
      {
        label: 'Taiwan',
        avatar: 'statics/icons/taiwan-flag.png',
        children: [
          {
            label: 'Taichung City',
            children: [
              {
                label: 'Taichung Dajhih Store',
                header: 'store',
                children: [
                  {
                    label: 'No.161, Syueshih Rd., North Dist., Taichung City 40454, Taiwan (R.O.C.)',
                    phone: '04-22077317',
                    position: {lat: 24.136206, lng: 120.68831},
                    header: 'addr',
                    body: 'addr',
                  },
                ],
              },
              {
                label: 'Syueshih Store',
                header: 'store',
                children: [
                  {
                    label: 'No.5, Dajhih Rd., East Dist., Taichung City 40150, Taiwan (R.O.C.)',
                    phone: '04-22232332 ',
                    position: {lat: 24.1588157, lng: 120.68079209999996},
                    header: 'addr',
                    body: 'addr',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'Hong Kong',
        avatar: 'statics/icons/hongkong-flag.png',
        children: [
          {
            label: 'Hong Kong City',
            children: [
              {
                label: 'Central Flagship Shop',
                header: 'store',
                children: [
                  {
                    label: 'Shop No. C1, G/F, World-Wide House, No.19 Des Voeux Road Central, Hong Kong',
                    phone: '2866-1977',
                    position: {lat: 24.136206, lng: 120.68831},
                    header: 'addr',
                    body: 'addr',
                  },
                ],
              },
              {
                label: 'Central Shop',
                header: 'store',
                children: [
                  {
                    label: 'Shop A3, G/F, Siu Ying Commercial Building, 151-155 Queens Road, Central',
                    phone: '2391-9006',
                    position: {lat: 24.136206, lng: 120.68831},
                    header: 'addr',
                    body: 'addr',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        label: 'China',
        avatar: 'statics/icons/china-flag.png',

        children: [
          {
            label: 'Shanghai City',
            children: [
              {
                label: 'New World Store',
                header: 'store',
                children: [
                  {
                    label: '1F, No. 588, Nan Cyuan Bei Road Pudong New District Shanghai, China',
                    phone: '021-68866189',
                    position: {lat: 24.136206, lng: 120.68831},
                    header: 'addr',
                    body: 'addr',
                  },
                ],
              },
              {
                label: 'SML Center Store',
                header: 'store',
                children: [
                  {
                    label: '1F, No. 618, Syu Jia Huei Road  Huang Pu District Shanghai, China',
                    phone: '173-17733285',
                    position: {lat: 24.136206, lng: 120.68831},
                    header: 'addr',
                    body: 'addr',
                  },
                ],
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
