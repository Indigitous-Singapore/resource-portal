<template>
  <div class="row item-card">
      <div class="category-image">
        <router-link
          class="no-decoration"
          :to="`/items/${item.id}`">
          <q-img
            src="/assets/musicfile.jpg"
            :ratio="1"
            />
        </router-link>
      </div>
      <div class="content">
        <div class="row details">
          <div class="column col-xs-8 q-pt-md q-px-md title">
            <router-link
              class="no-decoration"
              :to="`/items/${item.id}`">
              {{ item.title }}
            </router-link>
          </div>
          <div class="column col-sm-2 col-xs-0 justify-center text-center">
            <span class="color-grey-6">{{ formattedUpdatedAt }}</span>
          </div>
          <div class="column col-sm-2 col-xs-4 justify-center text-right">
            <ItemActions
              :item="item"
              />
          </div>
        </div>
        <div class="column" style="margin-bottom: 5px">
            <q-expansion-item
              switch-toggle-side
              header-class="resources"
              expand-icon="arrow_right"
              expanded-icon="arrow_drop_down"
            >
              <template v-slot:header>
                <div class="row fit">
                  <span class="category flex items-center text-accent">
                    {{ category }}
                  </span>
                  <q-badge
                    v-for="(number, ext) of mediaExtensions"
                    :key="ext"
                    class="q-ml-sm media-extension"
                    outline
                    align="middle"
                    text-color="black"
                    >
                    {{ ext.toUpperCase() }}
                  </q-badge>
                </div>
              </template>
              <div class="column q-pl-lg">
                <ItemResources :item="item" />
                <ItemLinks :item="item" />
              </div>
            </q-expansion-item>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { InterfaceItem } from '../../interfaces'
import ItemActions from '../Item/Actions.vue'
import ItemLinks from '../Item/Links.vue'
import ItemResources from '../Item/Resources.vue'

export default defineComponent({
  name: 'ItemCardExpanded',
  components: {
    ItemActions,
    ItemLinks,
    ItemResources,
  },
  props: {
    category: String,
    formattedUpdatedAt: String,
    mediaExtensions: Object,
    item: Object as PropType<InterfaceItem>
  },
})
</script>

<style scoped lang="scss">
.item-card {
  border-top: 1px solid $grey-4;
  .content {
    width: calc(100% - 100px)
  }
  .details {
    height: 57px;
  }
  .category-image {
    height: 100px;
    width: 100px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .title {
    font-weight: 600;
    line-height: 1.4;
  }
  .media-extension {
    font-size: 0.6em;
    padding: 0 1em;
    height: 1.9em;
    display: flex;
  }
}
.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>