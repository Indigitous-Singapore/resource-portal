<template>
<div
  v-if="collection"
  >
  <div class="row">
    <div class="col-xs-12">
      <div class="text-h5 text-bold q-mb-md">{{ collection.title }}</div>
    </div>
  </div>
  <div class="row">
    <div
      v-for="(item, index) in collection.items"
      :key="index"
      class="q-pa-sm col-xs-12 col-sm-6 col-md-4"
      >
      <ItemCard
        :item="item"
        />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ItemCard from '../../Common/ItemCard.vue'


export default defineComponent({
  name: 'ComponentDashboardProfileCollection',
  components: {
    ItemCard
  },
  props: {
    collection: {
      type: Object
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
