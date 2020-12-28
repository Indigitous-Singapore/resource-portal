<template>
  <div class="row item-card narrow-item-card" v-if="item">
      <div class="category-image q-py-sm">
        <router-link
          class="no-decoration"
          :to="`/items/${item.id}`">
          <q-img
            :src="typeof item.categories[0].featured_image.url === 'string' ? item.categories[0].featured_image.url : '/assets/musicfile.jpg'"
            :ratio="1"
            />
        </router-link>
      </div>
      <div class="content">
        <div class="row details">
          <div class="column col-xs-8 q-pt-sm q-pl-sm title">
            <router-link
              class="no-decoration"
              :to="`/items/${item.id}`">
              {{ item.title }}
            </router-link>
          </div>
          <div class="column col-sm-2 col-xs-4 q-pt-sm text-right">
            <ItemActions
              :item="item"
              />
          </div>
        </div>
        <div class="row">
          <div class="column col-xs-8 q-pl-xs q-pb-xs">
            <q-expansion-item
              switch-toggle-side
              header-class="resources"
            >
              <template v-slot:header>
                <div class="column fit">
                  <span class="category flex items-center text-accent q-mb-sm">
                    {{ category }}
                  </span>
                  <div class="row">
                    <q-badge
                      v-for="(number, ext) of mediaExtensions"
                      :key="ext"
                      class="q-mr-sm media-extension"
                      outline
                      align="middle"
                      text-color="black"
                      >
                      {{ ext.toUpperCase() }}
                    </q-badge>
                  </div>
                </div>
              </template>
              <div class="column">
                  <div
                    v-for="resource in item.media"
                    :key="resource.id"
                    class="row items-center resource"
                    >
                    <div class="column col-xs-8 q-py-sm">
                      <span class="text-body2 q-pl-sm">
                        <q-icon
                          v-if="resource.ext === '.mp3'"
                          name="music_note"
                          />
                        <q-icon
                          v-else
                          name="description"
                          />
                        {{ resource.name }}
                      </span>
                    </div>
                    <div class="column col-xs-4 justify-center items-end">
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
                        label="Watch on YouTube"
                        no-caps
                        />
                    </div>
                  </div>
              </div>
            </q-expansion-item>
          </div>
          <div class="column col-xs-4 justify-center text-right">
            <span class="updated-at text-grey-7">{{ formattedUpdatedAt }}</span>
          </div>
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
  .cursor-pointer.q-item {
    padding-left: 5px;
  }
  .cursor-pointer.q-item__section--avatar {
    display: none;
  }
}
</style>

<style scoped lang="scss">
.item-card {
  border-top: 1px solid $grey-4;
  .content {
    width: calc(100% - 50px)
  }
  .category-image {
    height: 50px;
    width: 50px;
  }
  .title {
    font-weight: 600;
    line-height: 1.4;
    font-size: 0.9em;
  }
  .media-extension {
    font-size: 0.6em;
    padding: 0 1em;
    height: 1.9em;
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