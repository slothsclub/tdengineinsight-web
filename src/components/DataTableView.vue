<script setup>
import useColumn from "../support/column.js";
import {useSqlStore} from "../store/sql.js";
import {useColumnStore} from "../store/column.js";
import {computed, nextTick, onMounted, onUpdated, reactive, ref, watch} from "vue";
import useSql from "../support/sql.js";
import {useAppStore} from "../store/app.js";
import dayjs from "dayjs";

const tableRef = ref()

const {queryColumns} = useColumn()
const appStore = useAppStore()
const columnStore = useColumnStore()
const sqlStore = useSqlStore()
const {buildSimplePaginationSql} = useSql(false)

const pagination = computed(() => {
  if(sqlStore.mode === 'normal') {
    return {
      pageSize: Number(sqlStore.pagination.limit),
      total: Number(sqlStore.execResult.total),
      pageSizeOptions: sqlStore.pageSizeOptions.table,
      showSizeChanger: false,
      showQuickJumper: true,
      current: sqlStore.pagination.current
    }
  } else {
    return false
  }
})

const onChange = (pagination, filters, sorter) => {
  sqlStore.pagination.current = pagination.current
  buildSimplePaginationSql()
};

</script>

<template>
  <a-table ref="tableRef" size="small" bordered id="data-table" v-if="columnStore.antTableColumns"
           table-layout="fixed"
           :columns="columnStore.antTableColumns"
           :loading="sqlStore.state.executing"
           :scroll="{x: '50%', y: '100%'}"
           :data-source="sqlStore.execResult.data"
           @change="onChange"
           :pagination="pagination" >

    <template #bodyCell="{ text, record, index, column }">
      <template v-if="column?.dataIndex === 'ts' || column?.dataIndex === '_wstart' || column?.dataIndex === '_wend'">
        {{ dayjs(text).format(appStore.datetimeFormat) }}
      </template>
    </template>
  </a-table>
</template>

<style scoped>

</style>
