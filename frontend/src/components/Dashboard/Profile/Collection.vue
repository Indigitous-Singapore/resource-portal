<template>
<div
  v-if="collection"
  >
  <div class="row">
    <div class="q-pa-sm col-xs-6">
      <div class="text-h5 text-bold q-mb-md">
          {{ collection.title }}
      </div>
    </div>
    <div class="q-pa-sm col-xs-6 text-right">
      <q-btn
        v-if="collection.is_public"
        class="q-mr-md"
        padding="sm md sm md"
        icon-right="share"
        label="Share"
        color="grey-8"
        @click="() => shareCollection(collection)"
        no-caps
        unelevated
        />
      <q-btn
        v-if="collection.is_public"
        class="q-mr-md"
        padding="sm md sm md"
        icon-right="visibility"
        label="View"
        color="blue-8"
        :to="`/collections/${collection.id}`"
        no-caps
        unelevated
        />
      <q-btn
        padding="sm md sm md"
        icon-right="delete"
        label="Delete"
        color="accent"
        no-caps
        @click="destroyCollection"
        unelevated
        />
    </div>
  </div>
  <div class="row">
    <div class="q-pa-sm flex items-center col-xs-9 text-left">
      <span :class="collection.is_public ? '' : 'text-bold'">Private</span>
      <q-toggle
        :disabled="loading"
        :value="collection.is_public" 
        @input="toggle"
        />
      <span :class="collection.is_public ? 'text-bold' : ''">Public</span>
    </div>
    <div
      v-if="collection.items.length > 0"
      class="row"
      >
      <div
        v-for="(item, index) in collection.items"
        :key="index"
        class="q-px-sm col-xs-12"
        >
        <ItemCard
          :item="item"
          />
      </div>
    </div>
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
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import { useCollections } from 'src/services/collections'
import ItemCard from '../../Common/ItemCard.vue'
import { share } from '../../../utilities/share'
import { InterfaceCollection } from '../../../interfaces'
import config from '../../../config/config'

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
    const { deleteCollection, updateCollection, } = useCollections()
    const loading: Ref<boolean> = ref(false)

    const toggle = async () => {
      if (props?.collection && props.collection.id && props.collection.is_public !== undefined) {
        loading.value = true
        await updateCollection(props.collection.id, {
          is_public: !props.collection.is_public
        })
        loading.value = false
      }
    }
    
    const destroyCollection = async () => {
      if(props.collection) {
        if(confirm(`Please confirm that you want to delete: ${String(props.collection.title)}`)) {
          await deleteCollection(props.collection.id)
        }
      }
    }

    const shareCollection = async (collection: InterfaceCollection) => {
      await share(
      `${collection.title || ''}`,
      `${collection.title || ''}: ${collection.description || ''}`,
      `${config.app.host || 'portal.msmusic.edu.sg'}/collections/${collection.id}`
      )
    }

    return {
      destroyCollection,
      loading,
      toggle,
      shareCollection,
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
