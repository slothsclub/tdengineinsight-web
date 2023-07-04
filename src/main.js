import { createApp } from 'vue'
import './assets/less/themes.less'
import App from './App.vue'
import router from "./router"
import { createPinia } from 'pinia'
import i18n from "./locale/i18n.js";
import loading from "./directives/loading.js";
import "ant-design-vue/es/notification/style/index.css"
import emitter from "./support/emitter.js";
import Highcharts from "highcharts";
import StockModule from "highcharts/modules/stock";
import HighchartsVue from "highcharts-vue";
StockModule(Highcharts)

const app = createApp(App)
//https://pinia.vuejs.org/getting-started.html
const pinia = createPinia()
//https://vue-i18n.intlify.dev/guide/installation.html
app.use(i18n)
app.use(router)
app.use(pinia)
app.use(HighchartsVue)
app.directive("loading", loading)
app.config.globalProperties.$emitter = emitter

app.mount('#app')
