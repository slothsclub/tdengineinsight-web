<script setup>
import i18n from "../locale/i18n.js";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useMeta from "../support/meta.js";
import {useMetaStore} from "../store/meta.js";
import {ref, watch} from "vue";

const columns = [{
  title: i18n.global.t('common.id'),
  dataIndex: 'id'
}, {
  title: i18n.global.t('common.status'),
  dataIndex: 'status'
}, {
  title: i18n.global.t('common.role'),
  dataIndex: 'role'
}, {
  title: i18n.global.t('common.rebootTime'),
  dataIndex: 'rebootTime',
}, {
  title: i18n.global.t('common.endpoint'),
  dataIndex: 'endpoint'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'createTime'
}
]

const appStore = useAppStore()
const {currentInstanceId, instanceReady} = storeToRefs(appStore)
const {queryMNodes} = useMeta()
const metaStore = useMetaStore()

watch([currentInstanceId, instanceReady], ([m, n]) => {
  if(m && n) {
    queryMNodes()
  }
}, {immediate: true})
</script>

<template>
  <a-table class="mnodes-table" :columns="columns" :data-source="metaStore.data.mnodes" bordered :pagination="false" size="small">
  </a-table>
</template>

<style scoped>

</style>
