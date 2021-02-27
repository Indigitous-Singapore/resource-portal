<template>
  <q-page class="container">
    <div class="row q-mt-md">
      <div class="column col-xs-12">
        <ComponentDashboardProfileHeader />
      </div>
    </div>
    <div class="row q-mt-xl">
      <div class="column col-xs-12">
        <q-separator
        color="grey-5"
        />

        <q-tabs
          v-model="data.tab"
          dense
          class="text-grey-100 ndgt-outer-tabs"
          active-color="black"
          active-bg-color="transparent"
          indicator-color="black"
          align="left"
          no-caps
        >
          <q-tab name="profile" label="Profile" />
          <q-tab name="collections" label="Collections" />
        </q-tabs>

        <q-separator
          color="grey-5"
          />

        <q-tab-panels v-model="data.tab" animated class="ndgt-inner-tabs">
          <q-tab-panel name="collections" class="q-pa-none">
            <ComponentDashboardProfileCollectionsNarrow v-if="isMobile"/>
            <ComponentDashboardProfileCollectionsExpanded v-else/>
          </q-tab-panel>

          <q-tab-panel name="profile" class="q-my-lg q-px-none">
            <div class="row">
              <div id="personal" class="column col-xs-12 col-sm-7">
                <ComponentDashboardProfilePersonal />
              </div>
              <div class="column col-xs-12 col-sm-5 q-mt-lg">
                <ComponentDashboardProfileResetPassword />
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api'
import ComponentDashboardProfileHeader from 'components/Dashboard/Profile/Header.vue'
import ComponentDashboardProfilePersonal from 'components/Dashboard/Profile/Personal.vue'
import ComponentDashboardProfileResetPassword from 'components/Dashboard/Profile/ResetPassword.vue'
import ComponentDashboardProfileCollectionsExpanded from 'components/Dashboard/Profile/Collections.expanded.vue'
import ComponentDashboardProfileCollectionsNarrow from 'components/Dashboard/Profile/Collections.narrow.vue'
import UnderConstruction from 'components/Dashboard/UnderConstruction.vue'
import { useUser } from '../../services/user'
import { Platform } from 'quasar'

export default defineComponent({
  name: 'PageDashboardProfile',
  components: {
    ComponentDashboardProfileHeader,
    ComponentDashboardProfilePersonal,
    ComponentDashboardProfileResetPassword,
    ComponentDashboardProfileCollectionsExpanded,
    ComponentDashboardProfileCollectionsNarrow,
    UnderConstruction
  },
  setup (_props, ctx) {
    const section = ctx.root.$route.params.section
    const { user } = useUser()
    const data = reactive({
      tab: section || 'profile',
      splitterModel: 15
    })

    return {
      data,
      isMobile: Platform.is.mobile as boolean,
      user
    }
  }
});
</script>

<style lang="scss" scoped>
#personal {
  @media screen and (min-width: 600px){
    padding-right: 1em;
  }
}
</style>
