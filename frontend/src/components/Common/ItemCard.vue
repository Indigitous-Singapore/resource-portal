<template>
  <q-card
    v-if="item"
    class="item-card"
    >
    <q-card-section
      class="content"
      >
      <h5>{{ item.title }}</h5>
      <p>{{ item.description_short }}</p>

      <div class="q-mt-lg">
        <q-btn
          v-for="(number, ext) of mediaExtensions"
          :key="ext"
          :label="ext"
          round
          size="sm"
          class="q-pa-xs q-mr-sm"
          >
          <q-badge
            size="xs"
            floating
            transparent
            >
            {{ number }}
          </q-badge>
        </q-btn>
      </div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat round color="red" icon="favorite_border" />
      <q-btn flat round color="teal" icon="bookmark_border" />
      <q-btn
        flat
        round
        color="primary"
        icon="share"
        @click="share(
          `${item.title}`,
          `${item.title}: ${item.description_short}`,
          ''
        )"
        />
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { InterfaceItem, InterfaceItemMedia } from '../../interfaces'
import { share } from '../../utilities/share'

export default defineComponent({
  name: 'ItemCard',
  props: {
    item: Object as PropType<InterfaceItem>
  },
  setup(props) {
    const {item} = props
    const mediaExtensions: Record<string, number> = {}

    if (item && item.media && Array.isArray(item.media)) {
      item.media.forEach((media: InterfaceItemMedia) => {
        const ext = String(media.ext).replace('.', '')
        mediaExtensions[ext] = isNaN(mediaExtensions[ext]) ? 1 : mediaExtensions[ext] + 1
      })
    }

    return {
      mediaExtensions,
      share
    }
  }
})
</script>

<style scoped lang="scss">
.item-card {
  .content {
    height: 200px;
  }
}
</style>