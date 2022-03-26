<template>
    <div>
        <h1>Home</h1>
        <p>{{userStore.userData?.email}}</p>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Escriba la nota" v-model="nota">
            <button type="submit">Añadir</button>
        </form>

        <p v-if="databaseStore.loadingDoc">Cargando Notas...</p>
        <ul v-else>
            <li v-for="item of databaseStore.documents" :key="item.id">
            {{item.id}} - {{item.name}}
            <br>
            <button @click="databaseStore.deletNota(item.id)">Eliminar</button>
            <button @click="router.push(`/editar/${item.id}`)">Editar</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { useUserStore } from '../stores/user'
import { useDatabaseStore } from '../stores/database'
import {  ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const databaseStore = useDatabaseStore()

databaseStore.getNotas()

const nota = ref('')

const handleSubmit = () => {
    databaseStore.addNota(nota.value)
}
</script>