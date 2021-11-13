<template>
  <div class="row item-card narrow-item-card" v-if="item">
    <div class="row details">
      <div class="category-image q-py-sm">
        <router-link
          class="no-decoration"
          :to="`/items/${item.id}`">
          <q-img
            :src="(item && item.featured_image && typeof item.featured_image.url === 'string') ? item.featured_image.url : (item.categories[0].featured_image.url  || '/assets/musicfile.jpg')"
            :ratio="1"
            />
        </router-link>
      </div>
      <div class="content row">
        <div class="column col-xs-8 q-pt-sm q-pl-sm">
          <router-link
            class="no-decoration title q-pb-sm"
            :to="`/items/${item.id}`">
            {{ item.title }}
          </router-link>

          <span class="text-accent text-small">
            {{ category }}
          </span>
        </div>
        <div class="column col-xs-4 q-pt-sm text-right">
          <ItemActions
            :item="item"
            />
        </div>
      </div>
    </div>
    <div class="row" style="width: 100%">
      <div class="col-12 q-pb-xs q-mx-0">
        <q-expansion-item
          switch-toggle-side
          header-class="resources"
        >
          <template v-slot:header>
            <div class="row items-center justify-between q-mx-0" style="width: 100%">
              <div class="row items-center text-small">
                <q-icon name="add_circle" />&nbsp;&nbsp;Expand to view resources
              </div>
              <div class="column">
                <div class="row">
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
              </div>
            </div>
          </template>
          <div class="column">
              <div
                v-for="resource in item.media"
                :key="resource.id"
                class="row items-center resource"
                >
                <div class="row col-xs-9 q-py-xs items-center"> 
                  <q-icon
                    :name="resource.ext === '.mp3' ? 'music_note' : 'description'"
                    style="width: 16px; margin-right: 8px;"
                    />
                  <div class="text-small" style="width: calc(100% - 24px)">
                    {{ resource.name }}
                  </div>
                </div>
                <div class="column col-xs-3 justify-center items-end">
                  <q-btn
                    type="a"
                    target="_blank"
                    :href="resource.url"
                    padding="none"
                    flat
                    size="sm"
                    color="grey-5"
                    icon="cloud_download"
                    label="Download"
                    no-caps
                    />
                </div>
              </div>
              <div
                v-for="resource in item.link"
                :key="resource.title"
                class="row resource"
                >
                <div class="column justify-center col-xs-6 q-py-sm">
                  <span class="text-body2 q-pl-sm">
                    <q-icon name="tv"/>
                    {{ resource.title }}
                  </span>
                </div>
                <div class="column col-xs-1 justify-center items-center">
                  <q-badge
                    class="media-extension"
                    outline
                    align="middle"
                    text-color="black"
                    >
                    LINK
                  </q-badge>
                </div>
                <div class="column col-xs-5 justify-center items-end">
                  <q-btn
                    type="a"
                    target="_blank"
                    :href="resource.url"
                    padding="none"
                    flat
                    size="sm"
                    color="grey-5"
                    icon="live_tv"
                    label="Watch/Listen"
                    no-caps
                    />
                </div>
              </div>
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

export default defineComponent({
  name: 'ItemCardNarrow',
  components: {
    ItemActions,
  },
  props: {
    category: String,
    formattedUpdatedAt: String,
    mediaExtensions: Object,
    item: Object as PropType<InterfaceItem>
  }
})
</script>

<style lang="scss">
.narrow-item-card {
  .resources, .resource {
    min-height: 25px;
  }
  .resources {
    margin-top: 10px;
    padding: 0;
    border-radius: 5px;
  }
  .cursor-pointer.q-item__section--avatar {
    display: none;
  }
}
</style>

<style scoped lang="scss">
.item-card {
  border-top: 1px solid $grey-4;
  .details {
    width: 100%;
  }
  .content {
    width: calc(100% - 60px);
  }
  .category-image {
    height: 60px;
    width: 60px;
  }
  .title {
    font-weight: 600;
    line-height: 1.4;
    font-size: 0.9em;
  }
  .media-extension {
    font-size: 0.5em;
    padding: 0.24em 1em 0 1em;
    height: 1.7em;
    display: flex;
  }
  
  .updated-at {
    font-size: 0.7em;
  }

  .resource {
    border-top: 1px solid $grey-4;
  }
}
.no-decoration {
  text-decoration: none;
  color: inherit;
}
</style>