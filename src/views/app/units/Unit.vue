<script lang="ts">
import {useRoute} from "vue-router";
import {defineComponent} from "vue";
import Card from "@/components/Card.vue";
import InputTemplate from "@/components/InputTemplate.vue";
import DataTable from "@/components/DataTable.vue";
import Pagination from "@/components/Pagination.vue";
import {getListPatientsByUnit, getTotalizatorsUnits} from "@/services/unit_service";
import type {ResponsePatientByUnit, ResponseUnitTotalizators} from "@/interfaces";
import {formatDate, isFilled} from "@/utils";

export default defineComponent({
  components: {InputTemplate, Card, DataTable, Pagination},
  data: (): any => ({
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
      { label: 'Nome', key: 'patient_name' },
      { label: 'Tempo de internação geral', key: 'expected_hospitalization_time' },
      { label: 'Tempo de internação atual', key: 'current_hospitalization_time' },
      { label: 'Situação', key: 'situation' },
      { label: 'Prontuário', key: 'medical_record_id' },
      { label: 'Detalhes', key: 'details' },
    ],
    patients: [],
    currentPage: 1,
    perPage: 10,
    unitName: '',
    totalizators: {
      qtdMax: 0,
      qtdPatients: 0,
      vacancies: 0
    },
    searching: false
  }),
  methods: {
    async getTotalizators(filters="") {
      const id: any = this.route.params.id
      await getTotalizatorsUnits(id, filters).
      then(response => {
        const totalizators: ResponseUnitTotalizators = response.data
        this.totalizators.qtdMax = totalizators.qtd_max
        this.totalizators.qtdPatients = totalizators.qtd_patients
        this.totalizators.vacancies = totalizators.vacancies
        if (!isFilled(this.unitName) || (isFilled(totalizators.unit_name) && totalizators.unit_name !== this.unitName)) {
          this.unitName = totalizators.unit_name
        }
      }).
      catch(err => console.info(err))
    },
    async getListPatientsByUnit(filters="") {
      const id: any = this.route.params.id
      this.patients = []
      await getListPatientsByUnit(id, filters).
      then(response => {
        const patients: ResponsePatientByUnit[] = response.data ?? []
        for (const patient of patients) {
          this.patients.push({
            patient_id: patient.patient_id,
            hospitalization_code: patient.hospitalization_code,
            patient_name: patient.patient_name,
            expected_hospitalization_time: formatDate(patient.expected_hospitalization_time),
            current_hospitalization_time: formatDate(patient.current_hospitalization_time),
            situation_id: patient.situation_id,
            situation: patient.situation,
            medical_record_id: patient.medical_record_id,
            _details: false,
            more_details: {
              mother_name: patient.mother_name,
              cpf: patient.cpf,
              gender: patient.gender,
              unit_name: patient.unit_name,
              address: {
                street: patient.street,
                number: patient.number,
                neighborhood: patient.neighborhood,
                city: patient.city,
                state: patient.state,
                complement: patient.complement,
                zip_code: patient.zip_code,
              }
            }
          },)
        }
      }).
      catch(err => console.info(err))
    },
    async applyFilters() {
      this.searching = true
      let filtersTotalizators: string = "?utf8=✓"
      let filtersPatients: string = "?utf8=✓"

      if (isFilled(this.filters.patient)) {
        filtersTotalizators += `&patient_name=${this.filters.patient}`
        filtersPatients += `&patient_name=${this.filters.patient}`
      }
      if (isFilled(this.filters.statusPatient)) {
        filtersTotalizators += `&situation_patient=${this.filters.statusPatient}`
        filtersPatients += `&situation_patient=${this.filters.statusPatient}`
      }
      if (isFilled(this.filters.sortPatient)) {
        filtersPatients += `&sort_by_patient=${this.filters.sortPatient}`
      }

      await this.getTotalizators(filtersTotalizators)
      await this.getListPatientsByUnit(filtersPatients)
    },
    async clearFilters() {
      this.searching = true
      this.filters.patient = ""
      this.filters.sortPatient = ""
      this.filters.statusPatient = ""

      await this.getTotalizators()
      await this.getListPatientsByUnit()
    },
    onPageChange(page: number) {
      this.currentPage = page
    }
  },
  async mounted() {
    await this.getTotalizators()
    await this.getListPatientsByUnit()
    this.searching = false
  }
});

</script>

<template>
  <div>
    <div class="d-flex justify-content-start align-items-center mb-4">
      <router-link :to="{ name: 'units' }" class="title-page">Unidades</router-link>
      <i class="bi-chevron-right fw-bold ms-2 me-2 font-color-black-10"></i>
      <div class="title-page">{{ unitName }}</div>
    </div>
    <v-row>
      <v-col cols="4">
        <card :title="totalizators.qtdPatients.toString()" subtitle="Pacientes nessa unidade" />
      </v-col>
      <v-col cols="4">
        <card :title="totalizators.qtdMax.toString()" subtitle="Quantidade máxima" />
      </v-col>
      <v-col cols="4">
        <card :title="totalizators.vacancies.toString()" subtitle="Vagas" />
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
        <button class="btn btn-primary w-100" @click="applyFilters">Filtrar</button>
      </v-col>
      <v-col cols="1">
        <button class="btn btn-outline-primary w-100" @click="clearFilters">Limpar</button>
      </v-col>
    </v-row>
    <v-row classes="mt-4" v-if="patients.length > 0">
      <v-col cols="12">
        <data-table :headers="headers" :items="patients" :current-page="currentPage" :per-page="perPage">
          <template #situation="{ item }">
            <div class="badge" :class="{ 'success': item?.situation_id === 1, 'error': item?.situation_id === 2 }"> {{ item?.situation }} </div>
          </template>
          <template #medical_record_id="{ item }">
            <router-link
              class="btn-icon-outline-primary"
              :to="{ name: 'medical-record-unit', params: { id: item?.medical_record_id } }"
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
                  <span><b>Gênero:</b> {{ item?.more_details?.gender }} </span>
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
      <v-col cols="12" classes="mt-2" v-if="patients.length > perPage">
        <div class="d-flex justify-content-center align-items-center w-100">
          <pagination
              :rows="patients.length"
              :perPage="perPage"
              :currentPage="currentPage"
              @pagechanged="onPageChange"
          />
        </div>
      </v-col>
    </v-row>
    <v-row classes="mt-4" v-else-if="patients.length === 0 && searching">
      <v-col cols="12">
        <card classes-body="d-flex justify-content-center align-items-center pb-5 pt-5">
          <template #content-with-body>
            <span class="font-size-20px">Nenhum resultado encontrado</span>
          </template>
        </card>
      </v-col>
    </v-row>
    <v-row classes="mt-4" v-else-if="patients.length === 0 && !searching">
      <v-col cols="12">
        <card classes-body="d-flex justify-content-center align-items-center pb-5 pt-5">
          <template #content-with-body>
            <span class="font-size-20px">Nenhuma unidade encontrada</span>
          </template>
        </card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
</style>