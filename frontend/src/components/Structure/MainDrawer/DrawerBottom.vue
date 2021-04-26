<template>
<q-list>
  <q-item
    v-if="user && user.email !== null"
    to="/logout"
    exact
    >
    <q-item-section>
      Logout
    </q-item-section>
  </q-item>

  <q-separator
    v-if="user && !user.email"
    spaced="md"
    />

  <q-item
    v-if="user && !user.email"
    to="/register"
    exact
    >
    <q-item-section>
      <q-btn color="accent" bg-color="white" rounded label="SIGN UP" class="accent" />
    </q-item-section>
  </q-item>
  <q-item
    v-if="user && !user.email"
    to="/login"
    exact
    >
    <q-item-section>
      <q-btn color="primary" bg-color="white" outline rounded label="LOGIN" class="accent" />
    </q-item-section>
  </q-item>

  <q-separator spaced="md"/>

  <q-item>
    <router-link class="flex column small-link text-grey-7 text-body2" to="/about">About</router-link>
    &nbsp;&middot;&nbsp;
    <router-link class="flex column small-link text-grey-7 text-body2" to="/privacy">Privacy</router-link>
    &nbsp;&middot;&nbsp;
    <router-link class="flex column small-link text-grey-7 text-body2" to="/terms">Terms</router-link>
  </q-item>
</q-list>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useUser } from '../../../services/user'

export default defineComponent({
  name: 'DrawerBottom',
  setup () {
    const { user } = useUser()

    return {
      user
    }
  }
})
</script>

<style scoped lang="scss">
.small-link {
  text-decoration: none;
}
</style>
