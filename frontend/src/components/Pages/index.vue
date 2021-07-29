<template>
  <q-page id="page" class="q-pt-md container">
    <div
      class="flex full-width justify-center items-center"
      style="height: 500px"
      v-if="loading && !is404"
      >
      <Loading />
    </div>
    <Error404
      v-else-if="is404"
      />
    <div
      class="row q-pb-xl"
      v-else-if="title !== undefined && content !== undefined"
      >
      <div class="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2">
        <h1 class="text-h4 text-bold q-mt-md q-mb-xl">{{ title }}</h1>
        <section
          v-html="content"
          />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onBeforeMount, watch } from '@vue/composition-api'
import { InterfacePage } from '../../interfaces'

import { fetchPage } from '../../services/pages'
import Loading from '../../components/Common/Loading.vue'
import { markdownToHtml } from '../../utilities/html'

import Error404 from '../../pages/Error404.vue'

export default defineComponent({
  name: 'PageItemsSingle',
  components: {
    Error404,
    Loading,
  },
  setup (_props, ctx) {
    const loading = ref(true)
    const is404 = ref(false)
    const title: Ref<string | undefined> = ref()
    const content: Ref<string | undefined> = ref()

    const render = async () => {
      const page: InterfacePage | undefined = await fetchPage(ctx.root.$route.path.replace(/\//g, ''))
      
      if (page !== undefined) {
        is404.value = false
        title.value = page.title
        content.value = markdownToHtml(page.content)
        loading.value = false
      } else {
        is404.value = true
      }
    }

    onBeforeMount(render)

    watch(
      () => ctx.root.$route.path,
      render
    )

    return {
      loading,
      is404,
      title,
      content,
    }
  }
});
</script>

<style lang="scss">
#page code {
  white-space: pre-line;
}
</style>
