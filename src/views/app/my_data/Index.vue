<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";
import {session} from "@/stores/session";
import { vMaska } from "maska"
import type {UpdateUser, UserSession} from "@/interfaces";
import {updateUser} from "@/services/authentication_service";
import {emailsIsNotValid} from "@/utils";
import {Notifications} from "@/stores/notifications";
import InputTemplate from "@/components/InputTemplate.vue";
import {Loading} from "@/stores/loading";

export default defineComponent({
  components: { Card, InputTemplate },
  directives: { maska: vMaska },
  data: (): any => ({
    user: undefined,
    form: {
      email: sessionStorage.user?.email,
      cellphone: sessionStorage.user?.cellphone
    },
    errors: {
      email: {
        error: false,
        message: ''
      },
      cellphone: {
        error: false,
        message: ''
      },
    },
    loadingBtn: false,
    load: Loading()
  }),
  methods: {
    revertChanges() {
     this.form.cellphone = this.user?.cellphone
     this.form.email = this.user?.email
    },
    async updateData() {
      const not = Notifications()
      if (this.validateForm() && !this.loadingBtn) {
        this.loadingBtn = true
        let newUser: UserSession = this.user
        const user: UpdateUser = {
          id:        this.user.id,
          email:     this.form.email,
          cellphone: this.form.cellphone
        }
        await updateUser(user).
        then(response => {
          not.set({ message: response.data, variant: 'success' })
          newUser.cellphone = this.form.cellphone
          newUser.email = this.form.email
          sessionStorage.updateSession(newUser)
          setTimeout(() => this.loadingBtn = false, 200)
        }).
        catch(err => {
          console.info(err)
          not.set({ message: "Não foi possível atualizar os dados.", variant: 'danger' })
          setTimeout(() => this.loadingBtn = false, 200)
        })
      }
    },
    validateForm(): boolean {
      const not = Notifications()
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
      if (this.form.cellphone.length !== 16) {
        this.errors.cellphone.error = true
        this.errors.cellphone.message = 'Informe um número de celular no formato: (##) # ####-####.'
        countErrors++
      }

      if (this.form.email.replaceAll(" ", "") === this.user?.email.replaceAll(" ", "") && this.form.cellphone.replaceAll(" ", "") === this.user?.cellphone.replaceAll(" ", "")) {
        not.set({ message: 'Nenhuma alteração foi realizada', variant: 'warning' })
        countErrors++
      }

      return countErrors === 0
    },
    clearErrorEmail() {
      this.errors.email.error = false
      this.errors.email.message = ''
    },
    clearErrorCellphone() {
      this.errors.cellphone.error = false
      this.errors.cellphone.message = ''
    },
  },
  watch: {
    'form.email': function(email: string) {
      if (email.trim().length > 0) {
        this.clearErrorEmail()
      }
    },
    'form.cellphone': function(cellphone: string) {
      if (cellphone.trim().length > 0) {
        this.clearErrorCellphone()
      }
    },
  },
  mounted() {
    this.load.show()
    const sessionStorage = session()
    this.user = sessionStorage.user
    this.load.hide()
  }
})
</script>

<template>
  <div>
    <div class="title-page mb-4">Meus dados</div>
    <card classes="ps-5 pe-5 pt-4 pb-4">
      <template #content-without-body>
        <v-row classes="mb-4">
          <v-col cols="12">
            <label for="full-name" class="form-label">Nome completo</label>
            <input type="text" class="form-control form-simple h-50px" id="full-name" :value="user?.name" readonly disabled>
          </v-col>
        </v-row>
        <v-row classes="mb-5">
          <v-col cols="6">
            <input-template
              id="email"
              label="Email"
              :errors="{ err: errors.email.error, message: errors.email.message }"
              v-model="form.email"
            >
            </input-template>
          </v-col>
          <v-col cols="6">
            <input-template
              id="celular"
              label="Celular"
              mask="(##) # ####-####"
              type="tel"
              :errors="{ err: errors.cellphone.error, message: errors.cellphone.message }"
              v-model="form.cellphone"
            >
            </input-template>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" classes="d-flex justify-content-center align-items-center">
            <button type="button" class="btn btn-primary me-2 ps-5 pe-5" :disabled="loadingBtn" @click="updateData">
              {{ loadingBtn ? 'Salvando alterações...' : 'Salvar alterações' }}
            </button>
            <button type="button" class="btn btn-outline-primary ps-5 pe-5" :disabled="loadingBtn" @click="revertChanges">
              {{  loadingBtn ? 'Aguarde...' : 'Reverter alterações' }}
            </button>
          </v-col>
        </v-row>
      </template>
    </card>
  </div>
</template>

<style scoped>

</style>