<template>
<div
  v-if="item.tags.length > 0"
  class="tags"
  >
  <q-separator
    class="q-mt-xl q-mb-md"
    />
  <b
    class="q-mb-xs text-subtitle2 text-italic"
    >Tags:</b>
  <p
    class="q-mb-xs"
    >
    <span
      class="text-grey-9 text-italic"
      v-for="(tag, index) in item.tags"
      :key="index"
      >{{ index > 0 ? ',' : ''}} {{ tag.title }}</span>
  </p>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'ItemTags',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
});
</script>
