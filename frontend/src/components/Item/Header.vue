<template>
<div
  id="header"
  :class="'row ' + (isMobile ? 'text-center': '')"
  >
  <div class="column col-12 col-md-11">
    <ItemCategories
      v-if="!isMobile"
      :item="item"
      />
    <h2 class="q-mb-md text-h4">
      {{ item.title }}
    </h2>
    <div class="q-mb-none">
      <ItemTags
        :item="item"
        />
    </div>
    <div
      class="q-mb-lg"
      v-if="isMobile"
      >
      <ItemActions
        :item="item"
        />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import dayjs from 'dayjs'
import { Platform } from 'quasar'

import config from '../../config/config'
import ItemCategories from './Categories.vue'
import ItemActions from './Actions.vue'
import ItemTags from './Tags.vue'

export default defineComponent({
  name: 'ItemHeader',
  components: {
    ItemActions,
    ItemCategories,
    ItemTags,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props) {
    const updatedAt: string = dayjs(props.item.updated_at).format('DD MMMM YYYY, dddd')

    return {
      config,
      isMobile: Platform.is.mobile as boolean,
      updatedAt,
    }
  }
});
</script>

<style scoped lang="scss">
</style>
