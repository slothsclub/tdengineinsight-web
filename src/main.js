import { createApp } from 'vue'
import './assets/less/light.less'
import App from './App.vue'
import router from "./router"
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts"; //https://apexcharts.com/docs/installation/
import i18n from "./locale/i18n.js";

const app = createApp(App)
//https://pinia.vuejs.org/getting-started.html
const pinia = createPinia()
//https://vue-i18n.intlify.dev/guide/installation.html

app.use(i18n)
app.use(router)
app.use(pinia)
app.use(VueApexCharts);
app.mount('#app')
