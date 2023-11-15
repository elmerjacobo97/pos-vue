<script setup>
import { formatCurrency } from '@/helpers'
import { PlusCircleIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart' // Asegúrate de importar el ícono correcto

defineProps({
  product: {
    type: Object
  }
})

const cart = useCartStore()
</script>

<template>
  <div
    class="rounded-lg bg-warm-gray shadow transition-shadow duration-300 ease-in-out hover:shadow-xl relative overflow-hidden"
  >
    <img
      :src="product.image"
      alt="Imagen del producto"
      class="w-full h-64 object-cover rounded-t-lg"
    />
    <div class="px-5 py-4 space-y-2">
      <h3 class="text-2xl font-semibold text-cool-gray tracking-tight leading-snug">
        {{ product.name }}
      </h3>
      <p class="text-sm text-gray-500">{{ product.availability }} disponibles</p>
      <p class="text-emerald font-bold text-3xl">{{ formatCurrency(product.price) }}</p>
    </div>
    <button
      type="button"
      class="absolute top-3 right-3 flex items-center justify-center w-12 h-12 bg-blue rounded-full text-bone-white hover:bg-light-blue active:bg-blue-800 transition duration-300 ease-linear shadow-md hover:shadow-lg active:scale-95"
      @click="cart.addItem(product)"
    >
      <PlusCircleIcon
        class="w-8 h-8 transition-transform duration-200 ease-in-out hover:scale-110"
      />
    </button>
  </div>
</template>
