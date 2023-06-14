<script setup>
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
  title: 'ID',
  dataIndex: 'app_id'
}, {
  title: 'IP',
  dataIndex: 'ip'
}, {
  title: 'PID',
  dataIndex: 'pid'
}, {
  title: 'Name',
  dataIndex: 'name'
}, {
  title: 'Start time',
  dataIndex: 'start_time'
}, {
  title: 'Insert req',
  dataIndex: 'insert_req'
}, {
  title: 'Insert row',
  dataIndex: 'insert_row'
}, {
  title: 'Insert time',
  dataIndex: 'insert_time'
}, {
  title: 'Insert bytes',
  dataIndex: 'insert_bytes'
}, {
  title: 'Fetch bytes',
  dataIndex: 'fetch_bytes'
}, {
  title: 'Query time',
  dataIndex: 'query_time'
}, {
  title: 'Slow query',
  dataIndex: 'slow_query'
}, {
  title: 'Total req',
  dataIndex: 'total_req'
}, {
  title: 'Current req',
  dataIndex: 'current_req'
}, {
  title: 'Last access',
  dataIndex: 'last_access'
}
];
</script>

<template>
  <a-table class="client-list" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
  </a-table>
</template>

<style scoped>

</style>
