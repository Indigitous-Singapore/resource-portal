<template>
  <q-page>
    <div class="container">
      <div class="row q-py-xl">
        <div class="col-12 col-sm-3">
          <h4 class="xs-hide"><b>Filters</b></h4>
          <div class="xs-hide">
            <ExploreFilters
              :updateCurrentCategory="updateCurrentCategory"
              :selectedCategory="selectedCategory"
              :selectedTags="selectedTags"
              :categories="categories"
              :tags="tags"
              />
          </div>
          <q-dialog
            v-model="dialogIsOpen"
            >
            <q-card
              class="dialog-filters"
              >
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">Filters</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                <ExploreFilters
                  :updateCurrentCategory="updateCurrentCategory"
                  :selectedCategory="selectedCategory"
                  :selectedTags="selectedTags"
                  :categories="categories"
                  :tags="tags"
                  />
              </q-card-section>
            </q-card>
          </q-dialog>
        </div>
        <div
          v-if="loading" 
          class="col-12 col-sm-9 flex justify-center items-center"
          >
          <q-spinner-tail
            size="140px"
            color="accent"
            />
        </div>
        <div
          v-else
          class="col-12 col-sm-9"
          >
          <!--
          <ExploreSearch
            v-if="itemsState.items.length > 0"
            />
          <q-separator
            v-if="itemsState.items.length > 0"
            spaced="xl"
            />
          -->
          <h3>
            <b>Search Results</b>
            <q-btn
              icon="filter_alt"
              class="sm-hide md-hide lg-hide xl-hide q-mt-xs float-right"
              color="accent"
              label="Filters"
              @click="toggleFilter"
              flat
              size="sm"
              />
          </h3>
          <q-separator
            spaced="xl"
            />
          <ExploreContent />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import _ from 'lodash'
import { defineComponent, onBeforeMount, reactive, ref, Ref, watch } from '@vue/composition-api'
import { useItems } from '../../services/items'
import { useTags } from '../../services/tags'
import { useCategories } from '../../services/categories'
import { InterfaceItem } from 'src/interfaces'
import ExploreBanner from '../../components/Explore/ExploreBanner.vue'
import ExploreContent from '../../components/Explore/ExploreContent.vue'
import ExploreFilters from '../../components/Explore/ExploreFilters.vue'
import ExploreSearch from '../../components/Explore/ExploreSearch.vue'


export default defineComponent({
  name: 'ExploreHeader',
  components: {
    ExploreBanner,
    ExploreContent,
    ExploreFilters,
    ExploreSearch
  },
  setup (props, ctx) {
    const loading = ref(true)
    const dialogIsOpen = ref(false)
    const defaultStateTags: Record<string, boolean> = {}
    const tags: Ref<Record<string, string>> = ref({})
    const categories: Ref<Record<string, string>> = ref({})
    const { 
      state: itemsState,
      getItems
    } = useItems()
    const { 
      state: tagsState,
      getTags
    } = useTags()
    const { 
      state: categoriesState,
      getCategories
    } = useCategories()

    const selectedCategory: Ref<string> = ref('all')
    const selectedTags: Ref<Record<string, boolean>> = ref({})

    /**
     * Lifecyle
     */
    onBeforeMount(async () => {
      await getFilteredCategories()
      await getFilteredTags()
      await getFilteredItems()

      /**
       * Observers
       */
      watch(selectedTags, getFilteredItems)
      watch(selectedCategory, getFilteredItems)
    })


    /**
     * Gets Categories
     */
    const getFilteredCategories = async () => {
      await getCategories()
      const newCategories: Record<string, string> = {
        'all': 'All Categories'
      }
      for (let category of categoriesState.value) {
        newCategories[category.id] = category.Title || ''
      }
      categories.value = newCategories
      console.log('categories', categories.value)
    }

    /**
     * Gets tags
     */
    const getFilteredTags = async () => {
      await getTags()
      const newTags: Record<string, string> = {}
      const newSelectedTags: Record<string, boolean> = {}
      for (let tag of tagsState.value) {
        newTags[tag.id] = tag.Title || ''
        newSelectedTags[tag.id] = true
      }
      tags.value = newTags
      selectedTags.value = newSelectedTags
    }

    /**
     * Gets the items based on the filters
     */
    const getFilteredItems = async () => {
      const tags: string[] = []
      console.log('tags', selectedTags.value)
      Object.keys(selectedTags.value).forEach(tag => {
        if(selectedTags.value[tag] === true){
          tags.push(tag)
        }
      })
      await getItems(
        [selectedCategory.value],
        (tags.length > 0 ? tags : ['all']),
      )
      loading.value = false
    }

    /**
     * Updates the current FIELD to the selected one
     * 
     * @param {string} key
     */
    const updateCurrentCategory = (key: string): void => {
      selectedCategory.value = key.toString()
    }

    /**
     * Toggles the filter
     */
    const toggleFilter = () => {
      dialogIsOpen.value = !dialogIsOpen.value
    }

    return {
      categories,
      dialogIsOpen,
      loading,
      itemsState,
      tags,
      toggleFilter,
      selectedTags,
      selectedCategory,
      updateCurrentCategory,
    }
  }
})
</script>

<style scoped lang="scss">
.dialog-filters {
  width: 100%;
}
</style>
