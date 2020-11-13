<template>
   <q-input
      debounce="500"
      filled
      placeholder="Search"
    >
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
</template>