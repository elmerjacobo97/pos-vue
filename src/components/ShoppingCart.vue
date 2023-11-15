<script setup>
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/stores/cart'
import ShoppingCartItem from '@/components/ShoppingCartItem.vue'
import AmountToPay from '@/components/AmountToPay.vue'
import { formatCurrency } from '@/helpers'
import CouponForm from '@/components/CouponForm.vue'
import { useCouponStore } from '@/stores/coupons'

const cart = useCartStore()
const coupon = useCouponStore()
</script>

<template>
  <div v-if="cart.isEmpty" class="flex flex-col items-center justify-center">
    <ShoppingCartIcon class="h-24 w-24 text-cool-gray" />
    <p class="text-cool-gray mt-2 text-center font-bold text-2xl">Tu carrito esta vacío</p>
  </div>

  <div v-else class="flex flex-col">
    <p class="text-cool-gray mt-2 text-center font-bold text-2xl">Resumen de venta</p>
    <ul role="list" class="mt-5 divide-y divide-cool-gray">
      <ShoppingCartItem v-for="item in cart.items" :key="item.id" :item="item" />
    </ul>

    <dl class="w-full divide-y divide-gray-200">
      <AmountToPay
        labelClass="text-md font-medium text-cool-gray"
        valueClass="text-md font-medium text-cool-gray"
        containerClass="flex justify-between p-3 bg-bone-white "
      >
        <template #label> Subtotal </template>
        {{ formatCurrency(cart.subtotal) }}
      </AmountToPay>

      <AmountToPay
        labelClass="text-md font-medium text-cool-gray"
        valueClass="text-md font-medium text-cool-gray"
        containerClass="flex justify-between p-3 bg-bone-white "
      >
        <template #label> Impuestos </template>
        {{ formatCurrency(cart.taxes) }}
      </AmountToPay>

      <AmountToPay
        v-if="coupon.isCouponValid"
        labelClass="text-md font-medium text-cool-gray"
        valueClass="text-md font-medium text-cool-gray"
        containerClass="flex justify-between p-3 bg-bone-white "
      >
        <template #label> Descuento </template>
        {{ formatCurrency(coupon.discountAmount) }}
      </AmountToPay>

      <AmountToPay
        labelClass="text-lg font-bold text-emerald"
        valueClass="text-lg font-bold text-emerald"
        containerClass="flex justify-between p-3 bg-bone-white"
      >
        <template #label> Total a Pagar </template>
        {{ formatCurrency(cart.total) }}
      </AmountToPay>
    </dl>
    <CouponForm />
    <button
      type="button"
      class="mt-10 bg-emerald hover:bg-mint-green text-bone-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-shadow"
      @click="cart.checkout()"
    >
      Confirmar Compra
    </button>
  </div>
</template>
