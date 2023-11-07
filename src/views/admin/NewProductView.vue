<script setup>
import NavLink from '@/components/NavLink.vue'
</script>

<template>
  <div>
    <NavLink to="products">Volver</NavLink>
    <h1 class="text-4xl font-extrabold text-blue my-5">Nuevo producto</h1>

    <div class="flex justify-center bg-warm-gray shadow rounded">
      <div class="mt-10 p-5 w-full 2xl:w-24">
        <FormKit type="form" submit-label="Agregar producto">
          <FormKit
            type="text"
            name="name"
            label="Nombre"
            placeholder="Nombre del producto"
            validation="required"
            :validation-messages="{ required: 'El nombre del producto es obligatorio' }"
          />
          <FormKit
            type="file"
            name="image"
            label="Imagen"
            accept="image/*"
            validation="required"
            :validation-messages="{ required: 'La imagen es obligatoria' }"
          />
          <FormKit
            type="select"
            name="category"
            label="Categoría"
            :options="[1, 2, 3, 4]"
            validation="required"
            :validation-messages="{ required: 'La categoría es obligatoria' }"
          />
          <FormKit
            type="number"
            name="price"
            label="Precio"
            min="1"
            placeholder="0.00"
            validation="required"
            :validation-messages="{ required: 'El precio es obligatorio' }"
          />
          <FormKit
            type="number"
            name="availability"
            label="Stock"
            min="1"
            placeholder="0"
            validation="required"
            :validation-messages="{ required: 'El stock es obligatorio' }"
          />
        </FormKit>
      </div>
    </div>
  </div>
</template>
