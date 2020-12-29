<template>
  <ItemCardNarrow
    v-if="isMobile"
    :item="item"
    :category="category"
    :formattedUpdatedAt="formattedUpdatedAt"
    :mediaExtensions="mediaExtensions"
    />
  <ItemCardExpanded
    v-else
    :item="item"
    :category="category"
    :formattedUpdatedAt="formattedUpdatedAt"
    :mediaExtensions="mediaExtensions"
    />
</template>

<script lang="ts">
import { Platform } from 'quasar'
import dayjs from 'dayjs'
import { defineComponent, PropType } from '@vue/composition-api'

import { InterfaceItem, InterfaceItemMedia } from '../../interfaces'
import ItemActions from '../Item/Actions.vue'

import ItemCardExpanded from './ItemCard.expanded.vue'
import ItemCardNarrow from './ItemCard.narrow.vue'

export default defineComponent({
  name: 'ItemCard',
  components: {
    ItemActions,
    ItemCardExpanded,
    ItemCardNarrow,
  },
  props: {
    item: Object as PropType<InterfaceItem>
  },
  setup(props) {
    const { item } = props
    const mediaExtensions: Record<string, number> = {}
    const formattedUpdatedAt = dayjs(item?.updated_at).format('DD MMM YYYY')

    if (item && item.media && Array.isArray(item.media)) {
      item.media.forEach((media: InterfaceItemMedia) => {
        const ext = String(media.ext).replace('.', '')
        mediaExtensions[ext] = isNaN(mediaExtensions[ext]) ? 1 : mediaExtensions[ext] + 1
      })
    }

    if (item && item.link && Array.isArray(item.link) && item.link.length > 0) {
      mediaExtensions['links'] = isNaN(mediaExtensions['links']) ? 1 : mediaExtensions['links'] + 1
    }

    return {
      category: item?.categories[0].title?.toUpperCase(),
      formattedUpdatedAt,
      mediaExtensions,
      isMobile: Platform.is.mobile as boolean,
    }
  }
})
</script>

<style lang="scss">
.resources {
  align-items: center;

  .cursor-pointer {
    padding-right: 0;
    margin-left: -5px;
    align-items: flex-start;
    min-width: 30px;
  }
  .category {
    font-size: 0.7em;
  }
}
</style>

<style scoped lang="scss">
.item-card {
  .content {
    width: calc(100% - 100px)
  }
  .details {
    height: 57px;
  }
  .category-image {
    height: 100px;
    width: 100px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .title {
    font-weight: 600;
    line-height: 1;
  }
  .media-extension {
    font-size: 0.6em;
    padding: 0 1em;
    height: 1.9em;
    display: flex;
  }

  .resource {
    border-top: 1px solid $grey-4;
  }
}
.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>