<script setup>
import DatabaseExtraInfo from "./DatabaseExtraInfo.vue";
import AlterDatabaseForm from "../../components/form/AlterDatabaseForm.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {EditOutlined} from "@ant-design/icons-vue";
import i18n from "../../locale/i18n.js";

const emit = defineEmits(['update:database'])
const alterDatabaseFormRef = ref()
const router = useRouter()

const data = [{
  name: "DB 1",
  create_time: "",
  ntables: "",
  vgroups: "",
  replica: "",
  strict: "",
  duration: "",
  keep: "",
  buffer: "",
  pagesize: "",
  pages: "",
  minrows: "",
  maxrows: "",
  comp: "",
  precision: "ms",
  status: "",
  retentions: "",
  single_stable: "",
  cachemodel: "",
  cachesize: "",
  wal_level: "",
  wal_fsync_period: "",
  wal_retention_period: "",
  wal_retention_size: "",
  wal_roll_period: "",
  wal_segment_size: "1024",
  stt_trigger: "",
  table_prefix: "",
  table_suffix: "",
  tsdb_pagesize: ""
}];
const columns = [{
  title: i18n.global.t('tdengine.database.name'),
  dataIndex: 'name'
}, {
  title: i18n.global.t('common.created'),
  dataIndex: 'create_time'
}, {
  title: i18n.global.t('tdengine.database.NTables'),
  dataIndex: 'ntables'
}, {
  title: i18n.global.t('tdengine.database.vGroups'),
  dataIndex: 'vgroups'
}, {
  title: i18n.global.t('common.replica'),
  dataIndex: 'replica'
}, {
  title: i18n.global.t('common.strict'),
  dataIndex: 'strict'
}, {
  title: i18n.global.t('common.duration'),
  dataIndex: 'duration'
}, {
  title: i18n.global.t('common.keep'),
  dataIndex: 'keep'
}, {
  title: i18n.global.t('common.status'),
  dataIndex: 'status'
}, {
  title: i18n.global.t('common.precision'),
  dataIndex: 'precision'
}, {
  title: i18n.global.t('common.action'),
  key: 'action',
}
];

const handleSelectDatabase = (name) => {
  router.push({name: "schema", query: {db: name}})
}
</script>

<template>
  <div>
    <a-table class="client-list" :columns="columns" :data-source="data" bordered :pagination="false" size="small">
      <template #bodyCell="{ column, text }">
        <template v-if="column.dataIndex === 'name'">
          <a @click="handleSelectDatabase(text)">{{ text }}</a>
        </template>
        <template v-if="column.key === 'action'">
          <a-button shape="circle" size="small" @click="alterDatabaseFormRef.show()">
            <template #icon>
              <EditOutlined />
            </template>
          </a-button>
        </template>
      </template>
      <template #expandedRowRender="{ record }">
        <DatabaseExtraInfo :database="record"/>
      </template>
    </a-table>
    <AlterDatabaseForm ref="alterDatabaseFormRef"></AlterDatabaseForm>
  </div>
</template>

<style scoped>

</style>
