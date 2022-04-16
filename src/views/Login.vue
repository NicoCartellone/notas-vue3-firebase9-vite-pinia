<template>
  <a-layout>
    <a-layout-content style="padding: 0 50px;" >
      <div class="container">
        <a-row>
          <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 18, offset: 3 }"
            :lg="{ span: 12, offset: 6 }"
          >
          <div >

            <a-form
              
              name="loginform"
              autocoplete="off"
              layout="vertical"
              :model="formState"
              @finish="onFinish"
            >
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
              <a-form-item>
                <a-button
                  type="primary"
                  html-Type="submit"
                  :disabled="userStore.loadingUser"
                  :loading="userStore.loadingUser"
                >
                  Iniciar Sesión
                </a-button>
              </a-form-item>
            </a-form>
                <GoogleBtn/>
          </div>
          </a-col>
        </a-row>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup>
import GoogleBtn from '../components/GoogleBtn.vue'
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import { message } from "ant-design-vue";



const userStore = useUserStore();

const formState = reactive({
  email: "",
  password: "",
});

const onFinish = async(values) => {
  console.log("Success", values);
  const error = await userStore.loginUser(formState.email, formState.password);
  if(!error){
    return message.success(`Bienvenido ${userStore.userData?.email}`)
  }

  switch(error){
    case 'auth/user-not-found':
      message.error('No existe ese correo');
      break;
    case 'auth/wrong-password':
      message.error('Contraseña incorrecta');
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
