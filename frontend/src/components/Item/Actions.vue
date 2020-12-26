<template>
<div
  class="actions"
  >
  <q-btn-dropdown
    class="collections"
    flat
    round
    padding="none"
    :color="isInACollection() ? 'teal' : ''"
    :icon="isInACollection() ? 'bookmark' : 'bookmark_border'"
    >
      <q-list dense separator>
        <q-item clickable v-close-popup @click="createNewCollection">
          <q-item-section>
            <q-item-label>&plus;&nbsp;Create&nbsp;Collection</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-item
          active-class="bg-green-2 text-grey-9"
          v-for="(collection, index) in collectionsState.collections"
          :active="itemCollections.includes(collection.id)"
          :key="collection.updated_at"
          :clickable="true"
          @click="() => toggleCollection(collectionsState.collections[index].id, !itemCollections.includes(collection.id))"
          >
          <q-item-section
            >
            <q-item-label class="flex justify-between">
              {{ collectionsState.collections[index].title }}
              <q-icon
                :class="itemCollections.includes(collection.id) ? '' : 'hidden'"
                name="clear"
              />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  <q-btn
    flat
    round
    class="q-ml-md"
    padding="none"
    icon="share"
    v-if="item"
    @click="() => shareItem(item)"
    />
</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref, watch } from '@vue/composition-api'
import config from 'src/config/config'
import { InterfaceCollection, InterfaceItem } from 'src/interfaces'

import { useCollections } from '../../services/collections'
import { share } from '../../utilities/share'

export default defineComponent({
  name: 'ItemActions',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const {
      addItem,
      createCollection, 
      removeItem,
      state: collectionsState,
    } = useCollections()
    const itemCollections: Ref<number[]> = ref([])
    const shareItem = (item: InterfaceItem) => {
      void share(
      `${item.title || ''}`,
      `${item.title || ''}: ${item.description_short || ''}`,
      `https://${config.app.host || 'portal.msmusic.edu.sg'}/items/${item.id}`
      )
    }

    onBeforeMount(()=>{
      getItemCollections()
    })

    /**
     * Create new collection
     */
    const createNewCollection = async () => {
      const title = String(prompt("Please enter your collection's title"))
      const collection: InterfaceCollection|undefined = await createCollection(title)

      if(collection !== undefined) {
        await addToCollection(collection.id)
      }
    }

    /**
     * Toggle Collection
     */
    const toggleCollection = async (collectionId: number, add: boolean) => {
      if(add) {
        await addToCollection(collectionId)
      } else {
        await removeFromCollection(collectionId)
      }
    }

    /**
     * Add to collection
     */
    const addToCollection = async (collectionId: number) => {
      await addItem(props.item.id, collectionId)
      getItemCollections()
    }

    /**
     * Remove from collection
     */
    const removeFromCollection = async (collectionId: number) => {
      await removeItem(Number(props.item.id), collectionId)
      getItemCollections()
    }

    /**
     * Filters for the collections that have items
     */
    const getItemCollections = () => {
      const collections: InterfaceCollection[] = collectionsState.collections.filter(collection => {
        return collection.items.find(item => item.id === props.item.id) !== undefined
      })
      itemCollections.value = collections.map(collection => collection.id)
    }

    /**
     * Checks if in a collection
     */
    const isInACollection = () => {
      const collectionIds = collectionsState.collections.map(collection => collection.id)
      const intersect = itemCollections.value.filter(value => collectionIds.includes(value))
      return intersect.length > 0
    }

    watch(
      () => collectionsState.collections,
      getItemCollections
    )

    return {
      collectionsState,
      createNewCollection,
      itemCollections,
      isInACollection,
      shareItem,
      toggleCollection,
    }
  }
});
</script>

<style lang="scss">
.collections {
  .q-icon.q-btn-dropdown__arrow {
    display: none !important;
  }
}
</style>
