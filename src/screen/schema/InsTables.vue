<script setup>
import AlterTableForm from "../../components/form/AlterTableForm.vue";
import {ref} from "vue";
import AlterSubtableForm from "../../components/form/AlterSubtableForm.vue";
import {DeleteOutlined, EditOutlined, InfoOutlined, TableOutlined} from "@ant-design/icons-vue";
import i18n from "../../locale/i18n.js";
import {useTableStore} from "../../store/table.js";

const emit = defineEmits(['update:table'])
const tableStore = useTableStore()

const alterTableFormRef = ref()
const alterSubtableFormRef = ref()

const columns = [{
  title: i18n.global.t('common.name'),
  dataIndex: 'tableName'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'createTime'
}, {
  title: i18n.global.tc('common.column', 2),
  dataIndex: 'columns'
}, {
  title: i18n.global.t('common.stable'),
  dataIndex: 'stableName'
}, {
  title: i18n.global.t('common.uid'),
  dataIndex: 'uid'
}, {
  title: i18n.global.t('common.comment'),
  dataIndex: 'tableComment'
}, {
  title: i18n.global.t('tdengine.database.vGroupId'),
  dataIndex: 'vgroupId'
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
    <a-table class="schema-table-list" :columns="columns" :data-source="tableStore.childAndNormalTables" :pagination="true" size="small" :loading="tableStore.loadingState.childTable">
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
