<template>
<div
  v-if="item.categories.length > 0"
  class="categories"
  >
  <p
    class="q-mb-xs"
    >
    <b
      class="text-grey-9"
      v-for="(category, index) in item.categories"
      :key="index"
      >{{ index > 0 ? ',' : ''}} {{ category.title }}</b>
  </p>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ItemCategories',
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
