<template>
  <a-layout>
    <a-layout-content style="padding: 0 50px">
      <div class="container">
        <a-row>
          <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 18, offset: 3 }"
            :lg="{ span: 12, offset: 6 }"
          >
            <a-form
              name="registerForm"
              autocomplete="off"
              layout="vertical"
              :model="formState"
              @finish="onFinish"
            >
              <a-form-item
                name="nombre"
                label="Ingrese nombre y apellido"
                :rules="[
                  {
                    required: true,
                    message: 'Ingrese un nombre y apellido valido ',
                    whitespace: true,
                  },
                ]"
              >
                <a-input v-model:value="formState.nombre"></a-input>
              </a-form-item>
              <a-form-item
                name="email"
                label="Ingrese email"
                :rules="[
                  {
                    required: true,
                    message: 'Ingrese email valido',
                    whitespace: true,
                    type: 'email',
                  },
                ]"
              >
                <a-input v-model:value="formState.email"></a-input>
              </a-form-item>
              <a-form-item
                name="password"
                label="Ingrese contraseña"
                :rules="[
                  {
                    required: true,
                    min: 6,
                    message: 'Ingrese contraseña con al menos 6 carácteres',
                    whitespace: true,
                  },
                ]"
              >
                <a-input-password
                  v-model:value="formState.password"
                ></a-input-password>
              </a-form-item>
              <a-form-item
                name="repassword"
                label="Repita contraseña"
                :rules="[
                  {
                    validator: validatePass,
                  },
                ]"
              >
                <a-input-password
                  v-model:value="formState.repassword"
                ></a-input-password>
              </a-form-item>
              <a-form-item>
                <a-button
                  type="primary"
                  html-type="submit"
                  :disabled="userStore.loadingUser"
                  :loading="userStore.loadingUser"
                >
                  Registrate
                </a-button>
              </a-form-item>
            </a-form>
            <GoogleBtn />
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import GoogleBtn from "../components/GoogleBtn.vue";
import { message } from "ant-design-vue";

const userStore = useUserStore();

const formState = reactive({
  nombre: "",
  email: "",
  password: "",
  repassword: "",
});


const validatePass = async (_rule, value) => {
  if (value === "") {
    return Promise.reject("Repita contraseña");
  }
  if (value !== formState.password) {
    return Promise.reject("No coninciden las contraseñas");
  }
  return Promise.resolve();
};

const onFinish = async () => {
  const error = await userStore.registerUser(formState.email, formState.password);
  if(!error){
    return message.success('Se ha registrado correctamente, inicie sesión')
  }

  switch(error){
    case 'auth/email-already-in-use':
      message.error('El email ya se encuentra en uso');
      break;
    default:
      message.error('Ocurrio un error en el servidor, intente mas tarde')
      break; 
  }
};
</script>

<style>
.container {
  background: #fff;
  padding: 24px;
  min-height: calc(100vh - 64px);
}
</style>
