<template>
<div
  class="row q-my-xs"
  >
  <div class="column col-xs-12 col-sm-10 q-mb-md">
    <div
      :style="`height: ${expanded ? expandedHeight : '80'}px`"
      class="description-container"
    >
      <div
        ref="description"
        v-html="description_long"
        />
    </div>
    <q-btn
      flat
      push
      padding="none"
      align="left"
      :ripple="false"
      @click="toggleExpanded"
      class="view-more q-mb-md text-grey-8"
      >
      {{ expanded ? 'COLLAPSE' : 'VIEW MORE' }}
    </q-btn>
    <ItemActions
      v-if="!isMobile"
      :item="item"
      />
  </div>
  <div class="column col-xs-12 q-mt-xl">
    <h5 class="text-h5 text-bold q-mb-sm">Resources</h5>
    <span class="text-grey-8 q-mb-md">Last updated: {{ updatedAt }}</span>
    <ItemResources
      :item="item"
      />
    <ItemLinks
      :item="item"
      />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import dayjs from 'dayjs'
import { Platform } from 'quasar'
import { markdownToHtml } from '../../utilities/html'

import ItemActions from './Actions.vue'
import ItemLinks from './Links.vue'
import ItemResources from './Resources.vue'

export default defineComponent({
  name: 'ItemContent',
  components: {
    ItemActions,
    ItemLinks,
    ItemResources,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const description = ref(null)
    const expanded: Ref<boolean> = ref(false)
    const expandedHeight: Ref<number> = ref(0)
    const tab: Ref<string> = ref('description')
    const updatedAt: string = dayjs(props.item.updated_at).format('DD MMMM YYYY')

    const toggleExpanded = () => {
      let value = description.value as Element|null
      expandedHeight.value = (value !== null && value.clientHeight !== null) ? value.clientHeight : 0
      
      expanded.value = !expanded.value
    }
    
    return {
      description,
      description_long: markdownToHtml(props.item.description_long),
      expanded,
      expandedHeight,
      isMobile: Platform.is.mobile as boolean,
      tab,
      toggleExpanded,
      updatedAt,
    }
  }
});
</script>

<style lang="scss" scoped>
.description-container {
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  overflow-wrap: anywhere;
}
</style>

<style lang="scss">
.view-more {
  &:hover .q-focus-helper {
    background-color: transparent !important;
  }
}
</style>
