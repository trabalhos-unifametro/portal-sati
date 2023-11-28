<script lang="ts">
import {useRoute} from "vue-router";
import {defineComponent} from "vue";
import Card from "@/components/Card.vue";
import InputTemplate from "@/components/InputTemplate.vue";
import DataTable from "@/components/DataTable.vue";
import Pagination from "@/components/Pagination.vue";
import {getPatientsList, getPatientsTotalizators} from "@/services/patient_service";
import {capitalize, formatCPF, formatDate, isFilled} from "@/utils";
import {getListStatus} from "@/services/status_service";
import type {ResponsePatient, ResponseTotalizatorsPatient, Status} from "@/interfaces";
import {SelectedNotification} from "@/stores/notifications";
import {Loading} from "@/stores/loading";

export default defineComponent({
  components: {InputTemplate, Card, DataTable, Pagination},
  data: (): any => ({
    route: useRoute(),
    selectedNotification: SelectedNotification(),
    filters: {
      patient: '',
      situationOptions: ['Dentro do período', 'Fora do período'],
      situationPatient: '',
      statusOptions: [],
      statusIDs: [],
      statusPatient: '',
      sortPatientOptions: ['Crescente', 'Decrescente'],
      sortPatient: '',
    },
    headers: [
      { label: 'Cód. Internação', key: 'hospitalization_code' },
      { label: 'Nome', key: 'name' },
      { label: 'Entrada na UTI', key: 'created_at' },
      { label: 'Previsão de alta', key: 'expected_hospitalization_time' },
      { label: 'Situação', key: 'situation' },
      { label: 'Status', key: 'status' },
      { label: 'Prontuário', key: 'medical_record_id' },
      { label: 'Detalhes', key: 'details' },
    ],
    items: [],
    currentPage: 1,
    perPage: 10,
    totalizators: {
      total: 0,
      hospitalized_patients: 0,
      waiting_patients: 0
    },
    searching: false,
    load: Loading()
  }),
  methods: {
    async listPatients(filters="") {
      this.items = []
      await getPatientsList(filters).
      then(response => {
        const patients: ResponsePatient[] = response.data ?? []
        for (const patient of patients) {
          this.items.push({
            id: patient.patient_id,
            hospitalization_code: patient.hospitalization_code,
            name: patient.patient_name,
            created_at: formatDate(patient.created_at),
            expected_hospitalization_time: formatDate(patient.expected_hospitalization_time),
            current_hospitalization_time: formatDate(patient.current_hospitalization_time),
            situation_id: patient.situation_id,
            situation: patient.situation,
            status: capitalize(patient.status),
            status_id: patient.status_id,
            medical_record_id: patient.medical_record_id,
            _details: false,
            more_details: {
              mother_name: patient.mother_name,
              cpf: formatCPF(patient.cpf),
              gender: patient.gender,
              unit: patient.unit_name,
              address: {
                street: patient.street,
                number: patient.number,
                neighborhood: patient.neighborhood,
                city: patient.city,
                state: patient.state,
                complement: patient.complement,
                zip_code: patient.zip_code,
              }
            },
            selected: this.selectedNotification.patientID === patient.patient_id
          })
        }
      }).
      catch(err => console.info(err))
    },
    async getTotalizators(filters="") {
      await getPatientsTotalizators(filters).
      then(response => {
        const totalizators: ResponseTotalizatorsPatient = response.data
        this.totalizators.total = totalizators.total
        this.totalizators.hospitalized_patients = totalizators.hospitalized_patients
        this.totalizators.waiting_patients = totalizators.waiting_patients
      }).
      catch(err => console.info(err))
    },
    async listStatus() {
      this.filters.statusOptions = []
      this.filters.statusIDs = []
      await getListStatus("?t=mr").
      then(response => {
        const list: Status[] = response.data
        for (const status of list) {
          if (status.id !== 3) {
            this.filters.statusOptions.push(capitalize(status.name))
            this.filters.statusIDs.push(status.id)
          }
        }
      }).
      catch(err => console.info(err))
    },
    async applyFilters() {
      let filtersTotalizators: string = "?utf8=✓"
      let filtersList: string = "?utf8=✓"
      this.selectedNotification.setPatientID(undefined)

      if (isFilled(this.filters.patient)) {
        filtersTotalizators += `&patient_name=${this.filters.patient}`
        filtersList += `&patient_name=${this.filters.patient}`
      }
      if (isFilled(this.filters.situationPatient)) {
        filtersTotalizators += `&situation_patient=${this.filters.situationPatient}`
        filtersList += `&situation_patient=${this.filters.situationPatient}`
      }
      if (isFilled(this.filters.statusPatient)) {
        const index: number = this.filters.statusOptions.indexOf(this.filters.statusPatient)
        filtersTotalizators += `&status_id=${this.filters.statusIDs[index]}`
        filtersList += `&status_id=${this.filters.statusIDs[index]}`
      }
      if (isFilled(this.filters.sortPatient)) {
        filtersList += `&sort_by_patient=${this.filters.sortPatient}`
      }
      
      await this.getTotalizators(filtersTotalizators)
      await this.listPatients(filtersList)
    },
    async clearFilters() {
      this.filters.patient = ''
      this.filters.situationPatient = ''
      this.filters.statusPatient = ''
      this.filters.sortPatient = ''
      this.selectedNotification.setPatientID(undefined)

      await this.getTotalizators()
      await this.listPatients()
    },
    onPageChange(page: number) {
      this.currentPage = page
    },
  },
  async beforeMount() {
    await this.listStatus()
  },
  async mounted() {
    this.load.show()
    await this.getTotalizators()
    await this.listPatients()
    this.searching = false
    this.load.hide()
  }
});

</script>

<template>
  <div>
    <div class="title-page mb-4">Pacientes</div>
    <v-row>
      <v-col cols="4">
        <card :title="totalizators.total.toString()" subtitle="Total de pacientes" />
      </v-col>
      <v-col cols="4">
        <card :title="totalizators.hospitalized_patients.toString()" subtitle="Pacientes internados" />
      </v-col>
      <v-col cols="4">
        <card :title="totalizators.waiting_patients" subtitle="Pacientes em espera" />
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
      <v-col cols="2">
        <InputTemplate
          id="filter-situation-patient"
          placeholder="Situação do paciente"
          v-model="filters.situationPatient"
          type="text"
          :prefix-icon-without-border="true"
          :select="true"
          :options="filters.situationOptions"
        >
          <template #prefix-input>
            <i class="bi-search font-size-20px font-color-black-3 suffix-icon"></i>
          </template>
        </InputTemplate>
      </v-col>
      <v-col cols="2">
        <InputTemplate
          id="filter-status-patient"
          placeholder="Status do paciente"
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
      <v-col cols="2">
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
        <button type="button" class="btn btn-primary w-100" @click="applyFilters">Filtrar</button>
      </v-col>
      <v-col cols="1">
        <button type="button" class="btn btn-outline-primary w-100" @click="clearFilters">Limpar</button>
      </v-col>
    </v-row>
    <v-row classes="mt-xxl-4">
      <v-col cols="12">
        <data-table :headers="headers" :items="items" :current-page="currentPage" :per-page="perPage">
          <template #situation="{ item }">
            <div class="badge" :class="{ 'success': item?.situation_id === 1, 'error': item?.situation_id === 2 }"> {{ item?.situation }} </div>
          </template>
          <template #status="{ item }">
            <div class="badge" :class="{ 'info': item?.status_id === 1, 'warning': item?.status_id === 2 }"> {{ item?.status }} </div>
          </template>
          <template #medical_record_id="{ item }">
            <router-link
                class="btn-icon-outline-primary"
                :to="{ name: 'medical-record-patient', params: { id: item?.medical_record_id } }"
            >
              <i class="bi-clipboard2-pulse"></i>
            </router-link>
          </template>
          <template #details="{ item }">
            <button type="button" class="btn-icon-outline-primary" @click="item._details = !item._details">
              <i class="bi-plus-lg rotate" :class="{ 'deg-45': item._details }"></i>
            </button>
          </template>
          <template #row-details="{ item }">
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
                  <span class="me-3"><b>Rua:</b> {{ `${item?.more_details?.address?.street}` }}, </span>
                  <span class="me-3"><b>número:</b> {{ item?.more_details?.address?.number }}, </span>
                  <span class="me-3"><b>bairro:</b> {{ `${item?.more_details?.address?.neighborhood}` }}, </span>
                  <span class="me-3"><b>cep:</b> {{ `${item?.more_details?.address?.zip_code}` }}, </span>
                  <span class="me-3"><b>cidade:</b> {{ `${item?.more_details?.address?.city}` }}, </span>
                  <span class="me-3"><b>estado:</b> {{ `${item?.more_details?.address?.state}` }} </span>
                  <span class="me-3" v-if="item?.more_details?.address?.state"><b>complemento:</b> {{ `${item?.more_details?.address?.complement}` }} </span>
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