<script setup>
import {useChart} from "../../support/chart.js";
import i18n from "../../locale/i18n.js";
import {onBeforeUnmount, onMounted, reactive, ref, watch} from "vue";
import usePerf from "../../support/perf.js";
import {usePerfStore} from "../../store/perf.js";

const props = defineProps({
  shared: {
    type: Boolean,
    default() {return false}
  },
  maxPoint: {
    type: Number,
    default() {return 10}
  },
  interval: {
    type: Number,
    default() {return 1000}
  }
})
const chartRef = ref()
const {options} = useChart("chart-transactions", i18n.global.t('common.transaction'))
const max = ref(0)
const loading = ref(true)

const intervalRef = reactive({
  source: null,
  chart: null
})
const {queryTransactions} = usePerf()
const perfStore = usePerfStore()
const series = reactive({
  data: []
})

const autoRefreshChart = () => {
  intervalRef.chart = setInterval(() => {
    max.value = Math.max(perfStore.data.transactions.length, max.value)
    loading.value = false
    series.data.push({
      x: new Date().getTime(),
      y: perfStore.data.transactions.length
    })
    if(series.data.length > props.maxPoint) {
      series.data.shift()
    }
  }, props.interval)
}

const autoRefreshSource = () => {
  intervalRef.source = setInterval(() => {
    queryTransactions()
  }, 1000)
}
onMounted(() => {
  !props.shared && autoRefreshSource()

  autoRefreshChart()
})
onBeforeUnmount(() => {
  !props.shared && intervalRef.source && clearInterval(intervalRef.source)

  intervalRef.chart && clearInterval(intervalRef.chart)
})
</script>

<template>
  <a-card v-loading="loading">
    <apexchart type="line" height="350" width="500" ref="chartRef" :options="options" :series="[{data: series.data}]"></apexchart>
  </a-card>
</template>

<style scoped>

</style>
