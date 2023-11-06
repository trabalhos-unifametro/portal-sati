<script lang="ts">
import {defineComponent} from 'vue'
import Card from "@/components/Card.vue";
import {getNameFullMonth} from "@/utils";
import {
  dashboardGraphicOccupationMonthly,
  dashboardGraphicPatients,
  dashboardGraphicUnits,
  dashboardTotalizatorsPatients,
  dashboardTotalizatorsUnits
} from "@/services/dashboard_service";
import type {
  ResponseDashboardGraphicMonthlyOccupation,
  ResponseDashboardGraphicPatients,
  ResponseDashboardGraphicUnits,
  ResponseDashboardTotalizatorsPatients,
  ResponseDashboardTotalizatorsUnits
} from "@/interfaces";


export default defineComponent({
  components: {
    Card
  },
  data: (): any => ({
    pieChartUnits: {
      series: [],
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
      series: [],
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
          custom: function({series, seriesIndex, dataPointIndex, w}: any) {
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
          name: 'Vagas',
          data: [],
        },
        {
          name: 'Ocupação',
          data: []
        },
      ],
    },
    totalizatorsUnits: {
      total: 0,
      withVacancies: 0,
      noVacancy: 0,
    },
    totalizatorsPatients: {
      total: 0,
      withinPeriod: 0,
      outsidePeriod: 0,
    }
  }),
  methods: {
    async getTotalizatorsUnits() {
      this.totalizatorsUnits.total = 0
      this.totalizatorsUnits.noVacancy = 0
      this.totalizatorsUnits.withVacancies = 0
      await dashboardTotalizatorsUnits()
      .then(response => {
        const totalizators: ResponseDashboardTotalizatorsUnits = response.data
        this.totalizatorsUnits.total = totalizators.total
        this.totalizatorsUnits.noVacancy = totalizators.no_vacancy
        this.totalizatorsUnits.withVacancies = totalizators.with_vacancies
      })
      .catch(err => console.info(err))
    },
    async getTotalizatorsPatients() {
      this.totalizatorsPatients.total = 0
      this.totalizatorsPatients.withinPeriod = 0
      this.totalizatorsPatients.outsidePeriod = 0
      await dashboardTotalizatorsPatients()
      .then(response => {
        const totalizators: ResponseDashboardTotalizatorsPatients = response.data
        this.totalizatorsPatients.total = totalizators.total
        this.totalizatorsPatients.withinPeriod = totalizators.within_period
        this.totalizatorsPatients.outsidePeriod = totalizators.outside_period
      })
      .catch(err => console.info(err))
    },
    async getGraphicUnits() {
      this.pieChartUnits.series = [0,0]
      await dashboardGraphicUnits().
      then(response => {
        const graphic: ResponseDashboardGraphicUnits = response.data
        this.pieChartUnits.series = [graphic.no_vacancy, graphic.with_vacancies]
      }).
      catch(err => console.info(err))
    },
    async getGraphicPatients() {
      this.pieChartPatients.series = [0, 0]
      await dashboardGraphicPatients().
      then(response => {
        const graphic: ResponseDashboardGraphicPatients = response.data
        this.pieChartPatients.series = [graphic.patients_in_unit, graphic.patients_waiting_unit]
      }).
      catch(err => console.info(err))
    },
    async getGraphicMonthlyOccupation() {
      this.barChartOccupancyMonthly.series[0].data = []
      this.barChartOccupancyMonthly.series[1].data = []
      await dashboardGraphicOccupationMonthly().
      then(response => {
        const graphic: ResponseDashboardGraphicMonthlyOccupation[] = response.data
        for (const item of graphic) {
          this.barChartOccupancyMonthly.series[0].data.push(item.total_vacancies)
          this.barChartOccupancyMonthly.series[1].data.push(item.total_occupation)
        }
        console.info(graphic)
      }).
      catch(err => console.info(err))
    },
  },
  async mounted() {
    await this.getTotalizatorsUnits()
    await this.getTotalizatorsPatients()
    await this.getGraphicUnits()
    await this.getGraphicPatients()
    await this.getGraphicMonthlyOccupation()
  },
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
        <card :title="totalizatorsUnits.total.toString()" subtitle="Total" />
      </v-col>
      <v-col cols="2">
        <card :title="totalizatorsUnits.withVacancies.toString()" subtitle="Com vagas" />
      </v-col>
      <v-col cols="2">
        <card :title="totalizatorsUnits.noVacancy.toString()" subtitle="Lotadas" />
      </v-col>
      <v-col cols="2">
        <card :title="totalizatorsPatients.total.toString()" subtitle="Total" />
      </v-col>
      <v-col cols="2">
        <card :title="totalizatorsPatients.withinPeriod.toString()" subtitle="Dentro do período" />
      </v-col>
      <v-col cols="2">
        <card :title="totalizatorsPatients.outsidePeriod.toString()" subtitle="Fora do período" />
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
                    <span>{{ pieChartUnits.series[0] }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="d-flex justify-content-start align-items-center">
                      <div class="legend-2"></div>
                      <span>Unidades disponíveis</span>
                    </div>
                    <div class="separate-legend"></div>
                    <span>{{ pieChartUnits.series[1] }}</span>
                  </div>
                </div>
                <router-link :to="{ name: 'units' }"
                   class="btn btn-outline-dark d-flex justify-content-center align-items-center w-100 fw-semibold">
                  Ir para unidades
                </router-link>
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
                    <span>{{ pieChartPatients.series[0] }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center w-100">
                    <div class="d-flex justify-content-start align-items-center">
                      <div class="legend-2"></div>
                      <span>Pacientes em espera</span>
                    </div>
                    <div class="separate-legend"></div>
                    <span>{{ pieChartPatients.series[1] }}</span>
                  </div>
                </div>
                <router-link
                  :to="{ name: 'patients' }"
                  class="btn btn-outline-dark d-flex justify-content-center align-items-center w-100 fw-semibold">
                  Ir para pacientes
                </router-link>
              </div>
            </div>
          </template>
        </card>
      </v-col>
    </v-row>
    <v-row classes="mt-4">
      <v-col cols="12">
        <div class="font-size-20px mb-2">Ocupação mensal</div>
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