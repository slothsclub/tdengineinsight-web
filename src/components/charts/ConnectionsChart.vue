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
const {getAreaChartOptions} = useChart()
const max = ref(0)

const intervalRef = reactive({
  source: null,
  chart: null
})
const {queryConnections} = usePerf()
const perfStore = usePerfStore()

const chartOptions = getAreaChartOptions(i18n.global.t('common.connections'))
chartOptions.value.series.push({
  name: i18n.global.t('common.connections'),
  data: []
})

const autoRefreshChart = () => {
  intervalRef.chart = setInterval(() => {
    max.value = Math.max(perfStore.connectionTotal, max.value)

    chartOptions.value.series[0].data.push([new Date().getTime(), perfStore.connectionTotal])
    if(chartOptions.value.series[0].data.length > props.maxPoint) {
      chartOptions.value.series[0].data.shift()
    }
  }, props.interval)
}

const autoRefreshSource = () => {
  intervalRef.source = setInterval(() => {
    queryConnections()
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
  <a-card>
    <highcharts ref="chartRef" :options="chartOptions"></highcharts>
  </a-card>
</template>

<style scoped>

</style>
