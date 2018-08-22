<template>
  <q-layout view="hHh Lpr lFf">
    <q-page-sticky position="bottom-right"  style="z-index:999999" :offset="[18, 18]">
      <q-btn rounded color="green" label="Join now" to="/members" class="animate-pop" />
    </q-page-sticky>
    <q-layout-footer>
      <demo-tabs v-if="$q.theme === 'ios'" />
      <q-tabs color="brown-14" inverted align="justify" style="height:57px">
        <q-route-tab to="/" default name="news" slot="title" icon="stars" label="Home" class="sml-label" />
        <q-route-tab to="/orders" name="order" slot="title" icon="free_breakfast" label="Order" class="sml-label" />
        <q-route-tab to="/stores" name="account" slot="title" icon="store" label="Store" class="sml-label" />
        <q-route-tab to="/members" name="member" slot="title" icon="account_box" label="Member" class="sml-label" />
      </q-tabs>
    </q-layout-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {openURL} from 'quasar'

export default {
  name: 'MyLayout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    }
  },
  methods: {
    openURL,
  },
}
</script>

<style>
.sml-label {
  font-size: 12px !important;
}
.q-layout-footer {
  box-shadow: 0 -2px 2px -1px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.14), 0 -1px 10px rgba(0, 0, 0, 0.12) !important;
}
.q-tab-icon {
  font-size: 22px;
}
.animate-pop{
  text-transform: none;
  font-size: 14px !important;
  padding: 13px 25px;
  display: block;
}
</style>
