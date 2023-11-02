<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";
import {getNameFullMonth} from "@/utils";


export default defineComponent({
  components: {
    Card
  },
  data: () => ({
    pieChartUnits: {
      series: [50, 26],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Unidades ocupadas', 'Unidades disponíveis'],
        colors: ['#1C6F77', '#32CDD6'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }],
        legend: {
          show: false,
        }
      }
    },
    pieChartPatients: {
      series: [40, 10],
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Pacientes em unidades', 'Pacientes em espera'],
        colors: ['#1C6F77', '#32CDD6'],
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            }
          }
        }],
        legend: {
          show: false,
        }
      },
    },
    barChartOccupancyMonthly: {
      options: {
        chart: {
          width: '100%',
          type: 'bar',
          zoom: {
            enabled: false
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 0
          }
        },
        colors: ['#32CDD6', '#1C6F77'],
        xaxis: {
          type: 'category',
          categories: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
          tickAmount: undefined,
          tickPlacement: 'between',
          min: undefined,
          max: undefined,
          range: undefined,
          floating: false,
          decimalsInFloat: undefined,
          overwriteCategories: undefined,
          position: 'bottom',
        },
        legend: {
          markers: {
            width: 20,
            height: 20,
            strokeWidth: 0,
            strokeColor: '#fff',
            radius: 5,
            offsetX: 0,
            offsetY: 0
          },
        },
        tooltip: {
          enabled: true,
          fillSeriesColor: false,
          theme: false,
          custom: function({series, seriesIndex, dataPointIndex, w}) {
            return `<div class="tooltip-charts ${seriesIndex === 0 ? 'bg-color-1' : ''}">
              <i class="bi-calendar2-week"></i>
              <span class="tooltip-title">${getNameFullMonth(dataPointIndex)}</span><br/>
              <hr/>
              <span class="tooltip-text">${w.globals.seriesNames[seriesIndex]}: ${series[seriesIndex][dataPointIndex]}</span>
            </div>`
          }
        }
      },
      series: [
        {
          name: 'Unidades disponíveis',
          data: [10, 12, 14, 51, 15, 28, 38, 46, 15, 16],
        },
        {
          name: 'Unidades ocupadas',
          data: [20, 29, 37, 36, 44, 45, 50, 58, 19, 22]
        },
      ],
    }
  })
})
</script>

<template>
  <div>
    <div class="title-page mb-4">Dashboard</div>
    <v-row>
      <v-col cols="6">
        <div class="font-size-20px mb-2">Unidades</div>
      </v-col>
      <v-col cols="6">
        <div class="font-size-20px mb-2">Pacientes</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <card title="4" subtitle="Total" />
      </v-col>
      <v-col cols="2">
        <card title="3" subtitle="Com vagas" />
      </v-col>
      <v-col cols="2">
        <card title="1" subtitle="Lotadas" />
      </v-col>
      <v-col cols="2">
        <card title="50" subtitle="Total" />
      </v-col>
      <v-col cols="2">
        <card title="44" subtitle="Dentro do período" />
      </v-col>
      <v-col cols="2">
        <card title="6" subtitle="Fora do período" />
      </v-col>
    </v-row>
    <v-row classes="mt-4">
      <v-col cols="6">
        <div class="font-size-20px mb-2">Ocupação das unidades</div>
        <card>
          <template #content-with-body>
            <div class="d-flex justify-content-start align-items-start w-100 h-100">
              <apexchart type="pie" width="380" :options="pieChartUnits.options" :series="pieChartUnits.series"></apexchart>
              <div class="d-flex justify-content-between flex-column flex-lg-grow-1 h-100">
                <div class="pt-3 mb-5">
                  <div class="d-flex justify-content-between align-items-center mb-3 w-100">
                    <div class="d-flex justify-content-start align-items-center">
                      <div class="legend-1"></div>
                      <span>Unidades ocupadas</span>
                    </div>
                    <div class="separate-legend"></div>
                    <span>50</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="d-flex justify-content-start align-items-center">
                      <div class="legend-2"></div>
                      <span>Unidades disponíveis</span>
                    </div>
                    <div class="separate-legend"></div>
                    <span>26</span>
                  </div>
                </div>
                <button class="btn btn-outline-dark w-100 fw-semibold">Ir para unidades</button>
              </div>
            </div>
          </template>
        </card>
      </v-col>
      <v-col cols="6">
        <div class="font-size-20px mb-2">Pacientes por unidade</div>
        <card>
          <template #content-with-body>
            <div class="d-flex justify-content-start align-items-start w-100 h-100">
              <apexchart type="pie" width="380" :options="pieChartPatients.options" :series="pieChartPatients.series"></apexchart>
              <div class="d-flex justify-content-between flex-column flex-lg-grow-1 h-100">
                <div class="pt-3 mb-5">
                  <div class="d-flex justify-content-between align-items-center mb-3 w-100">
                    <div class="d-flex justify-content-start align-items-center">
                      <div class="legend-1"></div>
                      <span>Pacientes em unidades</span>
                    </div>
                    <div class="separate-legend"></div>
                    <span>40</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="d-flex justify-content-start align-items-center">
                      <div class="legend-2"></div>
                      <span>Pacientes em espera</span>
                    </div>
                    <div class="separate-legend"></div>
                    <span>10</span>
                  </div>
                </div>
                <button class="btn btn-outline-dark w-100 fw-semibold">Ir para pacientes</button>
              </div>
            </div>
          </template>
        </card>
      </v-col>
    </v-row>
    <v-row classes="mt-4">
      <v-col cols="12">
        <div class="font-size-20px mb-2">Ocupação mensal (%)</div>
        <card>
          <template #content-with-body>
            <apexchart type="bar" height="300px" :options="barChartOccupancyMonthly.options" :series="barChartOccupancyMonthly.series"></apexchart>
          </template>
        </card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
</style>