<template>
   <q-input
      debounce="500"
      outlined
      rounded
      placeholder="Search Resources"
      v-model="searchValue"
      bg-color="white"
      class="full-width"
    >
      <template v-slot:prepend>
        <q-icon
          class="q-pl-md q-pr-sm"
          name="search"
          />
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