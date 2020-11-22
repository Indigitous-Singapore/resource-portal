<template>
   <q-input
      debounce="500"
      filled
      placeholder="Search by Title"
      v-model="searchValue"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
</template>


<script lang="ts">
import { defineComponent, Ref, ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'ExploreSearch',
  setup(_props, ctx) {
    const searchValue: Ref<string> = ref('')

    watch(searchValue, () => {
      ctx.emit('update-search', searchValue.value)
    })

    return {
      searchValue
    }
  }
})

</script>