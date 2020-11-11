<template>
<div class="filters">
  <div class="item-categories">
    <h5 class="text-grey-6 q-mb-sm xs-hide">CATEGORIES</h5>
    <q-list
      id="item-categories"
      >
      <q-item
        v-for="(label, key) of categories"
        :key="key"
        :class="'q-py-none item-category ' + ((String(key) === selectedCategory) ? 'q-item--active' : '')"
        @click="() => { updateCurrentCategory(key.toString()) }"
        clickable
        >
        {{ label }}
      </q-item>
    </q-list>
  </div>

  <div class="separator">
    <q-separator spaced="2em" inset="true" style="margin-left: -6px"/>
  </div>

  <div class="item-tags">
    <h5 class="text-grey-6 q-mb-sm xs-hide">TAGS</h5>
    <q-list
      id="item-tags">
      <q-checkbox
        v-for="(label, tag) of selectedTags"
        class="item-tag"
        v-model="selectedTags[tag]"
        :key="tag"
        :label="label"
        />
    </q-list>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, Ref, ref, watch } from '@vue/composition-api'
import { useItems } from '../../services/items'
import { InterfaceItem } from 'src/interfaces'

export default defineComponent({
  name: 'ExploreFilters',
  props: {
    updateCurrentCategory: {
      type: Function,
      default: (key: string) => {
        return key
      }
    },
    tags: Object,
    categories: Object,
    selectedTags: Object,
    selectedCategory: String,
  }
})
</script>

<style scoped lang="scss">
@media (max-width: 767px) {
  .filters {
    flex-direction: row !important;
    width: 100%;
  }
  .items-categories {
    flex: 4;
    display: flex;
  }
  .item-category {
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
.item-category {
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
}
</style>