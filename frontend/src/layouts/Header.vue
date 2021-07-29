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
            />
        </router-link>
      </q-toolbar>
      <q-toolbar class="col-grow justify-end">
        <div class="gt-sm row">

          <q-btn
            v-for="item in navigationItems"
            :key="item.to"
            :label="item.label"
            :to="item.to"
            class="navigation-link"
            flat
            padding="lg lg"
            />
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
    const navigationItems = [
      { label: "About", to: "/about", },
      { label: "Explore", to: "/explore", },
      { label: "Collections", to: "/collections", },
    ]

    return {
      config,
      navigationItems,
    }
  }
})
</script>

<style lang="scss" scoped>
.logo {
  text-decoration: none;
  height: 40px;

  @media (min-width: 1200px) {
    & {
      margin-left: 30px;
    }
  }

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
