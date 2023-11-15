<script setup>
defineProps({
  labelClass: {
    type: String,
    default: 'font-black text-cool-gray'
  },
  valueClass: {
    type: String,
    default: 'font-black text-rose'
  },
  containerClass: {
    type: String,
    default: 'flex justify-between p-1 border-blue'
  }
})
</script>

<template>
  <div :class="containerClass">
    <dt :class="labelClass">
      <slot name="label" />
    </dt>
    <dd :class="valueClass">
      <slot />
    </dd>
  </div>
</template>
