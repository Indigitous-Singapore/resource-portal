<template>
  <q-drawer
    :width="screenWidth"
    side="right"
    v-model="rightDrawerOpen"
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
  >
    <q-scroll-area class="fit q-pt-xl q-mt-md">
      <q-list>
        <q-item>
          <q-item-section>
            <DrawerSearch />
          </q-item-section>
        </q-item>
        
        <q-separator spaced="md"/>

        <q-item to="/about" exact>
          <q-item-section>
            About
          </q-item-section>
        </q-item>
        <q-item to="/explore" exact>
          <q-item-section>
            Explore
          </q-item-section>
        </q-item>

        <q-separator spaced="md"/>

        <DrawerBottom />
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DrawerSearch from './DrawerSearch.vue'
import DrawerBottom from './DrawerBottom.vue'

export default defineComponent({
  name: 'ComponentDrawer',
  components: {
    DrawerBottom,
    DrawerSearch,
  },
  props: {
    rightDrawerOpen: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      screenWidth: window.innerWidth
    }
  }
})
</script>
