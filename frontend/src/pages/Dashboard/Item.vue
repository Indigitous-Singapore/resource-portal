<template>
  <q-page
    class="container"
    v-if="item !== undefined"
    >
    <q-banner
      v-if="preview"
      rounded
      class="bg-orange text-white text-center"
      >
      <b>Note: This Is A Preview</b>
    </q-banner>
    <div
      :class="'row ' + (isMobile ? 'q-pt-md' : 'q-pt-xl')"
      >
      <div
        :class="'column col-xs-12 col-sm-12 col-md-4 col-lg-3 ' + (isMobile ? 'items-center' : '')"
        >
        <ItemCategories
          v-if="isMobile"
          :item="item"
          />
        <q-img
            :src="(item && item.featured_image && typeof item.featured_image.url === 'string') ? item.featured_image.url : (item.categories[0].featured_image.url  || '/assets/musicfile.jpg')"
          :style="'max-width: ' + (isMobile ? '260' : '300') + 'px'"
          />
      </div>
      <div
        :class="'column col-xs-12 col-sm-12 col-md-8 col-lg-9 ' + (isMobile ? 'q-mt-md' : '')">
        <ItemHeader :item="item" />
        <ItemContent :item="item" />
      </div>
    </div>
  </q-page>
  <q-page
    v-else
    class="flex items-center"
    >
    <div
      class="flex full-width justify-center align-center"
      >
      <loading />
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref, watch, onBeforeMount } from '@vue/composition-api'
import { InterfaceItem } from 'src/interfaces'
import { defineComponent } from '@vue/composition-api'

import ItemCategories from '../../components/Item/Categories.vue'
import ItemHeader from '../../components/Item/Header.vue'
import ItemContent from '../../components/Item/Content.vue'
import Loading from '../../components/Common/Loading.vue'

import { useItems } from '../../services/items'
import { useCollections } from '../../services/collections'
import { Platform } from 'quasar'

export default defineComponent({
  name: 'PageItemsSingle',
  components: {
    ItemCategories,
    ItemHeader,
    ItemContent,
    Loading,
  },
  setup (_props, ctx) {
    const id = ctx.root.$route.params.itemId
    const loading = ref(true)
    const preview = ref(false)
    const item: Ref<InterfaceItem | undefined> = ref()

    const { state, getItem } = useItems()
    const { getCollections } = useCollections()

    const updateItem = () => {
      item.value = state.items.find(item => String(item.id) === id)
    }

    onBeforeMount(async () => {
      const route = ctx.root.$route
      preview.value = route.query.preview === 'true'
      await getCollections()
      await getItem(route.params.itemId, preview.value)
      updateItem()
    })

    watch(
      () => state.items,
      updateItem
    )

    return {
      item,
      isMobile: Platform.is.mobile as boolean,
      preview,
      loading
    }
  }
});
</script>