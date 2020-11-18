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
    @click="share(
      `${item.title}`,
      `${item.title}: ${item.description_short}`,
      ''
    )"
    />
</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
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
  setup(props, ctx) {
    return {
      share,
    }
  }
});
</script>
