<script setup>
import {SearchOutlined} from "@ant-design/icons-vue"
import SqlEditor from "../components/SqlEditor.vue";
import DataTableView from "../components/DataTableView.vue";
import QueryResult from "../components/QueryResult.vue";
import {computed, ref} from "vue";
import useRawSqlQuery from "../support/raw-sql-query.js";
import i18n from "../locale/i18n.js";
import {useSqlStore} from "../store/sql.js";
import ColumnSelector from "../components/ColumnSelector.vue";

const sqlStore = useSqlStore()
const {instance, sql, handleQuery, queryCount} = useRawSqlQuery()
const instanceConnectionUri = computed(() => {
  return i18n.global.t("ui.label.connectedToServer", [`${instance.value?.host}:${instance.value?.port}`])
})
const resultVisible = computed(() => {
  return queryCount.value > 0
})
</script>

<template>
  <a-row :gutter="[0, 10]">
    <a-col :span="24">
      <a-alert :message="instanceConnectionUri" type="info" show-icon />
    </a-col>
    <a-col :span="24">
      <SqlEditor v-model="sql" :rows="5"></SqlEditor>
    </a-col>
    <a-col :span="24">
      <a-button type="primary" @click="handleQuery" :loading="sqlStore.state.executing" :disabled="!sql">
        <template #icon><SearchOutlined /></template>
        {{ $t('common.query') }}
      </a-button>
    </a-col>

    <a-col :span="24" class="mrg-top" v-if="resultVisible">
      <QueryResult/>
    </a-col>
    <a-col :span="24" class="txt-right">
      <ColumnSelector />
    </a-col>
    <a-col :span="24" v-if="resultVisible">
      <DataTableView/>
    </a-col>
  </a-row>
</template>

<style scoped>

</style>
