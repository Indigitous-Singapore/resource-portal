<template>
<div
  class="flex justify-center"
  v-if="loading">
  <q-spinner-tail
    color="accent"
    size="5em"
  />
</div>
<q-form
    @submit="loginUser"
    v-else
    class="login-form"
  >
  <q-input
    filled
    class="q-mb-sm"
    type="email"
    v-model="state.email"
    label="Email *"
    bottom-slots
    :error="errors.email !== null"
    required
  >
    <template v-slot:error>
      {{ errors.email }}
    </template>
  </q-input>

  <q-input
    filled
    type="password"
    v-model="state.password"
    label="Password *"
    bottom-slots
    :error="errors.password !== null"
    required
  >
    <template v-slot:error>
      {{ errors.password }}
    </template>
  </q-input>
  <q-card
    v-if="errors.others"
    flat
    class="q-mb-md q-py-sm q-px-md text-red-8 bg-red-1 text-body2"
     >
    <div v-html="errors.others" />
  </q-card>
  <div>
    <q-btn unelevated class="full-width q-py-xs" label="Log In" type="submit" color="accent"/>
  </div>
</q-form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { useAuthentication } from '../../services/authentication'

export default defineComponent({
  name: 'AuthenticationLoginForm',
  props: {
    onboarding: {
      type: Boolean,
      default: false,
    }
  },
  setup (props, ctx) {
    const { errors, loading, state, login } = useAuthentication()

    state.onboarding = props.onboarding
    
    /**
     * Login the user
     */
    const loginUser = () => {
      //  Gets the redirect url if available
      const redirectUrl = ctx.root.$route.query.redirectUrl as string
      login(redirectUrl)
    }

    return {
      errors,
      loading,
      loginUser,
      state
    }
  }
})
</script>

<style scoped lang="scss">
.login-form {
  max-width: 360px;
  width: 100%;
}
</style>