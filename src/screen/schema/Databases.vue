<script setup>
import DatabaseExtraInfo from "./DatabaseExtraInfo.vue";
import AlterDatabaseForm from "../../components/form/AlterDatabaseForm.vue";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {EditOutlined} from "@ant-design/icons-vue";

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
  title: 'Name',
  dataIndex: 'name'
}, {
  title: 'Create time',
  dataIndex: 'create_time'
}, {
  title: 'NTables',
  dataIndex: 'ntables'
}, {
  title: 'vGroups',
  dataIndex: 'vgroups'
}, {
  title: 'Replica',
  dataIndex: 'replica'
}, {
  title: 'Strict',
  dataIndex: 'strict'
}, {
  title: 'Duration',
  dataIndex: 'duration'
}, {
  title: 'Keep',
  dataIndex: 'keep'
}, {
  title: 'Status',
  dataIndex: 'status'
}, {
  title: 'Precision',
  dataIndex: 'precision'
}, {
  title: 'Action',
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
