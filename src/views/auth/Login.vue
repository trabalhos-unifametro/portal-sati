<script lang="ts">
import {defineComponent} from 'vue'
import Lock from 'vue-material-design-icons/Lock.vue'
import At from 'vue-material-design-icons/At.vue'
import {containsLowercase, containsNumbers, containsSpecialChars, containsUppercase, emailsIsNotValid} from "@/utils";
import { session } from "@/stores/session";
import {Notifications} from "@/stores/notifications";
import InputTemplate from "@/components/InputTemplate.vue";
import {Modals} from "@/stores/modal";
import InputSingle from "@/components/InputSingleTemplate.vue";
import {confirmCode, generateAndSendCodePerEmail, recoverPassword, signIn} from "@/services/authentication_service";
import type {RequestRecoverPassword} from "@/interfaces";

const not = Notifications()
const modal = Modals()
export default defineComponent({
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
      loadingBtns: false,
      email: '',
      newPassword: '',
      newPasswordVisible: false,
      confirmNewPassword: '',
      confirmNewPasswordVisible: false,
      requirements: {
        minimumCharacters: null,
        minimumUppercaseLetter: null,
        minimumLowercaseLetter: null,
        minimumSpecialCharacter: null,
        minimumNumber: null,
      },
      errors: {
        email: {
          err: false,
          message: ''
        },
        newPassword: {
          err: false,
          message: ''
        },
        confirmNewPassword: {
          err: false,
          message: ''
        },
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
      if (this.validateForm()) {
        await signIn({
          email: this.form.email,
          password: this.form.password
        }).then((res) => {
          if (res.data) {
            newSession.saveSession({
              id: res.data['id'],
              name: res.data['name'],
              role: res.data['role'],
              email: res.data['email'],
              cellphone: res.data['cellphone'],
              token_api: res.data['token'],
            })
            not.set({message: `Bem-vindo ${res.data['name']}!`, variant: 'success'})
            this.$router.push({ name: 'home' })
          } else {
            not.set({message: 'Ocorre algum erro, tente novamente', variant: 'danger'})
          }
        }).catch((err) => {
          console.log(err)
          not.set({message: 'Ocorre um erro, tente novamente', variant: 'danger'})
        })
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
    // Recover Password
    async generateAndSendCode() {
      this.recoverPassword.loadingBtns = true
      await generateAndSendCodePerEmail({ email: this.recoverPassword.email })
      .then((res) => {
        not.set({message: res.data, variant: 'success'})
        this.recoverPassword.loadingBtns = false
        this.recoverPassword.tabSelected = 1
        this.recoverPassword.title = 'Validar código'
        this.recoverPassword.btnCancel = 'Voltar'
        this.startTimeInsertCode()
      })
      .catch((err) => {
        this.recoverPassword.loadingBtns = false
        if (err.response) {
          not.set({message: err.response.data, variant: 'danger'})
        } else {
          not.set({message: 'Ocorreu um erro na transmissão dos dados.', variant: 'success'})
        }
      })
    },
    async confirmationCode() {
      this.recoverPassword.loadingBtns = true
      const c = this.recoverPassword.inputCode
      const code: string = `${c[0].value}${c[1].value}${c[2].value}${c[4].value}${c[5].value}${c[6].value}${c[7].value}`
      await confirmCode({ email: this.recoverPassword.email, code_recovery: code })
      .then((res) => {
        not.set({message: res.data, variant: 'success'})
        this.recoverPassword.loadingBtns = false
        this.recoverPassword.tabSelected = 2
        this.recoverPassword.title = 'Redefinir senha'
        this.recoverPassword.btnCancel = 'Cancelar'
        this.recoverPassword.btnConfirm = 'Finalizar'
      })
      .catch((err) => {
        this.recoverPassword.loadingBtns = false
        if (err.response) {
          not.set({message: err.response.data, variant: 'success'})
        } else {
          not.set({message: 'Ocorreu um erro na transmissão dos dados.', variant: 'success'})
        }
      })
    },
    closeModalRecoverPassword() {
      modal.hide('recover-password-hide')
      this.recoverPassword.email = ''
      this.recoverPassword.title = 'Recuperar senha'
      this.recoverPassword.btnCancel = 'Cancelar'
      this.recoverPassword.btnConfirm = 'Enviar'
      this.clearErrorsRequirements()
      this.clearErrorsNewPassword()
      this.clearTimeInsertCode()
      this.recoverPassword.inputCode = [
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: 'hifen' },
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: '' },
        { error: false, value: '' },
      ]
      this.recoverPassword.tabSelected = 0
    },
    backRecoverPasswordTabs() {
      switch (this.recoverPassword.tabSelected) {
        case 1:
          this.recoverPassword.tabSelected--
          this.recoverPassword.title = 'Recuperar senha'
          this.recoverPassword.btnCancel = 'Cancelar'
          this.recoverPassword.btnConfirm = 'Enviar'
          this.clearTimeInsertCode()
          this.recoverPassword.inputCode = [
            { error: false, value: '' },
            { error: false, value: '' },
            { error: false, value: '' },
            { error: false, value: 'hifen' },
            { error: false, value: '' },
            { error: false, value: '' },
            { error: false, value: '' },
            { error: false, value: '' },
          ]
          break;
        default:
          this.closeModalRecoverPassword()
      }
    },
    async nextTab1() {
      if (this.recoverPassword.email.length === 0) {
        this.recoverPassword.errors.email.err = true
        this.recoverPassword.errors.email.message = 'Informe seu email.'
        return
      } else if (emailsIsNotValid(this.recoverPassword.email)) {
        this.recoverPassword.errors.email.err = true
        this.recoverPassword.errors.email.message = 'Informe um email válido.'
        return
      }
      await this.generateAndSendCode()
    },
    async nextTab2() {
      let errors: number = 0
      for (let i = 0; i < this.recoverPassword.inputCode.length; i++) {
        if (this.recoverPassword.inputCode[i].value.trim().length === 0) {
          this.recoverPassword.inputCode[i].error = true
          errors++
        }
      }
      if (errors === 0) {
        await this.confirmationCode()
      } else {
        not.set({ message: 'Por favor, insira o código completo.', variant: 'danger'})
      }
    },
    async finishRecoverPassword() {
      let reqUnfulfilled: number = 0
      let passwordConfirmOk: boolean = true

      if (this.recoverPassword.requirements.minimumCharacters === null) {
        reqUnfulfilled++
        this.recoverPassword.requirements.minimumCharacters = false
      }
      if (this.recoverPassword.requirements.minimumUppercaseLetter === null) {
        reqUnfulfilled++
        this.recoverPassword.requirements.minimumUppercaseLetter = false
      }
      if (this.recoverPassword.requirements.minimumLowercaseLetter === null) {
        reqUnfulfilled++
        this.recoverPassword.requirements.minimumLowercaseLetter = false
      }
      if (this.recoverPassword.requirements.minimumSpecialCharacter === null) {
        reqUnfulfilled++
        this.recoverPassword.requirements.minimumSpecialCharacter = false
      }
      if (this.recoverPassword.requirements.minimumNumber === null) {
        reqUnfulfilled++
        this.recoverPassword.requirements.minimumNumber = false
      }

      if (this.recoverPassword.confirmNewPassword !== this.recoverPassword.newPassword || this.recoverPassword.confirmNewPassword.trim().length === 0) {
        passwordConfirmOk = false
        this.recoverPassword.errors.confirmNewPassword.err = true
        this.recoverPassword.errors.confirmNewPassword.message = 'Por favor, confirme a nova senha.'
      }
      if (reqUnfulfilled > 0) {
        this.recoverPassword.errors.newPassword.err = true
        this.recoverPassword.errors.newPassword.message = 'Por favor, insira uma nova senha que atenda aos requisitos de segurança.'
      }

      if (reqUnfulfilled === 0 && passwordConfirmOk) {
        const c: Array<any> = this.recoverPassword.inputCode
        const body: RequestRecoverPassword = {
          email: this.recoverPassword.email,
          new_password: this.recoverPassword.newPassword,
          confirm_new_password: this.recoverPassword.confirmNewPassword,
          code_recovery: `${c[0].value}${c[1].value}${c[2].value}${c[4].value}${c[5].value}${c[6].value}${c[7].value}`
        }
        recoverPassword(body)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      } else {
        console.log('awdawd')
      }
    },
    async recoverPasswordTabs() {
      switch(this.recoverPassword.tabSelected) {
        case 0:
          await this.nextTab1()
          break;
        case 1:
          await this.nextTab2()
          break;
        case 2:
          await this.finishRecoverPassword()
          break;
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
    codeExpired() {
      not.set({ message: 'Código expirado! Tente novamente.', variant: 'danger', duration: 15000})
      this.closeModalRecoverPassword()
    },
    startTimeInsertCode() {
      this.clearTimeInsertCode()
      this.recoverPassword.time.minutes = 4
      this.recoverPassword.time.seconds = 59
      this.recoverPassword.timer = setInterval(() => {
       if (this.recoverPassword.time.minutes === 0 && this.recoverPassword.time.seconds === 0) {
         this.codeExpired()
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
    },
    clearErrorsRequirements() {
      this.recoverPassword.requirements.minimumCharacters = null
      this.recoverPassword.requirements.minimumLowercaseLetter = null
      this.recoverPassword.requirements.minimumUppercaseLetter = null
      this.recoverPassword.requirements.minimumSpecialCharacter = null
      this.recoverPassword.requirements.minimumNumber = null
    },
    clearErrorsNewPassword() {
      this.recoverPassword.errors.newPassword.err = false
      this.recoverPassword.errors.newPassword.message = ''
      this.recoverPassword.errors.confirmNewPassword.err = false
      this.recoverPassword.errors.confirmNewPassword.message = ''
    },
    verifyRequirements(newPassword: string) {
      if (newPassword.length >= 8) {
        this.recoverPassword.requirements.minimumCharacters = true
      } else {
        this.recoverPassword.requirements.minimumCharacters = null
      }
      if (containsUppercase(newPassword)) {
        this.recoverPassword.requirements.minimumUppercaseLetter = true
      } else {
        this.recoverPassword.requirements.minimumUppercaseLetter = null
      }
      if (containsLowercase(newPassword)) {
        this.recoverPassword.requirements.minimumLowercaseLetter = true
      } else {
        this.recoverPassword.requirements.minimumLowercaseLetter = null
      }
      if (containsSpecialChars(newPassword)) {
        this.recoverPassword.requirements.minimumSpecialCharacter = true
      } else {
        this.recoverPassword.requirements.minimumSpecialCharacter = null
      }
      if (containsNumbers(newPassword)) {
        this.recoverPassword.requirements.minimumNumber = true
      } else {
        this.recoverPassword.requirements.minimumNumber = null
      }
    },
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
        this.codeExpired()
      }
    },
    'recoverPassword.newPassword': function(newPassword: string) {
      this.verifyRequirements(newPassword)
      if (newPassword.trim().length > 0) {
        this.recoverPassword.errors.newPassword.err = false
        this.recoverPassword.errors.newPassword.message = ''
      }
    },
    'recoverPassword.confirmNewPassword': function(confirmPassword: string) {
      if (confirmPassword.trim().length > 0) {
        this.recoverPassword.errors.confirmNewPassword.err = false
        this.recoverPassword.errors.confirmNewPassword.message = ''
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
          <input-template
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
          </input-template>
          <input-template
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
          </input-template>
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
                <button type="button" class="btn-close" id="recover-password-hide" @click="closeModalRecoverPassword()" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="d-flex justify-content-center align-items-center w-100 h-100">
                  <div class="first-tab-recover-password" :class="{ 'hidden': recoverPassword.tabSelected !== 0 }">
                    <span class="font-size-16px font-color-template-primary fw-normal">
                      Informe seu email no campo abaixo e será enviado um código para redefinir sua senha.
                    </span>
                    <input-template
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
                    </input-template>
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
                    <div class="font-size-16px font-color-template-primary fw-bold mb-4">
                      Falta pouco ! Agora informe sua nova senha dentro dos requisitos abaixo, confirme a nova senha e clique em finalizar.
                    </div>
                    <input-template
                        id="new-password"
                        placeholder="Informe sua nova senha"
                        classes="mt-4"
                        :errors="{ err: recoverPassword.errors.newPassword.err, message: recoverPassword.errors.newPassword.message }"
                        v-model="recoverPassword.newPassword"
                        :type="!recoverPassword.newPasswordVisible ? 'password' : 'text'"
                    >
                      <template #prefix-input>
                        <div class="badge-rounded-icon">
                          <lock :size="18" class="font-color-black-3 suffix-icon"/>
                        </div>
                      </template>
                      <template #suffix-input>
                        <i
                            class="font-size-20px font-color-black-3 suffix-icon"
                            :class="{ 'bi-eye-slash-fill': !recoverPassword.newPasswordVisible, 'bi-eye-fill': recoverPassword.newPasswordVisible }" @click="recoverPassword.newPasswordVisible = !recoverPassword.newPasswordVisible"
                        ></i>
                      </template>
                    </input-template>
                    <input-template
                        id="confirm-new-password"
                        placeholder="Confirme sua nova senha"
                        :errors="{ err: recoverPassword.errors.confirmNewPassword.err, message: recoverPassword.errors.confirmNewPassword.message }"
                        v-model="recoverPassword.confirmNewPassword"
                        :type="!recoverPassword.confirmNewPasswordVisible ? 'password' : 'text'"
                    >
                      <template #prefix-input>
                        <div class="badge-rounded-icon">
                          <lock :size="18" class="font-color-black-3 suffix-icon"/>
                        </div>
                      </template>
                      <template #suffix-input>
                        <i
                            class="font-size-20px font-color-black-3 suffix-icon"
                            :class="{ 'bi-eye-slash-fill': !recoverPassword.confirmNewPasswordVisible, 'bi-eye-fill': recoverPassword.confirmNewPasswordVisible }" @click="recoverPassword.confirmNewPasswordVisible = !recoverPassword.confirmNewPasswordVisible"
                        ></i>
                      </template>
                    </input-template>
                    <div class="font-size-12px font-color-template-primary">
                      <span :class="{ 'text-success': recoverPassword.requirements.minimumCharacters, 'text-danger': recoverPassword.requirements.minimumCharacters === false }">
                        <i class="bi-check-circle font-size-10px me-1" v-if="recoverPassword.requirements.minimumCharacters"></i>
                        <i class="bi-x-circle font-size-10px me-1" v-else-if="recoverPassword.requirements.minimumCharacters === false"></i>
                        <i class="bi-circle-fill font-size-8px me-1" v-else></i>
                        Mínimo 8 caracteres.
                      </span><br/>
                      <span :class="{ 'text-success': recoverPassword.requirements.minimumLowercaseLetter, 'text-danger': recoverPassword.requirements.minimumLowercaseLetter === false }">
                        <i class="bi-check-circle font-size-10px me-1" v-if="recoverPassword.requirements.minimumLowercaseLetter"></i>
                        <i class="bi-x-circle font-size-10px me-1" v-else-if="recoverPassword.requirements.minimumLowercaseLetter === false"></i>
                        <i class="bi-circle-fill font-size-8px me-1" v-else></i>
                        Precisa conter no mínimo 1 letra minúscula.
                      </span><br/>
                      <span :class="{ 'text-success': recoverPassword.requirements.minimumUppercaseLetter, 'text-danger': recoverPassword.requirements.minimumUppercaseLetter === false }">
                        <i class="bi-check-circle font-size-10px me-1" v-if="recoverPassword.requirements.minimumUppercaseLetter"></i>
                        <i class="bi-x-circle font-size-10px me-1" v-else-if="recoverPassword.requirements.minimumUppercaseLetter === false"></i>
                        <i class="bi-circle-fill font-size-8px me-1" v-else></i>
                        Precisa conter no mínimo 1 letra maiúscula.
                      </span><br/>
                      <span :class="{ 'text-success': recoverPassword.requirements.minimumSpecialCharacter, 'text-danger': recoverPassword.requirements.minimumSpecialCharacter === false }">
                        <i class="bi-check-circle font-size-10px me-1" v-if="recoverPassword.requirements.minimumSpecialCharacter"></i>
                        <i class="bi-x-circle font-size-10px me-1" v-else-if="recoverPassword.requirements.minimumSpecialCharacter === false"></i>
                        <i class="bi-circle-fill font-size-8px me-1" v-else></i>
                        Precisa conter no mínimo 1 caractere especial (@#$!+_*&$ ou outro).
                      </span><br/>
                      <span :class="{ 'text-success': recoverPassword.requirements.minimumNumber, 'text-danger': recoverPassword.requirements.minimumNumber === false }">
                        <i class="bi-check-circle font-size-10px me-1" v-if="recoverPassword.requirements.minimumNumber"></i>
                        <i class="bi-x-circle font-size-10px me-1" v-else-if="recoverPassword.requirements.minimumNumber === false"></i>
                        <i class="bi-circle-fill font-size-8px me-1" v-else></i>
                        Precisa conter no mínimo 1 número.
                      </span><br/>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer justify-content-center align-items-center">
                <button
                  type="button"
                  class="btn btn-outline-primary btn-min-w-170px font-size-18px"
                  @click="backRecoverPasswordTabs"
                  :disabled="recoverPassword.loadingBtns"
                >
                  <span v-if="recoverPassword.loadingBtns">
                    <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                    Aguarde...
                  </span>
                  <span v-else>
                    {{ recoverPassword.btnCancel }}
                  </span>
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-min-w-170px font-size-18px"
                  @click="recoverPasswordTabs"
                  :disabled="recoverPassword.loadingBtns"
                >
                  <span v-if="recoverPassword.loadingBtns">
                    <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
                    Aguarde...
                  </span>
                  <span v-else>
                    {{ recoverPassword.btnConfirm }}
                  </span>
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