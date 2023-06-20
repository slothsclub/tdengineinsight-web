<script setup>
import {ref} from "vue";
import i18n from "../locale/i18n.js";

const data = [{
  app_id: 1,
  ip: "",
  pid: "",
  name: "",
  start_time: "",
  insert_req: "",
  insert_row: "",
  insert_time: "",
  insert_bytes: "",
  fetch_bytes: "",
  query_time: "",
  slow_query: "",
  total_req: "",
  current_req: "",
  last_access: ""
}, {
  app_id: 1,
  ip: "",
  pid: "",
  name: "",
  start_time: "",
  insert_req: "",
  insert_row: "",
  insert_time: "",
  insert_bytes: "",
  fetch_bytes: "",
  query_time: "",
  slow_query: "",
  total_req: "",
  current_req: "",
  last_access: ""
}];
const columns = [{
  title: i18n.global.t('common.appId'),
  dataIndex: 'app_id'
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
  dataIndex: 'start_time'
}, {
  title: i18n.global.t('tdengine.client.insertReq'),
  dataIndex: 'insert_req'
}, {
  title: i18n.global.t('tdengine.client.insertRow'),
  dataIndex: 'insert_row'
}, {
  title: i18n.global.t('tdengine.client.insertTime'),
  dataIndex: 'insert_time'
}, {
  title: i18n.global.t('tdengine.client.insertBytes'),
  dataIndex: 'insert_bytes'
}, {
  title: i18n.global.t('tdengine.client.fetchBytes'),
  dataIndex: 'fetch_bytes'
}, {
  title: i18n.global.t('tdengine.client.queryTime'),
  dataIndex: 'query_time'
}, {
  title: i18n.global.tc('ui.label.status.slowQuery', 2),
  dataIndex: 'slow_query'
}, {
  title: i18n.global.t('tdengine.client.totalReq'),
  dataIndex: 'total_req'
}, {
  title: i18n.global.t('tdengine.client.currentReq'),
  dataIndex: 'current_req'
}, {
  title: i18n.global.t('common.lastAccess'),
  dataIndex: 'last_access'
}
];

const checked = ref(true)
</script>

<template>
  <a-row :gutter="[0, 5]">
    <a-col :span="24" class="txt-right">
      <a-checkbox v-model:checked="checked">{{ $t('common.autoRefresh') }}</a-checkbox>
    </a-col>
    <a-col :span="24">
      <a-table class="client-list" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
      </a-table>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
