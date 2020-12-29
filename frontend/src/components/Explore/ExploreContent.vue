<template>
  <div>
    <q-table
      id="explore-content-table"
      v-if="state.items.length > 0"
      grid
      :data="state.items"
      row-key="id"
      :filter="tableOptions.filter"
      :pagination.sync="tableOptions.pagination"
      :rows-per-page-options="rowsPerPageOptions"
    >
      <template v-slot:top>
        <div
          v-if="!isMobile"
          class="col-xs-12"
          >
          <ItemHeaderExpanded
            />
        </div>
      </template>
      <template v-slot:item="props">
        <div class="col-xs-12">
          <ItemCard
            :item="props.row"
            />
        </div>
      </template>
    </q-table>
    <div
      v-else
      class="flex column items-center justify-center"
      >
      <h4>No items based on your filter criteria</h4>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from '@vue/composition-api'
import  { Platform, Screen } from 'quasar'

import config from '../../config/config'
import { useItems } from '../../services/items'
import ItemCard from '../Common/ItemCard.vue'
import ItemHeaderExpanded from '../Common/ItemHeader.expanded.vue'

export default defineComponent({
  name: 'ExploreGrid',
  components: {
    ItemCard,
    ItemHeaderExpanded,
  },
  setup () {
    const { state } = useItems()

    const getItemsPerPage = () => {
      if (Screen.lt.sm) { return 6 }
      return 10
    }

    const tableOptions = reactive({
      filter: '',
      pagination: {
        page: 1,
        rowsPerPage: getItemsPerPage()
      },
    })
    return {
      config,
      isMobile: Platform.is.mobile as boolean,
      state,
      tableOptions,
      rowsPerPageOptions: computed(() => {
        if (Screen.gt.xs) {
          return Screen.gt.sm ? [ 3, 6, 9 ] : [ 3, 6 ]
        }
        return [ 3 ]
      }),
      cardContainerClass: computed(() => {
        if (Screen.gt.xs) {
          return 'grid-masonry grid-masonry--' + (Screen.gt.sm ? '3' : '2')
        }
        return void 0
      })
    }
  }
})
</script>
<style lang="scss">
#explore-content-table {
  .q-table__top {
    padding: 0;
  }
}
</style>