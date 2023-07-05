<script setup>
import { TableOutlined, OneToOneOutlined, SearchOutlined } from '@ant-design/icons-vue';
import {computed, ref, watch} from "vue";
import Tables from "../components/Tables.vue";
import DataTableView from "../components/DataTableView.vue";
import QueryResult from "../components/QueryResult.vue";
import TableStructure from "../components/TableStructure.vue";
import QueryBuilder from "../components/QueryBuilder.vue";
import QuickTimeRangeClauseSelector from "../components/clause/QuickTimeRangeClauseSelector.vue";
import {useAppStore} from "../store/app.js";
import {storeToRefs} from "pinia";
import useDatabase from "../support/database.js";
import {useDatabaseStore} from "../store/database.js";
import {useSqlStore} from "../store/sql.js";
import useSql from "../support/sql.js";
import {useTableStore} from "../store/table.js";
import ColumnSelector from "../components/ColumnSelector.vue";
import {useColumnStore} from "../store/column.js";
import useColumn from "../support/column.js";
import {useRouter} from "vue-router";
import useTable from "../support/table.js";
import DataChartView from "../components/DataChartView.vue";
const activeKey = ref("1")

const router = useRouter()
const appStore = useAppStore()
const {currentInstanceId} = storeToRefs(appStore)

const {registerListener: registerDatabaseListener} = useDatabase()
const databaseStore = useDatabaseStore()
const {resetTableState, registerListener: registerTableListener} = useTable()
const tableStore = useTableStore()
const columnStore = useColumnStore()
const sqlStore = useSqlStore()
const {simplePaginationQuery, execSql, registerListener: registerSqlListener, setStateToChartView, setStateToTableView} = useSql()
const {registerListener: registerColumnListener, resetColumnState} = useColumn()

const table = computed(() => {
  return tableStore.currentTableName
})
const db = computed(() => {
  return databaseStore.currentDatabase.name
})
const columns = computed(() => {
  return columnStore.columnsClause
})


watch([table, db, columns], () => {
  if(!table.value || !db.value || !columns.value) return
  simplePaginationQuery()
})
const handleDatabaseChange = () => {
  resetTableState()
  resetColumnState()
  router.push({
    name: "browser",
    query: {
      dbName: databaseStore.currentDatabase.name,
      mode: tableStore.mode,
    }
  })
}
const handleViewModeChange = () => {
  if(sqlStore.viewMode === 'table') {
    setStateToTableView()
  }
  if(sqlStore.viewMode === 'chart') {
    setStateToChartView()
  }
}

registerColumnListener()
registerDatabaseListener()
registerTableListener()
registerSqlListener()
</script>

<template>
  <a-row :gutter="[0, 0]" class="min-h browser-container">
    <a-col :span="24" v-if="!databaseStore.hasDatabase">
      <a-empty class="center mrg-top" :description="$t('ui.tips.noDatabaseFound')" />
    </a-col>
    <a-col v-show="databaseStore.hasDatabase" class="browser-schema-container">
      <a-select size="large" v-model:value="databaseStore.currentDatabase.name" @change="handleDatabaseChange">
        <a-select-option v-for="db in databaseStore.databases.userDefined" :value="db.name">{{ db.name }}</a-select-option>
      </a-select>

      <Tables></Tables>
    </a-col>
    <a-col :span="24" v-show="!tableStore.hasTables">
      <a-empty class="center mrg-top" :description="$t('ui.tips.noTableFound')" />
    </a-col>
    <a-col v-show="databaseStore.hasDatabase && tableStore.hasTables" class="browser-data-container">
      <a-tabs v-model:activeKey="activeKey" type="card" class="query-result-tabs tabs min-h">
        <a-tab-pane key="1">
          <template #tab>
            <span>
              <TableOutlined />
              {{ $t('common.browse') }}
            </span>
          </template>
          <a-row :gutter="[0, 20]">
            <a-col :span="24">
              <QueryResult v-loading="sqlStore.state.executing"/>
            </a-col>
            <a-col :span="24">
              <a-row>
                <a-col :span="18">
                  <QuickTimeRangeClauseSelector>
                    <a-button @click="execSql">{{ $t('common.refresh') }}</a-button>
                  </QuickTimeRangeClauseSelector>
                </a-col>
                <a-col :span="6" class="txt-right">
                  <a-space>
                    <ColumnSelector />
                    <a-radio-group v-model:value="sqlStore.viewMode" button-style="solid" @change="handleViewModeChange">
                      <a-radio-button value="table">{{ $t('common.table') }}</a-radio-button>
                      <a-radio-button value="chart">{{ $t('common.chart') }}</a-radio-button>
                    </a-radio-group>
                  </a-space>
                </a-col>
              </a-row>
            </a-col>
            <a-col :span="24">
              <DataTableView v-if="sqlStore.viewMode === 'table'"></DataTableView>
              <DataChartView v-if="sqlStore.viewMode === 'chart'"></DataChartView>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="2">
          <template #tab>
            <span>
              <OneToOneOutlined />
              {{ $t('common.structure') }}
            </span>
          </template>
          <TableStructure/>
        </a-tab-pane>
        <a-tab-pane key="3">
          <template #tab>
            <span>
              <SearchOutlined />
              {{ $t('common.search') }}
            </span>
          </template>
          <a-row :gutter="[0, 20]">
            <a-col :span="24">
              <QueryBuilder />
              <a-button class="mrg-top" size="large" style="width: 200px">{{ $t('common.query') }}</a-button>
            </a-col>
            <a-col :span="24">
              <QueryResult />
            </a-col>
            <a-col :span="24">
              <DataTableView />
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-col>
  </a-row>
</template>

<style scoped>
  .browser-container {
    flex-wrap: nowrap;
  }
  .ant-select {
    min-width: 100px;
    width: 100%;
  }
  .ant-card {
    min-height: 100%;
  }
</style>
