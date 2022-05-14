<template>
    <a-button type="danger" html-type="submit" :disabled="userStore.loadingUser" v-on:click="singInWithGoogle">
        <template #icon><GooglePlusOutlined /></template>
        Acceder con Google
    </a-button>
</template>

<script setup>
import { GooglePlusOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '../stores/user'

const userStore = useUserStore();


const singInWithGoogle = async() => {
   await userStore.singInWithGoogle()
}
</script>
