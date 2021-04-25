<template>
  <q-layout view="hHh lpr lff">
    <q-header bordered class="bg-white text-black" style="z-index: 10000">
      <div class="row">
        <q-toolbar class="col-grow">
          <router-link
            to="/"
            >
            <img
              :src="config.app.logoUrl"
              :alt="config.app.logoAlt"
              style="height:36px"
              />
          </router-link>
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
          </div>
          <q-toolbar-title class="lt-md"></q-toolbar-title>
          <q-btn
            flat
            dense
            round
            :icon="rightDrawerOpen ? 'close' : 'menu'"
            aria-label="Menu"
            @click="toggleDrawer()"
            class="lt-md"
          />
        </q-toolbar>
        
        <NavbarRight />
      </div>
    </q-header>

    <ComponentDrawer
      :rightDrawerOpen="rightDrawerOpen"
      />

    <q-page-container>
      <router-view />
    </q-page-container>

    <Footer />
  </q-layout>
</template>

<script lang="ts">
import config from '../config/config'
import ComponentDrawer from 'components/Structure/MainDrawer/Drawer.vue'
import NavbarRight from 'components/Structure/NavbarRight.vue'
import Footer from 'components/Structure/Footer.vue'
import { defineComponent, ref } from '@vue/composition-api'
 
export default defineComponent({
  name: 'MainLayout',
  components: {
    ComponentDrawer,
    Footer,
    NavbarRight,
  },
  setup () {
    const rightDrawerOpen = ref(false)
    const toggleDrawer = () => {
      rightDrawerOpen.value  = !rightDrawerOpen.value
    }

    return {
      config,
      toggleDrawer,
      rightDrawerOpen
    }
  }
})
</script>
<style lang="scss">
.accent {
  &:hover {
    background-color: $accent !important;
    color: white !important;
  }
}
</style>