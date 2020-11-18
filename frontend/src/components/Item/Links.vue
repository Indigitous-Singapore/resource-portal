<template>
<div
  v-if="item.link.length > 0"
  class="q-mb-lg"
  >
  <h4 class="q-mb-sm">Links</h4>
  <q-list bordered separator>
    <q-item
      v-for="(link, key) in item.link"
      :key="key"
      v-ripple
      clickable
      class="q-py-md"
      @click="() => open(link.url)"
      >
      <q-item-section>
        <p class="text-subtitle2 q-mb-none"><b>{{ link.title }}</b></p>
      </q-item-section>
      <q-item-section avatar>
        <q-icon
          name="open_in_new"
          style="font-size: 1em"
          />
      </q-item-section>
    </q-item>
  </q-list>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'

export default defineComponent({
  name: 'ItemLinks',
  components: {
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup() {
    const open = (url: string) => {
      window.open(url)
    }

    return {
      open
    }
  }
});
</script>
