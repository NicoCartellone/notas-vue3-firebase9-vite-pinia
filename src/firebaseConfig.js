import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyABci9cL23wxS2O1yJT173inuGTqBYvmxI",
    authDomain: "mis-notas-vue3-vite-pinia.firebaseapp.com",
    projectId: "mis-notas-vue3-vite-pinia",
    storageBucket: "mis-notas-vue3-vite-pinia.appspot.com",
    messagingSenderId: "273460635314",
    appId: "1:273460635314:web:0c41213f03ddc0cc7f8bab"
};

initializeApp(firebaseConfig);
const auth = getAuth()

export { auth };