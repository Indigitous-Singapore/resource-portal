<template>
  <q-page class="container">
    <DashboardHeader
      title="Dashboard"
      />
    <div class="row">
      <div class="column col-xs-12">
        
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import DashboardHeader from 'components/Structure/DashboardHeader.vue'
import { useUser } from '../../services/user'

export default defineComponent({
  name: 'PageDashboardHome',
  components: {
    DashboardHeader,
  },
  setup (props, ctx) {
    const { user } = useUser()

    return {
      user
    }
  }
});
</script>

<style scoped lang="scss">
.iframe {
  border: none;
  height: 80vh;
}
</style>
