<script setup>
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
  title: 'ID',
  dataIndex: 'id'
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
  <a-table class="qnodes-table" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
  </a-table>
</template>

<style scoped>

</style>