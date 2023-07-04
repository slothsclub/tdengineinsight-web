<script setup>
import {useChart} from "../support/chart.js";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useSqlStore} from "../store/sql.js";
import {useColumnStore} from "../store/column.js";
import emitter from "../support/emitter.js";

const chartRef = ref()
const {getStockChartOptions} = useChart()

const columnStore = useColumnStore()
const sqlStore = useSqlStore()

const columns = computed(() => {
  return columnStore.chartSeries.columns
})

const chartOptions = getStockChartOptions()

const refreshChart = () => {
  let series = {}
  for(let i in sqlStore.execResult.data) {
    let d = sqlStore.execResult.data[i]
    for(let i in columnStore.chartSeries.selected) {
      let field = columnStore.chartSeries.selected[i]
      if(!series[field]) {
        series[field] = {name: field, data: []}
      }
      series[field].data.push([d['ts'], d[field]])
    }
  }
  chartOptions.value.series = Object.values(series)
}

onMounted(() => {
  emitter.on("REFRESH_RAW_DATA_CHART", refreshChart)
  refreshChart()
})
onBeforeUnmount(() => {
  emitter.off("REFRESH_RAW_DATA_CHART")
})
</script>

<template>
  <a-row>
    <a-col :span="24">
      <a-card :title="$t('ui.tips.addColumnToChart')" size="small">
        <a-checkbox-group v-model:value="columnStore.chartSeries.selected" name="checkboxgroup" :options="columns" @change="refreshChart" />
      </a-card>
    </a-col>
    <a-col :span="24" class="mrg-top">
      <a-card>
        <highcharts ref="chartRef" :constructor-type="'stockChart'" :options="chartOptions" />
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
