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
    <q-banner
      v-if="!authenticated"
      :inline-actions="!isMobile"
      :class="`bg-white ${isMobile ? 'q-px-md' : 'q-px-lg'} shadow-5 q-py-md`"
      >
      <b>Welcome!</b> Register an account to view more resources and create your own collections.
      <div :class="`${isMobile ? 'q-pt-sm' : ''}`" />
      <template v-slot:action>
        <q-btn
          rounded
          unelevated
          no-caps 
          :class="`q-px-sm q-mr-md`"
          color="accent"
          to="/register"
          label="Register"
          />
        <q-btn
          rounded
          outline
          no-caps 
          :class="`q-px-sm `"
          to="/login"
          label="Login"
          />
      </template>
    </q-banner>
    <div
      :class="'row ' + (isMobile ? 'q-pt-md' : 'q-pt-xl')"
      >
      <div class="col- col-sm-3 col-md-2">
        <q-img
            :src="(collection && collection.featured_image && typeof collection.featured_image.url === 'string') ? collection.featured_image.url : '/assets/musicfile.jpg'"
          :style="'max-width: ' + (isMobile ? '260' : '300') + 'px'"
          />
      </div>
      <div class="col-8 col-sm-9 col-md-10 q-pl-lg">
        <h1 class="text-h4 text-semibold">{{ collection.title }}</h1>
        <p
          v-if="collection.description"
          class="text-body1 text-grey-8"
          >
          {{ collection.description }}
        </p>

        <q-btn
          v-if="collection && collection.is_public"
          size="13px"
          padding="sm lg"
          label="Share"
          icon-right="share"
          rounded
          outline
          @click="() => shareCollection(collection)"
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
      <div class="col-12">
        <q-table
          id="collection-content-table"
          v-if="collection.items.length > 0"
          grid
          :data="collection.items"
          row-key="id"
          :filter="tableOptions.filter"
          :pagination.sync="tableOptions.pagination"
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
import ItemCard from '../../components/Common/ItemCard.vue'
import ItemHeaderExpanded from '../../components/Common/ItemHeader.expanded.vue'

import { useCollections } from '../../services/collections'
import { isAuthenticated } from '../../services/authentication'

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
    const authenticated: Ref<boolean> = ref(true)

    const { state, getCollection } = useCollections()

    const tableOptions = {
      filter: '',
      pagination: {
        page: 1,
        rowsPerPage: 50
      },
    }

    /**
     * Shares a collection
     */
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
      console.log(await isAuthenticated())
      authenticated.value = await isAuthenticated()
    })

    watch(
      () => state.collections,
      updateCollection
    )

    return {
      authenticated,
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