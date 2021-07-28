<template>
  <q-layout view="hHh lpr lff">
    <Header
      :rightDrawerOpen="rightDrawerOpen"
      :toggleDrawer="toggleDrawer"
      />

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
import Header from './Header.vue'
import ComponentDrawer from '../components/Structure/MainDrawer/Drawer.vue'
import NavbarRight from '../components/Structure/NavbarRight.vue'
import Footer from '../components/Structure/Footer.vue'
import { defineComponent, ref } from '@vue/composition-api'
 
export default defineComponent({
  name: 'MainLayout',
  components: {
    ComponentDrawer,
    Footer,
    Header,
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
      rightDrawerOpen,
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