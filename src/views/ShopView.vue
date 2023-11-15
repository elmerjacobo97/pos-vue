<script setup>
import MainNav from '@/components/MainNav.vue'
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import ProductCard from '@/components/ProductCard.vue'
import ShoppingCart from '@/components/ShoppingCart.vue'

const products = useProductsStore()
const { filteredProducts, noResults } = storeToRefs(products) // Evitar romper la reactividad
</script>

<template>
  <MainNav />

  <main class="pt-16 lg:flex lg:h-screen lg:overflow-hidden">
    <div class="lg:w-2/3 lg:h-screen lg:overflow-y-scroll py-28 md:py-20 px-10">
      <p v-if="noResults" class="text-cool-gray font-black text-4xl text-center my-5">
        No hay productos disponibles
      </p>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </div>
    </div>
    <aside class="lg:w-1/3 lg:h-screen lg:overflow-y-scroll py-28 md:py-20 px-10">
      <ShoppingCart />
    </aside>
  </main>
</template>
