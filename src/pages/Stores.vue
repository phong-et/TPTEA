<template>
  <div>
    <googlemaps-map ref="map" class="map" :center.sync="center" :zoom.sync="zoom">
      <!-- Marker -->
      <googlemaps-marker title="Paris" :position="{ lat: 31.2292, lng: 121.5186 }" />
    </googlemaps-map>
    <q-tree :nodes="stores" color="primary" node-key="label" :expanded.sync="propsExpanded" :selected.sync="selected">
      <div slot="header-store" slot-scope="prop">
        <span @click="moveGmapPin(prop.node.children[1].position)">{{prop.node.label}}</span>
      </div>
      <div slot="header-phone" slot-scope="prop">
        Phone: <a :href="'tel:' + prop.node.label">{{prop.node.label}}</a>
      </div>
      <div slot="header-addr" slot-scope="prop">
        Address: <a href="#" @click="moveGmapPin(prop.node.position)">{{prop.node.label}}</a>
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
    call(phone) {
      alert(phone)
      window.open('tel:' + phone)
    },
    moveGmapPin(position) {
      console.log(position)
      alert(position)
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
    propsExpanded: ['Stores List', 'Taiwan', 'Hong Kong'],
    selected: null,
    stores: [
      {
        label: 'Stores List',
        avatar: 'statics/icons/location_icon.png',
        children: [
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
                        label: '04-22077317',
                        header: 'phone',
                      },
                      {
                        label: 'No.161, Syueshih Rd., North Dist., Taichung City 40454, Taiwan (R.O.C.)',
                        position: {lat: 24.136206, lng: 120.68831},
                        header: 'addr',
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
                    children: [
                      {
                        label: '2866-1977',
                      },
                      {label: 'Shop No. C1, G/F, World-Wide House, No.19 Des Voeux Road Central, Hong Kong'},
                    ],
                  },
                  {
                    label: 'Central Shop',
                    children: [
                      {
                        label: '2391-9006',
                      },
                      {label: 'Shop A3, G/F, Siu Ying Commercial Building, 151-155 Queens Road, Central'},
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
                    children: [
                      {
                        label: '021-68866189',
                      },
                      {label: '1F, No. 588, Nan Cyuan Bei Road Pudong New District Shanghai, China'},
                    ],
                  },
                  {
                    label: 'SML Center Store',
                    children: [
                      {
                        label: '173-17733285',
                      },
                      {label: '1F, No. 618, Syu Jia Huei Road  Huang Pu District Shanghai, China'},
                    ],
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
