<script setup>
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
  title: 'ID',
  dataIndex: 'id'
}, {
  title: 'Role',
  dataIndex: 'role'
}, {
  title: 'Role Time',
  dataIndex: 'role_time',
}, {
  title: 'Endpoint',
  dataIndex: 'endpoint'
}, {
  title: 'Create time',
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