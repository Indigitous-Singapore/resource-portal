<template>
<div
  class="text-center"
  >
  <q-spinner-tail
    color="accent"
    size="5em"
    />
  <h3 class="text-accent q-mt-lg">please wait a moment...</h3>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'Loading',
})
</script>

<style scoped lang="scss">

</style>