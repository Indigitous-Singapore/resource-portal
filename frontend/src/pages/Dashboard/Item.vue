<template>
  <q-page>
    <div
      v-if="item !== undefined"
      class="container"
      >
      
    </div>
    <div v-else>
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref, watch, onBeforeMount } from '@vue/composition-api'
import { useItems } from '../../services/items'
import { InterfaceItem } from 'src/interfaces'
import { defineComponent } from '@vue/composition-api'

import ItemHeader from '../../components/Item/Header.vue'
import ItemContent from '../../components/Item/Content.vue'

export default defineComponent({
  name: 'PageItemsSingle',
  components: {
    ItemHeader,
    ItemContent
  },
  setup (props, ctx) {
    const id = ctx.root.$route.params.itemId
    const loading = ref(true)
    const item: Ref<InterfaceItem | undefined> = ref()

    const { state, getItem, getItems } = useItems()

    const updateItem = () => {
      item.value = state.items.find(item => String(item.id) === ctx.root.$route.params.itemId)
    }

    onBeforeMount(async () => {
      await getItem(ctx.root.$route.params.itemId)
      updateItem()
    })

    watch(
      () => state.items,
      updateItem
    )

    return {
      item,
      loading
    }
  }
});
</script>