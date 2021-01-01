<template>
  <q-page class="container column justify-center items-center">
    <q-card
      class="signup"
    >
      <q-card-section>
        <h3 class="text-h4 text-center q-mb-none"><b>Create Account</b></h3>
      </q-card-section>

      <q-card-section class="q-pt-md q-mb-xs">
        <AuthenticationSignupForm />
        
        <p class="text-body2 q-mt-md q-mb-none"><router-link to="/login">Already have an account? Login</router-link></p>
      </q-card-section>

      <q-separator />

      <q-card-actions horizontal class="card-actions q-py-lg q-px-md">
        By signing up, you agree and consent to our <router-link to="/terms">terms of use</router-link>&nbsp;and&nbsp;<router-link to="/privacy">privacy policy</router-link>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import AuthenticationSignupForm from '../../components/Authentication/SignupForm.vue'

export default defineComponent({
  name: 'PageLogin',
  components: {
    AuthenticationSignupForm,
  }
});
</script>

<style scoped lang="scss">
.signup{
  @media (min-width: 767px) {
    margin-top: 2em;
    margin-bottom: 2em;
    padding-top: 1em;
    padding-bottom: 1em;
    padding-left: 2em;
    padding-right: 2em;
  }
}
.card-actions {
  max-width: 400px;
}
</style>
