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
        <q-item to="/explore">
          <q-item-section>
            Explore
          </q-item-section>
        </q-item>
        <q-item to="/profile" exact>
          <q-item-section>
            My Profile
          </q-item-section>
        </q-item>
        <q-item to="/profile/collections">
          <q-item-section>
            My Collections
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
import { useUser } from '../../../services/user'
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
    const { user } = useUser()

    return {
      screenWidth: window.innerWidth,
      user,
    }
  }
})
</script>
