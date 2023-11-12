<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";
import InputTemplate from "@/components/InputTemplate.vue";
import {changePassword} from "@/services/authentication_service";
import type {ChangePassword} from "@/interfaces";
import {session} from "@/stores/session";
import {containsLowercase, containsNumbers, containsSpecialChars, containsUppercase, isFilled} from "@/utils";
import {Notifications} from "@/stores/notifications";

const not = Notifications()
const sessionStorage = session()

export default defineComponent({
  components: { Card, InputTemplate },
  data: (): any => ({
    user: sessionStorage.user,
    passwordVisible: false,
    passwordVisibleNew: false,
    passwordVisibleConfirm: false,
    requirements: {
      minimumCharacters: null,
      minimumUppercaseLetter: null,
      minimumLowercaseLetter: null,
      minimumSpecialCharacter: null,
      minimumNumber: null,
    },
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
    },
    loadingBtn: false
  }),
  methods: {
    clearFieldsAndErrors() {
      this.clearFormPassword()
      this.clearErrors()
      this.clearErrorsRequirements()
    },
    async updatePassword() {
      let reqUnfulfilled: number = 0
      let passwordConfirmOk: boolean = true

      if (!this.requirements.minimumCharacters) {
        reqUnfulfilled++
        this.requirements.minimumCharacters = false
      }
      if (!this.requirements.minimumUppercaseLetter) {
        reqUnfulfilled++
        this.requirements.minimumUppercaseLetter = false
      }
      if (!this.requirements.minimumLowercaseLetter) {
        reqUnfulfilled++
        this.requirements.minimumLowercaseLetter = false
      }
      if (!this.requirements.minimumSpecialCharacter) {
        reqUnfulfilled++
        this.requirements.minimumSpecialCharacter = false
      }
      if (!this.requirements.minimumNumber) {
        reqUnfulfilled++
        this.requirements.minimumNumber = false
      }

      if (this.form.passwordConfirmNew !== this.form.passwordNew || this.form.passwordConfirmNew.trim().length === 0) {
        passwordConfirmOk = false
        this.errors.passwordConfirmNew.error = true
        this.errors.passwordConfirmNew.message = 'Por favor, confirme a nova senha.'
      }
      if (reqUnfulfilled > 0) {
        this.errors.passwordNew.error = true
        this.errors.passwordNew.message = 'Por favor, insira uma nova senha que atenda aos requisitos de segurança.'
      }
      if (!isFilled(this.form.passwordCurrent)) {
        passwordConfirmOk = false
        this.errors.passwordCurrent.error = true
        this.errors.passwordCurrent.message = 'Por favor, insira a senha atual.'
      }

      if (reqUnfulfilled === 0 && passwordConfirmOk) {
        this.loadingBtn = true
        const user: ChangePassword = {
          id: this.user.id,
          current_password: this.form.passwordCurrent,
          new_password: this.form.passwordNew,
          confirm_new_password: this.form.passwordConfirmNew
        }
        await changePassword(user).
        then(response => {
          this.loadingBtn = false
          not.set({ message: response.data, variant: 'success' })
          this.clearFieldsAndErrors()
        }).
        catch(err => {
          this.loadingBtn = false
          if (err.response) {
            not.set({ message: err.response.data, variant: 'danger' })
          } else {
            not.set({ message: 'Ocorreu um erro ao atualizar a senha!', variant: 'danger' })
          }
        })
      }
    },
    clearErrorsRequirements() {
      this.requirements.minimumCharacters = null
      this.requirements.minimumLowercaseLetter = null
      this.requirements.minimumUppercaseLetter = null
      this.requirements.minimumSpecialCharacter = null
      this.requirements.minimumNumber = null
    },
    clearErrors() {
      this.errors.passwordNew.error = false
      this.errors.passwordNew.message = ''
      this.errors.passwordCurrent.error = false
      this.errors.passwordCurrent.message = ''
      this.errors.passwordConfirmNew.error = false
      this.errors.passwordConfirmNew.message = ''
    },
    clearFormPassword() {
      this.form.passwordCurrent = ''
      this.form.passwordNew = ''
      this.form.passwordConfirmNew = ''
    },
    verifyRequirements(newPassword: string) {
      if (newPassword.length >= 8) {
        this.requirements.minimumCharacters = true
      } else {
        this.requirements.minimumCharacters = null
      }
      if (containsUppercase(newPassword)) {
        this.requirements.minimumUppercaseLetter = true
      } else {
        this.requirements.minimumUppercaseLetter = null
      }
      if (containsLowercase(newPassword)) {
        this.requirements.minimumLowercaseLetter = true
      } else {
        this.requirements.minimumLowercaseLetter = null
      }
      if (containsSpecialChars(newPassword)) {
        this.requirements.minimumSpecialCharacter = true
      } else {
        this.requirements.minimumSpecialCharacter = null
      }
      if (containsNumbers(newPassword)) {
        this.requirements.minimumNumber = true
      } else {
        this.requirements.minimumNumber = null
      }
    },
  },
  watch: {
    'form.passwordCurrent': function(passwordCurrent: string) {
      if (passwordCurrent.trim().length > 0) {
        this.errors.passwordCurrent.error = false
        this.errors.passwordCurrent.message = ''
      }
    },
    'form.passwordNew': function(newPassword: string) {
      this.verifyRequirements(newPassword)
      if (newPassword.trim().length > 0) {
        this.errors.passwordNew.error = false
        this.errors.passwordNew.message = ''
      }
    },
    'form.passwordConfirmNew': function(confirmPassword: string) {
      if (confirmPassword.trim().length > 0) {
        this.errors.passwordConfirmNew.error = false
        this.errors.passwordConfirmNew.message = ''
      }
    }
  }
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
                <button class="btn btn-primary me-2 w-50"
                        type="button"
                        @click="updatePassword"
                        :disabled="loadingBtn"
                >
                  {{ loadingBtn ? 'Redefinindo senha...' : 'Redefinir senha' }}
                </button>
                <button class="btn btn-outline-primary w-50"
                        type="button"
                        :disabled="loadingBtn"
                        @click="clearFieldsAndErrors">
                  {{ loadingBtn ? 'Aguarde...' : 'Cancelar' }}
                </button>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="6" classes="ps-5 border-left-person d-flex flex-column justify-content-center align-items-center">
            <div class="font-size-18px list-unstyled">
              <div class="mb-4"><i class="bi-circle-fill font-size-10px me-2"></i>Informe a senha atual para poder atualizá-la.</div>
              <div class="mb-4"><i class="bi-circle-fill font-size-10px me-2"></i>Para atualizar a senha atual, é necessário criar uma nova senha forte, com isso, informe uma senha de acordo com os critérios abaixo:</div>
            </div>
            <div class="font-size-18px w-100 font-color-black-6">
              <span :class="{ 'text-success': requirements.minimumCharacters, 'text-danger': requirements.minimumCharacters === false }">
                <i class="bi-check-circle font-size-10px me-1" v-if="requirements.minimumCharacters"></i>
                <i class="bi-x-circle font-size-10px me-1" v-else-if="requirements.minimumCharacters === false"></i>
                <i class="bi-circle-fill font-size-10px me-1" v-else></i>
                Mínimo 8 caracteres.
              </span><br/>
              <span :class="{ 'text-success': requirements.minimumLowercaseLetter, 'text-danger': requirements.minimumLowercaseLetter === false }">
                <i class="bi-check-circle font-size-10px me-1" v-if="requirements.minimumLowercaseLetter"></i>
                <i class="bi-x-circle font-size-10px me-1" v-else-if="requirements.minimumLowercaseLetter === false"></i>
                <i class="bi-circle-fill font-size-10px me-1" v-else></i>
                Precisa conter no mínimo 1 letra minúscula.
              </span><br/>
              <span :class="{ 'text-success': requirements.minimumUppercaseLetter, 'text-danger': requirements.minimumUppercaseLetter === false }">
                <i class="bi-check-circle font-size-10px me-1" v-if="requirements.minimumUppercaseLetter"></i>
                <i class="bi-x-circle font-size-10px me-1" v-else-if="requirements.minimumUppercaseLetter === false"></i>
                <i class="bi-circle-fill font-size-10px me-1" v-else></i>
                Precisa conter no mínimo 1 letra maiúscula.
              </span><br/>
              <span :class="{ 'text-success': requirements.minimumSpecialCharacter, 'text-danger': requirements.minimumSpecialCharacter === false }">
                <i class="bi-check-circle font-size-10px me-1" v-if="requirements.minimumSpecialCharacter"></i>
                <i class="bi-x-circle font-size-10px me-1" v-else-if="requirements.minimumSpecialCharacter === false"></i>
                <i class="bi-circle-fill font-size-10px me-1" v-else></i>
                Precisa conter no mínimo 1 caractere especial ({{ `!@#$%^&*()_+\-=[\]{};':"|,.<>/?~` }}).
              </span><br/>
              <span :class="{ 'text-success': requirements.minimumNumber, 'text-danger': requirements.minimumNumber === false }">
                <i class="bi-check-circle font-size-10px me-1" v-if="requirements.minimumNumber"></i>
                <i class="bi-x-circle font-size-10px me-1" v-else-if="requirements.minimumNumber === false"></i>
                <i class="bi-circle-fill font-size-10px me-1" v-else></i>
                Precisa conter no mínimo 1 número.
              </span><br/>
            </div>
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