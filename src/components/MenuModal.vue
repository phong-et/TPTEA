<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss v-model="isModalOpened" :content-css="{maxWidth:'890px', minHeight:'30vh',width:'100%'}">
    <q-modal-layout>
      <q-toolbar slot="header" color="secondary">
        <q-btn @click="discardEditingRec" icon="keyboard_arrow_left" class="q-mr-md" wait-for-ripple color="primary"/>
        <q-btn :loading="getIsLoading" @click="upsertMenu" :disable="!getEditingRec.categoryId">
          <q-icon :loading="getIsLoading" :name="getEditingRec.id?'save':'add'" size="25px"/>
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
              @input="mainCategoriesChange"
            />
          </q-field>
          <q-field icon="list" label="Category" label-width="3">
            <q-select
              v-model="getEditingRec.categoryId"
              placeholder="Please select category"
              :options="categories.map(opt=>({label:opt.name,value:opt.id}))"
            />
          </q-field>
          <q-field icon="label" label="Name" label-width="3">
            <q-input v-model="getEditingRec.name" :error="$v.getEditingRec.name.$error"/>
          </q-field>
          <q-field icon="attach_money" label="Price" label-width="3">
            <q-input v-model="getEditingRec.price" type="number" :error="$v.getEditingRec.price.$error"/>
          </q-field>
          <q-field icon="description" label="Description" class="q-mb-md" label-width="3">
            <q-input v-model="getEditingRec.desc" type="textarea" rows="2"/>
          </q-field>
        </div>
        <div class="col-12 col-md-12 col-lg-4 img-container">
          <cloudinary-uploader :url="getEditingRec.img"/>
        </div>
        <div class="row col-12 q-mt-md">
          <div class="q-mr-md" v-for="(modifier,index) in groupModifiers" :key="index">
            <span class="label">{{modifier[0].groupTitle}}</span>
            <q-option-group type="checkbox" color="secondary" v-model="modifierIds" :options="modifier.map(opt=>({label:opt.name,value:opt.id}))"/>
          </div>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
import cloudinaryUploader from './CloudinaryUploader'
import _d from 'lodash'
import {required} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      categories: [],
      modifierIds: [],
    }
  },
  validations: {
    getEditingRec: {
      name: {
        required,
      },
      price: {
        required,
      },
    },
  },
  components: {
    cloudinaryUploader,
  },
  computed: {
    ...mapGetters('menu', ['getIsLoading', 'getEditingRec']),
    ...mapGetters('maincategory', ['getRecs']),
    ...mapGetters('category', {getRecsCategories: 'getRecs'}),
    ...mapGetters('adminmodifier', {getRecsModifiers: 'getRecs'}),
    groupModifiers() {
      let groupedModifiers = _d
        .chain(this.getRecsModifiers)
        .groupBy('groupTitle')
        .value()
      return _d
        .sortBy(groupedModifiers, modifiers => {
          return modifiers.length
        })
        .reverse()
    },
    isModalOpened: {
      get() {
        return this.$store.getters['menu/getIsModalOpened']
      },
      set(val) {
        this.$store.commit('menu/setIsModalOpened', val)
      },
    },
  },
  methods: {
    ...mapActions('menu', ['createMenu', 'updateMenu']),
    ...mapActions('maincategory', ['fetchRecs']),
    ...mapActions('category', ['fetchCategories']),
    ...mapMutations('menu', ['discardEditingRec']),
    ...mapActions('adminmodifier', ['fetchAdminModifiers']),
    mainCategoriesChange(mainCategoryId) {
      this.categories = this.getRecsCategories.filter(category => {
        return category.mainCategoryId === mainCategoryId
      })
    },
    upsertMenu() {
      this.$v.getEditingRec.$touch()
      if (this.$v.getEditingRec.$error) return
      if (this.getEditingRec.id) this.updateMenu(this.modifierIds)
      else this.createMenu(this.modifierIds)
    },
  },
  watch: {
    getEditingRec({mainCategoryId, modifierIds}) {
      if (mainCategoryId) {
        this.mainCategoriesChange(mainCategoryId)
        this.modifierIds = modifierIds || []
      } else this.modifierIds = []
    },
  },
  mounted() {
    if (this.getRecs.length === 0) this.fetchRecs()
    if (this.getRecsCategories.length === 0) this.fetchCategories()
    if (this.getRecsModifiers.length === 0) this.fetchAdminModifiers()
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
  padding-right 10px

.label
  white-space nowrap
  text-transform capitalize
  color #996c57
  font-size 14px
  font-weight bold
</style>
