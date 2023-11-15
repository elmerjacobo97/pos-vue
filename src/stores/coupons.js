import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useCartStore } from '@/stores/cart'

export const useCouponStore = defineStore('coupon', () => {
  const couponInput = ref('')
  const couponValidationMessage = ref('')
  const discountPercentage = ref(0)
  const discountAmount = ref(0)

  const cart = useCartStore()

  // CUPONES
  const VALID_COUPONS = [
    {
      name: '10DESCUENTO',
      discount: 0.1
    },
    {
      name: '15DESCUENTO',
      discount: 0.15
    },
    {
      name: '20DESCUENTO',
      discount: 0.2
    }
  ]

  watch(discountPercentage, () => {
    discountAmount.value = cart.total * discountPercentage.value.toFixed(2)
  })

  const applyCoupon = () => {
    if (!couponInput.value) return

    if (VALID_COUPONS.find((coupon) => coupon.name === couponInput.value)) {
      couponValidationMessage.value = 'Aplicando...'
      setTimeout(() => {
        discountPercentage.value = VALID_COUPONS.find(
          (coupon) => coupon.name === couponInput.value
        ).discount
        couponValidationMessage.value = '¡Descuento aplicado!'
      }, 3000)
    } else {
      couponValidationMessage.value = 'El cupón no existe, intentalo de nuevo'
    }
    setTimeout(() => {
      couponValidationMessage.value = ''
    }, 6000)
  }

  // Resetear cupón
  function $reset() {
    couponInput.value = ''
    couponValidationMessage.value = ''
    discountPercentage.value = 0
    discountAmount.value = 0
  }

  const isCouponValid = computed(() => discountPercentage.value > 0)

  return {
    couponInput,
    couponValidationMessage,
    applyCoupon,
    discountAmount,
    isCouponValid,
    $reset
  }
})
