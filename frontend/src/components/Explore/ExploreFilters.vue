<template>
<div class="filters q-pr-lg">
  <div class="item-categories">
    <h6 class="text-h6 text-bold text-grey-7 q-mb-sm">CATEGORIES</h6>
    <q-list
      id="item-categories"
      >
      <q-item
        v-for="(category, key) in categories"
        :key="key"
        :class="'q-py-none item-category ' + ((String(Object.keys(category)[0]) === selectedCategory) ? 'q-item--active' : '')"
        @click="() => { updateCurrentCategory(Object.keys(category)[0]) }"
        clickable
        >
        {{ category[Object.keys(category)[0]] }}
      </q-item>
      <q-item
        :class="`bg-red-1 q-py-none item-category ${ selectedCategory === null ? 'hidden' : '' }`"
        @click="clearCurrentCategory"
        clickable
        >
        Clear&nbsp;&cross;
      </q-item>
    </q-list>
  </div>

  <div class="separator">
    <q-separator spaced="2em" inset="true" style="margin-left: -6px"/>
  </div>

  <div class="item-series-items">
    <h6 class="text-h6 text-bold text-grey-7 q-mb-sm">SERIES</h6>
    <q-list
      id="item-series-items"
      >
      <q-item
        v-for="(seriesItem, key) in seriesItems"
        :key="key"
        :class="'q-py-none item-series-item ' + ((String(Object.keys(seriesItem)[0]) === selectedSeriesItem) ? 'q-item--active' : '')"
        @click="() => { updateCurrentSeriesItem(Object.keys(seriesItem)[0]) }"
        clickable
        >
        {{ seriesItem[Object.keys(seriesItem)[0]] }}
      </q-item>
      <q-item
        :class="`bg-red-1 q-py-none item-series-item ${ selectedSeriesItem === null ? 'hidden' : '' }`"
        @click="clearCurrentSeriesItem"
        clickable
        >
        Clear&nbsp;&cross;
      </q-item>
    </q-list>
  </div>

  <div class="separator">
    <q-separator spaced="2em" inset="true" style="margin-left: -6px"/>
  </div>

  <div
    v-if="tags"
    class="item-tags"
    >
    <h6 class="text-h6 text-bold text-grey-7 q-mb-sm">TAGS</h6>
    <q-list
      id="item-tags">
      <q-checkbox
        v-for="(tag, index) in tags"
        class="item-tag"
        v-model="selectedTags"
        :id="tag.id"
        :val="tag.id"
        :key="index"
        :label="tag.title"
        />
    </q-list>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from '@vue/composition-api'

export default defineComponent({
  name: 'ExploreFilters',
  props: {
    updateCurrentCategory: {
      type: Function,
      default: (key: string) => {
        return key
      }
    },
    clearCurrentCategory: {
      type: Function,
      default: () => {
        return
      }
    },
    updateCurrentSeriesItem: {
      type: Function,
      default: (key: string) => {
        return key
      }
    },
    clearCurrentSeriesItem: {
      type: Function,
      default: () => {
        return
      }
    },
    tags: Array,
    categories: Array,
    selectedCategory: String,
    seriesItems: Array,
    selectedSeriesItem: String,
  },
  setup(props, ctx) {
    const selectedTags: Ref<Array<boolean>> = ref([])

    onMounted(() => {
      watch(selectedTags, () => {
        ctx.emit('update-selected-tags', selectedTags.value)
      })
    })

    return {
      selectedTags,
    }
  }
})
</script>

<style scoped lang="scss">
@media (max-width: 767px) {
  .filters {
    flex-direction: row !important;
    width: 100%;
  }
  .items-categories,
  .item-series-items {
    flex: 4;
    display: flex;
  }
  .item-category,
  .item-series-item {
    font-size: 0.8em;
    line-height: 1.25em;
    min-height: 1.25em;
  }
  .items-tags {
    flex: 6;
    display: flex;
  }
  .item-tag {
    font-size: 0.8em;
    line-height: 1.25em;
    min-height: 1.25em;
  }
}

.filters {
  display: flex;
  flex-direction: column
}
.item-category,
.item-series-item {
  line-height: 2.5em;
  min-height: 2.5em;
  color: $grey-8;
  margin-left: -15px;

  &:hover {
    color: $grey-9;
    background-color: transparent !important;
  }
  &.q-item--active {
    color: $grey-10;
    font-weight: 700;
  }
}
.item-tag {
  margin-left: -8px;
  display: flex;
}
</style>