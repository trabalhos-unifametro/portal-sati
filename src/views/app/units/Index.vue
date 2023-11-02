<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";
import InputTemplate from "@/components/InputTemplate.vue";
import CardUnit from "@/components/CardUnit.vue";

export default defineComponent({
  components: {InputTemplate, Card, CardUnit},
  data: () => ({
    filters: {
      unit: '',
      occupation: '',
      occupationSort: '',
      optionsOccupation: ['Com vagas', 'Ocupada'],
      unitSort: '',
      optionsSort: ['Crescente', 'Decrescente']
    },
    units: [
      {
        id: 1,
        name: 'Unidade 1',
        items: [
          {label: 'Qtd. atual de pacientes', total: 12},
          {label: 'Qtd. máxima de pacientes', total: 25},
          {label: 'Qtd. de vagas', total: 13},
        ],
        progress: 40,
      },
      {
        id: 2,
        name: 'Unidade 2',
        items: [
          {label: 'Qtd. atual de pacientes', total: 12},
          {label: 'Qtd. máxima de pacientes', total: 25},
          {label: 'Qtd. de vagas', total: 13},
        ],
        progress: 85,
      },
      {
        id: 3,
        name: 'Unidade 3',
        items: [
          {label: 'Qtd. atual de pacientes', total: 12},
          {label: 'Qtd. máxima de pacientes', total: 25},
          {label: 'Qtd. de vagas', total: 13},
        ],
        progress: 15,
      },
      {
        id: 4,
        name: 'Unidade 4',
        items: [
          {label: 'Qtd. atual de pacientes', total: 12},
          {label: 'Qtd. máxima de pacientes', total: 25},
          {label: 'Qtd. de vagas', total: 13},
        ],
        progress: 98,
      }
    ]
  })
})
</script>

<template>
  <div>
    <div class="title-page mb-4">Unidades</div>
    <v-row>
      <v-col cols="4">
        <card title="4" subtitle="Total" />
      </v-col>
      <v-col cols="4">
        <card title="3" subtitle="Unidades com vagas" />
      </v-col>
      <v-col cols="4">
        <card title="1" subtitle="Unidades Lotadas" />
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
        <button class="btn btn-primary w-100">Filtrar</button>
      </v-col>
      <v-col cols="1">
        <button class="btn btn-outline-primary w-100">Limpar</button>
      </v-col>
    </v-row>
    <v-row classes="mt-4">
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
  </div>
</template>

<style lang="scss">
</style>