<script setup>
import SideBar from "../components/SideBar.vue";
import AddForm from "../components/AddForm.vue";

import { useUserStore } from "../stores/user";
import { useDatabaseStore } from "../stores/database";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { async } from "@firebase/util";

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
  <a-row>
    <a-col :span="3.5">
      <SideBar />
    </a-col>
    <a-col
      :span="20.5"
      style="padding: 0 50px; display: block; margin-top: 1rem"
    >
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
    </a-col> </a-row
  >>
</template>

<style>
.card {
  width: 400px;
  border-color: gray;
}
</style>
