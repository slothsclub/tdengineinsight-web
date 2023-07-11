<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {reactive, ref} from "vue";
import CreateChildTableForm from "../../components/form/CreateChildTableForm.vue";
import {EditOutlined, TableOutlined, DeleteOutlined, InfoOutlined} from "@ant-design/icons-vue"
import i18n from "../../locale/i18n.js";
import {useTableStore} from "../../store/table.js";
import {useSchemaStore} from "../../store/schema.js";
import {storeToRefs} from "pinia";
import useSchema from "../../support/schema.js";

const emit = defineEmits(['update:stable'])
const tableStore = useTableStore()
const schemaStore = useSchemaStore()
const {alterTableFormRef, createChildTableFormRef} = storeToRefs(schemaStore)
const {handleOpenAlterStableForm, handleOpenCreateChildTableForm, gotoTablesViewWithSearch, dropTable} = useSchema()

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

</script>

<template>
  <div>
    <a-table class="schema-stable-list" :columns="columns" :data-source="tableStore.stables" :pagination="false" size="small" :loading="tableStore.loadingState.stable">
      <template #bodyCell="{ text, record, index, column }">
        <template v-if="column.dataIndex === 'stableName'">
          <a @click="gotoTablesViewWithSearch(text)">{{ text }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <a-space>
            <a-button size="small" @click="handleOpenAlterStableForm(record)">
              <template #icon>
                <EditOutlined />
              </template>
            </a-button>
            <a-tooltip>
              <template #title>{{ $t('ui.btn.createChildTables') }}</template>
              <a-button size="small" @click="handleOpenCreateChildTableForm(record)">
                <template #icon>
                  <TableOutlined />
                </template>
              </a-button>
            </a-tooltip>
            <a-button size="small" danger @click="dropTable(record)">
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </a-space>
        </template>
      </template>
    </a-table>
    <AlterTableForm ref="alterTableFormRef" />
    <CreateChildTableForm ref="createChildTableFormRef" />
  </div>
</template>

<style scoped>

</style>
