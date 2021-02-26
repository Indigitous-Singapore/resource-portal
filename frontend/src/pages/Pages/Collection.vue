<template>
  <q-page
    v-if="loading === true"
    class="flex items-center"
    >
    <div
      class="flex full-width justify-center align-center"
      >
      <loading />
    </div>
  </q-page>
  <q-page
    v-else-if="error !== undefined"
    class="flex full-width justify-center align-center items-center"
    >
    <h4 class="text-red-8">{{ error }}</h4>
  </q-page>
  <q-page
    class="container"
    v-else-if="collection !== undefined"
    >
    <div class="container">
      <div
        class="row q-pt-md"
        >
        <div class="col-12 col-md-10">
          <h1 class="text-h3 text-accent text-semibold q-my-md">{{ collection.title }}</h1>
        </div>
        <div class="col-12 col-md-2 flex justify-end items-center">
          <q-btn
            v-if="collection.is_public"
            size="12px"
            padding="sm md"
            label="Share"
            icon-right="share"
            color="primary"
            @click="() => shareCollection(collection)"
            no-caps
            unelevated
            />
        </div>
      </div>
      <div
        class="row q-pb-md"
        >
        <div class="col-12">
          <p>{{ collection.description }}</p>
        </div>
      </div>
      <div class="row q-py-md">
        <q-table
          id="collection-content-table"
          v-if="collection.items.length > 0"
          grid
          :data="collection.items"
          row-key="id"
          :filter="tableOptions.filter"
          :pagination.sync="tableOptions.pagination"
          :rows-per-page-options="rowsPerPageOptions"
        >
          <template v-slot:top>
            <div
              v-if="!isMobile"
              class="col-xs-12"
              >
              <ItemHeaderExpanded
                />
            </div>
          </template>
          <template v-slot:item="props">
            <div class="col-xs-12">
              <ItemCard
                :item="props.row"
                />
            </div>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref, watch, onBeforeMount } from '@vue/composition-api'
import { InterfaceCollection } from 'src/interfaces'
import { defineComponent } from '@vue/composition-api'
import { Platform } from 'quasar'

import Loading from '../../components/Common/Loading.vue'
import { useCollections } from '../../services/collections'
import ItemCard from '../../components/Common/ItemCard.vue'
import ItemHeaderExpanded from '../../components/Common/ItemHeader.expanded.vue'
import config from '../../config/config'
import { share } from '../../utilities/share'

export default defineComponent({
  name: 'PageCollectionsSingle',
  components: {
    Loading,
    ItemCard,
    ItemHeaderExpanded,
  },
  setup (_props, ctx) {
    const id = ctx.root.$route.params.collectionId
    const loading = ref(true)
    const error: Ref<string|undefined> = ref()
    const collection: Ref<InterfaceCollection|undefined> = ref()

    const { state, getCollection } = useCollections()

    const tableOptions = {
      filter: '',
      pagination: {
        page: 1,
        rowsPerPage: 99
      },
    }

    const shareCollection = async (collection: InterfaceCollection) => {
      await share(
      `${collection.title || ''}`,
      `${collection.title || ''}: ${collection.description || ''}`,
      `${config.app.host || 'portal.msmusic.edu.sg'}/collections/${collection.id}`
      )
    }

    const updateCollection = () => {
      error.value = undefined

      const currentCollection = state.collections.find(stateCollection => String(stateCollection.id) === id)
      console.log(currentCollection)

      if (currentCollection !== undefined) {
        if (currentCollection.is_public === true) {
          collection.value = currentCollection
        } else {
          error.value = 'This collection is private'
        }
      } else {
        console.error('No collection found')
        error.value = 'No collection found'
      }
    }

    const fetchCollection = async () => {
      loading.value = true
      await getCollection(id)
      updateCollection()
      loading.value = false
    }

    onBeforeMount(async () => {
      await fetchCollection()
    })

    watch(
      () => state.collections,
      updateCollection
    )

    return {
      collection,
      error,
      isMobile: Platform.is.mobile as boolean,
      loading,
      tableOptions,
      shareCollection,
    }
  }
});
</script>

<style lang="scss">
#collection-content-table {
  .q-table__top {
    padding: 0;
  }
}
</style>