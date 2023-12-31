<script setup>
import NavLink from '@/components/NavLink.vue'
import useImage from '@/composables/useImage'
import { useProductsStore } from '@/stores/products'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const { onFileChange, url, isImageUploaded } = useImage()

const router = useRouter()
const products = useProductsStore()

const formData = reactive({
  name: '',
  image: '',
  price: '',
  category: '',
  availability: ''
})

const submitHandler = async (data) => {
  const { image, ...values } = data

  try {
    await products.createProduct({
      ...values,
      image: url.value
    })
    await router.push({ name: 'products' })
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div>
    <NavLink to="products">Volver</NavLink>
    <h1 class="text-4xl font-extrabold text-blue my-5">Nuevo producto</h1>

    <div class="flex bg-warm-gray shadow rounded">
      <div class="p-10 w-full xl:w-1/2 mx-auto">
        <FormKit
          type="form"
          submit-label="Agregar producto"
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
            type="file"
            name="image"
            label="Imagen"
            accept="image/*"
            validation="required"
            :validation-messages="{ required: 'La imagen es obligatoria' }"
            @change="onFileChange"
            v-model="formData.image"
          />
          <div v-if="isImageUploaded">
            <p class="text-sm font-medium leading-6 text-gray-700">Imagen producto:</p>
            <img :src="url" class="w-32" alt="Imagen del producto" />
          </div>
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
        </FormKit>
      </div>
    </div>
  </div>
</template>
