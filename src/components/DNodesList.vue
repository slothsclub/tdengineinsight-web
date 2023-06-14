<script setup>
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
  title: 'ID',
  dataIndex: 'id'
}, {
  title: 'VNodes',
  dataIndex: 'vnodes'
}, {
  title: 'Support VNodes',
  dataIndex: 'support_vnodes',
}, {
  title: 'Status',
  dataIndex: 'status',
}, {
  title: 'Node',
  dataIndex: 'note'
}, {
  title: 'Endpoint',
  dataIndex: 'endpoint'
}, {
  title: 'Create time',
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