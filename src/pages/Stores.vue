<template>
  <div id="stores">
    <googlemaps-map ref="map" class="map" :center.sync="center" :zoom.sync="zoom">
      <googlemaps-marker :title="currentStore.name" :position="currentStore.position" icon="statics/icons/tptea-marker-icon.png" />
    </googlemaps-map>
    <q-tree :nodes="stores" color="primary" node-key="label" :expanded.sync="propsExpanded" :selected.sync="selected">
      <div slot="header-country" slot-scope="prop">
        <img :src="prop.node.avatar" class="q-tree-img q-mr-sm avatar">
        <span class="country-name">{{prop.node.label}}</span>
      </div>
      <div slot="header-city" slot-scope="prop">
        <span class="city-name">{{prop.node.label}}</span>
      </div>
      <div slot="header-store" slot-scope="prop">
        <span class="store-name" @click="gotoStore(prop.node.children[0].position, prop.node.label)">{{prop.node.label}}</span>
      </div>
      <div class="address-store" slot="header-addr" slot-scope="prop">
        Address: <a href="#stores" @click="gotoStore(prop.node.position, prop.node.label)">{{prop.node.label}}</a>
      </div>
      <div class="phone-store" slot="body-addr" slot-scope="prop">
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
      document.getElementById('stores').parentNode.scrollTo(0, 0)
      var me = this
      // fix lost marker icon when scroll top
      setTimeout(function() {
        me.currentStore = {
          name: name,
          position: position,
        }
        me.center = position
      }, 300)
    },
  },
  computed: {},
  data: () => ({
    center: {
      lat: 31.2292,
      lng: 121.5186,
    },
    zoom: 16,
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
        header: 'country',
        children: [
          {
            label: 'Taichung City',
            header: 'city',
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
        header: 'country',
        children: [
          {
            label: 'Hong Kong City',
            header: 'city',
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
        header: 'country',
        children: [
          {
            label: 'Shanghai City',
            header: 'city',
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
@import '~variables'

.map
  flex 100% 1 1
  width 100%
  height 350px

span.store-name, span.city-name, span.country-name
  font-size 22px
  font-weight bold
  color $primary

.address-store, .phone-store
  color $secondary

.address-store a, .phone-store a
  color $tertiary
</style>
