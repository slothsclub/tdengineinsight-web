<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {ref} from "vue";
import AlterSubtableForm from "../../components/form/AlterSubtableForm.vue";
import {DeleteOutlined, EditOutlined, InfoOutlined, TableOutlined} from "@ant-design/icons-vue";

const emit = defineEmits(['update:table'])
const alterTableFormRef = ref()
const alterSubtableFormRef = ref()

const data = [{
  table_name: "table 1",
  db_name: "",
  create_time: "",
  columns: "",
  stable_name: "",
  uid: "",
  table_comment: "",
  vgroup_id: "",
  ttl: "",
  type: "table"
},{
  table_name: "Subtable 1",
  db_name: "",
  create_time: "",
  columns: "",
  stable_name: "",
  uid: "",
  table_comment: "",
  vgroup_id: "",
  ttl: "",
  type: "subtable"
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

const handleEdit = (column) => {
  if(column.type === 'subtable') {
    alterSubtableFormRef.value.show()
  } else {
    alterTableFormRef.value.show()
  }
}
</script>

<template>
  <div>
    <a-table class="schema-table-list" :columns="columns" :data-source="data" :pagination="false" size="small">
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button shape="circle" size="small">
              <template #icon>
                <InfoOutlined />
              </template>
            </a-button>
            <a-button shape="circle" size="small" @click="handleEdit(record)">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-button shape="circle" size="small" danger>
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>

    <AlterTableForm ref="alterTableFormRef" mode="table" />
    <AlterSubtableForm ref="alterSubtableFormRef" />
  </div>
</template>

<style scoped>

</style>
