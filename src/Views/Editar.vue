<template>
    <div>
        <h1>Ediatr</h1>
          <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Escriba la nota" v-model="nota">
            <button type="submit">Editar</button>
        </form>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useDatabaseStore } from '../stores/database'

const databaseStore = useDatabaseStore()

const route = useRoute()

const handleSubmit = () => {
    databaseStore.updateNota(route.params.id, nota.value)
}

const nota = ref('')

onMounted(async() => {
    nota.value = await databaseStore.leerNota(route.params.id)
})
</script>