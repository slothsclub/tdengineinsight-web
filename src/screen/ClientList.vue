<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import i18n from "../locale/i18n.js";
import usePerf from "../support/perf.js";
import {useAppStore} from "../store/app.js";
import {usePerfStore} from "../store/perf.js";
import {storeToRefs} from "pinia";

const columns = [{
  title: i18n.global.t('common.appId'),
  dataIndex: 'appId'
}, {
  title: i18n.global.t('common.ip'),
  dataIndex: 'ip'
}, {
  title: i18n.global.t('common.pid'),
  dataIndex: 'pid'
}, {
  title: i18n.global.t('common.name'),
  dataIndex: 'name'
}, {
  title: i18n.global.t('common.startTime'),
  dataIndex: 'startTime'
}, {
  title: i18n.global.t('tdengine.client.insertReq'),
  dataIndex: 'insertReq'
}, {
  title: i18n.global.t('tdengine.client.insertRow'),
  dataIndex: 'insertRow'
}, {
  title: i18n.global.t('tdengine.client.insertTime'),
  dataIndex: 'insertTime'
}, {
  title: i18n.global.t('tdengine.client.insertBytes'),
  dataIndex: 'insertBytes'
}, {
  title: i18n.global.t('tdengine.client.fetchBytes'),
  dataIndex: 'fetchBytes'
}, {
  title: i18n.global.t('tdengine.client.queryTime'),
  dataIndex: 'queryTime'
}, {
  title: i18n.global.tc('ui.label.status.slowQuery', 2),
  dataIndex: 'slowQuery'
}, {
  title: i18n.global.t('tdengine.client.totalReq'),
  dataIndex: 'totalReq'
}, {
  title: i18n.global.t('tdengine.client.currentReq'),
  dataIndex: 'currentReq'
}, {
  title: i18n.global.t('common.lastAccess'),
  dataIndex: 'lastAccess'
}
];

const checked = ref(true)
const intervalRef = ref()
const {queryClientInfo} = usePerf()
const appStore = useAppStore()
const perfStore = usePerfStore()
const {currentInstanceId, instanceReady} = storeToRefs(appStore)

const autoRefresh = () => {
  intervalRef.value = setInterval(() => {
    queryClientInfo()
  }, 3000)
}
const stopAutoRefresh = () => {
  intervalRef.value && clearInterval(intervalRef.value)
}

watch(checked, () => {
  checked.value ? autoRefresh() : stopAutoRefresh()
})

watch([currentInstanceId, instanceReady], ([m, n]) => {
  if (m && n) {
    queryClientInfo()
  }
}, {immediate: true})

onMounted(() => {
  autoRefresh()
})
onBeforeUnmount(() => {
  stopAutoRefresh()
})
</script>

<template>
  <a-row :gutter="[0, 5]">
    <a-col :span="24" class="txt-right">
      <a-checkbox v-model:checked="checked">{{ $t('common.autoRefresh') }}</a-checkbox>
    </a-col>
    <a-col :span="24">
      <a-table class="client-list" :columns="columns" :data-source="perfStore.data.clients" bordered :pagination="false"
               size="small">
      </a-table>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
