<template>
  <div class="row item-header">
    <div class="category-image">
      <span class="text-grey-8 text-bold q-mb-sm">NAME</span>
    </div>
    <div class="content">
      <div class="row details">
        <div class="column col-xs-8 title">
        </div>
        <div class="column col-sm-2 col-xs-0 justify-center text-center">
          <span class="text-grey-8 text-bold q-mb-sm">LAST UPDATED</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ItemHeaderExpanded'
})
</script>

<style scoped lang="scss">
.item-header {
  border-bottom: 1px solid $grey-4;
  .content {
    width: calc(100% - 100px)
  }
  .category-image {
    width: 100px;
  }
}
</style>