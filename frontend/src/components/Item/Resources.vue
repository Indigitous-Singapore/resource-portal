<template>
<div
  v-if="item.media.length > 0"
  class="q-mb-lg"
  >
  <h4 class="q-mb-sm">Downloads</h4>
  <q-list bordered separator>
    <q-item
      v-for="(media, key) in item.media"
      :key="key"
      v-ripple
      clickable
      class="q-py-md"
      @click="() => download(media)"
      >
      <q-item-section>
        <p class="text-subtitle2 q-mb-none"><b>{{ media.name }}</b></p>
      </q-item-section>
      <q-item-section avatar>
        <q-btn
          round
          :label="media.ext.replace('.','')"
          size="sm"
          class="q-pa-xs q-mr-sm"
          color="light-blue-1"
          text-color="grey-9"
          />
      </q-item-section>
    </q-item>
  </q-list>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { download } from '../../utilities/download'

export default defineComponent({
  name: 'ItemResources',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    return {
      download
    }
  }
});
</script>
