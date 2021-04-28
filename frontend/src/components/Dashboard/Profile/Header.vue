<template>
<div
  v-if="user"
  class="row"
  >
  <div class="column col-xs-4 col-sm-4 col-md-3 col-lg-2">
    <q-img
      :src="user.displayPictureUrl"
      class="display-picture"
      :ratio="1"
      />
  </div>
  <div class="column col-xs-8 col-sm-8 col-md-9 col-lg-10 justify-between">
    <h2 class="text-h4 sm-hide md-hide lg-hide xl-hide text-bold q-mb-none"><b>{{ user.firstName }} {{user.lastName}}</b></h2>
    <h2 class="text-h3 xs-hide text-bold q-mb-none"><b>{{ user.firstName }} {{user.lastName}}</b></h2>
    <div class="text-grey-9">
      {{ user.email }}
      <br/>
      Joined on {{ user.createdAtFormatted }}
    </div>
  </div>
</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useUser } from '../../../services/user'

export default defineComponent({
  name: 'ComponentDashboardProfileHeader',
  setup () {
    const { user } = useUser()

    return {
      user
    }
  }
})
</script>
<style lang="scss" scoped>
.display-picture {
  width: 140px;
  height: 140px;
  border-radius: 70px;
  
  @media screen and (max-width: 767px) {
    width: 100px;
    height: 100px;
    border-radius: 50px;
  }
}
</style>
