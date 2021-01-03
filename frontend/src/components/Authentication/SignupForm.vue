<template>
<div
  class="flex justify-center"
  v-if="loading">
  <q-spinner-tail
    color="accent"
    size="5em"
  />
</div>
<div
  class="flex text-center column"
  v-else-if="completed">
  <q-card
    class="q-px-md q-pt-xl q-pb-lg bg-grey-2"
    flat bordered
    style="max-width: 380px"
    >
    <h5 class="text-accent"><b>Verify your email address</b></h5>
    <p>We sent a verification email to:</p>
    <p><b>{{ state.email }}</b></p>
    <p class="q-mb-xl">Check your email (and your spam), then click on the verification link to continue</p>

    <a :href="`/verify-email?email=${state.email}`" class="text-accent text-bold" style="text-decoration: none">Resend Email</a>
  </q-card>
</div>
<q-form
  v-else
  @submit="signup"
  class="login-form"
  >
  <q-stepper
    flat
    id="signup-form-stepper"
    class="q-pa-none"
    v-model="step"
    ref="stepper"
    color="primary"
    animated
  >
    <q-step
      :name="1"
      title="Login Details"
      icon="login"
      :done="step > 1"
    >
      <q-input
        filled
        class="q-mb-sm q-pb-none"
        type="text"
        v-model="state.firstName"
        label="First Name *"
        bottom-slots
        :error="errors.firstName !== null"
        required
      >
        <template v-slot:error>
          {{ errors.firstName }}
        </template>
      </q-input>

      <q-input
        filled
        class="q-mb-sm q-pb-none"
        type="text"
        v-model="state.lastName"
        label="Last Name *"
        bottom-slots
        :error="errors.lastName !== null"
        required
      >
        <template v-slot:error>
          {{ errors.lastName }}
        </template>
      </q-input>

      <q-input
        filled
        class="q-mb-sm q-pb-none"
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
        class="q-mb-sm q-pb-none"
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

      <q-input
        filled
        class="q-mb-none q-pb-none"
        type="password"
        v-model="state.passwordconfirm"
        label="Confirm Password *"
        bottom-slots
        :error="errors.passwordconfirm !== null"
        required
      >
        <template v-slot:error>
          {{ errors.passwordconfirm }}
        </template>
      </q-input>
    </q-step>

    <q-step
      :name="2"
      title="Interests"
      icon="favorite"
      :done="step > 2"
    >
      <p class="text-bold">Select all interests that are applicable to you.</p>
      <div
        class="q-gutter-sm"
        v-for="(category, index) in categoriesState"
        :key="index"
        >
        <q-checkbox
          style="margin-left: 0px;"
          v-model="state.interests"
          :val="category.id"
          :label="category.title"
          />
      </div>
    </q-step>

    <template v-slot:navigation>
      <q-stepper-navigation>
        <q-btn unelevated class="q-py-xs q-px-sm" color="accent" v-if="step > 1" label="Create Account" type="submit" />
        <q-btn unelevated class="q-py-xs q-px-sm" color="accent" v-else @click="$refs.stepper.next()" :label="'Continue'" />
        <q-btn unelevated class="q-py-xs" v-if="step > 1" flat color="accent" @click="$refs.stepper.previous()" label="Back" />
      </q-stepper-navigation>
    </template>
  </q-stepper>
</q-form>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, Ref } from '@vue/composition-api'
import { useSignup } from '../../services/signup'
import { useCategories } from '../../services/categories'

export default defineComponent({
  name: 'AuthenticationSignupForm',
  setup () {
    const { completed, loading, state, signup, errors } = useSignup()
    const step: Ref<number> = ref(1)
    const { 
      state: categoriesState,
      getCategories
    } = useCategories()

    onBeforeMount(async () => {
      await getCategories()
    })

    return {
      categoriesState,
      completed,
      errors,
      loading,
      signup,
      state,
      step,
    }
  }
})
</script>

<style lang="scss">
#signup-form-stepper {
  .q-stepper__header--standard-labels .q-stepper__tab {
    min-height: 28px;
    margin-bottom: 20px;
  }
  .q-stepper__tab, .q-stepper__step-inner {
    padding: 0;
  }
  .q-stepper__nav {
    padding-top: 1.5em;
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }
}
</style>

<style scoped lang="scss">
.login-form {
  max-width: 360px;
  width: 100%;
}
</style>