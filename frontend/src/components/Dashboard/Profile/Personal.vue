<template>
<q-form
  @submit.prevent="onSubmit"
  >
  <div class="row q-gutter-sm">
    <div class="col">
      <h4 class="text-h5 text-bold q-mb-sm">My Details</h4>
    </div>
  </div>
  <div class="row q-gutter-sm">
    <div class="col">
      <q-input
        filled
        v-model="formUser.firstName"
        label="First Name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </div>
    <div class="col">
      <q-input
        filled
        v-model="formUser.lastName"
        label="Last Name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </div>
  </div>
  <div class="row q-gutter-sm">
    <div class="col">
      <q-input
        filled
        type="email"
        v-model="formUser.email"
        label="Email"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
    </div>
  </div>

  <div class="row q-gutter-sm">
    <div class="col">
      <h4 class="text-h5 text-bold q-mt-lg q-mb-sm">My Interests</h4>
    </div>
  </div>
  <div class="row q-gutter-none">
    <div
      class="column col-xs-6"
      v-for="(category) in categoriesState"
      :key="category.id"
      >
      <q-checkbox
        :val="category.id"
        style="margin-left: -10px"
        class="q-pl-none"
        v-model="formUser.interests"
        :label="category.title"
        />
    </div>
  </div>

  <div class="row q-gutter-sm q-mt-lg">
    <div class="col">
      <q-btn
        type="submit"
        :loading="submitting"
        color="accent"
        label="Save Profile"
        class="q-px-md q-py-xs"
        rounded
        unelevated
      >
        <template v-slot:loading>
          <q-spinner-tail />
        </template>
      </q-btn>
    </div>
  </div>
</q-form>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, Ref } from '@vue/composition-api'
import { AxiosError } from 'axios'

import { useUser } from '../../../services/user'
import { useCategories } from '../../../services/categories'

export default defineComponent({
  name: 'ComponentDashboardProfilePersonal',
  setup () {
    const submitting: Ref<boolean> = ref(false)
    const formUser: Record<string, string|number[]> = reactive({
      firstName: '',
      lastName:'',
      email: '',
      interests: [],
    })
    const { user, updateProfile } = useUser()
    const { 
      state: categoriesState,
      getCategories
    } = useCategories()

    onMounted(async () => {
      await getCategories()
      if (user.value && user.value.interests) {
        formUser.interests = user.value.interests.map(interest => interest.id)
      }
      if (user.value) {
        formUser.firstName = user.value.firstName || ''
        formUser.lastName = user.value.lastName || ''
        formUser.email = user.value.email || ''
      }
    })

    /**
     * On Submit
     */
    const onSubmit = async () => {
      submitting.value = true

      //  Update user
      try {
        await updateProfile(formUser as Record<string, string>)
      } catch (error) {
        const err: AxiosError = (error as AxiosError)
        alert(`An error occurred: ${err.message}`)
      }
      submitting.value = false
    }

    return {
      categoriesState,
      formUser,
      onSubmit,
      submitting,
      user
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
