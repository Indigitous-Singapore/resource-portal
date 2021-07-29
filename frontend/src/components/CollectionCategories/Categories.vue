<template>
<div
  v-if="loading === true"
  class="container flex items-center"
  >
  <div
    class="flex full-width justify-center align-center"
    >
    <Loading />
  </div>
</div>
<div
  v-else
  class="container flex items-center"
  >
  <div
    v-for="category in categories"
    :key="category.id"
    class="row flex full-width align-center"
    >
    <div class="col">
      <div class="row">
        <div class="col text-left">
          <h2 class="q-mb-none text-h4 text-accent">
            {{ category.name }}
          </h2>
          <div
            v-if="category.description"
            class="q-mt-sm text-grey-8"
            >
            {{ category.description }}
          </div>
        </div>
      </div>
      <div class="row text-left q-col-gutter-xl q-pb-md q-pt-lg">
        <router-link
          v-for="collection in category.collections"
          :key="collection.id"
          :to="`/collections/${collection.id}`"
          class="collection-category col col-6 col-sm-4 col-md-3"
          >
          <q-img
            class="q-mb-sm"
            :src="collection.featured_image.url"
            :ratio="1"
          />
          <div class="overflow-ellipsis text-bold text-grey-10">{{ collection.title }}</div>
          <div class="overflow-ellipsis text-grey-7">{{ collection.description }}</div>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { InterfaceCollectionCategory } from '../../interfaces'

import Loading from '../../components/Common/Loading.vue'

export default defineComponent({
  name: 'ComponentDashboardCollectionCategories',
  components: {
    Loading
  },
  props: {
    loading: {
      type: Boolean,
    },
    categories: {
      type: Array as () => InterfaceCollectionCategory[],
      default: () => []
    }
  }
})
</script>

<style scoped lang="scss">
.collection-category {
  text-decoration: none;
}
.overflow-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
