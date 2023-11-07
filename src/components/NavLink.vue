<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: String
  }
})
</script>

<template>
  <RouterLink
    :to="{ name: to }"
    class="rounded active:bg-yellow/70 bg-yellow hover:bg-yellow/90 transition py-2 px-10 text-bone-white"
  >
    <slot />
  </RouterLink>
</template>
