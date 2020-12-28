<template>
<q-list
  v-if="user && user.email !== null"
  >
  <q-item to="/about" exact>
    <q-item-section>
      About
    </q-item-section>
  </q-item>
  <q-item to="/privacy" exact>
    <q-item-section>
      Privacy
    </q-item-section>
  </q-item>
  <q-item to="/terms" exact>
    <q-item-section>
      Terms
    </q-item-section>
  </q-item>

  <q-separator spaced="md"/>

  <q-item to="/logout" exact>
    <q-item-section>
      Logout
    </q-item-section>
  </q-item>
</q-list>
<q-list
  v-else
  >
  <q-item to="/register" exact>
    <q-item-section>
      <q-btn color="accent" bg-color="white" outline rounded label="SIGN UP" class="accent" />
    </q-item-section>
  </q-item>
  <q-item to="/login" exact>
    <q-item-section>
      <q-btn color="primary" bg-color="white" outline rounded label="LOGIN" class="accent" />
    </q-item-section>
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
