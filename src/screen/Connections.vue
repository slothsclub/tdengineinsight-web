<script setup>
import {ref} from "vue";
import i18n from "../locale/i18n.js";

const data = [{
  conn_id: 1,
  user: "",
  app: "",
  pid: "",
  end_point: "",
  login_time: "",
  last_access: ""
}, {
  conn_id: 2,
  user: "",
  app: "",
  pid: "",
  end_point: "",
  login_time: "",
  last_access: ""
}];
const columns = [{
  title: i18n.global.t('common.id'),
  dataIndex: 'conn_id'
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
  dataIndex: 'end_point'
}, {
  title: i18n.global.t('common.loginTime'),
  dataIndex: 'login_time'
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
