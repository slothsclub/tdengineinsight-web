<script setup>
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  sorter: (a, b) => a.name.length - b.name.length,
}, {
  title: 'Age',
  dataIndex: 'age',
  defaultSortOrder: 'descend',
  sorter: (a, b) => a.age - b.age,
}, {
  title: 'Address',
  dataIndex: 'address',
  sorter: (a, b) => a.address.length - b.address.length,
  sortDirections: ['descend', 'ascend'],
}];
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

const onChange = (pagination, filters, sorter) => {
  console.log('params', pagination, filters, sorter);
};
</script>

<template>
  <a-table size="small" bordered :columns="columns" :data-source="data" @change="onChange" :pagination="false" />
</template>

<style scoped>

</style>