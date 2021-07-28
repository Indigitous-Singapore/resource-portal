<template>
<div class="row resources">
  <div
    v-for="resource in item.media"
    :key="resource.id"
    class="row items-center resource full-width"
    >
    <div class="column col-xs-6 col-sm-8 q-py-md">
      <span
        class="text text-bold title"
        @click="() => downloadResource(resource)"
        >
        <q-icon
          v-if="resource.ext === '.mp3'"
          name="music_note"
          />
        <q-icon
          v-else
          name="description"
          />
        {{ resource.name }}
      </span>
    </div>
    <div class="column col-xs-1 justify-center items-center">
      <q-badge
        class="media-extension q-px-sm text-center"
        outline
        align="middle"
        text-color="black"
        >
        <small>{{ resource.ext.toUpperCase().replace('.', '') }}</small>
      </q-badge>
    </div>
    <div class="column col-xs-5 col-sm-3 justify-center items-end">
      <q-btn
        v-if="isLoggedIn"
        @click="() => downloadResource(resource)"
        padding="none"
        flat
        size="md"
        color="grey-7"
        icon="cloud_download"
        label="Download"
        no-caps
        />
      <q-btn
        v-else
        type="a"
        :href="`/login?redirectUrl=${currentEncodedUrlPath}`"
        padding="none"
        flat
        size="md"
        color="grey-5"
        label="Login to Download"
        no-caps
        />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref } from '@vue/composition-api'

import { isAuthenticated } from '../../services/authentication'
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
    const isLoggedIn: Ref<boolean> = ref(false)
    const currentEncodedUrlPath = encodeURI(window.location.pathname)

    const downloadResource = async (resource: any) => {
      if (isLoggedIn.value) {
        await download(resource)
      } else {
        const redirectToLogin = confirm('You must be logged in to download. Do you want to login and continue?')
        if (redirectToLogin) window.location.href = `/login?redirectUrl=${currentEncodedUrlPath}`
      }
    }

    onMounted(async () => {
      isLoggedIn.value = await isAuthenticated()
    })

    return {
      currentEncodedUrlPath,
      downloadResource,
      isLoggedIn,
    }
  }
});
</script>

<style lang="scss">
.resource {
  border-top: 1px solid $grey-4;

  .title {
    cursor: pointer;
    color: #444;

    &:hover { 
      color: black;
    }
  }
}
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
