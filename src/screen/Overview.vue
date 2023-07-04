<script setup>
import Separator from "../components/Separator.vue";
import ConnectionsChart from "../components/charts/ConnectionsChart.vue";
import QueriesChart from "../components/charts/QueriesChart.vue";
import TransChart from "../components/charts/TransChart.vue";
import useMeta from "../support/meta.js";
import {useMetaStore} from "../store/meta.js";
import usePerf from "../support/perf.js";
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useAppStore} from "../store/app.js";
import {usePerfStore} from "../store/perf.js";
import ConsumerChart from "../components/charts/ConsumerChart.vue";
import {CrownOutlined} from "@ant-design/icons-vue"

const appStore = useAppStore()
const {queryClusterInfo, queryDNodes, queryMNodes} = useMeta()
const metaStore = useMetaStore()
const {queryClientInfo, queryConnections} = usePerf()
const perfStore = usePerfStore()

const {currentInstanceId, instanceReady} = storeToRefs(appStore)
const intervalRef = ref()
const interval = ref(3000)

watch([currentInstanceId, instanceReady], ([m, n]) => {
  if(m && n) {
    queryClusterInfo()
    queryClientInfo()
    queryConnections()
    queryMNodes()
    queryDNodes()
  }
}, {immediate: true})

const autoRefresh = () => {
  intervalRef.value = setInterval(() => {
    queryClientInfo()
    queryConnections()
  }, interval.value)
}
const stopAutoRefresh = () => {
  intervalRef.value && clearInterval(intervalRef.value)
}
onMounted(() => {
  autoRefresh()
})
onBeforeUnmount(() => {
  stopAutoRefresh()
})
</script>

<template>
  <a-row :gutter="[0, 20]">
    <a-col :span="24">
      <a-typography-title :level="3">{{ $t('ui.title.databaseSummary') }}</a-typography-title>
      <a-descriptions bordered style="width: 600px" size="small" :column="2">
        <a-descriptions-item :label="$t('common.version')" :span="2">{{ metaStore.data.cluster?.version }}</a-descriptions-item>
        <a-descriptions-item :label="$t('ui.label.cluster.id')" :span="2">{{ metaStore.data.cluster?.id }}</a-descriptions-item>
        <a-descriptions-item :label="$t('ui.label.cluster.name')" :span="2">{{ metaStore.data.cluster?.name }}</a-descriptions-item>
        <a-descriptions-item :label="$t('common.created')" :span="2">{{ metaStore.data.cluster?.createTime }}</a-descriptions-item>
        <a-descriptions-item :label="$t('ui.label.cluster.mnode')" :span="2">
          <p v-for="node in metaStore.data.mnodes" :key="node.id"><a-tag :color="node.status === 'ready' ? 'green' : 'red'">{{ node.status }}</a-tag> {{ node.endpoint }} <CrownOutlined v-show="node.role==='leader'" /></p>
        </a-descriptions-item>
        <a-descriptions-item :label="$t('ui.label.cluster.dnode')" :span="2">
          <p v-for="node in metaStore.data.dnodes" :key="node.id"><a-tag :color="node.status === 'ready' ? 'green' : 'red'">{{ node.status }}</a-tag> {{ node.endpoint }}</p>
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
    <a-col :span="24">
      <a-card>
        <a-row justify="space-around">
          <a-statistic :title="$t('ui.label.status.connectedClients')" :precision="0" :value="perfStore.clientTotal"/>
          <Separator size="large"/>
          <a-statistic :title="$t('common.connections')" :precision="0" :value="perfStore.connectionTotal"/>
          <Separator size="large"/>
          <a-statistic :title="$t('ui.label.status.currentRequests')" :precision="0" :value="perfStore.currentRequest"/>
          <Separator size="large"/>
          <a-statistic :title="$t('ui.label.status.totalRequests')" :precision="0" :value="perfStore.totalRequest"/>
          <Separator size="large"/>
          <a-statistic :title="$tc('ui.label.status.slowQuery', 2)" :precision="0" :value="perfStore.totalSlowQueries"/>
          <Separator size="large"/>
          <a-statistic :title="$t('common.uptime')" :precision="1" :value="metaStore.readableUptime" suffix="h"/>
        </a-row>
      </a-card>
    </a-col>
    <a-col :span="24" class="charts-container">
      <a-row justify="space-between" :gutter="20">
        <a-col :span="6"><ConnectionsChart :shared="true" :interval="interval" /></a-col>
        <a-col :span="6"><QueriesChart :shared="false" :interval="interval" /></a-col>
        <a-col :span="6"><ConsumerChart :shared="false" :interval="interval" /></a-col>
        <a-col :span="6"><TransChart :shared="false" :interval="interval" /></a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<style lang="less" scoped>
  .charts-container {
    margin-top: 30px;
    .ant-card {
      margin-bottom: 20px;
    }
  }
</style>
