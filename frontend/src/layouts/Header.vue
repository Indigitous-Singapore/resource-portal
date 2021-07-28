<template>
  <q-header bordered class="bg-white text-black" style="z-index: 10000">
    <div class="row">
      <q-toolbar class="col-grow">
        <router-link
          class="logo"
          to="/"
          >
          <img
            :src="config.app.logoUrl"
            :alt="config.app.logoAlt"
            style="height:40px"
            class="q-ml-xl"
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

<style lang="scss" scoped>
.logo {
  text-decoration: none;
  height: 40px;
  .logo-text {
    text-decoration: none;
    color: #111;
    font-size: 25px;
    font-weight: 600;
    line-height: 28px;
    height: 28px;
    display: inline;
    vertical-align: top;
  }
}
</style>
