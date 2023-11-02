<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";

export default defineComponent({
  components: { Card }
})
</script>

<template>
  <div>
    <div class="title-page mb-4">Meus dados</div>
    <card classes="ps-5 pe-5 pt-4 pb-4">
      <template #content-with-body>
        <v-row classes="mb-4">
          <v-col cols="12">
            <label for="full-name" class="form-label">Nome completo</label>
            <input type="text" class="form-control form-simple h-50px" id="full-name" readonly disabled>
          </v-col>
        </v-row>
        <v-row classes="mb-5">
          <v-col cols="6">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control form-simple h-50px" id="email">
          </v-col>
          <v-col cols="6">
            <label for="telephone" class="form-label">Telefone</label>
            <input type="tel" class="form-control form-simple h-50px" id="telephone">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" classes="d-flex justify-content-center align-items-center">
            <button class="btn btn-primary me-2 ps-5 pe-5">
              Salvar alterações
            </button>
            <button class="btn btn-outline-primary ps-5 pe-5">
              Reverter alterações
            </button>
          </v-col>
        </v-row>
      </template>
    </card>
  </div>
</template>

<style scoped>

</style>