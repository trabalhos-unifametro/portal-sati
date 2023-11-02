<script lang="ts">
import {useRoute} from "vue-router";
import {defineComponent} from "vue";
import Card from "@/components/Card.vue";
import InputTemplate from "@/components/InputTemplate.vue";
import DataTable from "@/components/DataTable.vue";
import Pagination from "@/components/Pagination.vue";

export default defineComponent({
  components: {InputTemplate, Card, DataTable, Pagination},
  data: () => ({
    route: useRoute(),
    filters: {
      patient: '',
      statusOptions: ['Dentro do período', 'Fora do período'],
      statusPatient: '',
      sortPatientOptions: ['Crescente', 'Decrescente'],
      sortPatient: '',
    },
    headers: [
      { label: 'Cód. Internação', key: 'hospitalization_code' },
      { label: 'Nome', key: 'name' },
      { label: 'Tempo de internação geral', key: 'expected_hospitalization_time' },
      { label: 'Tempo de internação atual', key: 'current_hospitalization_time' },
      { label: 'Status', key: 'status' },
      { label: 'Prontuário', key: 'medical_record' },
      { label: 'Detalhes', key: 'details' },
    ],
    items: [
      { id: 1, hospitalization_code: 'TESTE 1', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 1, status: 'Dentro do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 2, hospitalization_code: 'TESTE 2', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 2, status: 'Fora do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 3, hospitalization_code: 'TESTE 3', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 1, status: 'Dentro do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 4, hospitalization_code: 'TESTE 4', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 2, status: 'Fora do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 5, hospitalization_code: 'TESTE 5', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 1, status: 'Dentro do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 6, hospitalization_code: 'TESTE 6', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 2, status: 'Fora do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 7, hospitalization_code: 'TESTE 7', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 1, status: 'Dentro do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 8, hospitalization_code: 'TESTE 8', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 2, status: 'Fora do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 9, hospitalization_code: 'TESTE 9', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 1, status: 'Dentro do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
      { id: 10, hospitalization_code: 'TESTE 10', name: 'TESTE 1', expected_hospitalization_time: 'TESTE 1', current_hospitalization_time: 'TESTE 1', status_id: 2, status: 'Fora do período', medical_record: 'TESTE 1', _details: false, more_details: { mother_name: 'TESTE', cpf: '000.000.000-00', gender: 'M', unit: 'Unidade', address: { street: 'Rua completo teste', number: 0, neighborhood: 'Bairro completo teste', city: 'Cidade', state: 'estado' } } },
    ],
    currentPage: 1,
    perPage: 10
  }),
  methods: {
    onPageChange(page: number) {
      this.currentPage = page
    }
  }
});

</script>

<template>
  <div>
    <div class="d-flex justify-content-start align-items-center mb-4">
      <router-link :to="{ name: 'units' }" class="title-page">Unidades</router-link>
      <i class="bi-chevron-right fw-bold ms-2 me-2 font-color-black-10"></i>
      <div class="title-page">Unidade {{ route.params?.id }}</div>
    </div>
    <v-row>
      <v-col cols="4">
        <card title="4" subtitle="Pacientes nessa unidade" />
      </v-col>
      <v-col cols="4">
        <card title="3" subtitle="Quantidade máxima" />
      </v-col>
      <v-col cols="4">
        <card title="1" subtitle="Vagas" />
      </v-col>
    </v-row>
    <v-row classes="mt-xxl-5">
      <v-col cols="4">
        <InputTemplate
          id="filter-patient"
          placeholder="Pesquisar por paciente"
          v-model="filters.patient"
          type="text"
          :prefix-icon-without-border="true"
        >
          <template #prefix-input>
            <i class="bi-search font-size-20px font-color-black-3 suffix-icon"></i>
          </template>
        </InputTemplate>
      </v-col>
      <v-col cols="3">
        <InputTemplate
          id="filter-status-patient"
          placeholder="Situação do paciente"
          v-model="filters.statusPatient"
          type="text"
          :prefix-icon-without-border="true"
          :select="true"
          :options="filters.statusOptions"
        >
          <template #prefix-input>
            <i class="bi-search font-size-20px font-color-black-3 suffix-icon"></i>
          </template>
        </InputTemplate>
      </v-col>
      <v-col cols="3">
        <InputTemplate
          id="filter-sort-by-patient"
          placeholder="Ordenar por paciente"
          v-model="filters.sortPatient"
          type="text"
          :prefix-icon-without-border="true"
          :select="true"
          :options="filters.sortPatientOptions"
        >
        </InputTemplate>
      </v-col>
      <v-col cols="1">
        <button class="btn btn-primary w-100">Filtrar</button>
      </v-col>
      <v-col cols="1">
        <button class="btn btn-outline-primary w-100">Limpar</button>
      </v-col>
    </v-row>
    <v-row classes="mt-xxl-4">
      <v-col cols="12">
        <data-table :headers="headers" :items="items" :current-page="currentPage" :per-page="perPage">
          <template #status="{ item }">
            <div class="badge" :class="{ 'success': item?.status_id === 1, 'error': item?.status_id === 2 }"> {{ item?.status }} </div>
          </template>
          <template #medical_record="{ item }">
            <router-link
              class="btn-icon-outline-primary"
              :to="{ name: 'medical-record-unit', params: { id: item?.id } }"
            >
              <i class="bi-clipboard2-pulse"></i>
            </router-link>
          </template>
          <template #details="{ item }">
            <button type="button" class="btn-icon-outline-primary" @click="item._details = !item._details">
              <i class="bi-plus-lg rotate" :class="{ 'deg-45': item._details }"></i>
            </button>
          </template>
          <template #row-details="{ item, index }">
            <div class="card border-0">
              <div class="card-body p-4">
                <div class="d-flex justify-content-start align-items-center">
                  <span class="me-5"><b>Nome da mãe:</b> {{ item?.more_details?.mother_name }} </span>
                  <span class="me-5"><b>CPF:</b> {{ item?.more_details?.cpf }} </span>
                  <span class="me-5"><b>Gênero:</b> {{ item?.more_details?.gender }} </span>
                  <span><b>Unidade:</b> {{ item?.more_details?.unit }} </span>
                </div>
                <div class="fw-bold mt-2 mb-1">Endereço</div>
                <div class="d-flex justify-content-start align-items-center">
                  <span class="me-3"><b>Rua:</b> {{ `${item?.more_details?.address?.street} ${index}` }}, </span>
                  <span class="me-3"><b>número:</b> {{ item?.more_details?.address?.number }}, </span>
                  <span class="me-3"><b>bairro:</b> {{ `${item?.more_details?.address?.neighborhood} ${index}` }}, </span>
                  <span class="me-3"><b>cidade:</b> {{ `${item?.more_details?.address?.city} ${index}` }}, </span>
                  <span class="me-3"><b>estado:</b> {{ `${item?.more_details?.address?.state} ${index}` }} </span>
                </div>
              </div>
            </div>
          </template>
        </data-table>
      </v-col>
    </v-row>
    <v-row v-if="items.length > perPage">
      <v-col cols="12">
        <div class="d-flex justify-content-center align-items-center w-100">
          <pagination
            :rows="items.length"
            :perPage="perPage"
            :currentPage="currentPage"
            @pagechanged="onPageChange"
          />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
</style>