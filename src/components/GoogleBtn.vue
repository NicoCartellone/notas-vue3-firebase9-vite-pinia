<template>

    <a-button type="danger" html-type="submit" :disabled="userStore.loadingUser" v-on:click="singInWithGoogle">
        <template #icon><GooglePlusOutlined /></template>
        Acceder con Google
    </a-button>

</template>

<script setup>
import { GooglePlusOutlined } from '@ant-design/icons-vue';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { auth } from '../firebaseConfig';
import { useUserStore } from '../stores/user'
import router from '../router'
import { message } from "ant-design-vue";

const userStore = useUserStore();


auth.languageCode = 'es';

const singInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((re) => {
        console.log('re', re)
        router.push('/notas')
        message.success(`Bienvenido ${re.user.displayName}`)
    })
    .catch((err) => {
        console.log(err)
    })
}

</script>
