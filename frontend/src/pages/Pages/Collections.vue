<template>
  <q-page>
    <section id="banner" class="q-py-xl">
      <div id="banner-overlay" class="" />
      <div id="banner-content" class="container">
        <div class="row">
          <div class="column col-12 q-pr-lg text-center">
            <h1 class="text-h2 text-weight-medium text-white q-mt-xl q-mb-md q-pt-md">A Word in Every Season</h1>
            <p class="text-h5 text-white q-mb-xl q-pb-md">Curated collections of resources to guide you through every season</p>
          </div>
        </div>
      </div>
    </section>
    <section class="q-py-xl text-center">
      <CollectionCategories
        :loading="loading"
        :categories="collectionCategories"
        />
    </section>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref, onBeforeMount } from '@vue/composition-api'
import { InterfaceCollectionCategory } from '../../interfaces'
import { defineComponent } from '@vue/composition-api'
import { Platform } from 'quasar'

import { useCollectionCategories } from '../../services/collectionCategories'

import Loading from '../../components/Common/Loading.vue'
import ItemCard from '../../components/Common/ItemCard.vue'
import ItemHeaderExpanded from '../../components/Common/ItemHeader.expanded.vue'
import CollectionCategories from '../../components/CollectionCategories/Categories.vue'

export default defineComponent({
  name: 'PageCollections',
  components: {
    CollectionCategories,
    Loading,
    ItemCard,
    ItemHeaderExpanded,
  },
  setup () {
    // const id = ctx.root.$route.params.collectionId
    const loading = ref(false)
    const error: Ref<string|undefined> = ref()
    const collectionCategories: Ref<InterfaceCollectionCategory[]|undefined> = ref()

    const { getCollectionCategories } = useCollectionCategories()

    const fetchCollectionCategories = async () => {
      loading.value = true
      collectionCategories.value = await getCollectionCategories()
      loading.value = false
    }

    onBeforeMount(async () => {
      await fetchCollectionCategories()
    })

    return {
      collectionCategories,
      error,
      isMobile: Platform.is.mobile as boolean,
      loading,
    }
  }
});
</script>

<style lang="scss">
#banner {
  position: relative;
  background-size: cover;
  background-position: center center;
  background-image: url("/assets/collections-banner.jpg");
}
#banner-overlay {
  background-color: rgba(50,50,50, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 0;
}
#banner-content {
  position: relative;
  z-index: 1;
}
</style>