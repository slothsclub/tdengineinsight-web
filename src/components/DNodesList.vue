<script setup>
import i18n from "../locale/i18n.js";
const data = [{
  id: '1',
  vnodes: 'DNodes',
  support_vnodes: 32,
  status: '0571-22098909',
  note: 18889898989,
  endpoint: 'New York No. 1 Lake Park',
  create: '2022',
}, {
  id: '2',
  vnodes: 'DNodes',
  support_vnodes: 32,
  status: '0571-22098909',
  note: 18889898989,
  endpoint: 'New York No. 1 Lake Park',
  create: '2022',
}];
const columns = [{
  title: i18n.global.t('common.id'),
  dataIndex: 'id'
}, {
  title: i18n.global.t('tdengine.label.vnodes'),
  dataIndex: 'vnodes'
}, {
  title: i18n.global.t('common.support') + " " + i18n.global.t('tdengine.label.vnodes'),
  dataIndex: 'support_vnodes',
}, {
  title: i18n.global.t('common.status'),
  dataIndex: 'status',
}, {
  title: i18n.global.t('common.note'),
  dataIndex: 'note'
}, {
  title: i18n.global.t('common.endpoint'),
  dataIndex: 'endpoint'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'create'
}
];
</script>

<template>
  <a-table class="dnodes-table" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
  </a-table>
</template>

<style scoped>

</style>