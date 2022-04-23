<script setup>
import SideBar from '../components/SideBar.vue'
</script>

<template>
<a-row>
  <a-col :span="3.5">
    <SideBar/>
  </a-col>
  <a-col :span="20.5">
  
    <h1 class="texto">Perfil En proceso....</h1>
  </a-col>
</a-row>
    
</template>

<style>
.texto {
    display: flex;
    justify-content: flex-start;
}
</style>