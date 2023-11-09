import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'
import {
  collection,
  addDoc,
  query,
  limit,
  orderBy,
  where,
  updateDoc,
  deleteDoc,
  doc,
  getDoc
} from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import Swal from 'sweetalert2'

export const useProductsStore = defineStore('products', () => {
  const db = useFirestore()
  const storage = useFirebaseStorage()
  const selectedCategory = ref(1)

  const q = query(collection(db, 'products'), orderBy('availability')) // where('category', '==', 3)  limit(10)
  const productsCollection = useCollection(q)

  const categories = [
    { id: 1, name: 'Sudaderas' },
    { id: 2, name: 'Tenis' },
    { id: 3, name: 'Lentes' }
  ]

  async function createProduct(product) {
    await addDoc(collection(db, 'products'), product)
  }

  async function updateProduct(docRef, product) {
    const { image, url, ...values } = product

    // Comprobar si el user subió una nueva imagen
    if (image) {
      await updateDoc(docRef, {
        ...values,
        image: url.value
      })
    } else {
      await updateDoc(docRef, values)
    }
  }

  async function deleteProduct(id) {
    await Swal.fire({
      title: '¿Deseas eliminar este producto?',
      showDenyButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: `Cancelar`,
      icon: 'warning',
      confirmButtonColor: '#2563EB'
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const docRef = doc(db, 'products', id)
          const docSnap = await getDoc(docRef)
          const { image } = docSnap.data()

          const imageRef = storageRef(storage, image)
          await Promise.all([deleteDoc(docRef), deleteObject(imageRef)])
        }
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error')
      })
  }

  const categoryOptions = computed(() => {
    return [
      { label: 'Seleccione', value: '', attrs: { disabled: true } },
      ...categories.map((category) => ({ label: category.name, value: category.id }))
    ]
  })

  const noResults = computed(() => productsCollection.value.length === 0)

  const filteredProducts = computed(() => {
    return productsCollection.value.filter((product) => product.category === selectedCategory.value)
  })

  return {
    noResults,
    productsCollection,
    categoryOptions,
    filteredProducts,
    selectedCategory,
    categories,
    createProduct,
    updateProduct,
    deleteProduct
  }
})
