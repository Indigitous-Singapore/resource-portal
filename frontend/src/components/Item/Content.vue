<template>
<div>
  <div
    class="row q-col-gutter-xl q-mt-sm q-mb-xl mobile-hide"
    >
    <div class="column col-8">
      <h4 class="q-mb-md">Description</h4>
      <div
        v-html="description_long"
        />
      <ItemTags
        :item="item"
        />
    </div>
    <div class="column col-4">
      <q-card>
        <q-card-section>
          <ItemResources
            :item="item"
            />
          <ItemLinks
            :item="item"
            />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div class="q-mt-sm desktop-hide">
    <ItemActions
      :item="item"
      />
    <q-tabs
      class="q-mt-md"
      v-model="tab"
      active-color="primary"
      indicator-color="primary"
      align="left"
    >
      <q-tab name="description" label="Description" />
      <q-tab name="resources" label="Resources" />
    </q-tabs>

    <q-separator
      class="q-mb-md"
      />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        class="q-px-none"
        name="description">
        <div
          v-html="description_long"
          />
        <ItemTags
          :item="item"
          />
      </q-tab-panel>
      <q-tab-panel
        class="q-px-none"
        name="resources"
        >
        <ItemResources
          :item="item"
          />

        <ItemLinks
          :item="item"
          />
      </q-tab-panel>
    </q-tab-panels>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from '@vue/composition-api'
import { markdownToHtml } from '../../utilities/html'

import ItemActions from './Actions.vue'
import ItemTags from './Tags.vue'
import ItemLinks from './Links.vue'
import ItemResources from './Resources.vue'

export default defineComponent({
  name: 'ItemContent',
  components: {
    ItemActions,
    ItemLinks,
    ItemTags,
    ItemResources,
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup (props) {
    const tab: Ref<string> = ref('description')
    
    return {
      description_long: markdownToHtml(props.item.description_long),
      tab
    }
  }
});
</script>
