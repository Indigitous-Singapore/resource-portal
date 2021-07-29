<template>
  <q-page id="page">
    <div
      class="flex full-width justify-center items-center"
      style="height: 400px"
      v-if="loading && !is404"
      >
      <Loading />
    </div>
    <Error404
      v-else-if="is404"
      />
    <section
      v-else-if="title !== undefined && content !== undefined"
      >
      <header
        v-if="banner"
        >
        <q-img
          :src="banner.url"
          :ratio="4/1"
        >
          <div
            v-if="bannerHeader"
            class="absolute-full flex"
            >
            <div class="container flex" style="width: 100%">
              <div class="row flex items-center">
                <div class="col-12 col-md-10 col-lg-8">
                  <div v-if="bannerCaption" class="text-h4">{{ bannerCaption }}<br/></div>
                  <div class="text-h2">{{ bannerHeader }}</div>
                </div>
              </div>
            </div>
          </div>
        </q-img>
      </header>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-10 col-md-8 q-py-xl">
            <h1 class="text-h3 text-bold text-accent q-mt-md q-mb-xl">{{ title }}</h1>
            <section
              v-html="content"
              />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onBeforeMount, watch } from '@vue/composition-api'
import { InterfaceItemMedia, InterfacePage } from '../../interfaces'

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
    const banner: Ref<InterfaceItemMedia | null | undefined> = ref()
    const bannerCaption: Ref<string | null | undefined> = ref()
    const bannerHeader: Ref<string | null | undefined> = ref()

    const render = async () => {
      const page: InterfacePage | undefined = await fetchPage(ctx.root.$route.path.replace(/\//g, ''))
      
      if (page !== undefined) {
        is404.value = false
        title.value = page.title
        banner.value = page.banner
        bannerCaption.value = page.banner_caption
        bannerHeader.value = page.banner_header
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
      banner,
      bannerCaption,
      bannerHeader,
    }
  }
});
</script>

<style lang="scss">
#page code {
  white-space: pre-line;
}
</style>
