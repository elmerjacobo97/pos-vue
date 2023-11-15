import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useCollection, useFirestore } from 'vuefire'
import { collection, query, where } from 'firebase/firestore'

export const useSalesStore = defineStore('sales', () => {
  const date = ref('')
  const db = useFirestore()

  const salesSource = computed(() => {
    if (date.value) {
      return query(collection(db, 'sales'), where('date', '==', date.value))
    }
  })

  const salesCollection = useCollection(salesSource)

  const isDateSelected = computed(() => {
    return date.value
  })

  const noSales = computed(() => {
    return !salesCollection.value.length && date.value
  })

  const totalSalesOfDay = computed(() => {
    return salesCollection.value.length
      ? salesCollection.value.reduce((total, sale) => total + sale.total, 0)
      : 0
  })

  return {
    date,
    isDateSelected,
    salesCollection,
    noSales,
    totalSalesOfDay
  }
})
