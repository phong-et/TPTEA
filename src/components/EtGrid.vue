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
      <q-btn :loading="getIsLoading" color="secondary" @click="fetchRecs" class="q-mr-sm">
        <q-icon name="refresh" class="et-icon"/>
        <q-spinner-pie slot="loading" class="et-icon"/>
      </q-btn>
      <q-btn wait-for-ripple :disabled="getIsLoading" color="secondary" class="q-mr-sm" :class="{'q-hide-add':hideAdd}" @click="setEditingRec({})">
        <q-icon name="add" class="et-icon"/>
      </q-btn>
      <q-icon :name="getIcon" class="et-icon"/>
      <cite>{{getTitle}}</cite>
    </template>
    <template slot="top-right" slot-scope="props">
      <q-select
        v-show="!comboFilter.hidden"
        class="combo-filter"
        filter
        :filter-placeholder="comboFilter.filterPlaceHolder"
        inverted
        color="secondary"
        v-model="comboFilter.selectedValue"
        :options="comboFilter.options"
        @input="fetchRecsByComboFilter(comboFilter.selectedValue)"
      />
      <q-search v-model="filter" :clearable="true" placeholder="Search ..." color="secondary" inverted class="q-mr-sm input-search"/>
      <q-btn flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="props.toggleFullscreen"/>
    </template>

    <!-- slot name syntax: body-cell-<column_name> -->
    <q-td v-show="!disableEditting" class="q-pa-none" auto-width slot="body-cell-edit" slot-scope="props" :props="props">
      <q-btn round flat wait-for-ripple dense icon="settings" color="secondary" @click="setEditingRec(props.row)"></q-btn>
    </q-td>
    <q-td v-show="!expandedCol.hidden" class="q-pa-none" auto-width :slot="getExpandedColName" slot-scope="props" :props="props">
      <q-btn
        round
        flat
        wait-for-ripple
        dense
        :icon="expandedCol.icon"
        color="secondary"
        @click="excuteExpanedColAction(props.row,expandedCol.action)"
      ></q-btn>
    </q-td>

    <!-- gets displayed only when there's at least one row selected -->
    <template slot="top-selection" slot-scope="props">
      <div class="q-table-control">
        <!-- wrap with div.q-table-control to fix jumpimg padding-->
        <q-btn :loading="getIsLoading" color="negative" class="q-mr-sm" @click="delRecs">
          <q-icon name="delete" class="icon"/>
          <q-spinner-pie slot="loading" class="et-icon"/>
        </q-btn>
        <q-btn
          wait-for-ripple
          :disabled="getIsLoading"
          v-show="supportGiftCardsPrinting"
          color="secondary"
          class="q-mr-sm"
          :class="{'q-hide-add':hideAdd}"
          @click="setPrintingRec()"
        >
          <q-icon name="print" class="et-icon"/>
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
import upperFirst from 'lodash/upperFirst'
import {mapState, mapActions, mapMutations} from 'vuex'
export default {
  props: {
    type: {
      default: 'xxx',
      type: String,
    },
    aliasType: {
      default: 'xxx',
      type: String,
    },
    disableEditting: {
      default: false,
      type: Boolean,
    },
    expandedCol: {
      default: () => {
        return {
          fieldName: 'id',
          hidden: true,
          icon: 'settings',
          action: function(payload) {
            console.log(payload)
          },
        }
      },
      type: Object,
    },
    hideSelection: Boolean,
    hideAdd: Boolean,
    supportGiftCardsPrinting: {
      default: false,
      type: Boolean,
    },
    comboFilter: {
      default: () => {
        return {
          hidden: true,
          selectedValue: 1,
          options: [
            {
              label: 'Filter 1',
              value: 1,
            },
          ],
          filterPlaceHolder: 'Type text',
          fetchRecsByFilterName: 'fetchOrdersByStoreId',
        }
      },
      type: Object,
    },
    pagingOptions: {
      default: () => {
        return {
          sortBy: null,
          descending: true,
        }
      },
      type: Object,
    },
  },
  data() {
    return {
      filter: '',
      pagination: {
        sortBy: this.pagingOptions.sortBy, // String, column "name" property value
        descending: this.pagingOptions.descending,
        page: 1,
        rowsPerPage: 25, // current rows per page being displayed
      },
    }
  },
  computed: {
    ...mapState({
      getRecs(state, getters) {
        return getters[this.type + '/getRecs']
      },
      getCols(state, getters) {
        return getters[this.type + '/getCols']
      },
      getTitle(state, getters) {
        return getters[this.type + '/getTitle']
      },
      getIsLoading(state, getters) {
        return getters[this.type + '/getIsLoading']
      },
      getIcon(state, getters) {
        return getters[this.type + '/getIcon']
      },
    }),
    selected: {
      get() {
        return this.$store.getters[this.type + '/getSelected']
      },
      set(val) {
        this.$store.commit(this.type + '/setSelected', val)
      },
    },
    getExpandedColName() {
      return 'body-cell-' + this.expandedCol.fieldName
    },
  },
  methods: {
    ...mapActions({
      fetchRecs(dispatch, payload) {
        if (this.comboFilter && this.comboFilter.selectedValue) this.comboFilter.selectedValue = 0
        if (this.aliasType !== 'xxx') return dispatch(`${this.type}/fetch${this.aliasType}`, payload)
        return dispatch(`${this.type}/fetch${upperFirst(this.type)}s`, payload)
      },
      delRecs(dispatch, payload) {
        if (this.aliasType !== 'xxx') return dispatch(`${this.type}/del${this.aliasType}`, payload)
        return dispatch(`${this.type}/del${upperFirst(this.type)}s`, payload)
      },
      fetchRecsByComboFilter(dispatch, payload) {
        if (this.comboFilter && this.comboFilter.selectedValue === 0) return this.fetchRecs()
        return dispatch(`${this.type}/${this.comboFilter.fetchRecsByFilterName}`, payload)
      },
    }),
    ...mapMutations({
      setEditingRec(dispatch, payload) {
        return dispatch(this.type + '/setEditingRec', payload)
      },
      setPrintingRec(dispatch, payload) {
        return dispatch(this.type + '/setPrintingRec', payload)
      },
    }),
    selectedLabel(rowsNo) {
      return `Selected ${rowsNo}`
    },
    excuteExpanedColAction(payload, action) {
      action(payload)
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

.combo-filter
  width 200px
  margin-right 10px

@media screen and (max-device-width: 480px) and (orientation: portrait)
  .combo-filter
    margin-bottom 5px

.q-table-container
  display flex
  flex-direction column
  height calc(100vh - 65px)
</style>
