<template>
  <q-layout view="hhh lpr fFf">
    <q-layout-footer class="max-width-center">
      <demo-tabs v-if="$q.theme === 'ios'" />
      <q-tabs inverted position="bottom" color="brown-6" align="justify">
        <q-route-tab to="/" default name="news" slot="title" icon="stars" label="Home" class="sml-label" />
        <q-route-tab to="/orders" name="order" slot="title" icon="free_breakfast" label="Order" class="sml-label" />
        <q-route-tab to="/stores" name="account" slot="title" icon="store" label="Store" class="sml-label" />
        <q-route-tab to="/member" name="member" slot="title" icon="account_box" label="Member" class="sml-label" />
      </q-tabs>
    </q-layout-footer>
    <q-page-container class="et-home max-width-center">
      <reg-button class="reg-button-wrapper" :class="getIsHiddenRegBtn?'hidden':''" />
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import {mapGetters} from 'vuex'
import regButton from '../components/regButton.vue'
export default {
  name: 'MyLayout',
  components: {
    regButton,
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters('member', ['getIsHiddenRegBtn']),
  },
  methods: {},
}
</script>
<style>
.et-home {
  overflow: auto;
  height: calc(100vh - 65px) !important;
  position: relative;
}
.q-layout-page-container {
  padding-bottom: 0px !important;
}
.max-width-center {
  max-width: 700px;
  margin: 0 auto;
}
.reg-button-wrapper {
  position: absolute;
  bottom: 0;
  right: 0;
  height: 57px;
  width: 127px;
  background: red
}
</style>
