<template>
<q-dialog
  no-backdrop-dismiss
  no-esc-dismiss
  v-model="showOnboarding"
>
  <q-card
    id="onboarding-card"
    flat
    >
    <q-card-section
      id="header"
      class="bg-transparent row items-center q-py-xs"
      >
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section
      id="body"
      class="q-pa-none q-ma-none"
      >
      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLSdmZzvqKBoCoW38_qyVTvcGlwDIw9LlYclLrhw5MKc746F9-A//viewform"
        />
    </q-card-section>
  </q-card>
</q-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'OnboardingDialog',
  props: {
    showOnboarding: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="scss">
iframe {
  display: flex;
  width: 100%;
  border: none;
  height: 700px;

  @media (max-height: 800px) {
    height: 500px;
  }
}
#header {
  height: 40px;
  width: 100%;
  position: absolute;
  z-index: 1;
}
#onboarding-card {
  width: 900px;
  max-width: 90vw;
}
</style>
