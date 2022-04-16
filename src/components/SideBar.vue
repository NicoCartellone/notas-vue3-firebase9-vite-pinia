<template>
  <a-layout style="min-height: calc(100vh - 64px)">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="avatar">
        <a-avatar :size="50">
          <template #icon><UserOutlined /></template>
        </a-avatar>
      </div>

      <div class="nombreUsuario">
        <h5 v-if="!collapsed" style="color: rgba(255, 255, 255, 0.5)">
          {{ userStore.userData?.email }}
        </h5>
      </div>

      <a-divider style="background-color: rgba(255, 255, 255, 0.5)" />
      <a-menu 
        theme="dark" 
        mode="inline"
        
        v-model:selectedKeys="selectedKeys" 
      >
        <a-menu-item key="perfil">
          <router-link to="/perfil">
            <user-outlined />
            <span>Perfil</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="notas">
          <router-link to="/notas">
            <file-outlined />
            <span>Notas</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="tareas">
          <router-link to="/tareas">
            <CheckOutlined />
            <span>Tareas</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
  </a-layout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useUserStore } from "../stores/user";
import {
  CheckOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons-vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const route = useRoute();
const selectedKeys = ref([]);
const collapsed = ref(false)

watch(
  () => route.name,
  () => {
    selectedKeys.value = [route.name];
  }
);
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.avatar {
  margin-top: 5px;
  display: flex;
  justify-content: center;
}
.nombreUsuario {
  text-align: center;
  margin-top: 10px;
}
.sidebar {
  background-color: red;
}
</style>
