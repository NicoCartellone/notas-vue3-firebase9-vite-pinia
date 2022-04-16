<script setup>
import SideBar from "../components/SideBar.vue";
import AddForm from "../components/AddForm.vue";

import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";

const router = useRouter();
const userStore = useUserStore();
const databaseStore = useDatabaseStore();

databaseStore.getNotas();

const confirm = async(id) =>{
  const error = await databaseStore.deletNota(id)
  if(!error){
    return  message.success('Se eliminó con exito')
  } else{
    return message.error(error)
  }
  
 
}
const cancel = () =>{
  message.error("No se eliminó")
}
</script>

<template>
<a-layout>
  <a-layout-sider>
    <SideBar />
  </a-layout-sider>
  
  <a-layout-content class="conenet" style="padding: 0 50px;">
  <div class="container">
    <a-card size="small" title="Añadir Nota" class="card">
      <AddForm />
    </a-card>
    <div>
      <p v-if="databaseStore.loadingDoc">Cargando Notas...</p>

      <a-space
        direction="vertical"
        v-if="!databaseStore.loadingDoc"
        style="width: 100%"
      >
        <a-card
          v-for="item of databaseStore.documents"
          :key="item.id"
          :title="userStore.userData.email"
          class="card"
        >
          <template #extra>
            <a-space>
              <a-popconfirm
                title="¿Estás seguro que deseas eliminar la nota?"
                ok-text="Sí"
                cancel-text="No"
                @confirm="confirm(item.id)"
                @cancel="cancel"
              >
                <a-button 
                  danger
                  :loading="databaseStore.loading"
                >
                  Eliminar
                </a-button>
              </a-popconfirm>

              <a-button
                type="primary"
                @click="router.push(`/editar/${item.id}`)"
                >Editar</a-button>
            </a-space>
          </template>
          <p>{{ item.name }}</p>
        </a-card>
      </a-space>
    </div>
  </div>



  </a-layout-content>
  
</a-layout>
</template>

<style>
.card {
  width: 400px;
  border-color: gray;
  margin: auto;
}

.container {
  background: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}


</style>
