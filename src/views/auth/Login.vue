<script lang="ts">
import {defineComponent} from 'vue'
import Lock from 'vue-material-design-icons/Lock.vue'
import At from 'vue-material-design-icons/At.vue'
import { emailsIsNotValid } from "@/utils";
import { session } from "@/stores/session";
import { type UserSession } from "@/interfaces";
import {Notifications} from "@/stores/notifications";
import InputTemplate from "@/components/InputTemplate.vue";
import {Modals} from "@/stores/modal";
import InputSingle from "@/components/InputSingleTemplate.vue";

const not = Notifications()
const modal = Modals()
export default defineComponent({
  name: "Login",
  components: {
    Lock,
    At,
    InputTemplate,
    InputSingle
  },
  data: (): any => ({
    passwordVisible: false,
    form: {
      email: '',
      password: ''
    },
    errors: {
      email: {
        error: false,
        message: ''
      },
      password: {
        error: false,
        message: ''
      },
    },
    recoverPassword: {
      tabSelected: 0,
      title: 'Recuperar senha',
      btnCancel: 'Cancelar',
      btnConfirm: 'Enviar',
      email: '',
      errors: {
        email: {
          err: false,
          message: ''
        }
      },
      inputCode: [
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: 'hifen' },
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: '' },
      ],
      timer: undefined,
      time: {
        minutes: 0,
        seconds: 59
      }
    },
    notifications: [],
  }),
  methods: {
    async logIn() {
      const newSession = session()
      let user: UserSession = { id: 0, cellphone: '', email: '', name: '', role: '' }

      if (this.validateForm()) {
        if (this.form.email === 'faelleonan@gmail.com' && this.form.password === '123456') {
          user.id = 1
          user.cellphone = '(00) 0 0000-0000'
          user.email = this.form.email
          user.name = 'Usuário padrão'
          user.role = 'ADMIN'
          newSession.saveSession(user)
          not.set({id: 0, message: 'Bem-vindo Usuário!', variant: 'success', duration: 5000})
          this.$router.push({ name: 'home' })
        } else {
          not.set({id: 0, message: 'Email ou senha incorretos', variant: 'danger', duration: 5000})
        }
      }
    },
    validateForm(): boolean {
      let countErrors: number = 0

      if (this.form.email.length === 0) {
        this.errors.email.error = true
        this.errors.email.message = 'Informe seu email.'
        countErrors++
      } else if (emailsIsNotValid(this.form.email)) {
        this.errors.email.error = true
        this.errors.email.message = 'Informe um email válido.'
        countErrors++
      }
      if (this.form.password.length === 0) {
        this.errors.password.error = true
        this.errors.password.message = 'Informe sua senha.'
        countErrors++
      }

      return countErrors === 0
    },
    clearErrorEmail() {
      this.errors.email.error = false
      this.errors.email.message = ''
    },
    clearErrorPassword() {
      this.errors.password.error = false
      this.errors.password.message = ''
    },
    backRecoverPasswordTabs() {
      if (this.recoverPassword.tabSelected > 0) {
        this.recoverPassword.tabSelected--
      } else {
        modal.hide('recover-password')
      }
    },
    recoverPasswordTabs() {
      if (this.recoverPassword.tabSelected === 0) {
        if (this.recoverPassword.email.length === 0) {
          this.recoverPassword.errors.email.err = true
          this.recoverPassword.errors.email.message = 'Informe seu email.'
          return
        } else if (emailsIsNotValid(this.recoverPassword.email)) {
          this.recoverPassword.errors.email.err = true
          this.recoverPassword.errors.email.message = 'Informe um email válido.'
          return
        }
        this.recoverPassword.tabSelected = 1
        this.recoverPassword.title = 'Validar código'
        this.recoverPassword.btnCancel = 'Voltar'
        this.startTimeInsertCode()
      } else if (this.recoverPassword.tabSelected === 1) {
        if (this.recoverPassword.btnConfirm === 'Reenviar código') {
          this.recoverPassword.title = 'Validar código'
          this.recoverPassword.btnCancel = 'Voltar'
        } else {
          let errors: number = 0
          for (let i = 0; i < this.recoverPassword.inputCode.length; i++) {
            if (this.recoverPassword.inputCode[i].value.trim().length === 0) {
              this.recoverPassword.inputCode[i].error = true
              errors++
            }
          }
          if (errors === 0) {
            this.recoverPassword.tabSelected = 2
            this.recoverPassword.title = 'Redefinir senha'
            this.recoverPassword.btnCancel = 'Cancelar'
            this.recoverPassword.btnConfirm = 'Finalizar'
          } else {
            not.set({ id: 0, message: 'Por favor, insira o código completo.', variant: 'danger', duration: 5000})
          }
        }
      }
    },
    focusInput(id: string){
      const el = document.getElementById(id)
      if (el) {
        el.focus()
      }
    },
    clearTimeInsertCode() {
      if (this.recoverPassword.timer) {
        clearInterval(this.recoverPassword.timer)
      }
    },
    reSendCode() {
      not.set({ id: 0, message: 'Código expirado! Clique em reenviar código ou cancelar.', variant: 'danger', duration: 15000})
      this.recoverPassword.btnCancel = 'Voltar'
      this.recoverPassword.btnConfirm = 'Reenviar código'
      this.clearTimeInsertCode()
    },
    startTimeInsertCode() {
      this.clearTimeInsertCode()
      this.recoverPassword.time.minutes = 0
      this.recoverPassword.time.seconds = 59
      this.recoverPassword.timer = setInterval(() => {
       if (this.recoverPassword.time.minutes === 0 && this.recoverPassword.time.seconds === 0) {
         this.reSendCode()
         return
       } else {
         if (this.recoverPassword.time.seconds === 0) {
           this.recoverPassword.time.minutes--
           this.recoverPassword.time.seconds = 59
         } else {
           this.recoverPassword.time.seconds--
         }
       }
      }, 1000)
    },
    inputKeyUpCode(e: KeyboardEvent, index: number, el: any) {
      if (index > 0) {
        if ((e.key === 'Backspace' || e.key === 'Delete') && el.value.trim().length === 0) {
          this.focusInput(`input-code-id-${index-1}`)
          return
        }

        if ((index + 1) <= (this.recoverPassword.inputCode.length - 1) && el.value.trim().length === 1) {
          if (index >= 3) {
            this.recoverPassword.inputCode[index + 1].error = false
          } else {
            this.recoverPassword.inputCode[index].error = false
          }
          this.focusInput(`input-code-id-${index+1}`)
        }
      } else {
        if (e.key !== 'Backspace' && e.key !== 'Delete' && el.value.trim().length === 1) {
          this.recoverPassword.inputCode[index].error = false
          this.focusInput(`input-code-id-${index+1}`)
        }
      }
    }
  },
  beforeUnmount() {
    this.clearTimeInsertCode()
  },
  watch: {
    'form.email': function(email: string) {
      if (email.trim().length > 0) {
        this.clearErrorEmail()
      }
    },
    'form.password': function(password: string) {
      if (password.trim().length > 0) {
        this.clearErrorPassword()
      }
    },
    'recoverPassword.email': function(email: string) {
      if (email.trim().length > 0) {
        this.recoverPassword.errors.email.err = false
        this.recoverPassword.errors.email.message = ''
      }
    },
    'recoverPassword.time.seconds': function(seconds: number) {
      if (seconds === 0 && this.recoverPassword.time.minutes === 0 && this.recoverPassword.timer !== undefined) {
        this.reSendCode()
      }
    }
  }
})
</script>

<template>
<!--  <img src="/src/assets/images/sati-logo.png" class="position-absolute logo-sate" alt="S.A.T.I"/>-->
  <div class="d-flex justify-content-center align-items-center w-100 h-100 background-login">
    <div class="card card-template w-400px">
      <div class="card-body">
        <div class="w-100 d-flex justify-content-center align-items-center">
          <img src="/src/assets/images/logo.svg" alt="Logo Hospital Medical Care"/>
        </div>
        <div class="mt-3 mb-4 font-color-template-primary font-size-15px">
          <b>Bem-vindo!</b> Informe suas credenciais para
          acessar a dashboard.
        </div>
        <form @submit.prevent="logIn">
          <InputTemplate
            id="email"
            placeholder="Email"
            :errors="{ err: errors.email.error, message: errors.email.message}"
            v-model="form.email"
            type="email"
          >
            <template #prefix-input>
              <div class="badge-rounded-icon">
                <i class="bi-person-fill font-size-18px font-color-black-3 suffix-icon"></i>
              </div>
            </template>
          </InputTemplate>
          <InputTemplate
            id="password"
            placeholder="Senha"
            :errors="{ err: errors.password.error, message: errors.password.message }"
            v-model="form.password"
            :type="!passwordVisible ? 'password' : 'text'"
          >
            <template #prefix-input>
              <div class="badge-rounded-icon">
                <lock :size="18" class="font-color-black-3 suffix-icon"/>
              </div>
            </template>
            <template #suffix-input>
              <i
                  class="font-size-20px font-color-black-3 suffix-icon"
                  :class="{ 'bi-eye-slash-fill': !passwordVisible, 'bi-eye-fill': passwordVisible }" @click="passwordVisible = !passwordVisible"
              ></i>
            </template>
          </InputTemplate>
          <div class="d-flex w-100 justify-content-end align-items-center">
            <a
              class="font-color-template-primary font-size-15px link-template-1"
              data-bs-toggle="modal" data-bs-target="#recover-password"
            >
              Esqueceu a senha ?
            </a>
          </div>
          <button type="submit" class="btn btn-primary font-size-20px w-100 mb-4 mt-4">Entrar</button>
        </form>
        <!-- Modal Recover Password -->
        <div class="modal fade" id="recover-password" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="recover-password" aria-hidden="true">
          <div class="modal-dialog min-w-modal-650px mt-modal-195px">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="recover-password-label">{{ recoverPassword.title }}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="d-flex justify-content-center align-items-center w-100 h-100">
                  <div class="first-tab-recover-password" :class="{ 'hidden': recoverPassword.tabSelected !== 0 }">
                    <span class="font-size-16px font-color-template-primary fw-normal">
                      Informe seu email no campo abaixo e será enviado um código para redefinir sua senha.
                    </span>
                    <InputTemplate
                      id="email-recover"
                      placeholder="Email"
                      class="mt-3"
                      :errors="{ err: recoverPassword.errors.email.err, message: recoverPassword.errors.email.message}"
                      v-model="recoverPassword.email"
                      type="email"
                    >
                      <template #prefix-input>
                        <div class="badge-rounded-icon">
                          <At :size="18" class="font-color-black-3 suffix-icon"></At>
                        </div>
                      </template>
                    </InputTemplate>
                  </div>
                  <div class="second-tab-recover-password" :class="{ 'hidden': recoverPassword.tabSelected !== 1 }">
                    <span class="font-size-16px font-color-template-primary fw-normal">
                      Informe abaixo o código de segurança enviado ao email informado anteriormente.
                    </span>
                    <div class="d-flex justify-content-evenly align-items-center w-100 mt-2 mb-2">
                      <input-single
                        v-for="(input, i) in recoverPassword.inputCode"
                        :key="`input-code-${i <= 2 ? i : (i - 1)}`"
                        :id="`input-code-id-${i <= 2 ? i : (i - 1)}`"
                        :error="input.error"
                        :is-separator="i === 3"
                        v-model="input.value"
                        @key-up="inputKeyUpCode($event, (i <= 2 ? i : (i - 1)), input)"
                      />
                    </div>
                    <span class="font-size-16px font-color-template-primary fw-normal">
                      <b>Importante:</b> O código irá expirar em <b>{{ recoverPassword.time.minutes }} min {{ recoverPassword.time.seconds }}s</b>.
                    </span>
                  </div>
                  <div class="third-tab-recover-password" :class="{ 'hidden': recoverPassword.tabSelected !== 2 }">
                    teste 3
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-center align-items-center">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-min-w-170px font-size-18px"
                  @click="backRecoverPasswordTabs"
                >
                  {{ recoverPassword.btnCancel }}
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-min-w-170px font-size-18px"
                  @click="recoverPasswordTabs"
                >
                  {{ recoverPassword.btnConfirm }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <span class="position-absolute font-size-15px text-white bottom-20px">
      Copyright © 2023 Hospital Medical Care
    </span>
  </div>
</template>

<style lang="scss" scoped>
  @import url('/src/assets/stylesheets/login.scss');
</style>