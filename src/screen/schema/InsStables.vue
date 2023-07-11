<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {reactive, ref} from "vue";
import CreateSubtableForm from "../../components/form/CreateSubtableForm.vue";
import {EditOutlined, TableOutlined, DeleteOutlined, InfoOutlined} from "@ant-design/icons-vue"
import i18n from "../../locale/i18n.js";
import {useTableStore} from "../../store/table.js";
import {useSchemaStore} from "../../store/schema.js";
import {storeToRefs} from "pinia";
import useSchema from "../../support/schema.js";

const emit = defineEmits(['update:stable'])
const tableStore = useTableStore()
const schemaStore = useSchemaStore()
const {alterTableFormRef} = storeToRefs(schemaStore)
const {handleOpenAlterTableForm} = useSchema()

const createSubtableFormRef = ref()

const columns = [{
  title: i18n.global.t('tdengine.database.stableName'),
  dataIndex: 'stableName'
}, {
  title: i18n.global.t('common.database'),
  dataIndex: 'dbName'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'createTime'
}, {
  title: i18n.global.tc('common.column', 2),
  dataIndex: 'columns'
}, {
  title: i18n.global.tc('common.tag', 2),
  dataIndex: 'tags'
}, {
  title: i18n.global.t('common.lastUpdate'),
  dataIndex: 'lastUpdate'
}, {
  title: i18n.global.t('common.comment'),
  dataIndex: 'tableComment'
}, {
  title: i18n.global.t('tdengine.database.watermark'),
  dataIndex: 'watermark'
}, {
  title: i18n.global.t('common.maxDelay'),
  dataIndex: 'maxDelay'
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
    <a-table class="schema-stable-list" :columns="columns" :data-source="tableStore.allTables.stable" :pagination="false" size="small" :loading="tableStore.loadingState.stable">
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button shape="circle" size="small">
              <template #icon>
                <InfoOutlined />
              </template>
            </a-button>
            <a-button shape="circle" size="small" @click="handleOpenAlterTableForm(record)">
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
