<script setup>

import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useMeta from "../support/meta.js";
import {useMetaStore} from "../store/meta.js";
import {ref, watch} from "vue";

const appStore = useAppStore()
const {currentInstanceId, instanceReady} = storeToRefs(appStore)
const {queryClusterInfo} = useMeta()
const metaStore = useMetaStore()

watch([currentInstanceId, instanceReady], ([m, n]) => {
  if(m && n) {
    queryClusterInfo()
  }
}, {immediate: true})
</script>

<template>
  <a-descriptions class="cluster-info" bordered size="small" :column="1">
    <a-descriptions-item :label="$t('common.version')" >{{ metaStore.data.cluster?.version }}</a-descriptions-item>
    <a-descriptions-item :label="$t('ui.label.cluster.id')" >{{ metaStore.data.cluster?.id }}</a-descriptions-item>
    <a-descriptions-item :label="$t('ui.label.cluster.name')" >{{ metaStore.data.cluster?.name }}</a-descriptions-item>
    <a-descriptions-item :label="$t('common.created')" >{{ metaStore.data.cluster?.createTime }}</a-descriptions-item>
  </a-descriptions>
</template>

<style scoped>

</style>