<script setup>
import NavLink from '@/components/NavLink.vue'
import LogoTech from '@/components/LogoTech.vue'
import { useProductsStore } from '@/stores/products'

const products = useProductsStore()
</script>

<template>
  <header
    class="px-10 py-5 bg-blue flex flex-col md:flex-row md:justify-between md:items-center gap-5 fixed top-0 w-full z-10"
  >
    <div>
      <LogoTech />
      <div class="flex gap-5 mt-2">
        <div
          class="flex items-center gap-2"
          v-for="category in products.categories"
          :key="category.id"
        >
          <input
            type="radio"
            name="category"
            :value="category.id"
            :checked="category.id === products.selectedCategory"
            @change="products.selectedCategory = +$event.target.value"
            class="h-4 w-4 rounded border-warm-gray text-yellow focus:ring-amber"
          />
          <label class="text-bone-white">{{ category.name }}</label>
        </div>
      </div>
    </div>
    <nav>
      <NavLink to="sales">Administrar</NavLink>
    </nav>
  </header>
</template>
