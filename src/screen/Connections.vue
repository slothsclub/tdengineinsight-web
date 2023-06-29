<script setup>
import {onBeforeUnmount, onMounted, ref, watch} from "vue";
import i18n from "../locale/i18n.js";
import usePerf from "../support/perf.js";
import {usePerfStore} from "../store/perf.js";
import {storeToRefs} from "pinia";
import {useAppStore} from "../store/app.js";

const columns = [{
  title: i18n.global.t('common.id'),
  dataIndex: 'connId'
}, {
  title: i18n.global.t('common.username'),
  dataIndex: 'user'
}, {
  title: i18n.global.t('common.app'),
  dataIndex: 'app'
}, {
  title: i18n.global.t('common.pid'),
  dataIndex: 'pid'
}, {
  title: i18n.global.t('common.endpoint'),
  dataIndex: 'endPoint'
}, {
  title: i18n.global.t('common.loginTime'),
  dataIndex: 'loginTime'
}, {
  title: i18n.global.t('common.lastAccess'),
  dataIndex: 'lastAccess'
}
];

const checked = ref(true)
const intervalRef = ref()
const {queryConnections} = usePerf()
const appStore = useAppStore()
const perfStore = usePerfStore()
const {currentInstanceId, instanceReady} = storeToRefs(appStore)

const autoRefresh = () => {
  intervalRef.value = setInterval(() => {
    queryConnections()
  }, 3000)
}
const stopAutoRefresh = () => {
  intervalRef.value && clearInterval(intervalRef.value)
}

watch(checked, () => {
  checked.value ? autoRefresh() : stopAutoRefresh()
})

watch([currentInstanceId, instanceReady], ([m, n]) => {
  if(m && n) {
    queryConnections()
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
      <a-table class="client-list" :columns="columns" :data-source="perfStore.data.connections" bordered :pagination="false" size="small">
      </a-table>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
