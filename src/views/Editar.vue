<script setup>
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useDatabaseStore } from "../stores/database";
import SideBar from "../components/SideBar.vue";
import { message } from "ant-design-vue";

const databaseStore = useDatabaseStore();

const route = useRoute();

const formState = reactive({
  nota: "",
});

const onFinish = async (value) => {
  console.log("todo correcto" + value);
  const error = await databaseStore.updateNota(route.params.id, formState.nota);
  if (!error) {
    formState.nota = "";
    return message.success("Nota Editada");
  }

  switch (error) {
    default:
      message.error("Ocurrio un error en el servidor. Intente más tarde");
      break;
  }
};

onMounted(async () => {
  formState.nota = await databaseStore.leerNota(route.params.id);
});
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
      <a-card class="cardEditar" title="Editar nota">
        <a-form
          name="editform"
          autocomplete="off"
          layout="vertical"
          :model="formState"
          @finish="onFinish"
        >
          <a-form-item
            name="nota"
            
            :rules="[
              {
                required: true,
                whitespace: true,
                max: 100,
                min: 10,
                message: 'La nota debe contener al menos 10 caracteres',
              },
            ]"
          >
            <a-textarea
              v-model:value="formState.nota"
              show-count
              :maxlength="100"
              style="height: 100px"
            >
              <br />
              <br />
              <br />
            </a-textarea>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="databaseStore.loading"
            >
              Editar nota
            </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<style>
.cardEditar {
  width: 400px;
  border-color: gray;
}
</style>
