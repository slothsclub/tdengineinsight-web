<script setup>
import series from "../../config/sampleChartData.js";
import {useChart} from "../../support/chart.js";
import i18n from "../../locale/i18n.js";

const props = defineProps({
  instanceId: String
})
const {options} = useChart("chart1", i18n.global.t('common.connections'))
</script>

<template>
  <a-card>
    <apexchart type="line" height="350" width="500" ref="chart" :options="options" :series="series"></apexchart>
  </a-card>
</template>

<style scoped>

</style>
