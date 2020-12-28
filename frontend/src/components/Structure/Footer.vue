<template>
<q-footer class="bg-accent text-white visible-xs">
  <!--
  <div class="row items-center bg-grey-4 text-grey-9 justify-center" style="height:348px;">
    <div class="col-10">
      <div class="row items-start">
        <div class="col-6 row justify-between">
          <div class="col-6">
            <h6 class="text-weight-bold q-mb-md">
              About Us
            </h6>
            <p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
            </p>
            <div class="row">
              <q-icon :name="mdiInstagram" size="sm" color="grey=9" class="q-mr-xl"/>
              <q-icon :name="mdiFacebook" size="sm" color="grey=9" class="q-mr-xl" />
              <q-icon :name="mdiTwitter" size="sm" color="grey=9" class="q-mr-xl" />
            </div>
          </div>
          <div class="col-3">
            <h6 class="text-weight-bold q-mb-md">
              Explore
            </h6>
            <p class="q-mb-none text-caption">Fields</p>
            <p class="q-mb-none text-caption">Causes</p>
            <p class="q-mb-none text-caption">Contact</p>
          </div>
        </div>
        <div class="col-6 row justify-center">
          <div class="col-4 offset-4">
            <h6 class="text-weight-bold q-mb-md">
              Newsletter
            </h6>
            <p>Get the latest updates and exclusive promotions from our team.
            </p>
            <q-input 
              bg-color="white"
              hide-bottom-space
              :input-style="{ backgroundColor: 'white', color: 'black' }"
              standout 
              color="accent"
              v-model="mailingList"
            >
              <template v-slot:after>
                <q-btn round color="accent" dense icon="add" style="margin-left:-30px;" />
              </template>
            </q-input>
          </div>
        </div>
      </div>
    </div>
  </div>
  -->
  <div class="container row">
    <div class="column col-12 col-sm-4 col-lg-3 justify-center">
      <span class="q-mx-md text-caption">&copy; Copyright {{ currentYear }} | {{ config.app.organisation }}</span>
    </div>

    <q-toolbar class="row col-12 col-md-8 items-center">
      <router-link
        class="q-mr-md text-caption text-white no-decoration"
        exact
        to="/about"
        >
        About
      </router-link>
      <q-separator vertical dark spaced="md" class="q-my-md" />
      <router-link
        class="q-mx-md text-caption text-white no-decoration"
        exact
        to="/privacy"
        >
        Privacy
      </router-link>
      <q-separator vertical dark spaced="md" class="q-my-md" />
      <router-link
        class="q-mx-md text-caption text-white no-decoration"
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
