<template>
  <q-header bordered class="bg-white text-black" style="z-index: 10000">
    <div class="row">
      <q-toolbar class="col-grow">
        <router-link
          to="/"
          >
          <img
            :src="config.app.logoUrl"
            :alt="config.app.logoAlt"
            style="height:32px"
            class="q-ml-xs"
            />
        </router-link>
      </q-toolbar>
      <q-toolbar class="col-grow justify-end">
        <div class="gt-sm row">
          <q-btn
            color="transparent"
            text-color="black"
            flat
            stretch
            padding="lg lg"
            >
            <router-link
              class="no-decoration"
              exact
              to="/about"
              >
              ABOUT
            </router-link>
          </q-btn>
          <q-btn color="transparent" text-color="black" flat stretch padding="lg lg" label="EXPLORE" to="/explore" />
          <q-btn color="transparent" text-color="black" flat stretch padding="lg lg" label="COLLECTIONS" to="/collections" />
        </div>
        <q-toolbar-title class="lt-md"></q-toolbar-title>
        <q-btn
          flat
          dense
          round
          :icon="rightDrawerOpen ? 'close' : 'menu'"
          aria-label="Menu"
          @click="toggleDrawer"
          class="lt-md"
        />
      </q-toolbar>
      <q-separator vertical />
      <NavbarRight />
    </div>
  </q-header>
</template>

<script lang="ts">
import config from '../config/config'
import NavbarRight from 'components/Structure/NavbarRight.vue'
import { defineComponent } from '@vue/composition-api'
 
export default defineComponent({
  name: 'LayoutHeader',
  components: {
    NavbarRight,
  },
  props: {
    rightDrawerOpen: {
      type: Boolean,
    },
    toggleDrawer: {
      type: Function,
    }
  },
  setup () {
    return {
      config,
    }
  }
})
</script>
