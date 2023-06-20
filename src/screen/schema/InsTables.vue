<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {ref} from "vue";
import AlterSubtableForm from "../../components/form/AlterSubtableForm.vue";
import {DeleteOutlined, EditOutlined, InfoOutlined, TableOutlined} from "@ant-design/icons-vue";
import i18n from "../../locale/i18n.js";

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
  title: i18n.global.t('common.name'),
  dataIndex: 'table_name'
}, {
  title: i18n.global.t('common.database'),
  dataIndex: 'db_name'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'create_time'
}, {
  title: i18n.global.tc('common.column', 2),
  dataIndex: 'columns'
}, {
  title: i18n.global.t('common.stable'),
  dataIndex: 'stable_name'
}, {
  title: i18n.global.t('common.uid'),
  dataIndex: 'uid'
}, {
  title: i18n.global.t('common.comment'),
  dataIndex: 'table_comment'
}, {
  title: i18n.global.t('tdengine.database.vGroupId'),
  dataIndex: 'vgroup_id'
}, {
  title: i18n.global.t('common.ttl'),
  dataIndex: 'ttl'
}, {
  title: i18n.global.t('common.type'),
  dataIndex: 'type'
}, {
  title: i18n.global.t('common.action'),
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
