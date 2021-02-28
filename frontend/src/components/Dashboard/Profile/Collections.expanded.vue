<template>
<q-splitter
  v-if="Array.isArray(state.collections) && state.collections.length > 0"
  v-model="tabState.splitterModel"
>
  <template v-slot:before>
    <q-tabs
      v-model="tabState.innerTab"
      vertical
      class="text-accent"
      no-caps
    >
      <q-tab
        v-for="(collection, index) in state.collections"
        :key="index"
        :name="collection.id"
        :label="collection.title"
        />
    </q-tabs>
  </template>

  <template v-slot:after>
    <q-tab-panels
      v-model="tabState.innerTab"
      animated
      transition-prev="slide-down"
      transition-next="slide-up"
    >
      <q-tab-panel
        v-for="(collection, index) in state.collections"
        :key="index"
        :name="collection.id"
        >
        <Collection
          :collection="collection"
          />
      </q-tab-panel>

    </q-tab-panels>
  </template>
</q-splitter>
<div
  class="q-pa-xl q-ma-xl"
  v-else
  >
  <div class="text-center text-h4 text-bold q-mb-md">You have no collections</div>
  <p class="text-center">Start one by visiting the library</p>
</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive } from '@vue/composition-api'
import { useCollections } from '../../../services/collections'
import Collection from './Collection.vue'

export default defineComponent({
  name: 'ComponentDashboardProfileCollectionsExpanded',
  components: {
    Collection,
  },
  setup () {
    const {
      getCollections,
      state,
    } = useCollections()
    const tabState = reactive({
      innerTab: 0,
      splitterModel: 20
    })

    onBeforeMount(async () => {
      const collections = await getCollections()
      if(Array.isArray(collections) && collections.length > 0) {
        tabState.innerTab = collections[0].id
      }
    })

    return {
      tabState,
      state,
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
