<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";
import InputTemplate from "@/components/InputTemplate.vue";

export default defineComponent({
  components: { Card, InputTemplate },
  data: () => ({
    passwordVisible: false,
    passwordVisibleNew: false,
    passwordVisibleConfirm: false,
    form: {
      passwordCurrent: '',
      passwordNew: '',
      passwordConfirmNew: '',
    },
    errors: {
      passwordCurrent: {
        error: false,
        message: ''
      },
      passwordNew: {
        error: false,
        message: ''
      },
      passwordConfirmNew: {
        error: false,
        message: ''
      },
    }
  })
})
</script>

<template>
  <div>
    <div class="title-page mb-4">Redefinir senha</div>
    <card classes="ps-5 pe-5 pt-4 pb-4">
      <template #content-without-body>
        <v-row>
          <v-col cols="6" classes="pe-5">
            <v-row classes="mb-4">
              <v-col cols="12" classes="mb-4">
                <input-template
                  id="password-current"
                  placeholder="*****************"
                  label="Senha atual"
                  :errors="{ err: errors.passwordCurrent.error, message: errors.passwordCurrent.message }"
                  v-model="form.passwordCurrent"
                  :type="!passwordVisible ? 'password' : 'text'"
                >
                  <template #suffix-input>
                    <i
                      class="font-size-20px font-color-black-3 suffix-icon"
                      :class="{ 'bi-eye-slash-fill': !passwordVisible, 'bi-eye-fill': passwordVisible }" @click="passwordVisible = !passwordVisible"
                    ></i>
                  </template>
                </input-template>
              </v-col>
              <v-col cols="12" classes="mb-4">
                <input-template
                  id="password-new"
                  placeholder="*****************"
                  label="Nova senha"
                  :errors="{ err: errors.passwordNew.error, message: errors.passwordNew.message }"
                  v-model="form.passwordNew"
                  :type="!passwordVisibleNew ? 'password' : 'text'"
                >
                  <template #suffix-input>
                    <i
                      class="font-size-20px font-color-black-3 suffix-icon"
                      :class="{ 'bi-eye-slash-fill': !passwordVisibleNew, 'bi-eye-fill': passwordVisibleNew }" @click="passwordVisibleNew = !passwordVisibleNew"
                    ></i>
                  </template>
                </input-template>
              </v-col>
              <v-col cols="12" classes="mb-4">
                <input-template
                    id="password-new-confirm"
                    placeholder="*****************"
                    label="Confirme a nova senha"
                    :errors="{ err: errors.passwordConfirmNew.error, message: errors.passwordConfirmNew.message }"
                    v-model="form.passwordConfirmNew"
                    :type="!passwordVisibleConfirm ? 'password' : 'text'"
                >
                  <template #suffix-input>
                    <i
                      class="font-size-20px font-color-black-3 suffix-icon"
                      :class="{ 'bi-eye-slash-fill': !passwordVisibleConfirm, 'bi-eye-fill': passwordVisibleConfirm }" @click="passwordVisibleConfirm = !passwordVisibleConfirm"
                    ></i>
                  </template>
                </input-template>
              </v-col>
              <v-col cols="12" classes="d-flex justify-content-center align-items-center">
                <button class="btn btn-primary me-2 w-50">
                  Redefinir senha
                </button>
                <button class="btn btn-outline-primary w-50">
                  Cancelar
                </button>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" classes="ps-5 border-left-person d-flex justify-content-start align-items-center">
            <ul class="font-size-20px">
              <li class="mb-4">Informe a senha atual para poder atualizá-la.</li>
              <li class="mb-4">Para atualizar a senha atual, é necessário criar uma nova senha forte, com isso, informe uma senha de acordo com os critérios abaixo:</li>
              <li class="mb-2 font-color-black-6">Mínimo 8 caracteres.</li>
              <li class="mb-2 font-color-black-6">Precisa conter no mínimo 1 letra minúscula.</li>
              <li class="mb-2 font-color-black-6">Precisa conter no mínimo 1 letra maiúscula.</li>
              <li class="mb-2 font-color-black-6">Precisa conter no mínimo 1 caractere especial (@#$!+_*&$ ou outro).</li>
              <li class="mb-2 font-color-black-6">Precisa conter no mínimo 1 número.</li>
            </ul>
          </v-col>
        </v-row>
      </template>
    </card>
  </div>
</template>

<style scoped>
  .border-left-person {
    border-left: 1px solid rgba(0,0,0,0.3);
  }
</style>