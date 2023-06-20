<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {reactive, ref} from "vue";
import CreateSubtableForm from "../../components/form/CreateSubtableForm.vue";
import {EditOutlined, TableOutlined, DeleteOutlined, InfoOutlined} from "@ant-design/icons-vue"
import i18n from "../../locale/i18n.js";

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
  title: i18n.global.t('tdengine.database.stableName'),
  dataIndex: 'stable_name'
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
  title: i18n.global.tc('common.tag', 2),
  dataIndex: 'tags'
}, {
  title: i18n.global.t('common.lastUpdate'),
  dataIndex: 'last_update'
}, {
  title: i18n.global.t('common.comment'),
  dataIndex: 'table_comment'
}, {
  title: i18n.global.t('tdengine.database.watermark'),
  dataIndex: 'watermark'
}, {
  title: i18n.global.t('common.maxDelay'),
  dataIndex: 'max_delay'
}, {
  title: i18n.global.t('common.rollup'),
  dataIndex: 'rollup'
}, {
  title: i18n.global.t('common.action'),
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
              <template #title>{{ $t('ui.btn.createSubtables') }}</template>
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
