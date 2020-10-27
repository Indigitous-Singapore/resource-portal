<template>
<div id="header" class="row q-col-gutter-xl">
  <div class="column col-12 col-md-6">
    <h1 class="q-mb-md md-hide lg-hide xl-hide">{{ item.title }}</h1>
    <h3 class="text-grey-7 md-hide lg-hide xl-hide">{{ item.DescriptionShort }}</h3>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import config from '../../config/config'

export default defineComponent({
  name: 'ItemHeader',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, ctx) {
    return {
      config,
    }
  }
});
</script>

<style scoped lang="scss">
#header {
  padding-top: 2em;

  @media (max-width: 1023px) {
    padding-top:1em;
  }
}
h1{
  font-weight: 600;   
  line-height: 1.2;
}
</style>
