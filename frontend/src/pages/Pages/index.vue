<template>
  <q-page class="q-py-md container page">
    <div
      class="flex full-width justify-center items-center"
      style="height: 500px"
      v-if="loading"
      >
      <Loading />
    </div>
    <div
      class="container"
      v-else-if="title !== undefined && content !== undefined"
      >
      <h1 class="text-h3 text-bold q-mt-md q-mb-xl">{{ title }}</h1>
      <div
        v-html="content"
        />
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref, onBeforeMount } from '@vue/composition-api'
import { InterfacePage } from 'src/interfaces'
import { defineComponent } from '@vue/composition-api'

import { fetchPage } from '../../services/pages'
import Loading from '../../components/Common/Loading.vue'
import { markdownToHtml } from '../../utilities/html'

export default defineComponent({
  name: 'PageItemsSingle',
  components: {
    Loading,
  },
  setup (props, ctx) {
    const slug = ctx.root.$route.path
    const loading = ref(true)
    const title: Ref<string | undefined> = ref()
    const content: Ref<string | undefined> = ref()

    onBeforeMount(async () => {
      const page: InterfacePage | undefined = await fetchPage(String(slug).split('/')[1])

      if (page !== undefined) {
        title.value = page.title
        content.value = markdownToHtml(page.content)
        loading.value = false
      }
    })

    return {
      loading,
      title,
      content,
    }
  }
});
</script>
<style scoped lang="scss">
.page {
  width: 50vw;
  min-width: 420px;
}
</style>