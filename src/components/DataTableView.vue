<script setup>
import useColumn from "../support/column.js";
import {useSqlStore} from "../store/sql.js";
import {useColumnStore} from "../store/column.js";
import {computed, nextTick, onMounted, onUpdated, reactive, ref} from "vue";
import useSql from "../support/sql.js";

const props = defineProps({
  parentClass: {
    type: String,
    default() {return "query-result-tabs"}
  }
})
const tableRef = ref()

const {queryColumns} = useColumn()
const columnStore = useColumnStore()
const sqlStore = useSqlStore()
const {simplePaginationQuery} = useSql()

const pagination = computed(() => {
  return {
    pageSize: Number(sqlStore.pagination.limit),
    total: Number(sqlStore.execResult.total),
    pageSizeOptions: sqlStore.pageSizeOptions,
    showSizeChanger: false,
    showQuickJumper: true
  }
})
const onChange = (pagination, filters, sorter) => {
  sqlStore.pagination.current = pagination.current
  simplePaginationQuery()
};

</script>

<template>
  <a-table ref="tableRef" size="small" bordered
           :columns="columnStore.antTableColumns"
           :loading="sqlStore.state.executing"
           :scroll="{x: true}"
           :data-source="sqlStore.execResult.data"
           @change="onChange"
           :pagination="pagination" />
</template>

<style scoped>

</style>