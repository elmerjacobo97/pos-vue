<script setup>
import { RouterLink } from 'vue-router'
import NavLink from '@/components/NavLink.vue'
import LogoTech from '@/components/LogoTech.vue'
</script>

<template>
  <header class="px-10 py-5 bg-blue flex justify-between items-center absolute top-0 w-full z-10">
    <LogoTech />
    <nav>
      <RouterLink
        :to="{ name: 'products' }"
        class="text-bone-white mr-5 hover:text-yellow transition font-bold"
        >Productos</RouterLink
      >
      <RouterLink
        :to="{ name: 'sales' }"
        class="text-bone-white hover:text-yellow transition font-bold mr-5"
        >Ventas</RouterLink
      >
      <NavLink to="shop">Ir a tienda</NavLink>
    </nav>
  </header>
</template>
