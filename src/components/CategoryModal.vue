<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss v-model="isModalOpened" :content-css="{maxWidth:'885px', minHeight:'30vh',width:'100%'}">
    <q-modal-layout>
      <q-toolbar slot="header" color="secondary">
        <q-btn @click="discardEditingRec" icon="keyboard_arrow_left" class="q-mr-md" :disabled="getIsLoading" wait-for-ripple color="primary"/>
        <q-btn
          :loading="getIsLoading"
          :disable="!getEditingRec.mainCategoryId"
          :color="getEditingRec.id?'primary':'secondary'"
          @click="getEditingRec.id?updateCategory():createCategory()"
        >
          <q-icon :name="getEditingRec.id?'save':'add'" size="25px"/>
          <q-spinner-pie slot="loading" size="25px"/>
        </q-btn>
        <q-toolbar-title>{{getEditingRec.name}}</q-toolbar-title>
      </q-toolbar>
      <div class="q-ma-md row">
        <div class="col-12 col-md-12 col-lg-8">
          <q-field icon="menu" label="Main Category" label-width="3">
            <q-select
              v-model="getEditingRec.mainCategoryId"
              placeholder="Please select main category"
              :options="getRecs.map(opt=>({label:opt.name,value:opt.id}))"
            />
          </q-field>
          <q-field icon="label" label="Name" label-width="3">
            <q-input v-model="getEditingRec.name"/>
          </q-field>
          <q-field icon="description" label="Description" class="q-mb-md" label-width="3">
            <q-input v-model="getEditingRec.desc" type="textarea" rows="4"/>
          </q-field>
        </div>
        <div class="col-12 col-md-12 col-lg-4 img-container">
          <cloudinary-uploader :url="getEditingRec.img"/>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import cloudinaryUploader from './CloudinaryUploader'
export default {
  components: {
    cloudinaryUploader,
  },
  computed: {
    ...mapGetters('category', ['getIsLoading', 'getEditingRec']),
    ...mapGetters('maincategory', ['getRecs']),
    isModalOpened: {
      get() {
        return this.$store.getters['category/getIsModalOpened']
      },
      set(val) {
        this.$store.commit('category/setIsModalOpened', val)
      },
    },
  },
  methods: {
    ...mapActions('maincategory', ['fetchRecs']),
    ...mapActions('category', ['createCategory', 'updateCategory']),
    ...mapMutations('category', ['discardEditingRec']),
  },
  mounted() {
    if (this.getRecs.length === 0) this.fetchRecs()
  },
}
</script>
<style lang="stylus" scoped>
.style-modal
  max-width 600px !important
  min-height 30vh !important

.category-content
  display flex

.category
  flex 1

.img-container
  display inline-flex
  justify-content center
  padding-left 15px
</style>
