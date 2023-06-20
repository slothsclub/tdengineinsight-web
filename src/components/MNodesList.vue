<script setup>
import i18n from "../locale/i18n.js";

const data = [{
  id: '1',
  role: 'MNodes',
  role_time: '0571-22098909',
  endpoint: 'New York No. 1 Lake Park',
  create_time: '2022',
}, {
  id: '2',
  role: 'MNodes',
  role_time: '0571-22098909',
  endpoint: 'New York No. 1 Lake Park',
  create_time: '2022',
}];
const columns = [{
  title: i18n.global.t('common.id'),
  dataIndex: 'id'
}, {
  title: i18n.global.t('common.role'),
  dataIndex: 'role'
}, {
  title: i18n.global.t('common.roleTime'),
  dataIndex: 'role_time',
}, {
  title: i18n.global.t('common.endpoint'),
  dataIndex: 'endpoint'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'create_time'
}
];
</script>

<template>
  <a-table class="mnodes-table" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
  </a-table>
</template>

<style scoped>

</style>