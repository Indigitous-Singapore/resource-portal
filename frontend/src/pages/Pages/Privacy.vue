<template>
<ComponentsPage
  :slug="slug"
  />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import ComponentsPage from '../../components/Pages/index.vue'

export default defineComponent({
  name: 'PagePrivacy',
  components: {
    ComponentsPage,
  },
  setup (props, ctx) {
    const slug = ctx.root.$route.path

    return {
      slug: String(slug).split('/')[1]
    }
  }
});
</script>
