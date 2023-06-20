<script setup>
import i18n from "../locale/i18n.js";
const data = [{
  id: '1',
  endpoint: 'New York No. 1 Lake Park',
  create_time: '2022',
}, {
  id: '2',
  endpoint: 'New York No. 1 Lake Park',
  create_time: '2022',
}];
const columns = [{
  title: i18n.global.t('common.id'),
  dataIndex: 'id'
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
  <a-table class="qnodes-table" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
  </a-table>
</template>

<style scoped>

</style>