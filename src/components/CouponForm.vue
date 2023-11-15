<script setup>
import { useCouponStore } from '@/stores/coupons'

const store = useCouponStore()
</script>

<template>
  <div class="flex justify-between gap-5 items-center mt-5">
    <input
      class="shadow appearance-none border border-cool-gray rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="coupon"
      type="text"
      v-model="store.couponInput"
      placeholder="¿Tienes un cupón?"
    />
    <button
      class="bg-blue hover:bg-light-blue text-bone-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-30 disabled:hover:bg-blue disabled:cursor-not-allowed"
      type="button"
      @click="store.applyCoupon()"
      :disabled="store.isCouponValid"
    >
      Aplicar
    </button>
  </div>

  <p class="text-cool-gray font-black text-sm mt-2 text-center">
    {{ store.couponValidationMessage }}
  </p>
</template>
