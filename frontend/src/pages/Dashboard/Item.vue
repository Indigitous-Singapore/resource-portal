<template>
  <q-page
      v-if="item !== undefined"
      >
    <div
      class="container"
      >
      <ItemHeader :item="item" />
      <ItemContent :item="item" />
    </div>
  </q-page>
  <q-page
    v-else
    class="flex items-center"
    >
    <div
      class="flex full-width justify-center align-center"
      >
      <loading />
    </div>
  </q-page>
</template>

<script lang="ts">
import { ref, Ref, watch, onBeforeMount } from '@vue/composition-api'
import { InterfaceItem } from 'src/interfaces'
import { defineComponent } from '@vue/composition-api'

import ItemHeader from '../../components/Item/Header.vue'
import ItemContent from '../../components/Item/Content.vue'
import Loading from '../../components/Common/Loading.vue'

import { useItems } from '../../services/items'
import { useCollections } from '../../services/collections'

export default defineComponent({
  name: 'PageItemsSingle',
  components: {
    ItemHeader,
    ItemContent,
    Loading,
  },
  setup (props, ctx) {
    const id = ctx.root.$route.params.itemId
    const loading = ref(true)
    const item: Ref<InterfaceItem | undefined> = ref()

    const { state, getItem } = useItems()
    const { getCollections } = useCollections()

    const updateItem = () => {
      item.value = state.items.find(item => String(item.id) === id)
    }

    onBeforeMount(async () => {
      await getCollections()
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