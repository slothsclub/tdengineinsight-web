<script setup>
import {ref} from "vue";

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
  title: 'ID',
  dataIndex: 'conn_id'
}, {
  title: 'User',
  dataIndex: 'user'
}, {
  title: 'App',
  dataIndex: 'app'
}, {
  title: 'PID',
  dataIndex: 'pid'
}, {
  title: 'Endpoint',
  dataIndex: 'end_point'
}, {
  title: 'Login time',
  dataIndex: 'login_time'
}, {
  title: 'Last access',
  dataIndex: 'last_access'
}
];

const checked = ref(true)
</script>

<template>
  <a-row :gutter="[0, 5]">
    <a-col :span="24" class="txt-right">
      <a-checkbox v-model:checked="checked">Auto refresh</a-checkbox>
    </a-col>
    <a-col :span="24">
      <a-table class="client-list" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
      </a-table>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
