<template>
  <q-drawer
    :width="screenWidth"
    side="right"
    v-model="rightDrawerOpen"
    no-swipe-backdrop
    no-swipe-close
    no-swipe-open
  >
    <q-scroll-area class="fit q-pt-xl">
      <q-list
        class="q-pt-md"
        v-if="user && user.email"
        >
        <!-- Loggedin User Specific Navigation -->
        <q-item
          class="q-pb-md"
          >
          <div class="row items-center no-wrap">
            <q-avatar size="32px">
              <img :src="user.displayPictureUrl">
            </q-avatar>
            <div class="text-center q-ml-sm">
              {{ user.firstName }} {{ user.lastName }}
            </div>
          </div>
        </q-item>
        <q-item
          v-for="link in navigation.user"
          :key="link.url"
          :to="link.url"
          >
          <q-item-section>{{ link.name }}</q-item-section>
        </q-item>
      </q-list>

      <q-separator
        v-if="user && user.email"
        spaced="md"
        />
    
      <q-list>
        <!-- Global navigation -->
        <q-item
          v-for="link in navigation.global"
          :key="link.url"
          :to="link.url"
          >
          <q-item-section>{{ link.name }}</q-item-section>
        </q-item>

        <q-separator
          v-if="user && user.email"
          spaced="md"
          />

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

    const navigation = {
      user: [
        {
          name: 'My Profile',
          url: '/profile/profile',
        },
        {
          name: 'My Collections',
          url: '/profile/collections',
        },
      ],
      global: [
        {
          name: 'Explore',
          url: '/explore',
        },
        {
          name: 'Collections',
          url: '/collections',
        },
      ]
    }

    return {
      navigation,
      screenWidth: window.innerWidth,
      user,
    }
  }
})
</script>
