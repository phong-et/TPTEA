<template>
  <div>
    <googlemaps-map id="map" ref="map" class="map" :center.sync="center" :zoom.sync="zoom">
      <googlemaps-marker :title="currentStore.name" :position="currentStore.position" icon="statics/icons/tptea-marker-icon.png" />
    </googlemaps-map>
    <q-tree :nodes="stores" color="primary" node-key="label" :expanded.sync="propsExpanded" :selected.sync="selected">
      <div slot="header-store" slot-scope="prop">
        <span @click="gotoStore(prop.node.children[0].position, prop.node.label)">{{prop.node.label}}</span>
      </div>
      <div slot="header-addr" slot-scope="prop">
        Address: <a href="#map" @click="gotoStore(prop.node.position, prop.node.label)">{{prop.node.label}}</a>
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
    gotoStore(position, name) {
      this.currentStore = {
        name: name,
        position: position,
      }
      this.center = position
    },
  },
  computed: {},
  data: () => ({
    center: {
      lat: 31.2292,
      lng: 121.5186,
    },
    zoom: 12,
    currentStore: {
      name: 'New World Store',
      position: {lat: 31.2056323, lng: 121.46787489999997},
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
                    position: {lat: 24.1588157, lng: 120.68079209999996},
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
                    position: {lat: 22.2824934, lng: 114.15769030000001},
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
                    position: {lat: 22.284624, lng: 114.15378599999997},
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
                    position: {lat: 31.22923699999999, lng: 121.51866199999995},
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
                    position: {lat: 31.2056323, lng: 121.46787489999997},
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
