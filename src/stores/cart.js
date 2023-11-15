import { computed, ref, watchEffect } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { useCouponStore } from '@/stores/coupons'
import { useFirestore } from 'vuefire'
import { addDoc, collection, doc, runTransaction } from 'firebase/firestore'
import { getCurrentDate } from '@/helpers'

export const useCartStore = defineStore('cart', () => {
  // CONSTANTS
  const MAX_ITEMS = 5
  const TAX_RATE = 0.1

  const db = useFirestore()

  const items = ref([])
  const subtotal = ref(0)
  const taxes = ref(0)
  const total = ref(0)

  const coupon = useCouponStore()

  // Calcular el subtotal + impuestos + total
  // watch(
  //   items,
  //   () => {
  //     subtotal.value = items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
  //
  //     // Calcular impuestos
  //     taxes.value = subtotal.value * TAX_RATE
  //
  //     // Calcular el total
  //     total.value = subtotal.value + taxes.value
  //   },
  //   { deep: true }
  // )

  // watchEffect no necesita el dependencies.
  watchEffect(() => {
    subtotal.value = items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)

    // Calcular impuestos
    taxes.value = Number((subtotal.value * TAX_RATE).toFixed(2))

    // Calcular el total
    total.value = Number((subtotal.value + taxes.value - coupon.discountAmount).toFixed(2))
  })

  function addItem(item) {
    // Evitar registros duplicados
    const index = isItemInCart(item.id)

    if (index >= 0) {
      // Actualizar la cantidad
      if (isProductAvailable(item, index)) {
        return Swal.fire({
          title: 'Has alcanzado el límite de productos',
          icon: 'warning',
          confirmButtonText: 'Entendido'
        })
      }
      items.value[index].quantity += 1
    } else {
      items.value.push({
        ...item,
        quantity: 1,
        id: item.id
      })
    }
  }

  async function checkout() {
    try {
      await addDoc(collection(db, 'sales'), {
        items: items.value.map((item) => {
          const { availability, category, ...data } = item // Elimina el atributo availability y category
          return data
        }),
        subtotal: subtotal.value,
        taxes: taxes.value,
        discount: coupon.discountAmount,
        total: total.value,
        date: getCurrentDate()
      })

      // Sustraer la cantidad de lo disponible con transacciones en firebase
      for (const item of items.value) {
        const productRef = doc(db, 'products', item.id)
        await runTransaction(db, async (transaction) => {
          const currentProduct = await transaction.get(productRef)
          const availability = currentProduct.data().availability - item.quantity
          transaction.update(productRef, {
            availability
          })
        })
      }

      // Mostrar alerta de exito
      await Swal.fire({
        title: '¡Éxito!',
        text: 'La compra se ha realizado correctamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

      // Resetear carrito
      $reset()

      // Resetear cupón
      coupon.$reset()
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  // Reiniciar el carrito con la función $reset
  function $reset() {
    items.value = []
    subtotal.value = 0
    taxes.value = 0
    total.value = 0
  }

  const isItemInCart = (id) => items.value.findIndex((item) => item.id === id)

  const isProductAvailable = (item, index) => {
    return (
      items.value[index].quantity >= item.availability || items.value[index].quantity >= MAX_ITEMS
    )
  }

  function updateQuantity(id, quantity) {
    items.value = items.value.map((item) => (item.id === id ? { ...item, quantity } : item))
  }

  function removeItem(id) {
    items.value = items.value.filter((item) => item.id !== id)
  }

  const isEmpty = computed(() => {
    return items.value.length === 0
  })

  const checkProductAvailability = computed(() => {
    return (product) => (product.availability < MAX_ITEMS ? product.availability : MAX_ITEMS)
  })

  return {
    items,
    subtotal,
    taxes,
    total,
    isEmpty,
    checkProductAvailability,
    addItem,
    updateQuantity,
    removeItem,
    checkout
  }
})
