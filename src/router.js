import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from './stores/user'

import Home from './Views/Home.vue'
import Editar from './Views/Editar.vue'
import Login from './Views/Login.vue'
import Register from './Views/Register.vue'

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
    { path: '/', component: Home, beforeEnter: requireAuth },
    { path: '/editar/:id', component: Editar, beforeEnter: requireAuth },
    { path: '/login', component: Login },
    { path: '/register', component: Register }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router