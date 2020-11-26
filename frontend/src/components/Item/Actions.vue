<template>
<div
  class="actions"
  >
  <q-btn flat round color="red" icon="favorite_border" />
  <q-btn-dropdown class="collections" flat round color="teal" icon="bookmark_border">
      <q-list>
        <q-item clickable v-close-popup @click="createNewCollection">
          <q-item-section>
            <q-item-label>Create New Collection</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  <q-btn
    flat
    round
    color="primary"
    icon="share"
    v-if="item"
    @click="() => shareItem(item)"
    />
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import config from 'src/config/config'
import { InterfaceItem } from 'src/interfaces'

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
  setup() {
    const { createCollection } = useCollections()
    const shareItem = (item: InterfaceItem) => {
      void share(
      `${item.title || ''}`,
      `${item.title || ''}: ${item.description_short || ''}`,
      `https://${config.app.host || 'portal.msmusic.edu.sg'}/items/${item.id}`
      )
    }

    /**
     * Create new collection
     */
    const createNewCollection = async () => {
      const title = String(prompt("Please enter your collection's title"))
      await createCollection(title)
    }

    return {
      createNewCollection,
      shareItem,
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
