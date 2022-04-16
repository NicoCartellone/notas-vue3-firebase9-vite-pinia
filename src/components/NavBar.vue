<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../stores/user";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const selectedKeys = ref([]);

watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name];
  }
);
</script>

<template>
  <a-layout>
    <a-layout-header v-if="!userStore.loadingSession">
      <a-row>
        <a-col :span="8" class="logoynombre">
          <img src="../assets/tareas.png" width="30" />
          <img src="../assets/logonotas.png" width="100" />
        </a-col>

        <a-col :span="8" :offset="8" style="justify-content: center;">
          <a-menu
            theme="dark"
            mode="horizontal"
            :style="{ lineHeight: '64px'}"
            v-model:selectedKeys="selectedKeys"
          >
            <a-menu-item key="home" v-if="!userStore.userData">
              <router-link to="/">Inicio</router-link>
            </a-menu-item>
            <a-menu-item key="login" v-if="!userStore.userData">
              <router-link to="/login">Iniciar Sesión</router-link>
            </a-menu-item>
            <a-menu-item key="register" v-if="!userStore.userData">
              <router-link to="/register">Registrate</router-link>
            </a-menu-item>
            <a-menu-item
              key="logout"
              @click="userStore.logOutUser"
              v-if="userStore.userData"
            >
              Cerrar Sesión
            </a-menu-item>
          </a-menu>
        </a-col>
      </a-row>
    </a-layout-header>
  </a-layout>
</template>

<style>
.logoynombre {
  right: 20px;
}
</style>
