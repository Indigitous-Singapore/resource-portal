<template>
<div
  class="actions"
  >
  <q-btn flat round color="red" icon="favorite_border" />
  <q-btn flat round color="teal" icon="bookmark_border" />
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
import config from 'src/config/config';
import { InterfaceItem } from 'src/interfaces';
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
    const shareItem = (item: InterfaceItem) => {
      void share(
      `${item.title || ''}`,
      `${item.title || ''}: ${item.description_short || ''}`,
      `https://${config.app.host || 'portal.msmusic.edu.sg'}/items/${item.id}`
      )
    }

    return {
      shareItem,
    }
  }
});
</script>
