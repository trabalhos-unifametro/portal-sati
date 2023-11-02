import './assets/main.css'
import './scss/custom.scss'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import Row from "@/components/Row.vue";
import Col from "@/components/Col.vue";
import VueApexCharts from "vue3-apexcharts";
import { createApp } from 'vue'

import { createPinia } from 'pinia'
import App from './App.vue'

import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueApexCharts)

app.component("v-row", Row)
app.component("v-col", Col)
app.mount('#app')
