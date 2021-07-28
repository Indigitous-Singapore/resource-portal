<template>
<q-footer class="bg-accent text-white visible-xs">
  <div class="container row">
    <div class="column col-12 col-sm-4 col-lg-3 justify-center">
      <span class="q-mx-md text-small">&copy; Copyright {{ currentYear }} | {{ config.app.organisation }}</span>
    </div>

    <q-toolbar class="row col-12 col-md-8 items-center">
      <router-link
        class="q-mr-md text-small text-white no-decoration"
        exact
        to="/about"
        >
        About
      </router-link>
      <q-separator vertical dark spaced="md" class="q-my-md" />
      <router-link
        class="q-mx-md text-small text-white no-decoration"
        exact
        to="/privacy"
        >
        Privacy
      </router-link>
      <q-separator vertical dark spaced="md" class="q-my-md" />
      <router-link
        class="q-mx-md text-small text-white no-decoration"
        exact
        to="/terms"
        >
        Terms of Use
      </router-link>
    </q-toolbar>
  </div>
</q-footer>
</template>

<script>
import config from '../../config/config'
import { defineComponent, ref } from '@vue/composition-api'
import { mdiInstagram , mdiFacebook, mdiTwitter } from '@quasar/extras/mdi-v5'
export default defineComponent({
  name: 'Footer',
  setup () {
    const mailingList = ref('')
    const currentYear = new Date().getFullYear()
    return {
      config,
      currentYear,
      mdiInstagram,
      mdiFacebook,
      mdiTwitter,
      mailingList
    }
  }
})
</script>
