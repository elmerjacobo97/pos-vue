<script setup>
import { formatCurrency } from '@/helpers'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { useProductsStore } from '@/stores/products'
import { computed } from 'vue'

const props = defineProps({
  product: {
    type: Object
  }
})

const products = useProductsStore()

const isNotProductAvailable = computed(() => {
  return props.product.availability === 0
})
</script>

<template>
  <li
    :class="{ 'opacity-30': isNotProductAvailable }"
    class="relative flex items-center space-x-6 border border-warm-gray p-5 bg-bone-white shadow-lg rounded-lg"
  >
    <!-- Imagen con etiqueta 'Nuevo' absolutamente posicionada en su esquina superior derecha -->
    <div class="relative">
      <img
        :src="product.image"
        :alt="'Imagen del producto ' + product.name"
        class="w-28 h-28 rounded-md object-cover"
      />
      <span
        class="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 bg-amber text-bone-white text-xs font-bold rounded-bl-lg uppercase tracking-wider"
      >
        Nuevo
      </span>
    </div>

    <div class="space-y-2 flex-grow">
      <h3 class="font-bold text-cool-gray text-lg">
        {{ product.name }}
      </h3>
      <p class="text-emerald font-extrabold text-xl">{{ formatCurrency(product.price) }}</p>
      <p class="text-cool-gray">{{ product.availability }} disponibles</p>
    </div>

    <div class="flex items-center space-x-2">
      <RouterLink
        :to="{ name: 'edit-product', params: { id: product.id } }"
        class="p-2 text-blue hover:text-light-blue transition duration-300"
      >
        <PencilSquareIcon class="w-6 h-6" />
      </RouterLink>
      <button
        @click="products.deleteProduct(product.id)"
        type="button"
        class="p-2 text-red hover:text-light-red transition duration-300"
      >
        <TrashIcon class="w-6 h-6" />
      </button>
    </div>
  </li>
</template>
