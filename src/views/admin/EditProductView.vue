<script setup>
import { watch, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doc } from 'firebase/firestore'
import { useFirestore, useDocument } from 'vuefire'
import { useProductsStore } from '@/stores/products'
import useImage from '@/composables/useImage'
import NavLink from '@/components/NavLink.vue'

const route = useRoute()
const router = useRouter()

const db = useFirestore()
const docRef = doc(db, 'products', route.params.id)
const product = useDocument(docRef)

const { onFileChange, url, isImageUploaded } = useImage()
const products = useProductsStore()
const formData = reactive({
  name: '',
  category: '',
  price: '',
  availability: '',
  image: ''
})

watch(product, (product) => {
  if (!product) {
    return router.push({ name: 'products' })
  }
  Object.assign(formData, product)
})

const submitHandler = async (data) => {
  try {
    await products.updateProduct(docRef, { ...data, url })
    await router.push({ name: 'products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <NavLink to="products">Volver</NavLink>
    <h1 class="text-4xl font-extrabold text-blue my-5">Editar producto</h1>

    <div class="flex bg-warm-gray shadow rounded">
      <div class="p-10 w-full xl:w-1/2 mx-auto">
        <FormKit
          type="form"
          submit-label="Guardar cambios"
          incomplete-message="No se pudo enviar, completa todos los campos"
          @submit="submitHandler"
          :value="formData"
        >
          <FormKit
            type="text"
            name="name"
            label="Nombre"
            placeholder="Nombre del producto"
            validation="required"
            :validation-messages="{ required: 'El nombre del producto es obligatorio' }"
            v-model.trim="formData.name"
          />
          <FormKit
            type="select"
            name="category"
            label="Categoría"
            :options="products.categoryOptions"
            validation="required"
            :validation-messages="{ required: 'La categoría es obligatoria' }"
            v-model.number="formData.category"
          />
          <FormKit
            type="number"
            name="price"
            label="Precio"
            min="1"
            placeholder="0.00"
            validation="required"
            :validation-messages="{ required: 'El precio es obligatorio' }"
            v-model.number="formData.price"
          />
          <FormKit
            type="number"
            name="availability"
            label="Stock"
            min="1"
            placeholder="0"
            validation="required"
            :validation-messages="{ required: 'El stock es obligatorio' }"
            v-model.number="formData.availability"
          />
          <div v-if="isImageUploaded">
            <p class="text-sm font-medium leading-6 text-gray-700">Imagen Nueva:</p>
            <img :src="url" alt="Nueva imagen Producto" class="w-52" />
          </div>

          <div v-else>
            <p class="text-sm font-medium leading-6 text-gray-700">Imagen Actual:</p>
            <img :src="formData.image" :alt="'Imagen de' + formData.image" class="w-52" />
          </div>

          <FormKit
            type="file"
            label="Cambiar Imagen"
            name="image"
            multiple="false"
            accept=".jpg"
            @change="onFileChange"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
