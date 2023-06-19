<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {ref} from "vue";

const emit = defineEmits(['update:table'])
const alterTableFormRef = ref()

const data = [{
  table_name: "Stable 1",
  db_name: "",
  create_time: "",
  columns: "",
  stable_name: "",
  uid: "",
  table_comment: "",
  vgroup_id: "",
  ttl: "",
  type: ""
}];
const columns = [{
  title: 'Name',
  dataIndex: 'table_name'
}, {
  title: 'Database',
  dataIndex: 'db_name'
}, {
  title: 'Create time',
  dataIndex: 'create_time'
}, {
  title: 'Columns',
  dataIndex: 'columns'
}, {
  title: 'Stable',
  dataIndex: 'stable_name'
}, {
  title: 'UID',
  dataIndex: 'uid'
}, {
  title: 'Comment',
  dataIndex: 'table_comment'
}, {
  title: 'vGroup ID',
  dataIndex: 'vgroup_id'
}, {
  title: 'TTL',
  dataIndex: 'ttl'
}, {
  title: 'Type',
  dataIndex: 'type'
}, {
  title: 'Action',
  key: 'action',
}
];
</script>

<template>
  <div>
    <a-table class="schema-table-list" :columns="columns" :data-source="data" :pagination="false" size="small">
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'action'">
          <a-button @click="alterTableFormRef.show()">edit</a-button>
        </template>
      </template>
    </a-table>

    <AlterTableForm ref="alterTableFormRef" mode="table" />
  </div>
</template>

<style scoped>

</style>
