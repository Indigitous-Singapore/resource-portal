<template>
<div id="header" class="row q-col-gutter-xl">
  <div class="column col-12">
    <h2 class="q-mb-md">
      {{ item.title }}
    </h2>

    <div class="row">
      <div class="column col-12 col-md-7">
        <ItemCategories
          :item="item"
          />
        <small class="text-italic text-grey-7 q-mb-none">Last updated: {{ updatedAt }}</small>
      </div>
      
      <div class="column col-12 col-md-5 sm-hide xs-hide text-right">
        <ItemActions
          :item="item"
          />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import dayjs from 'dayjs'

import config from '../../config/config'
import ItemActions from './Actions.vue'
import ItemCategories from './Categories.vue'

export default defineComponent({
  name: 'ItemHeader',
  components: {
    ItemActions,
    ItemCategories,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, ctx) {
    const updatedAt: string = dayjs(props.item.updated_at).format('DD MMMM YYYY, dddd')

    return {
      config,
      updatedAt,
    }
  }
});
</script>

<style scoped lang="scss">
#header {
  padding-top: 2em;

  @media (max-width: 1023px) {
    padding-top:1em;
  }
}
h1{
  font-weight: 600;   
  line-height: 1.2;
}
</style>
