<template>
  <q-card
    v-if="item"
    class="item-card"
    >
    <router-link
      class="no-decoration"
      :to="`/items/${item.id}`"
      >
      <q-card-section
        class="content"
        >
          <h5>{{ item.title }}</h5>
          <p>{{ item.description_short }}</p>

        <div class="q-mt-lg">
          <q-btn
            v-for="(number, ext) of mediaExtensions"
            :key="ext"
            :label="ext"
            round
            size="sm"
            class="q-pa-xs q-mr-sm"
            >
            <q-badge
              size="xs"
              floating
              transparent
              >
              {{ number }}
            </q-badge>
          </q-btn>
        </div>
      </q-card-section>
    </router-link>

    <q-card-actions align="right">
      <ItemActions
        :item="item"
        />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import { InterfaceItem, InterfaceItemMedia } from '../../interfaces'
import ItemActions from '../Item/Actions.vue'

export default defineComponent({
  name: 'ItemCard',
  components: {
    ItemActions,
  },
  props: {
    item: Object as PropType<InterfaceItem>
  },
  setup(props) {
    const {item} = props
    const mediaExtensions: Record<string, number> = {}

    if (item && item.media && Array.isArray(item.media)) {
      item.media.forEach((media: InterfaceItemMedia) => {
        const ext = String(media.ext).replace('.', '')
        mediaExtensions[ext] = isNaN(mediaExtensions[ext]) ? 1 : mediaExtensions[ext] + 1
      })
    }

    return {
      mediaExtensions,
    }
  }
})
</script>

<style scoped lang="scss">
.item-card {
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 
      0 1px 10px rgba(0, 0, 0, 0.5),
      0 2px 4px rgba(0, 0, 0, 0.44),
      0 3px 2px -2px rgba(0, 0, 0, 0.42);
    cursor: pointer;
  }
  .content {
    height: 200px;
  }
}
.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>