<script setup>
import useColumn from "../support/column.js";
import {useSqlStore} from "../store/sql.js";
import {useColumnStore} from "../store/column.js";
import {computed, nextTick, onMounted, onUpdated, reactive, ref, watch} from "vue";
import useSql from "../support/sql.js";
import {useAppStore} from "../store/app.js";

const props = defineProps({
  parentClass: {
    type: String,
    default() {return "query-result-tabs"}
  }
})
const tableRef = ref()

const {queryColumns} = useColumn()
const appStore = useAppStore()
const columnStore = useColumnStore()
const sqlStore = useSqlStore()
const {buildSimplePaginationSql} = useSql(false)

const pagination = computed(() => {
  return {
    pageSize: Number(sqlStore.pagination.limit),
    total: Number(sqlStore.execResult.total),
    pageSizeOptions: sqlStore.pageSizeOptions.table,
    showSizeChanger: false,
    showQuickJumper: true,
    current: sqlStore.pagination.current
  }
})

const onChange = (pagination, filters, sorter) => {
  sqlStore.pagination.current = pagination.current
  buildSimplePaginationSql()
};

</script>

<template>
  <a-table ref="tableRef" size="small" bordered id="data-table"
           table-layout="fixed"
           :columns="columnStore.antTableColumns"
           :loading="sqlStore.state.executing"
           :scroll="{x: '50%'}"
           :data-source="sqlStore.execResult.data"
           @change="onChange"
           :pagination="pagination" />
</template>

<style scoped>

</style>
