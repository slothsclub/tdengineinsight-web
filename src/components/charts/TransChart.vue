<script setup>
import series from "../../config/sampleChartData.js";
import {useChart} from "../../support/chart.js";
const props = defineProps({
  instanceId: String
})

const {options} = useChart("chart3", "Trans")
</script>

<template>
  <a-card>
    <apexchart type="line" height="350" width="500" ref="chart" :options="options" :series="series"></apexchart>
  </a-card>
</template>

<style scoped>

</style>
