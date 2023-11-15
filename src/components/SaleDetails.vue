<script setup>
import { formatCurrency } from '@/helpers'
import AmountToPay from '@/components/AmountToPay.vue'

defineProps({
  sale: {
    type: Object
  }
})
</script>

<template>
  <div class="space-y-6 py-6">
    <h2 class="text-xl font-bold text-cool-gray">Detalles de la Venta:</h2>
    <p class="text-cool-gray font-semibold">Productos Vendidos</p>

    <ul role="list" class="text-base font-medium">
      <li v-for="item in sale.items" :key="item.id" class="flex items-start space-x-4 py-4">
        <img
          :src="item?.image"
          alt="Imagen del producto"
          class="w-20 h-20 flex-none object-cover rounded-md"
        />
        <div class="flex-auto space-y-2">
          <h3 class="text-cool-gray font-semibold">{{ item?.name }}</h3>
          <p class="text-emerald font-bold">{{ formatCurrency(item?.price) }}</p>
          <p class="text-cool-gray">Cantidad: {{ item?.quantity }}</p>
        </div>
      </li>
    </ul>

    <div class="w-full bg-warm-gray rounded-lg shadow-sm p-4">
      <AmountToPay
        labelClass="text-md font-medium text-cool-gray"
        valueClass="text-md font-medium text-cool-gray"
      >
        <template #label> Subtotal </template>
        {{ formatCurrency(sale.subtotal) }}
      </AmountToPay>

      <AmountToPay
        labelClass="text-md font-medium text-cool-gray"
        valueClass="text-md font-medium text-cool-gray"
      >
        <template #label> Impuestos </template>
        {{ formatCurrency(sale.taxes) }}
      </AmountToPay>

      <AmountToPay
        v-if="sale.discount"
        labelClass="text-md font-medium text-cool-gray"
        valueClass="text-md font-medium text-cool-gray"
        containerClass="flex justify-between py-2 bg-mint-green"
      >
        <template #label> Descuento </template>
        {{ formatCurrency(sale.discount) }}
      </AmountToPay>

      <AmountToPay
        labelClass="text-lg font-bold text-emerald"
        valueClass="text-lg font-bold text-emerald"
      >
        <template #label> Total a Pagar </template>
        {{ formatCurrency(sale.total) }}
      </AmountToPay>
    </div>
  </div>
</template>
