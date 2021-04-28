<template>
  <div class="fullscreen text-center q-pa-md flex flex-center">
    <div>
      <div class="text-h1 q-mb-lg">
        404
      </div>

      <div class="text-h3 text-grey-8 q-mb-lg">
        Oops. Nothing here...
      </div>

      <q-btn
        size="lg"
        class="q-mt-lg q-px-lg"
        color="accent"
        rounded
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Error404'
});
</script>
