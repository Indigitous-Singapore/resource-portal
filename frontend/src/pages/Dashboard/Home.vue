<template>
  <q-page>
    <OnboardingDialog
      :showOnboarding="showOnboarding"
      />
    <div>
      <q-img
        src="assets/explore-banner.jpg"
        :ratio="isMobile ? 1/1 : 5/1"
        >
        <div class="text-center absolute-full text-subtitle2 flex flex-center column">
          <h3 class="text-h3 q-mb-sm">More Than A Song</h3>
          <h6 class="text-h6">Discover worship resources readily available to your ministry</h6>
          <div class="search">
            <ExploreSearch
              @update-search="updateCurrentSearch"
              />
          </div>
        </div>
      </q-img>
    </div>
    <div class="container">
      <div
        v-if="!isMobile"
        class="row q-py-md"
        >
        <div class="col-12 col-sm-9 offset-sm-3">
          <h1 class="text-h3 text-accent text-semibold q-my-md">Search Results</h1>
        </div>
      </div>
      <div class="row q-py-md">
        <div class="col-12 col-sm-3">
          <h5 class="text-h5 text-bold xs-hide">FILTER BY</h5>
          <div class="xs-hide">
            <ExploreFilters
              :clearCurrentCategory="clearCurrentCategory"
              :updateCurrentCategory="updateCurrentCategory"
              :selectedCategory="selectedCategory"
              :categories="categories"
              :clearCurrentSeriesItem="clearCurrentSeriesItem"
              :updateCurrentSeriesItem="updateCurrentSeriesItem"
              :selectedSeriesItem="selectedSeriesItem"
              :seriesItems="seriesItems"
              :selectedTags="selectedTags"
              :tags="tagsState.filter(tag => tag.display_in_filters === true)"
              @update-selected-tags="updateSelectedTags"
              />
          </div>
          <q-dialog
            full-width
            full-height
            square
            maximized
            v-model="dialogIsOpen"
            >
            <q-card
              class="dialog-filters"
              >
              <q-card-section class="row items-center q-pb-none">
                <h5 class="text-h5 q-mb-none">FILTER BY</h5>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </q-card-section>

              <q-card-section>
                <ExploreFilters
                  :clearCurrentCategory="clearCurrentCategory"
                  :updateCurrentCategory="updateCurrentCategory"
                  :selectedCategory="selectedCategory"
                  :categories="categories"
                  :clearCurrentSeriesItem="clearCurrentSeriesItem"
                  :updateCurrentSeriesItem="updateCurrentSeriesItem"
                  :selectedSeriesItem="selectedSeriesItem"
                  :seriesItems="seriesItems"
                  :selectedTags="selectedTags"
                  :tags="tagsState.filter(tag => tag.display_in_filters === true)"
                  @update-selected-tags="updateSelectedTags"
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
          <div class="row justify-between items-center sm-hide md-hide lg-hide xl-hide">
            <h5 class="text-h5 text-accent text-semibold q-mb-md">Search Results</h5>
            <q-btn
              icon="filter_alt"
              padding="none"
              class="float-right q-mb-md"
              label="Filter"
              @click="toggleFilter"
              flat
              size="sm"
              />
          </div>
          <ExploreContent />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Platform } from 'quasar'
import { defineComponent, onBeforeMount, ref, Ref, watch } from '@vue/composition-api'
import { useItems } from '../../services/items'
import { useTags } from '../../services/tags'
import { useCategories } from '../../services/categories'
import { useSeriesItems } from '../../services/seriesItems'
import { useCollections } from '../../services/collections'
import ExploreBanner from '../../components/Explore/ExploreBanner.vue'
import ExploreContent from '../../components/Explore/ExploreContent.vue'
import ExploreFilters from '../../components/Explore/ExploreFilters.vue'
import ExploreSearch from '../../components/Explore/ExploreSearch.vue'
import OnboardingDialog from '../../components/Dashboard/OnboardingDialog.vue'

export default defineComponent({
  name: 'PageHome',
  components: {
    ExploreBanner,
    ExploreContent,
    ExploreFilters,
    ExploreSearch,
    OnboardingDialog
  },
  setup (_props, ctx) {
    const loading = ref(true)
    const dialogIsOpen = ref(false)
    const categories: Ref<Record<string, string>[]> = ref([])
    const seriesItems: Ref<Record<string, string>[]> = ref([])
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
    const { 
      state: seriesItemsState,
      getSeriesItems
    } = useSeriesItems()
    const {
      getCollections
    } = useCollections()

    const selectedCategory: Ref<string|null> = ref(ctx.root.$route.query.category ? String(ctx.root.$route.query.category) : null)
    const selectedSeriesItem: Ref<string|null> = ref(ctx.root.$route.query.series ? String(ctx.root.$route.query.series) : null)
    const selectedTags: Ref<number[]> = ref([])
    const search: Ref<string> = ref('')

    /**
     * Lifecyle
     */
    onBeforeMount(async () => {
      await getFilteredSeriesItems()
      await getFilteredCategories()
      await getTags()
      await getFilteredItems()
      await getCollections()
    })

    /**
     * Gets Categories
     */
    const getFilteredCategories = async () => {
      await getCategories()
      const newCategories: Record<string, string>[] = []
      for (let category of categoriesState.value) {
        const newCategory: Record<string, string> = {}
        newCategory[category.id] = String(category.title)
        newCategories.push(newCategory)
      }
      categories.value = newCategories
    }

    /**
     * Gets Series Items
     */
    const getFilteredSeriesItems = async () => {
      await getSeriesItems()
      const newSeriesItems: Record<string, string>[] = []
      for (let seriesItem of seriesItemsState.value) {
        const newSeriesItem: Record<string, string> = {}
        newSeriesItem[seriesItem.id] = String(seriesItem.title)
        newSeriesItems.push(newSeriesItem)
      }
      seriesItems.value = newSeriesItems
    }

    /**
     * Gets the items based on the filters
     */
    const getFilteredItems = async () => {
      await getItems(
        (selectedCategory.value === null) ? [] : [selectedCategory.value],
        (selectedTags.value.length > 0) ? selectedTags.value : [],
        (selectedSeriesItem.value === null) ? [] : [selectedSeriesItem.value],
        search.value
      )
      loading.value = false
    }

    /**
     * Updates the search
     * 
     * @param {string} s
     */
    const updateCurrentSearch = (s: string): string => {
      search.value = s
      return s
    }

    /**
     * Updates the current category to the selected one
     * 
     * @param {string} key
     */
    const updateCurrentCategory = (key: string): void => {
      selectedCategory.value = key.toString()
    }

    /**
     * clears the current category
     * 
     * @param {string} key
     */
    const clearCurrentCategory = (): void => {
      selectedCategory.value = null
    }

    /**
     * Updates the current series item to the selected one
     * 
     * @param {string} key
     */
    const updateCurrentSeriesItem = (key: string): void => {
      selectedSeriesItem.value = key.toString()
    }

    /**
     * clears the current series item
     * 
     * @param {string} key
     */
    const clearCurrentSeriesItem = (): void => {
      selectedSeriesItem.value = null
    }

    /**
     * Updates the selected tags
     * 
     * @param {string} s
     */
    const updateSelectedTags = (tags: number[]): void => {
      selectedTags.value = tags
    }

    /**
     * Toggles the filter
     */
    const toggleFilter = () => {
      dialogIsOpen.value = !dialogIsOpen.value
    }

    /**
     * Observers
     */
    watch([selectedCategory, selectedTags, selectedSeriesItem, search], async () => await getFilteredItems())

    return {
      categories,
      clearCurrentCategory,
      clearCurrentSeriesItem,
      dialogIsOpen,
      loading,
      itemsState,
      isMobile: Platform.is.mobile as boolean,
      tagsState,
      toggleFilter,
      search,
      selectedTags,
      selectedCategory,
      selectedSeriesItem,
      seriesItems,
      showOnboarding: ctx.root.$route.query.onboarding === 'true',
      updateCurrentCategory,
      updateCurrentSearch,
      updateCurrentSeriesItem,
      updateSelectedTags,
    }
  }
})
</script>

<style scoped lang="scss">
.dialog-filters {
  width: 100%;

  @media (max-width: 767px) {
    padding-top: 50px;
  }
}
.search {
  width: 100%;
  max-width: 600px;
}
</style>
