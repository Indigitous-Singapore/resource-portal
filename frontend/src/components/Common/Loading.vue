<template>
<div
  class="text-center"
  >
  <q-spinner-tail
    color="accent"
    size="5em"
    />
  <h4 class="text-accent q-mt-lg">please wait a moment...</h4>
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