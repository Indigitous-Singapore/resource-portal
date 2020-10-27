<template>
<div class="row q-col-gutter-xl q-mt-sm q-mb-xl">
  <div class="column col-12">
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'ItemContent',
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
  setup () {
    return {
    }
  }
});
</script>
