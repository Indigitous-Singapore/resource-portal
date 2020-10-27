<template>
  <q-card
    class="item-card"
    >
    <router-link
      :to="'/items/' + itemId"
      >
      <q-img
        :src="img"
        img-class="q-pa-sm"
        :ratio="16/9"
        basic
        cover
        />
    </router-link>
    <q-card-section class="text-left">
      <div class="text-overline">
        {{category}}
      </div> 
      <div class="text-h5 text-weight-bold q-mb-md ellipsis-2-lines">
        {{title}}
      </div>
      <div class="text-p ellipsis-3-lines">
        {{description}}
      </div>
    </q-card-section>
    <!--
    <q-card-actions class="q-px-md">
      <div>
       Tags: {{tags}}
      </div>
    </q-card-actions>
    -->
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'ItemCard',
  props: {
    id: String,
    img: String,
    category: String,
    title: String,
    description: String,
    tags: String
  },
  components: {
  },
  setup (props, ctx) {
    const itemId = String(props.id)

    return {
      itemId
    }
  }
})
</script>

<style scoped lang="scss">
.item-card {
  height: 420px;
}
</style>