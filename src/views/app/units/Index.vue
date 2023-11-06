<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";
import InputTemplate from "@/components/InputTemplate.vue";
import CardUnit from "@/components/CardUnit.vue";
import {dashboardTotalizatorsUnits} from "@/services/dashboard_service";
import {ResponseDashboardTotalizatorsUnits, ResponseUnit} from "@/interfaces";
import {getListUnits} from "@/services/unit_service";
import {isFilled} from "@/utils";

export default defineComponent({
  components: {InputTemplate, Card, CardUnit},
  data: (): any => ({
    filters: {
      unit: '',
      occupation: '',
      occupationSort: '',
      optionsOccupation: ['Com vagas', 'Ocupada'],
      unitSort: '',
      optionsSort: ['Crescente', 'Decrescente']
    },
    units: [],
    totalizators: {
      total: 0,
      withVacancies: 0,
      noVacancy: 0,
    },
    searching: false
  }),
  methods: {
    async getTotalizators(filters="") {
      this.totalizators.total = 0
      this.totalizators.noVacancy = 0
      this.totalizators.withVacancies = 0
      await dashboardTotalizatorsUnits(filters).
      then(response => {
        const totalizators: ResponseDashboardTotalizatorsUnits = response.data
        this.totalizators.total = totalizators.total
        this.totalizators.noVacancy = totalizators.no_vacancy
        this.totalizators.withVacancies = totalizators.with_vacancies
      }).
      catch(err => console.info(err))
    },
    async getListUnits(filters="") {
      this.units = []
      await getListUnits(filters).
      then(response => {
        const list: ResponseUnit[] = response.data ?? []
        for (const unit of list) {
          this.units.push({
            id: unit.id,
            name: unit.name,
            items: [
              {label: 'Qtd. atual de pacientes', total: unit.current_patient_capacity},
              {label: 'Qtd. máxima de pacientes', total: unit.max_patient_capacity},
              {label: 'Qtd. de vagas', total: unit.number_of_vacancies},
            ],
            progress: parseFloat(((unit.current_patient_capacity / unit.max_patient_capacity) * 100).toFixed(2)),
          })
        }
      }).
      catch(err => console.info(err))
    },
    async applyFilters() {
      let filtersList: string = "?utf8=✓"
      let filtersTotalizators: string = "?utf8=✓"
      this.searching = true

      if (isFilled(this.filters.unit)) {
        filtersList += `&unit_name=${this.filters.unit}`
        filtersTotalizators += `&unit_name=${this.filters.unit}`
      }
      if (isFilled(this.filters.unitSort)) {
        filtersList += `&sort_by_unit=${this.filters.unitSort}`
      }
      if (isFilled(this.filters.occupation)) {
        filtersList += `&occupation=${this.filters.occupation}`
        filtersTotalizators += `&occupation=${this.filters.occupation}`
      }
      if (isFilled(this.filters.occupationSort)) {
        filtersList += `&sort_by_occupation=${this.filters.occupationSort}`
      }
      await this.getTotalizators(filtersTotalizators)
      await this.getListUnits(filtersList)
    },
    async clearFilters() {
      this.filters.unit = ''
      this.filters.unitSort = ''
      this.filters.occupation = ''
      this.filters.occupationSort = ''
      this.searching = true

      await this.getTotalizators()
      await this.getListUnits()
    }
  },
  async mounted() {
    await this.getTotalizators()
    await this.getListUnits()
  }
})
</script>

<template>
  <div>
    <div class="title-page mb-4">Unidades</div>
    <v-row>
      <v-col cols="4">
        <card :title="totalizators.total.toString()" subtitle="Total" />
      </v-col>
      <v-col cols="4">
        <card :title="totalizators.withVacancies.toString()" subtitle="Unidades com vagas" />
      </v-col>
      <v-col cols="4">
        <card :title="totalizators.noVacancy.toString()" subtitle="Unidades Lotadas" />
      </v-col>
    </v-row>
    <v-row classes="mt-xxl-5">
      <v-col cols="3">
        <InputTemplate
          id="filter-name"
          placeholder="Pesquisar por unidade"
          v-model="filters.unit"
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
          id="filter-occupation"
          placeholder="Pesquisar por ocupação"
          v-model="filters.occupation"
          type="text"
          :prefix-icon-without-border="true"
          :select="true"
          :options="filters.optionsOccupation"
        >
          <template #prefix-input>
            <i class="bi-search font-size-20px font-color-black-3 suffix-icon"></i>
          </template>
        </InputTemplate>
      </v-col>
      <v-col cols="2">
        <InputTemplate
          id="filter-sort-by-unit"
          placeholder="Ordenar por unidade"
          v-model="filters.unitSort"
          type="text"
          :prefix-icon-without-border="true"
          :select="true"
          :options="filters.optionsSort"
        >
        </InputTemplate>
      </v-col>
      <v-col cols="2">
        <InputTemplate
            id="filter-sort-by-occupation"
            placeholder="Ordenar por ocupação"
            v-model="filters.occupationSort"
            type="text"
            :prefix-icon-without-border="true"
            :select="true"
            :options="filters.optionsSort"
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
    <v-row classes="mt-4" v-if="units.length > 0">
      <v-col
        cols="6"
        v-for="(unit, index) in units"
        :key="`card-unit-${index}`"
        :class="{ 'mt-4': index > 1 }"
      >
        <card-unit
          :unit-id="unit.id"
          :title="unit.name"
          :items="unit.items"
          :progress="unit.progress"
        />
      </v-col>
    </v-row>
    <v-row classes="mt-4" v-else-if="units.length === 0 && searching">
      <v-col cols="12">
        <card classes-body="d-flex justify-content-center align-items-center pb-5 pt-5">
          <template #content-with-body>
            <span class="font-size-20px">Nenhum resultado encontrado</span>
          </template>
        </card>
      </v-col>
    </v-row>
    <v-row classes="mt-4" v-else-if="units.length === 0 && !searching">
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

<style lang="scss">
</style>