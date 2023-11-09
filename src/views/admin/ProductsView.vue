<script setup>
import NavLink from '@/components/NavLink.vue'
import { useProductsStore } from '@/stores/products'
import ProductList from '@/components/ProductList.vue'

const products = useProductsStore()
</script>

<template>
  <NavLink to="new-product">Nuevo producto</NavLink>
  <h1 class="text-4xl font-extrabold text-blue my-5">Productos</h1>

  <p v-if="products.noResults" class="text-cool-gray font-black text-2xl">No hay resultados</p>

  <ul v-else role="list" class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 pb-5">
    <ProductList
      v-for="product in products.productsCollection"
      :key="product.id"
      :product="product"
    />
  </ul>
</template>
