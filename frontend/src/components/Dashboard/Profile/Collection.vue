<template>
<div
  v-if="collection"
  >
  <div class="row">
    <div class="q-pa-sm col-xs-9">
      <div class="text-h5 text-bold q-mb-md">{{ collection.title }}</div>
    </div>
    <div class="q-pa-sm col-xs-3 text-right">
      <q-btn
        icon-right="delete"
        label="Delete"
        color="accent"
        @click="destroyCollection"
        />
    </div>
  </div>
  <div
    v-if="collection.items.length > 0"
    class="row"
    >
    <div
      v-for="(item, index) in collection.items"
      :key="index"
      class="q-pa-sm col-xs-12 col-sm-6 col-md-4"
      >
      <ItemCard
        :item="item"
        />
    </div>
  </div>
  <div
    v-else
    class="row"
    >
    <div
      class="column q-pa-sm col-xs-12 justify-center align-items"
      style="min-height: 200px"
      >
      <p class="text-h6 text-bold text-center">You have no items in this collection.</p>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useCollections } from 'src/services/collections'
import ItemCard from '../../Common/ItemCard.vue'


export default defineComponent({
  name: 'ComponentDashboardProfileCollection',
  components: {
    ItemCard
  },
  props: {
    collection: {
      type: Object
    }
  },
  setup(props) {
    const { deleteCollection } = useCollections()

    const destroyCollection = async () => {
      if(props.collection) {
        if(confirm(`Please confirm that you want to delete: ${String(props.collection.title)}`)) {
          await deleteCollection(props.collection.id)
        }
      }
    }

    return {
      destroyCollection
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
