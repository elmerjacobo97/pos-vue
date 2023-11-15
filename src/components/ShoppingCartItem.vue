<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { formatCurrency } from '@/helpers'
import { useCartStore } from '@/stores/cart'

defineProps({
  item: {
    type: Object
  }
})

const cart = useCartStore()
</script>

<template>
  <li class="flex py-4 space-x-4">
    <img :src="item?.image" alt="Imagen del producto" class="w-24 h-24 object-cover rounded-lg" />
    <div class="flex-auto space-y-2">
      <h3 class="font-bold text-cool-gray text-lg">{{ item?.name }}</h3>
      <p class="text-emerald font-extrabold text-xl">{{ formatCurrency(item?.price) }}</p>
      <p class="text-cool-gray">{{ item?.availability }} disponible</p>

      <select
        @change="cart.updateQuantity(item.id, +$event.target.value)"
        :value="item.quantity"
        class="w-full p-2 rounded border border-warm-gray focus:outline-none focus:border-blue focus:ring-1 focus:ring-border-blue disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      >
        <option v-for="n in cart.checkProductAvailability(item)" :key="n" :value="n">
          {{ n }}
        </option>
      </select>
    </div>
    <div>
      <button
        @click="cart.removeItem(item.id)"
        class="p-2 text-red hover:text-light-red transition duration-300"
      >
        <TrashIcon class="h-8 w-8" />
      </button>
    </div>
  </li>
</template>
