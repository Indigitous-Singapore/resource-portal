<template>
<div
  v-if="Array.isArray(state.collections) && state.collections.length > 0"
  class="q-mt-md"
>
  <div class="q-mb-md row">
    <q-select
      filled
      v-model="selectedOption"
      behavior="menu"
      use-input
      input-debounce="0"
      :options="options"
      @filter="filterFn"
      style="width: 100%"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>

  <Collection
    :collection="selectedCollection"
    />
</div>
<div
  class="q-pa-xl q-ma-xl"
  v-else
  >
  <div class="text-center text-h4 text-bold q-mb-md">You have no collections</div>
  <p class="text-center">Start one by visiting the library</p>
</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, Ref, ref, watch } from '@vue/composition-api'
import { InterfaceCollection } from '../../../interfaces'
import { useCollections } from '../../../services/collections'
import Collection from './Collection.vue'

export default defineComponent({
  name: 'ComponentDashboardProfileCollectionsNarrow',
  components: {
    Collection,
  },
  setup () {
    const {
      getCollections,
      state,
    } = useCollections()
    const selectedCollection: Ref<InterfaceCollection | undefined> = ref()
    const selectedOption: Ref<{ label: string; value: number; } | undefined> = ref()
    const options: Ref<{ label: string; value: number; }[]> = ref([])

    onBeforeMount(async () => {
      const collections: InterfaceCollection[] | undefined = await getCollections()
      if(Array.isArray(collections) && collections.length > 0) {
        populateOptions(collections)
        selectedOption.value = {...options.value[0]}
      }
    })

    const mapOptions = (collections: InterfaceCollection[]) => (
      collections.map((collection) => ({
          label: collection.title,
          value: collection.id,
        })
      )
    )

    const populateOptions = (collections: InterfaceCollection[]) => {
      options.value = mapOptions(collections)
    }

    const filterFn = (val: string, update: (arg0: { (): void; (): void }) => void) => {
      if (val === '') update(() => populateOptions(state.collections))

      update(() => {
        const needle = val.toLowerCase()
        options.value = mapOptions([...state.collections]).filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    }

    watch(
      () => selectedOption.value,
      () => {
        selectedCollection.value = state.collections.find(collection => collection.id === selectedOption.value?.value)
      }
    )

    return {
      filterFn,
      options,
      selectedCollection,
      selectedOption,
      state,
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
