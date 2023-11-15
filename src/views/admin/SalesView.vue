<script setup>
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import { ref } from 'vue'
import { useSalesStore } from '@/stores/sales'
import SaleDetails from '@/components/SaleDetails.vue'
import { formatCurrency } from '../../helpers'

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM'
})

const sales = useSalesStore()
</script>

<template>
  <h1 class="text-4xl font-extrabold text-blue my-5">Resumen de ventas</h1>

  <div class="md:flex md:items-start gap-10">
    <div class="md:w-1/2 lg:w-1/3 flex justify-center">
      <VueTailwindDatepicker
        v-model="sales.date"
        :formatter="formatter"
        i18n="es-es"
        as-single
        no-input
      />
    </div>
    <div class="md:w-1/2 lg:w-2/3 space-y-5 lg:h-screen lg:overflow-y-scroll pb-32">
      <p v-if="sales.isDateSelected" class="text-cool-gray font-bold text-2xl text-center">
        Ventas de la fecha: <span class="text-emerald">{{ sales.date }}</span>
      </p>
      <p v-else class="text-cool-gray font-bold text-2xl text-center">
        Selecciona una fecha para ver las ventas
      </p>
      <div v-if="sales.salesCollection.length" class="space-y-5">
        <SaleDetails v-for="sale in sales.salesCollection" :key="sale.id" :sale="sale" />
        <p class="text-blue font-medium text-right">
          Total del día:
          <span class="font-black">{{ formatCurrency(sales.totalSalesOfDay) }}</span>
        </p>
      </div>
      <p v-else-if="sales.noSales" class="text-cool-gray font-bold text-center">
        No hay ventas para esta fecha
      </p>
    </div>
  </div>
</template>
