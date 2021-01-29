<template>
<div
  class="row resources"
  v-if="item.link.length > 0"
  >
  <div
    v-for="resource in item.link"
    :key="resource.title"
    class="row items-center resource full-width"
    >
    <div class="column justify-center col-xs-6 col-sm-8 q-py-sm">
      <span class="text-body2 text-bold">
        <q-icon name="tv"/>
        {{ resource.title }}
      </span>
    </div>
    <div class="column col-xs-1 justify-center items-center">
      <q-badge
        class="media-extension q-px-sm text-center"
        outline
        align="middle"
        text-color="black"
        >
        <small>LINK</small>
      </q-badge>
    </div>
    <div class="column col-xs-5 col-sm-3 justify-center items-end">
      <q-btn
        v-if="isLoggedIn"
        type="a"
        target="_blank"
        :href="resource.url"
        padding="none"
        flat
        size="md"
        color="grey-7"
        icon="live_tv"
        label="Watch on YouTube"
        no-caps
        />
      <q-btn
        v-else
        type="a"
        href="/login"
        padding="none"
        flat
        size="md"
        color="grey-5"
        label="Login to Watch"
        no-caps
        />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import { isAuthenticated } from '../../services/authentication'

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
    const isLoggedIn: Ref<boolean> = ref(false)

    const open = (url: string) => {
      window.open(url)
    }

    onMounted(async () => {
      isLoggedIn.value = await isAuthenticated()
    })

    return {
      open,
      isLoggedIn,
    }
  }
});
</script>
