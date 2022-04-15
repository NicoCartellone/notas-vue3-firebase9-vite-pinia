import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'

import Home from './Views/Home.vue'
import Editar from './Views/Editar.vue'
import Login from './Views/Login.vue'
import Register from './Views/Register.vue'
import Notas from './Views/Notas.vue'
import Tareas from './Views/Tareas.vue'
import Perfil from './Views/Perfil.vue'


const requireAuth = async (to, from, next) => {
    const userStore = useUserStore()
    userStore.loadingSession = true
    const user = await userStore.currentUser()
    if (user) {
        next()
    } else {
        next('/login')
    }
    userStore.loadingSession = false
}

const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/editar/:id', component: Editar, beforeEnter: requireAuth, name: 'editar' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/notas', component: Notas, beforeEnter: requireAuth, name: 'notas' },
    { path: '/tareas', component: Tareas, beforeEnter: requireAuth, name: 'tareas' },
    { path: '/perfil', component: Perfil, beforeEnter: requireAuth, name: 'perfil' },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router