<template>
  <q-table
    :data="getRecs"
    :columns="getCols"
    :filter="filter"
    :rows-per-page-options="[15,20,25,50,0]"
    :loading="getIsLoading"
    :pagination.sync="pagination"
    :selected-rows-label="selectedLabel"
    :selected.sync="selected"
    selection="multiple"
    table-class="et-grid"
    dense
    row-key="id"
    color="primary"
    separator="cell"
    no-results-label="No records found ..."
    rows-per-page-label="Show"
  >
    <template slot="top-left" slot-scope="props">
      <q-btn :loading="getIsLoading" color="secondary" @click="fetchAllModifiersAdmin" class="q-mr-sm">
        <q-icon name="refresh" class="et-icon"/>
        <q-spinner-pie slot="loading" class="et-icon"/>
      </q-btn>
      <q-btn wait-for-ripple :disabled="getIsLoading" color="secondary" class="q-mr-sm q-hide-add" @click="setEditingRec({})">
        <q-icon name="add" class="et-icon"/>
      </q-btn>
      <q-icon :name="getIcon" class="et-icon"/>
      <cite>{{getTitle}}</cite>
    </template>
    <template slot="top-right" slot-scope="props">
      <q-search v-model="filter" :clearable="true" placeholder="Search ..." color="secondary" inverted class="q-mr-sm input-search"/>
      <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen"/>
    </template>
    <!-- slot name syntax: body-cell-<column_name> -->
    <q-td v-show="!disableEditting" class="q-pa-none" auto-width slot="body-cell-edit" slot-scope="props" :props="props">
      <q-btn round flat wait-for-ripple dense icon="settings" color="secondary" @click="setEditingRec(props.row)"></q-btn>
    </q-td>
    <!-- gets displayed only when there's at least one row selected -->
    <template slot="top-selection" slot-scope="props">
      <div class="q-table-control">
        <!-- wrap with div.q-table-control to fix jumpimg padding-->
        <q-btn :loading="getIsLoading" color="negative" class="q-mr-sm" @click="delRecs">
          <q-icon name="delete" class="icon"/>
          <q-spinner-pie slot="loading" class="et-icon"/>
        </q-btn>
        <q-icon :name="getIcon" class="et-icon"/>
        <cite>{{getTitle}}</cite>
      </div>
    </template>
  </q-table>
</template>
<style>
</style>
<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  data() {
    return {
      filter: '',
      pagination: {
        sortBy: null,
        descending: true,
        page: 1,
        rowsPerPage: 25,
      },
    }
  },
  computed: {
    ...mapGetters('modifier', ['getRecs', 'getCols', 'getTitle', 'getIsLoading', 'getIcon']),
    selected: {
      get() {
        return this.$store.getters[this.type + '/getSelected']
      },
      set(val) {
        this.$store.commit(this.type + '/setSelected', val)
      },
    },
  },
  methods: {
    ...mapActions('modifier', ['fetchAllModifiersAdmin', 'deleteModifiers']),
    ...mapMutations('modifier', ['setEditingRec', 'deleteModifiers']),
    selectedLabel(rowsNo) {
      return `Selected ${rowsNo}`
    },
  },
}
</script>
<style scoped lang="stylus">
.q-pa-none
  padding 0 !important

.q-hide-add
  display none

.input-search
  width 300px

.et-icon
  font-size 25px
</style>
