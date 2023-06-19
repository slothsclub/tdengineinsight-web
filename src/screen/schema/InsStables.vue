<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {reactive, ref} from "vue";
import CreateSubtableForm from "../../components/form/CreateSubtableForm.vue";
import {EditOutlined, TableOutlined, DeleteOutlined, InfoOutlined} from "@ant-design/icons-vue"

const emit = defineEmits(['update:stable'])
const alterTableFormRef = ref()
const createSubtableFormRef = ref()

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
const tags = reactive([
  {
    name: "tag1"
  },
  {
    name: "tag2"
  },
  {
    name: "tag3"
  }
])
</script>

<template>
  <div>
    <a-table class="schema-stable-list" :columns="columns" :data-source="data" :pagination="false" size="small">
      <template #bodyCell="{ column, text }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button shape="circle" size="small">
              <template #icon>
                <InfoOutlined />
              </template>
            </a-button>
            <a-button shape="circle" size="small" @click="alterTableFormRef.show()">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-tooltip>
              <template #title>Create Subtables</template>
              <a-button shape="circle" size="small" @click="createSubtableFormRef.show()">
                <template #icon>
                  <TableOutlined />
                </template>
              </a-button>
            </a-tooltip>
            <a-button shape="circle" size="small" danger>
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <AlterTableForm ref="alterTableFormRef" />
    <CreateSubtableForm ref="createSubtableFormRef" :tags="tags" />
  </div>
</template>

<style scoped>

</style>
