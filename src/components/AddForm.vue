<script setup>
import { reactive } from "vue";
import { useDatabaseStore } from "../stores/database";
import { message } from "ant-design-vue";

const dataBaseStore = useDatabaseStore();

const formState = reactive({
  nota: "",
});

const onFinish = async (value) => {
  console.log("todo correcto" + value);
  const error = await dataBaseStore.addNota(formState.nota);
  if (!error){
    formState.nota = ""
    message.success("Nota agregada");
  }

  switch(error){
    default:
      message.error("Ocurrio un error en el servidor. Intente más tarde")
      break;
  }
};
</script>

<template>
  <a-form
    name="addform"
    autocomplete="off"
    layout="vertical"
    :model="formState"
    @finish="onFinish"
  >
    <a-form-item
      name="nota"
      label="Ingrese una nota"
      :rules="[
        {
          required: true,
          whitespace: true,
          min:10,
          max: 100,
          message: 'La nota debe contener al menos 10 caracteres'
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
      <a-button type="primary" html-type="submit" :loading="dataBaseStore.loading"> Agregar nota </a-button>
    </a-form-item>
  </a-form>
</template>
