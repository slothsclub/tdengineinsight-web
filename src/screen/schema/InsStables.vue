<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {ref} from "vue";

const emit = defineEmits(['update:stable'])
const alterTableFormRef = ref()

const data = [{
  stable_name: "Stable 1",
  db_name: "",
  create_time: "",
  columns: "",
  tags: "",
  last_update: "",
  table_comment: "",
  watermark: "",
  max_delay: "",
  rollup: ""
}];
const columns = [{
  title: 'Name',
  dataIndex: 'stable_name'
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
  title: 'Tags',
  dataIndex: 'tags'
}, {
  title: 'Last update',
  dataIndex: 'last_update'
}, {
  title: 'Comment',
  dataIndex: 'table_comment'
}, {
  title: 'Watermark',
  dataIndex: 'watermark'
}, {
  title: 'Max Delay',
  dataIndex: 'max_delay'
}, {
  title: 'Rollup',
  dataIndex: 'rollup'
}, {
  title: 'Action',
  key: 'action',
}
];

</script>

<template>
  <div>
    <a-table class="schema-stable-list" :columns="columns" :data-source="data" :pagination="false" size="small">
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'action'">
          <a-button @click="alterTableFormRef.show()">Edit</a-button>
        </template>
      </template>
    </a-table>
    <AlterTableForm ref="alterTableFormRef" />
  </div>
</template>

<style scoped>

</style>
