<template>
<div
  v-if="collection"
  >
  <div class="row">
    <div class="q-py-sm col-xs-6">
      <div v-if="!isEditingTitle" class="text-h5 text-bold q-mb-sm">
        {{ collection.title }}
        <q-btn class="q-ml-sm" size="12px" round flat color="primary" icon="edit" no-caps @click="toggleEditTitle"/>
      </div>
      <div v-else class="q-mb-sm">
        <q-input input-class="text-h5 text-bold" :disable="loading" :loading="loading" v-model="title" @keydown.enter="editTitle" :hide-bottom-space="true" :dense="true" :autofocus="true">
          <template v-slot:append>
            <q-btn v-if="!loading" size="13px" round flat color="green-8" icon="check" @click="editTitle" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="q-pa-sm col-xs-6 text-right">
      <span :class="collection.is_public ? '' : 'text-bold'">Private</span>
      <q-toggle
        :disabled="loading"
        :value="collection.is_public ? true : false" 
        @input="editVisibility"
        />
      <span :class="collection.is_public ? 'text-bold' : ''">Public</span>
    </div>
  </div>
  <div class="row">
    <div class="q-py-sm flex items-center col-xs-12 text-left q-mb-md">
      <q-btn
        v-if="collection.is_public"
        class="q-mr-md"
        size="11px"
        padding="sm 1em sm md"
        icon-right="share"
        label="Share"
        color="grey-8"
        @click="() => shareCollection(collection)"
        no-caps
        unelevated
        />
      <q-btn
        v-if="collection.is_public"
        class="q-mr-md"
        size="11px"
        padding="sm 1em sm md"
        icon-right="visibility"
        label="View"
        color="blue-8"
        :to="`/collections/${collection.id}`"
        no-caps
        unelevated
        />
      <q-btn
        padding="sm 1em sm md"
        size="11px"
        icon-right="delete"
        label="Delete"
        color="accent"
        no-caps
        @click="destroyCollection"
        unelevated
        />
    </div>
    <div
      v-if="collection.items.length > 0"
      class="row"
      >
      <div
        v-for="(item, index) in collection.items"
        :key="index"
        class="q-py-sm col-xs-12"
        >
        <ItemCard
          :item="item"
          />
      </div>
    </div>
  </div>
</div>
<div
  v-else
  class="row"
  >
  <div
    class="column q-pa-sm col-xs-12 justify-center align-items"
    style="min-height: 200px"
    >
    <p class="text-h6 text-bold text-center">You have no items in this collection.</p>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import { useCollections } from 'src/services/collections'
import ItemCard from '../../Common/ItemCard.vue'
import { share } from '../../../utilities/share'
import { InterfaceCollection } from '../../../interfaces'
import config from '../../../config/config'
import { Platform } from 'quasar'

export default defineComponent({
  name: 'ComponentDashboardProfileCollection',
  components: {
    ItemCard
  },
  props: {
    collection: {
      type: Object
    }
  },
  setup(props) {
    const { deleteCollection, updateCollection, } = useCollections()
    const loading: Ref<boolean> = ref(false)
    const isEditingTitle: Ref<boolean> = ref(false)
    const title: Ref<string> = ref(String(props.collection?.title || ''))

    const editVisibility = async () => {
      if (props?.collection && props.collection.id && props.collection.is_public !== undefined) {
        loading.value = true
        await updateCollection(props.collection.id, {
          is_public: !(props.collection.is_public ? true : false)
        })
        loading.value = false
      }
    }

    const editTitle = async () => {
      if (props?.collection && props.collection.id && props.collection.title !== undefined) {
        loading.value = true
        await updateCollection(props.collection.id, {
          title: title.value
        })
        loading.value = false
        toggleEditTitle()
      }
    }

    const toggleEditTitle = () => {
      isEditingTitle.value = !isEditingTitle.value
    }
    
    const destroyCollection = async () => {
      if(props.collection) {
        if(confirm(`Please confirm that you want to delete: ${String(props.collection.title)}`)) {
          await deleteCollection(props.collection.id)
        }
      }
    }

    const shareCollection = async (collection: InterfaceCollection) => {
      await share(
      `${collection.title || ''}`,
      `${collection.title || ''}: ${collection.description || ''}`,
      `${config.app.host || 'portal.msmusic.edu.sg'}/collections/${collection.id}`
      )
    }

    return {
      destroyCollection,
      loading,
      isEditingTitle,
      isMobile: Platform.is.mobile as boolean,
      editTitle,
      editVisibility,
      toggleEditTitle,
      title,
      shareCollection,
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
