<template>
<div
  v-if="item.tags.length > 0"
  class="tags"
  >
    <q-chip
      outline
      rounded
      size="sm"
      class="text-grey-8 q-py-sm q-px-md q-mr-sm q-ml-none"
      v-for="(tag, index) in item.tags"
      :key="index"
      >{{ tag.title }}</q-chip>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

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
