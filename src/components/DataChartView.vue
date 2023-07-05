<script setup>
import {useChart} from "../support/chart.js";
import {computed, onBeforeUnmount, onMounted, ref} from "vue";
import {useSqlStore} from "../store/sql.js";
import {useColumnStore} from "../store/column.js";
import emitter from "../support/emitter.js";
import {typeDefine} from "../config/type.js";

const chartRef = ref()
const compareMode = ref("none")
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
  chartRef.value.chart.hideLoading()
}
const handleCompareModeChange = () => {
  let compare = undefined;
  let change = ''
  switch (compareMode.value) {
    case "none":
      compare = undefined
      change = ''
      break;
    case "percent":
      compare = 'percent'
      change = '({point.change}%)'
      break;
    case "value":
      compare = 'value'
      change = '({point.change})'
      break;
  }
  chartOptions.value.tooltip.pointFormat = `<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ${change}<br/>`
  chartOptions.value.plotOptions = {
    series: {
      compare: compare,
      showInNavigator: true
    }
  }
}

onMounted(() => {
  emitter.on(typeDefine.events.REFRESH_RAW_DATA_CHART, refreshChart)
  emitter.on(typeDefine.events.BEFORE_UPDATE_CHART, () => {
    chartRef.value.chart.showLoading()
  })
  refreshChart()
})
onBeforeUnmount(() => {
  emitter.off(typeDefine.events.REFRESH_RAW_DATA_CHART)
  emitter.off(typeDefine.events.BEFORE_UPDATE_CHART)
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
        <a-radio-group class="compare-mode" v-model:value="compareMode" button-style="solid" size="small" @change="handleCompareModeChange">
          <a-button value="" disabled size="small">{{ $t('common.compare') }}</a-button>
          <a-radio-button value="none">{{ $t('common.none') }}</a-radio-button>
          <a-radio-button value="percent">{{ $t('common.percent') }}</a-radio-button>
          <a-radio-button value="value">{{ $t('common.value') }}</a-radio-button>
        </a-radio-group>
        <highcharts class="data-charts" ref="chartRef" :constructor-type="'stockChart'" :options="chartOptions" />
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.compare-mode {
  float: right;
}
.data-charts {
  display: block;
  width: 100%;
}
</style>
