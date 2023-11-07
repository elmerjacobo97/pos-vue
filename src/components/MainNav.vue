<script setup>
import NavLink from '@/components/NavLink.vue'
import LogoTech from '@/components/LogoTech.vue'
</script>

<template>
  <header class="px-10 py-5 bg-blue flex justify-between items-center absolute top-0 w-full z-10">
    <LogoTech />
    <nav>
      <NavLink to="admin">Administrar</NavLink>
    </nav>
  </header>
</template>
